'use client';

import Image from 'next/image';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import FloatingParticles from './components/FloatingParticles';
import SoundToggle from './components/SoundToggle';
import ChristmasLights from './components/ChristmasLights';
import ScrollReveal from './components/ScrollReveal';
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

export default function Home() {
  return (
    <>
      {/* ===== INTRO SCREEN ===== */}
      <IntroScreen />

      {/* ===== FLOATING PARTICLES ===== */}
      <FloatingParticles />

      {/* ===== NAVIGATION ===== */}
      <Navbar />

      {/* ===== SOUND TOGGLE ===== */}
      <SoundToggle />

      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="hero">
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
        <div className="hero-content">
          <div className="hero-name">
            Aditya<br />Gujar
          </div>
          <div className="hero-tagline">
            <IconLightning size={22} /> Technologist · AI Enthusiast · Builder <IconLightning size={22} />
          </div>
          <p className="hero-summary">
            Results-driven technologist ranked among the top 5 in IT at VIT, skilled in data structures,
            algorithms, and machine learning. Passionate about advancing expertise in deep learning and
            large language models to build intelligent, scalable systems.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn-stranger" onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Explore Projects
            </a>
            <a href="#contact" className="btn-stranger btn-outline" onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* ===== CHRISTMAS LIGHTS DIVIDER ===== */}
      <ChristmasLights />

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="section section-with-bg">
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
            <span className="section-number">Chapter 01</span>
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
              <h3>Into the Upside Down</h3>
              <p>
                Like Eleven navigating between dimensions, I bridge the gap between complex problems
                and elegant solutions. I&apos;m a B.Tech student at VIT with a passion for building
                intelligent systems that push boundaries.
              </p>
              <p>
                My journey through the world of technology has equipped me with expertise in AI/ML, deep learning,
                and full-stack development. I thrive on transforming raw data into meaningful insights and
                building applications that make a real-world impact.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-value">9.51</span>
                  <span className="stat-label">CGPA</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">Top 5</span>
                  <span className="stat-label">IT Ranker</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">3+</span>
                  <span className="stat-label">Projects</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CHRISTMAS LIGHTS DIVIDER ===== */}
      <ChristmasLights />

      {/* ===== EXPERIENCE SECTION ===== */}
      <section id="experience" className="section">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-number">Chapter 02</span>
            <h2 className="section-title">Experience</h2>
          </div>
        </ScrollReveal>

        <div className="timeline">
          <ScrollReveal>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-date">June 2025 – August 2025</div>
              <div className="timeline-card">
                <h3>Frontend Development Intern</h3>
                <h4>Raniac (Remote)</h4>
                <ul>
                  <li>Developed and deployed responsive web interfaces using React.js, Next.js, and Tailwind CSS, improving load speed by 35%.</li>
                  <li>Built reusable UI components and applied modular design patterns, cutting code redundancy.</li>
                  <li>Created interactive dashboards with real-time visualization via REST APIs and WebSockets, enhancing user engagement.</li>
                  <li>Collaborated in an Agile environment with Git-based version control for efficient sprint delivery.</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Placeholder for future experience */}
          <ScrollReveal>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-date">Your Next Adventure Awaits</div>
              <div className="timeline-card">
                <h3>The Gate Is Open...</h3>
                <h4>The Upside Down</h4>
                <ul>
                  <li>Ready to explore new dimensions of technology and innovation.</li>
                  <li>Seeking opportunities to build intelligent systems that bridge worlds.</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
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
            <span className="section-number">Chapter 03</span>
            <h2 className="section-title">Projects</h2>
          </div>
        </ScrollReveal>

        <div className="projects-grid">
          {/* Project 1: DocLingo */}
          <ScrollReveal>
            <div className="project-card">
              <span className="project-number">01</span>
              <h3><IconPortal size={22} /> DocLingo: Intelligent Multilingual Document Reasoning System</h3>
              <div className="project-tech">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">FAISS</span>
                <span className="tech-tag">LLMs</span>
                <span className="tech-tag">NLP</span>
                <span className="tech-tag">OCR</span>
              </div>
              <ul>
                <li>Built a modular RAG pipeline for multilingual document question answering with OCR-based text extraction and semantic search.</li>
                <li>Implemented intent-based routing to specialized LLM engines with FAISS vector indexing for accurate context retrieval.</li>
                <li>Designed an adaptive decision engine with dynamic retrieval depth and adaptive translation strategies.</li>
                <li>Added explicit language control, explainability, confidence scoring, and feedback-driven optimization.</li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Project 2: Credit Card Fraud Detection */}
          <ScrollReveal>
            <div className="project-card">
              <span className="project-number">02</span>
              <h3><IconLightning size={22} /> Credit Card Fraud Detection</h3>
              <div className="project-tech">
                <span className="tech-tag">Deep Learning</span>
                <span className="tech-tag">TensorFlow</span>
                <span className="tech-tag">Keras</span>
                <span className="tech-tag">Python</span>
              </div>
              <ul>
                <li>Built and optimized a deep learning classification model on an imbalanced financial dataset.</li>
                <li>Implemented data preprocessing, feature scaling, class weighting, and early stopping.</li>
                <li>Conducted evaluation via ROC-AUC, confusion matrix, and Precision-Recall analysis.</li>
              </ul>
              <div className="project-achievements">
                <div className="achievement">
                  <div className="achievement-value">98.7%</div>
                  <div className="achievement-label">Accuracy</div>
                </div>
                <div className="achievement">
                  <div className="achievement-value">99.5%</div>
                  <div className="achievement-label">F1 Score</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Project 3: Plant Species Detection */}
          <ScrollReveal>
            <div className="project-card">
              <span className="project-number">03</span>
              <h3><IconMind size={22} /> Plant Species Detection Platform</h3>
              <div className="project-tech">
                <span className="tech-tag">Computer Vision</span>
                <span className="tech-tag">PyTorch</span>
              </div>
              <ul>
                <li>Developed a CNN-based image classification model to identify plant species from 14K+ leaf images.</li>
                <li>Applied data augmentation, normalization, and transfer learning to improve model generalization.</li>
                <li>Implemented model inference pipeline for image upload and prediction with clear class confidence outputs.</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CHRISTMAS LIGHTS DIVIDER ===== */}
      <ChristmasLights />

      {/* ===== SKILLS SECTION ===== */}
      <section id="skills" className="section">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-number">Chapter 04</span>
            <h2 className="section-title">Skills & Powers</h2>
          </div>
        </ScrollReveal>

        <div className="skills-container">
          <ScrollReveal>
            <div className="skill-category">
              <div className="skill-category-icon"><IconTerminal size={28} /></div>
              <h3>Programming Languages</h3>
              <div className="skill-list">
                {['Python', 'C', 'C++', 'JavaScript', 'SQL', 'Julia'].map((skill) => (
                  <span key={skill} className="skill-item">{skill}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="skill-category">
              <div className="skill-category-icon"><IconMind size={28} /></div>
              <h3>AI & Machine Learning</h3>
              <div className="skill-list">
                {['Deep Learning', 'Neural Networks', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Computer Vision', 'NLP', 'RAG', 'LangChain', 'Prompt Engineering'].map((skill) => (
                  <span key={skill} className="skill-item">{skill}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="skill-category">
              <div className="skill-category-icon"><IconData size={28} /></div>
              <h3>Data Science & Analytics</h3>
              <div className="skill-list">
                {['NumPy', 'Pandas', 'Matplotlib', 'Sentence Transformers', 'OpenAI Embeddings', 'Vector Databases', 'OCR (Tesseract)'].map((skill) => (
                  <span key={skill} className="skill-item">{skill}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="skill-category">
              <div className="skill-category-icon"><IconGlobe size={28} /></div>
              <h3>Web Development</h3>
              <div className="skill-list">
                {['React.js', 'Next.js', 'Tailwind CSS', 'HTML/CSS', 'Bootstrap', 'RESTful APIs'].map((skill) => (
                  <span key={skill} className="skill-item">{skill}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="skill-category">
              <div className="skill-category-icon"><IconCloud size={28} /></div>
              <h3>Cloud & Tools</h3>
              <div className="skill-list">
                {['Git', 'GitHub', 'AWS', 'VS Code', 'Jupyter Notebooks', 'Agile Methodologies'].map((skill) => (
                  <span key={skill} className="skill-item">{skill}</span>
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
            <span className="section-number">Chapter 05</span>
            <h2 className="section-title">Education</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="education-card">
            <h3>Vellore Institute of Technology (VIT)</h3>
            <h4>Bachelor of Technology in Information Technology</h4>
            <p style={{ color: 'var(--st-text-dim)', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <IconPin size={16} /> Vellore, Tamil Nadu
            </p>
            <div className="education-metrics">
              <div className="metric">
                <div className="metric-value">9.51</div>
                <div className="metric-label">CGPA / 10</div>
              </div>
              <div className="metric">
                <div className="metric-value">Top 5</div>
                <div className="metric-label">Ranker in IT</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== CHRISTMAS LIGHTS DIVIDER ===== */}
      <ChristmasLights />

      {/* ===== ACHIEVEMENTS SECTION ===== */}
      <section id="achievements" className="section">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-number">Chapter 06</span>
            <h2 className="section-title">Achievements & Certifications</h2>
          </div>
        </ScrollReveal>

        <div className="achievements-list">
          <ScrollReveal>
            <div className="achievement-item">
              <span className="achievement-icon"><IconDemoStar size={24} /></span>
              <p>Placement Coordinator, PAT Committee: Led recruitment drives for 500+ students.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="achievement-item">
              <span className="achievement-icon"><IconGrad size={24} /></span>
              <p>Machine Learning Specialization - DeepLearning.AI, Stanford University.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="achievement-item">
              <span className="achievement-icon"><IconScroll size={24} /></span>
              <p>Certified in Fundamentals of Generative AI - IBM Skills Network.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CHRISTMAS LIGHTS DIVIDER ===== */}
      <ChristmasLights />

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="section section-with-bg">
        <div className="section-bg-image">
          <Image
            src="/images/section-texture-bg.png"
            alt=""
            fill
            style={{ objectFit: 'cover', opacity: 0.07 }}
          />
        </div>
        <ScrollReveal>
          <div className="section-header">
            <span className="section-number">Chapter 07</span>
            <h2 className="section-title">Contact</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="contact-container">
            <p className="contact-text">
              Ready to fight the Demogorgon together? Whether you have a project idea,
              an opportunity, or just want to connect — the gate between our worlds is always open.
            </p>

            <div className="contact-links">
              <a href="mailto:Aditya.07050@gmail.com" className="contact-link" id="contact-email">
                <span className="contact-link-icon"><IconEnvelope size={24} /></span>
                <div className="contact-link-text">
                  <div className="contact-link-label">Email</div>
                  <div className="contact-link-value">Aditya.07050@gmail.com</div>
                </div>
              </a>

              <a href="https://linkedin.com/in/aditya-gujar-683399220" target="_blank" rel="noopener noreferrer" className="contact-link" id="contact-linkedin">
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
