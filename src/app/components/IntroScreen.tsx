'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { getThemeMusic } from '../lib/themeMusic';

interface Particle {
  id: number;
  width: string;
  height: string;
  background: string;
  left: string;
  top: string;
  animation: string;
  animationDelay: string;
}

export default function IntroScreen() {
  const [entered, setEntered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showEnterBtn, setShowEnterBtn] = useState(false);
  const [zoomPhase, setZoomPhase] = useState<'idle' | 'zooming' | 'done'>('idle');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const textMeshGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    // Generate particles only on client
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      width: `${Math.random() * 4 + 1}px`,
      height: `${Math.random() * 4 + 1}px`,
      background: `rgba(229, 9, 20, ${Math.random() * 0.8 + 0.2})`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `particleFloat ${Math.random() * 5 + 5}s linear infinite`,
      animationDelay: `${Math.random() * 3}s`,
    }));
    setParticles(generated);

    // Show Enter button after title animation
    const btnTimer = setTimeout(() => setShowEnterBtn(true), 3500);
    return () => clearTimeout(btnTimer);
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Red point lights for Stranger Things atmosphere
    const redLight1 = new THREE.PointLight(0xe50914, 2, 20);
    redLight1.position.set(-3, 2, 3);
    scene.add(redLight1);

    const redLight2 = new THREE.PointLight(0xff1a1a, 1.5, 20);
    redLight2.position.set(3, -1, 4);
    scene.add(redLight2);

    // Floating particles in 3D
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xe50914,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Create 3D text using planes with canvas texture
    const textGroup = new THREE.Group();
    textMeshGroupRef.current = textGroup;

    // "ADITYA" text
    const createTextTexture = (text: string, fontSize: number, color: string) => {
      const textCanvas = document.createElement('canvas');
      const ctx = textCanvas.getContext('2d')!;
      textCanvas.width = 1024;
      textCanvas.height = 256;
      ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
      ctx.font = `bold ${fontSize}px "Outfit", sans-serif`;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Add glow
      ctx.shadowColor = '#e50914';
      ctx.shadowBlur = 30;
      ctx.fillText(text, textCanvas.width / 2, textCanvas.height / 2);
      // Double pass for stronger glow
      ctx.shadowBlur = 60;
      ctx.fillText(text, textCanvas.width / 2, textCanvas.height / 2);
      return new THREE.CanvasTexture(textCanvas);
    };

    const adityaTexture = createTextTexture('ADITYA', 140, '#e50914');
    const gujarTexture = createTextTexture('GUJAR', 140, '#e50914');

    const planeMat1 = new THREE.MeshBasicMaterial({
      map: adityaTexture,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const planeMat2 = new THREE.MeshBasicMaterial({
      map: gujarTexture,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const planeGeo1 = new THREE.PlaneGeometry(5, 1.25);
    const planeGeo2 = new THREE.PlaneGeometry(5, 1.25);

    const mesh1 = new THREE.Mesh(planeGeo1, planeMat1);
    mesh1.position.y = 0.7;
    const mesh2 = new THREE.Mesh(planeGeo2, planeMat2);
    mesh2.position.y = -0.7;

    textGroup.add(mesh1);
    textGroup.add(mesh2);
    textGroup.position.z = 0;
    textGroup.visible = false; // Hidden initially
    scene.add(textGroup);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate particles
      particleSystem.rotation.y = elapsed * 0.05;
      particleSystem.rotation.x = Math.sin(elapsed * 0.03) * 0.1;

      // Pulse lights
      redLight1.intensity = 2 + Math.sin(elapsed * 2) * 0.5;
      redLight2.intensity = 1.5 + Math.cos(elapsed * 1.5) * 0.3;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      renderer.dispose();
    };
  }, []);

  const handleEnter = useCallback(() => {
    if (entered) return;
    setEntered(true);
    setZoomPhase('zooming');

    // Start the procedural theme music (synthwave arpeggio / music box)
    try {
      const currentTheme =
        document.documentElement.dataset.theme === 'lockekey' ? 'lockekey' : 'stranger';
      getThemeMusic().start(currentTheme);
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }

    // Start the Netflix-style 3D zoom animation
    if (textMeshGroupRef.current && cameraRef.current && sceneRef.current) {
      const textGroup = textMeshGroupRef.current;
      textGroup.visible = true;

      // Start position: far away, small
      textGroup.position.z = -15;
      textGroup.scale.set(0.1, 0.1, 0.1);

      // Create red energy lines / volumetric light effect
      const lineCount = 20;
      const lines: THREE.Mesh[] = [];
      for (let i = 0; i < lineCount; i++) {
        const lineGeo = new THREE.CylinderGeometry(0.005, 0.005, 30, 4);
        const lineMat = new THREE.MeshBasicMaterial({
          color: 0xe50914,
          transparent: true,
          opacity: 0.2 + Math.random() * 0.3,
        });
        const line = new THREE.Mesh(lineGeo, lineMat);
        line.rotation.x = Math.PI / 2; // Point toward camera
        line.position.x = (Math.random() - 0.5) * 8;
        line.position.y = (Math.random() - 0.5) * 6;
        line.position.z = -5;
        lines.push(line);
        sceneRef.current!.add(line);
      }

      // Animate the zoom
      const startTime = performance.now();
      const zoomDuration = 2800; // ms

      const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const easeInExpo = (t: number) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1));

      const zoomAnimate = () => {
        const now = performance.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / zoomDuration, 1);

        if (progress < 0.7) {
          // Phase 1: Zoom in from far away (0% - 70%)
          const phase1Progress = progress / 0.7;
          const eased = easeOutExpo(phase1Progress);

          textGroup.position.z = -15 + eased * 18; // -15 to 3
          const scale = 0.1 + eased * 2.5;
          textGroup.scale.set(scale, scale, scale);

          // Add slight rotation for 3D feel
          textGroup.rotation.y = Math.sin(phase1Progress * Math.PI) * 0.05;

          // Energy lines rush toward viewer
          lines.forEach((line) => {
            line.position.z = -5 + eased * 15;
            (line.material as THREE.MeshBasicMaterial).opacity = (0.2 + Math.random() * 0.3) * (1 - phase1Progress * 0.5);
          });

        } else {
          // Phase 2: Rush past camera (70% - 100%)
          const phase2Progress = (progress - 0.7) / 0.3;
          const eased2 = easeInExpo(phase2Progress);

          textGroup.position.z = 3 + eased2 * 12; // Fly past camera
          const scale = 2.6 + eased2 * 8;
          textGroup.scale.set(scale, scale, scale);

          // Fade out as it passes
          textGroup.children.forEach((child) => {
            if (child instanceof THREE.Mesh) {
              (child.material as THREE.MeshBasicMaterial).opacity = 1 - phase2Progress;
            }
          });

          // Lines disappear
          lines.forEach((line) => {
            (line.material as THREE.MeshBasicMaterial).opacity = 0.3 * (1 - phase2Progress);
          });
        }

        if (progress < 1) {
          requestAnimationFrame(zoomAnimate);
        } else {
          // Animation complete - cleanup and transition
          setZoomPhase('done');
          lines.forEach(line => {
            sceneRef.current?.remove(line);
            line.geometry.dispose();
            (line.material as THREE.MeshBasicMaterial).dispose();
          });

          // Fade out intro screen
          setTimeout(() => setHidden(true), 200);
          setTimeout(() => setRemoved(true), 1200);
        }
      };
      requestAnimationFrame(zoomAnimate);
    } else {
      // Fallback if Three.js didn't load
      setTimeout(() => setHidden(true), 800);
      setTimeout(() => setRemoved(true), 1800);
    }
  }, [entered]);

  if (removed) return null;

  return (
    <div className={`intro-screen ${hidden ? 'hidden' : ''}`}>
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Scanline effect overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            width: p.width,
            height: p.height,
            background: p.background,
            borderRadius: '50%',
            left: p.left,
            top: p.top,
            animation: p.animation,
            animationDelay: p.animationDelay,
          }}
        />
      ))}

      {/* Title text - hidden during zoom phase */}
      {zoomPhase === 'idle' && (
        <>
          <div className="intro-title" style={{ position: 'relative', zIndex: 2 }}>
            Aditya Gujar
          </div>
          <div className="intro-subtitle" style={{ position: 'relative', zIndex: 2 }}>
            Portfolio from the Upside Down
          </div>
        </>
      )}

      {/* Zoom phase overlay text */}
      {zoomPhase === 'zooming' && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0,
          pointerEvents: 'none',
        }} />
      )}

      {/* Enter button - appears after title animation */}
      <button
        onClick={handleEnter}
        className={`intro-enter-btn ${showEnterBtn && !entered ? 'visible' : ''}`}
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '3rem',
          padding: '1rem 3rem',
          background: 'transparent',
          border: '1px solid var(--st-red)',
          color: 'var(--st-red)',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.3em',
          textTransform: 'uppercase' as const,
          cursor: 'pointer',
          opacity: showEnterBtn && !entered ? 1 : 0,
          transform: showEnterBtn && !entered ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease, background 0.3s ease, color 0.3s ease',
          pointerEvents: showEnterBtn && !entered ? 'auto' as const : 'none' as const,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--st-red)';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.boxShadow = '0 0 40px rgba(229, 9, 20, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--st-red)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        ⚡ Enter the Upside Down ⚡
      </button>
    </div>
  );
}
