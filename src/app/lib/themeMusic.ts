'use client';

/**
 * Procedural background music engine (Web Audio API).
 *
 * - 'stranger': dark synthwave arpeggio in the style of the Stranger Things
 *   title theme — detuned saws cycling a Cmaj7 arpeggio over a deep sub
 *   drone, with a slowly breathing low-pass filter.
 * - 'lockekey': haunted music-box arpeggio in A minor — soft bell tones
 *   with echo over a low drone, like a melody drifting through Keyhouse.
 */

export type MusicTheme = 'stranger' | 'lockekey';

interface Preset {
  notes: number[]; // frequencies, looped
  noteLen: number; // seconds per step
  oscType: OscillatorType;
  detune: number; // cents for second osc (0 = single osc)
  filterBase: number;
  filterDepth: number;
  droneFreq: number;
  droneType: OscillatorType;
  attack: number;
  release: number;
  noteGain: number;
  droneGain: number;
  echo: boolean;
}

const F = {
  C2: 65.41, A2: 110.0,
  C3: 130.81, E3: 164.81, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, E4: 329.63, A4: 440.0, B4: 493.88, G4: 392.0,
};

const PRESETS: Record<MusicTheme, Preset> = {
  stranger: {
    notes: [F.C3, F.E3, F.G3, F.B3, F.C4, F.B3, F.G3, F.E3],
    noteLen: 0.21,
    oscType: 'sawtooth',
    detune: 8,
    filterBase: 650,
    filterDepth: 450,
    droneFreq: F.C2,
    droneType: 'sine',
    attack: 0.02,
    release: 0.25,
    noteGain: 0.16,
    droneGain: 0.1,
    echo: false,
  },
  lockekey: {
    notes: [F.A3, F.C4, F.E4, F.A4, F.E4, F.C4, F.B3, F.E4],
    noteLen: 0.34,
    oscType: 'triangle',
    detune: 0,
    filterBase: 1800,
    filterDepth: 600,
    droneFreq: F.A2,
    droneType: 'sine',
    attack: 0.005,
    release: 0.9,
    noteGain: 0.2,
    droneGain: 0.07,
    echo: true,
  },
};

class ThemeMusic {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private echoNode: DelayNode | null = null;
  private echoGain: GainNode | null = null;
  private drone: OscillatorNode | null = null;
  private droneAmp: GainNode | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private nextNoteTime = 0;
  private step = 0;
  private theme: MusicTheme = 'stranger';
  public playing = false;

  start(theme: MusicTheme) {
    this.theme = theme;
    if (this.playing) return;
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;

    if (!this.ctx) this.ctx = new Ctx();
    const ctx = this.ctx;
    if (ctx.state === 'suspended') ctx.resume();

    this.master = ctx.createGain();
    this.master.gain.setValueAtTime(0.0001, ctx.currentTime);
    this.master.gain.exponentialRampToValueAtTime(0.9, ctx.currentTime + 2);
    this.master.connect(ctx.destination);

    this.filter = ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.Q.value = 6;
    this.filter.connect(this.master);

    // echo bus (used by lockekey preset)
    this.echoNode = ctx.createDelay(1.5);
    this.echoNode.delayTime.value = 0.42;
    this.echoGain = ctx.createGain();
    this.echoGain.gain.value = 0.35;
    this.echoNode.connect(this.echoGain);
    this.echoGain.connect(this.echoNode);
    this.echoGain.connect(this.master);

    this.startDrone();

    this.playing = true;
    this.step = 0;
    this.nextNoteTime = ctx.currentTime + 0.1;
    this.timer = setInterval(() => this.scheduler(), 40);
  }

  stop() {
    if (!this.playing) return;
    this.playing = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    const ctx = this.ctx;
    if (ctx && this.master) {
      const m = this.master;
      m.gain.cancelScheduledValues(ctx.currentTime);
      m.gain.setValueAtTime(Math.max(m.gain.value, 0.0001), ctx.currentTime);
      m.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
      setTimeout(() => m.disconnect(), 1000);
    }
    try {
      this.drone?.stop(this.ctx ? this.ctx.currentTime + 1 : undefined);
    } catch { /* already stopped */ }
    this.drone = null;
  }

  setTheme(theme: MusicTheme) {
    if (this.theme === theme) return;
    this.theme = theme;
    if (this.playing) {
      // restart the drone at the new root
      try { this.drone?.stop(); } catch { /* noop */ }
      this.drone = null;
      this.startDrone();
      this.step = 0;
    }
  }

  private startDrone() {
    const ctx = this.ctx;
    if (!ctx || !this.master) return;
    const p = PRESETS[this.theme];
    this.drone = ctx.createOscillator();
    this.drone.type = p.droneType;
    this.drone.frequency.value = p.droneFreq;
    this.droneAmp = ctx.createGain();
    this.droneAmp.gain.setValueAtTime(0.0001, ctx.currentTime);
    this.droneAmp.gain.exponentialRampToValueAtTime(p.droneGain, ctx.currentTime + 2.5);
    this.drone.connect(this.droneAmp);
    this.droneAmp.connect(this.master);
    this.drone.start();
  }

  private scheduler() {
    const ctx = this.ctx;
    if (!ctx || !this.playing) return;
    while (this.nextNoteTime < ctx.currentTime + 0.12) {
      this.playNote(this.nextNoteTime);
      const p = PRESETS[this.theme];
      this.nextNoteTime += p.noteLen;
      this.step = (this.step + 1) % p.notes.length;
    }
  }

  private playNote(time: number) {
    const ctx = this.ctx;
    if (!ctx || !this.filter) return;
    const p = PRESETS[this.theme];
    const freq = p.notes[this.step];

    // breathing low-pass filter
    const cycle = Math.sin(time * 0.35);
    this.filter.frequency.setTargetAtTime(
      p.filterBase + p.filterDepth * (0.5 + 0.5 * cycle),
      time,
      0.1
    );

    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, time);
    amp.gain.exponentialRampToValueAtTime(p.noteGain, time + p.attack);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + p.noteLen + p.release);
    amp.connect(this.filter);
    if (p.echo && this.echoNode) amp.connect(this.echoNode);

    const oscs: OscillatorNode[] = [];
    const main = ctx.createOscillator();
    main.type = p.oscType;
    main.frequency.value = freq;
    oscs.push(main);

    if (p.detune > 0) {
      const second = ctx.createOscillator();
      second.type = p.oscType;
      second.frequency.value = freq;
      second.detune.value = p.detune;
      oscs.push(second);
    }

    for (const o of oscs) {
      o.connect(amp);
      o.start(time);
      o.stop(time + p.noteLen + p.release + 0.1);
    }
  }
}

let instance: ThemeMusic | null = null;

export function getThemeMusic(): ThemeMusic {
  if (!instance) instance = new ThemeMusic();
  return instance;
}
