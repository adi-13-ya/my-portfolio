'use client';

import Image from 'next/image';
import { lazy, Suspense, useRef, useEffect, useState } from 'react';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import FloatingParticles from './components/FloatingParticles';
import SoundToggle from './components/SoundToggle';
import ThemeToggle from './components/ThemeToggle';
import ScrollProgress from './components/ScrollProgress';
import ChristmasLights from './components/ChristmasLights';
import ScrollReveal from './components/ScrollReveal';
import { useTheme } from './components/ThemeContext';
import {
  IconLightning,
  IconPortal,
  IconMind,
  IconTerminal,
  IconData,
  IconGlobe,
  IconCloud,
  IconDemoStar,
  IconGrad,
  IconScroll,
  IconPin,
  IconEnvelope,
  IconBriefcase,
  IconDemogorgon,
  IconHeart,
} from './components/StrangerIcons';

// Section 1 — Hero effects
import UpsideDownOverlay from './components/effects/UpsideDownOverlay';
import ScrollHint from './components/effects/ScrollHint';
const HeroParticleField = lazy(() => import('./components/effects/HeroParticleField'));

// Section 3 — About effects
import DemogorgonWatermark from './components/effects/DemogorgonWatermark';
import aboutStyles from './components/effects/AboutEffects.module.css';
const FloatingBrainModel = lazy(() => import('./components/effects/FloatingBrainModel'));

// Section 4 — Projects effects
import TiltCard from './components/effects/TiltCard';

// Section 5 — Skills effects
import SkillCardGlow from './components/effects/SkillCardGlow';
const SkillGlobe = lazy(() => import('./components/effects/SkillGlobe'));

// Section 6 — Experience / Timeline effects
import TimelineWire from './components/effects/TimelineWire';
import TimelineNodePop from './components/effects/TimelineNodePop';
import timelineStyles from './components/effects/TimelineNodePop.module.css';

// Section 7 — Contact effects
const ContactParticles = lazy(() => import('./components/effects/ContactParticles'));

// GSAP for project scroll entrance
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// All skills for the globe
const allSkills = [
  'Python', 'C', 'C++', 'Java', 'C#', 'SQL', 'JavaScript',
  'PyTorch', 'Hugging Face', 'QLoRA Fine-tuning', 'RAG', 'FAISS',
  'scikit-learn', 'XGBoost', 'Sentence-BERT', 'spaCy', 'OpenCV',
  'LLM Security', 'Prompt-Injection Defense', 'Post-Quantum Crypto',
  'ML-KEM', 'ML-DSA', 'AES-256-GCM', 'Biometric Anti-Spoofing',
  'PySpark', 'PostgreSQL', 'Docker', 'AWS', 'FastAPI', 'Git',
  'React.js', 'Next.js', 'Tailwind CSS', 'LangChain', 'NLP',
];

// Theme-aware copy
const copy = {
  stranger: {
    chapterLabel: 'Chapter',
    aboutHeading: 'Into the Upside Down',
    aboutLead:
      'Like Eleven navigating between dimensions, I move between the worlds of AI capability and AI security — probing how intelligent systems break, and building the defenses that keep them standing.',
    timelinePlaceholderDate: 'Your Next Adventure Awaits',
    timelinePlaceholderTitle: 'The Gate Is Open...',
    timelinePlaceholderOrg: 'The Upside Down',
    contactText:
      'Ready to fight the Demogorgon together? Whether it is research on LLM security, a project idea, or an opportunity — the gate between our worlds is always open.',
  },
  lockekey: {
    chapterLabel: 'Key',
    aboutHeading: 'Through the Ghost Door',
    aboutLead:
      'Every lock has a key — and every intelligent system has a weakness waiting to be found. I forge the keys that open new capabilities, and the locks that keep adversaries out.',
    timelinePlaceholderDate: 'A Door Not Yet Opened',
    timelinePlaceholderTitle: 'The Omega Door Awaits...',
    timelinePlaceholderOrg: 'Keyhouse Manor',
    contactText:
      'Every door in Keyhouse opens to somewhere new. Whether it is research on LLM security, a project idea, or an opportunity — I am always forging new keys.',
  },
};

export default function Home() {
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const [flickerBg, setFlickerBg] = useState(false);
  const { theme } = useTheme();
  const t = copy[theme];

  // GSAP scroll entrance for project cards
  useEffect(() => {
    if (!projectsGridRef.current) return;

    const cards = projectsGridRef.current.querySelectorAll('.project-card-wrapper');
    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, i) => {
      const fromX = i % 2 === 0 ? -60 : 60;
      const anim = gsap.fromTo(
        card,
        { x: fromX, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      {/* ===== INTRO SCREEN ===== */}
      <IntroScreen />

      {/* ===== SCROLL PROGRESS BAR ===== */}
      <ScrollProgress />

      {/* ===== FLOATING PARTICLES ===== */}
      <FloatingParticles />

      {/* ===== NAVIGATION ===== */}
      <Navbar />

      {/* ===== THEME + SOUND TOGGLES ===== */}
      <ThemeToggle />
      <SoundToggle />

      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="hero" style={{ position: 'relative' }}>
        {/* Hero Particle Field — z0 */}
        <Suspense fallback={null}>
          <HeroParticleField />
        </Suspense>

        {/* Upside Down Overlay — z1 */}
        <UpsideDownOverlay />

        <div className="hero-bg">
          <Image
            src="/images/stranger-things-bg.png"
            alt="The Upside Down"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="scanline-overlay" />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-name">
            Aditya<br />Gujar
          </div>
          <div className="hero-tagline">
            <IconLightning size={22} /> AI Security Researcher · Patent Co-Inventor · Builder <IconLightning size={22} />
          </div>
          <p className="hero-summary">
            B.Tech IT student at VIT (CGPA 9.52, top 2% of branch) researching the security of
            LLMs and agentic AI systems. First-author of a multilingual prompt-injection defense
            preprint, co-inventor on a published patent, and builder of intelligent systems —
            from post-quantum biometric authentication to document-grounded RAG.
          </p>
          <div className="hero-cta">
            <a href="#research" className="btn-stranger" onClick={(e) => {
              e.preventDefault();
              document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Explore Research
            </a>
            <a href="#contact" className="btn-stranger btn-outline" onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Contact Me
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <ScrollHint />
      </section>

      {/* ===== CHRISTMAS LIGHTS DIVIDER ===== */}
      <ChristmasLights />

      {/* ===== ABOUT SECTION ===== */}
      <section
        id="about"
        ref={aboutSectionRef}
        className={`section section-with-bg ${flickerBg ? aboutStyles.flickerBg : ''}`}
        style={{ position: 'relative' }}
      >
        <div className="section-bg-image">
          <Image
            src="/images/upside-down-bg.png"
            alt=""
            fill
            style={{ objectFit: 'cover', opacity: 0.08 }}
          />
        </div>
        <ScrollReveal>
          <div className="section-header">
            <span className="section-number">{t.chapterLabel} 01</span>
            <h2 className="section-title">About Me</h2>
          </div>
        </ScrollReveal>

        <div className="about-grid">
          <ScrollReveal direction="left">
            <div className="about-image-container">
              <div className="about-image-frame">
                <Image
                  src="/images/christmas-lights.png"
                  alt="Christmas Lights - The Upside Down Portal"
                  width={500}
                  height={400}
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="about-text">
              <h3>{t.aboutHeading}</h3>
              <p>{t.aboutLead}</p>
              <p>
                My research spans adversarial fine-tuning against multilingual prompt injection,{' '}
                <span
                  className={aboutStyles.deepLearningHover}
                  onMouseEnter={() => setFlickerBg(true)}
                  onMouseLeave={() => setFlickerBg(false)}
                >
                  LLM security
                </span>, post-quantum cryptography, and trustworthy machine learning. I have
                fine-tuned 7B–8B models on a single 16 GB GPU, co-invented a patented multilingual
                document QA system, and shipped production{' '}
                <span
                  className={aboutStyles.tooltip}
                  data-tooltip="011 was here"
                >
                  ML telemetry
                </span>{' '}
                at Dell Technologies.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-value">9.52</span>
                  <span className="stat-label">CGPA</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">Top 2%</span>
                  <span className="stat-label">Of Branch</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">1 + 1</span>
                  <span className="stat-label">Preprint + Patent</span>
                </div>
              </div>

              {/* FloatingBrainModel */}
              <Suspense fallback={null}>
                <FloatingBrainModel />
              </Suspense>
            </div>
          </ScrollReveal>
        </div>

        {/* DemogorgonWatermark */}
        <DemogorgonWatermark />
      </section>

      {/* ===== CHRISTMAS LIGHTS DIVIDER ===== */}
      <ChristmasLights />

      {/* ===== RESEARCH & PATENTS SECTION ===== */}
      <section id="research" className="section">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-number">{t.chapterLabel} 02</span>
            <h2 className="section-title">Research &amp; Patents</h2>
          </div>
        </ScrollReveal>

        <div className="research-list">
          <ScrollReveal>
            <div className="research-card">
              <span className="research-badge">arXiv Preprint · 2026</span>
              <span className="research-badge">First Author</span>
              <h3>
                Structured Formatting Is Not Enough: Adversarial Fine-Tuning for Multilingual
                Prompt Injection Defense in Indian Languages
              </h3>
              <div className="research-meta">
                Gujar, A., Shukla, A., Tiwari, A., Khare, N. — journal submission in progress
              </div>
              <ul>
                <li>Built a multilingual prompt-injection benchmark: 400 held-out samples across 9 language categories (5 Indic languages plus Hinglish, English, cross-lingual and cultural) and 20 attack strategies, with a 6,000-example adversarial training corpus and a separate unseen-attack set.</li>
                <li>Fine-tuned Qwen2.5-7B, Llama-3.1-8B and Mistral-7B with 4-bit QLoRA on one 16 GB GPU, cutting pooled attack success rate from 29.7% to 0.00% (0/1,200 evaluations) — and from 34.9% to 0.58% on fully unseen attacks — with no measurable utility cost.</li>
                <li>Showed via ablations that structured formatting alone makes things worse (ASR rises to 33.5%), and that response-only training loss is critical: full-sequence loss collapses under schema forgery (80.1% vs. 8.9%).</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="research-card">
              <span className="research-badge">Indian Patent · Published May 2026</span>
              <span className="research-badge">App. No. 202641058585 A1</span>
              <h3>DocLingo: Multilingual Document Question Answering System</h3>
              <div className="research-meta">
                Co-inventors: A. Shukla, A. Tiwari — Mentor: Dr. N. Khare
              </div>
              <ul>
                <li>Co-invented a document-grounded RAG system for QA over digital and scanned documents (OCR), using language detection with selective translation and semantic embeddings in a vector database to answer in the user&apos;s chosen language.</li>
                <li>Designed a hybrid ML + rule-based intent classifier with a 3-tier query router — deterministic engines, specialised LLM engines, and a general-purpose LLM — cutting needless LLM calls and hallucination risk.</li>
                <li>Evaluated on 1,200+ documents: 94.2% answer groundedness at 0.85 s average latency, versus 78.5% for a dense-retrieval LLM baseline.</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CHRISTMAS LIGHTS DIVIDER ===== */}
      <ChristmasLights />

      {/* ===== EXPERIENCE SECTION ===== */}
      <section id="experience" className="section" style={{ position: 'relative' }}>
        <ScrollReveal>
          <div className="section-header">
            <span className="section-number">{t.chapterLabel} 03</span>
            <h2 className="section-title">Experience</h2>
          </div>
        </ScrollReveal>

        <div className="timeline" style={{ position: 'relative' }}>
          {/* Animated timeline wire */}
          <TimelineWire />

          <TimelineNodePop index={0}>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-date">June 2026 – July 2026</div>
              <div className="timeline-card">
                <h3>Undergraduate Intern</h3>
                <h4 className={timelineStyles.stFlicker}>Dell Technologies, Bengaluru</h4>
                <ul>
                  <li>Built an XGBoost fan-health monitoring model for Latitude laptops from fan-speed telemetry, cutting memory from 1.81 GB to 45 MB (97.5% reduction) with no loss in prediction accuracy.</li>
                  <li>Developed a C#/.NET telemetry module (WMI/WQL), optimising 15 query methods and eliminating COM-resource memory leaks over 46-minute evaluation cycles.</li>
                  <li>Worked with the diagnostics team to productionise the model and extend it to Bolan devices.</li>
                </ul>
              </div>
            </div>
          </TimelineNodePop>

          <TimelineNodePop index={1}>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-date">February 2025 – Present</div>
              <div className="timeline-card">
                <h3>Teaching Assistant</h3>
                <h4 className={timelineStyles.stFlicker}>VIT Vellore · Under Dr. Ephzibah E.P.</h4>
                <ul>
                  <li>Conducted labs for 400+ students across Python, Data Structures &amp; Algorithms, and Artificial Intelligence.</li>
                  <li>Guided debugging, algorithm design and ML/AI implementation; evaluated assignments, practical exams and projects.</li>
                </ul>
              </div>
            </div>
          </TimelineNodePop>

          <TimelineNodePop index={2}>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-date">June 2025 – August 2025</div>
              <div className="timeline-card">
                <h3>Frontend Development Intern</h3>
                <h4 className={timelineStyles.stFlicker}>Raniac (Remote)</h4>
                <ul>
                  <li>Built React.js/Next.js interfaces and reusable UI components, improving page load speed by 35%.</li>
                  <li>Collaborated in an Agile environment with Git-based version control for efficient sprint delivery.</li>
                </ul>
              </div>
            </div>
          </TimelineNodePop>

          {/* Placeholder for future experience */}
          <TimelineNodePop index={3}>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-date">{t.timelinePlaceholderDate}</div>
              <div className="timeline-card">
                <h3>{t.timelinePlaceholderTitle}</h3>
                <h4 className={timelineStyles.stFlicker}>{t.timelinePlaceholderOrg}</h4>
                <ul>
                  <li>Ready to explore new dimensions of technology and innovation.</li>
                  <li>Seeking opportunities in AI security research and trustworthy machine learning.</li>
                </ul>
              </div>
            </div>
          </TimelineNodePop>
        </div>
      </section>

      {/* ===== CHRISTMAS LIGHTS DIVIDER ===== */}
      <ChristmasLights />

      {/* ===== PROJECTS SECTION ===== */}
      <section id="projects" className="section section-with-bg">
        <div className="section-bg-image">
          <Image
            src="/images/section-texture-bg.png"
            alt=""
            fill
            style={{ objectFit: 'cover', opacity: 0.06 }}
          />
        </div>
        <ScrollReveal>
          <div className="section-header">
            <span className="section-number">{t.chapterLabel} 04</span>
            <h2 className="section-title">Projects</h2>
          </div>
        </ScrollReveal>

        <div className="projects-grid" ref={projectsGridRef}>
          {/* Project 1: Post-Quantum Biometric Evidence Screening */}
          <div className="project-card-wrapper" style={{ opacity: 0 }}>
            <TiltCard>
              <div className="project-card" style={{ borderTop: '4px solid var(--st-red)' }}>
                <span className="project-number">01</span>
                <h3><IconPortal size={22} /> Post-Quantum Biometric Evidence Screening</h3>
                <div className="project-tech">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">FastAPI</span>
                  <span className="tech-tag">PyTorch</span>
                  <span className="tech-tag">OpenCV</span>
                  <span className="tech-tag">liboqs</span>
                </div>
                <ul>
                  <li>Designed a transaction-binding protocol with NIST ML-KEM-768 and ML-DSA-65 (server-signed session offers, device-held keys, atomic single-use nonces) that rejects forged biometric submissions in 0.29 ms — before any frame is read — vs. 538 ms when models run first.</li>
                  <li>Showed attackers need 77× more forged requests than against an inference-first server; post-quantum signatures added no measurable cost.</li>
                  <li>Built a five-detector screening pipeline with per-detector vetoes; fine-tuned MiniFASNet cut CASIA-FASD EER from 44.8% to 6.3%.</li>
                </ul>
                <a
                  className="project-link"
                  href="https://github.com/adi-13-ya/AI-Based-Biometric-Evidence-Authentication-for-Post-Quantum-Digital-Identity-Systems"
                  target="_blank" rel="noopener noreferrer"
                >View on GitHub ↗</a>
              </div>
            </TiltCard>
          </div>

          {/* Project 2: Cloud Misconfiguration Detection */}
          <div className="project-card-wrapper" style={{ opacity: 0 }}>
            <TiltCard>
              <div className="project-card" style={{ borderTop: '4px solid var(--st-red)' }}>
                <span className="project-number">02</span>
                <h3><IconCloud size={22} /> Cloud Misconfiguration Detection</h3>
                <div className="project-tech">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Boto3</span>
                  <span className="tech-tag">Azure SDK</span>
                  <span className="tech-tag">scikit-fuzzy</span>
                </div>
                <ul>
                  <li>Engineered a multi-cloud security-posture tool extracting IAM, storage and network configurations across AWS and Azure.</li>
                  <li>Scored risk with a Mamdani fuzzy inference system: 18 rules over 5 inputs (public exposure, data sensitivity, encryption, access frequency, privilege scope).</li>
                  <li>Produces continuous 0–100 risk scores instead of binary checks that cause alert fatigue.</li>
                </ul>
                <a
                  className="project-link"
                  href="https://github.com/adi-13-ya/cloud-misconfiguration-detector"
                  target="_blank" rel="noopener noreferrer"
                >View on GitHub ↗</a>
              </div>
            </TiltCard>
          </div>

          {/* Project 3: Election Promise Tracker */}
          <div className="project-card-wrapper" style={{ opacity: 0 }}>
            <TiltCard>
              <div className="project-card" style={{ borderTop: '4px solid var(--st-red)' }}>
                <span className="project-number">03</span>
                <h3><IconLightning size={22} /> Election Promise Tracker</h3>
                <div className="project-tech">
                  <span className="tech-tag">PySpark</span>
                  <span className="tech-tag">FLAN-T5</span>
                  <span className="tech-tag">spaCy</span>
                  <span className="tech-tag">PostgreSQL</span>
                </div>
                <ul>
                  <li>Built a distributed PySpark pipeline with OCR pre-processing and idempotent ingestion for big-data fulfilment analytics.</li>
                  <li>A fine-tuned FLAN-T5-large extractor structured 2,400+ promises from 35+ documents.</li>
                  <li>Status classifier reached 91.5% fulfilment-matching accuracy.</li>
                </ul>
                <div className="project-achievements">
                  <div className="achievement">
                    <div className="achievement-value">2,400+</div>
                    <div className="achievement-label">Promises Extracted</div>
                  </div>
                  <div className="achievement">
                    <div className="achievement-value">91.5%</div>
                    <div className="achievement-label">Matching Accuracy</div>
                  </div>
                </div>
                <a
                  className="project-link"
                  href="https://github.com/adi-13-ya/election-promise-tracker"
                  target="_blank" rel="noopener noreferrer"
                >View on GitHub ↗</a>
              </div>
            </TiltCard>
          </div>

          {/* Project 4: ScopeWise */}
          <div className="project-card-wrapper" style={{ opacity: 0 }}>
            <TiltCard>
              <div className="project-card" style={{ borderTop: '4px solid var(--st-red)' }}>
                <span className="project-number">04</span>
                <h3><IconMind size={22} /> ScopeWise: Explainable Resume–Job Matching</h3>
                <div className="project-tech">
                  <span className="tech-tag">Sentence-BERT</span>
                  <span className="tech-tag">scikit-fuzzy</span>
                  <span className="tech-tag">LangChain</span>
                </div>
                <ul>
                  <li>Combined Sentence-BERT similarity and NER-based skill overlap (normalised to the O*NET taxonomy) in a fuzzy inference system.</li>
                  <li>Added an LLM layer for plain-language skill-gap rationales; 75.7% match accuracy on benchmark pairs.</li>
                </ul>
                <a
                  className="project-link"
                  href="https://github.com/adi-13-ya/resume-skill-gap-finder"
                  target="_blank" rel="noopener noreferrer"
                >View on GitHub ↗</a>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ===== CHRISTMAS LIGHTS DIVIDER ===== */}
      <ChristmasLights />

      {/* ===== SKILLS SECTION ===== */}
      <section id="skills" className="section">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-number">{t.chapterLabel} 05</span>
            <h2 className="section-title">Skills &amp; Powers</h2>
          </div>
        </ScrollReveal>

        {/* SkillGlobe */}
        <Suspense fallback={null}>
          <SkillGlobe skills={allSkills} />
        </Suspense>

        <div className="skills-container">
          <ScrollReveal>
            <div className="skill-category">
              <div className="skill-category-icon"><IconMind size={28} /></div>
              <h3>Machine Learning &amp; NLP</h3>
              <div className="skill-list">
                {['PyTorch', 'Hugging Face Transformers', 'LLM Fine-tuning (QLoRA)', 'RAG', 'FAISS', 'scikit-learn', 'XGBoost', 'Sentence-BERT', 'spaCy', 'OpenCV'].map((skill) => (
                  <SkillCardGlow key={skill}>
                    <span className="skill-item">{skill}</span>
                  </SkillCardGlow>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="skill-category">
              <div className="skill-category-icon"><IconGlobe size={28} /></div>
              <h3>Security &amp; Cryptography</h3>
              <div className="skill-list">
                {['Post-Quantum Crypto (ML-KEM, ML-DSA)', 'liboqs', 'HKDF', 'AES-256-GCM', 'Prompt-Injection Defense', 'Biometric Anti-Spoofing'].map((skill) => (
                  <SkillCardGlow key={skill}>
                    <span className="skill-item">{skill}</span>
                  </SkillCardGlow>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="skill-category">
              <div className="skill-category-icon"><IconTerminal size={28} /></div>
              <h3>Programming</h3>
              <div className="skill-list">
                {['Python', 'C', 'C++', 'Java', 'C#', 'SQL', 'JavaScript'].map((skill) => (
                  <SkillCardGlow key={skill}>
                    <span className="skill-item">{skill}</span>
                  </SkillCardGlow>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="skill-category">
              <div className="skill-category-icon"><IconData size={28} /></div>
              <h3>Systems &amp; Data</h3>
              <div className="skill-list">
                {['PySpark', 'PostgreSQL', 'Docker', 'AWS (EC2, S3, Lambda)', 'Git', 'FastAPI', 'React.js', 'Next.js'].map((skill) => (
                  <SkillCardGlow key={skill}>
                    <span className="skill-item">{skill}</span>
                  </SkillCardGlow>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CHRISTMAS LIGHTS DIVIDER ===== */}
      <ChristmasLights />

      {/* ===== EDUCATION SECTION ===== */}
      <section id="education" className="section section-with-bg">
        <div className="section-bg-image">
          <Image
            src="/images/upside-down-bg.png"
            alt=""
            fill
            style={{ objectFit: 'cover', opacity: 0.05 }}
          />
        </div>
        <ScrollReveal>
          <div className="section-header">
            <span className="section-number">{t.chapterLabel} 06</span>
            <h2 className="section-title">Education</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="education-card">
            <h3>Vellore Institute of Technology (VIT)</h3>
            <h4>B.Tech. in Information Technology · 2023 – 2027 (expected)</h4>
            <p style={{ color: 'var(--st-text-dim)', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <IconPin size={16} /> Vellore, Tamil Nadu
            </p>
            <div className="education-metrics">
              <div className="metric">
                <div className="metric-value">9.52</div>
                <div className="metric-label">CGPA / 10</div>
              </div>
              <div className="metric">
                <div className="metric-value">Top 2%</div>
                <div className="metric-label">Top 10 in Branch</div>
              </div>
              <div className="metric">
                <div className="metric-value">7.5</div>
                <div className="metric-label">IELTS Academic</div>
              </div>
            </div>
            <p style={{ color: 'var(--st-text-dim)', fontSize: '0.8rem', marginTop: '1.5rem', lineHeight: 1.7 }}>
              Certificate of Merit for academic excellence, 2024–25 and 2025–26. S grades in Linear
              Algebra, Discrete Mathematics, Data Structures &amp; Algorithms, Theory of Computation,
              Network &amp; Information Security, Computer Networks and Database Systems.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== CHRISTMAS LIGHTS DIVIDER ===== */}
      <ChristmasLights />

      {/* ===== ACHIEVEMENTS & LEADERSHIP SECTION ===== */}
      <section id="achievements" className="section">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-number">{t.chapterLabel} 07</span>
            <h2 className="section-title">Achievements &amp; Leadership</h2>
          </div>
        </ScrollReveal>

        <div className="achievements-list">
          <ScrollReveal>
            <div className="achievement-item">
              <span className="achievement-icon"><IconGrad size={24} /></span>
              <p><strong>Certificate of Merit, VIT (2024–25 &amp; 2025–26):</strong> awarded for academic excellence to the top performers of the programme.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="achievement-item">
              <span className="achievement-icon"><IconLightning size={24} /></span>
              <p><strong>AI &amp; Web Lead, Pravega Racing</strong> (VIT Formula Student Team): lead a team of 10 developers and designers; mentored 15 members in AI/ML through 7 workshops.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="achievement-item">
              <span className="achievement-icon"><IconDemoStar size={24} /></span>
              <p><strong>Placement Coordinator, Career Development Center, VIT:</strong> coordinated recruitment drives for 5,000+ students with 20+ recruiters including Dell, Okta, Amazon and Deloitte.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="achievement-item">
              <span className="achievement-icon"><IconScroll size={24} /></span>
              <p><strong>World Peace Envoy 2022, WCPA:</strong> recognised for leadership in promoting the Earth Constitution and raising awareness of world peace in local and remote villages.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CHRISTMAS LIGHTS DIVIDER ===== */}
      <ChristmasLights />

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="section section-with-bg" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Contact Particles — z0 */}
        <Suspense fallback={null}>
          <ContactParticles />
        </Suspense>

        <div className="section-bg-image">
          <Image
            src="/images/section-texture-bg.png"
            alt=""
            fill
            style={{ objectFit: 'cover', opacity: 0.07 }}
          />
        </div>
        <ScrollReveal>
          <div className="section-header" style={{ position: 'relative', zIndex: 1 }}>
            <span className="section-number">{t.chapterLabel} 08</span>
            <h2 className="section-title">Contact</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="contact-container" style={{ position: 'relative', zIndex: 1 }}>
            <p className="contact-text">{t.contactText}</p>

            <div className="contact-links">
              <a href="mailto:Aditya.070505@gmail.com" className="contact-link" id="contact-email">
                <span className="contact-link-icon"><IconEnvelope size={24} /></span>
                <div className="contact-link-text">
                  <div className="contact-link-label">Email</div>
                  <div className="contact-link-value">Aditya.070505@gmail.com</div>
                </div>
              </a>

              <a href="https://linkedin.com/in/adity-gujar" target="_blank" rel="noopener noreferrer" className="contact-link" id="contact-linkedin">
                <span className="contact-link-icon"><IconBriefcase size={24} /></span>
                <div className="contact-link-text">
                  <div className="contact-link-label">LinkedIn</div>
                  <div className="contact-link-value">Aditya Gujar</div>
                </div>
              </a>

              <a href="https://github.com/adi-13-ya" target="_blank" rel="noopener noreferrer" className="contact-link" id="contact-github">
                <span className="contact-link-icon"><IconDemogorgon size={24} /></span>
                <div className="contact-link-text">
                  <div className="contact-link-label">GitHub</div>
                  <div className="contact-link-value">adi-13-ya</div>
                </div>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <ChristmasLights />
        <p className="footer-text">
          <span>Aditya Gujar © 2026</span><br/><IconHeart size={16} />
        </p>
      </footer>
    </>
  );
}
