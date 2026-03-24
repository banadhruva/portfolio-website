"use client"
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import { Linkedin, Github, Youtube, Mail, Pin, Play, X } from 'lucide-react'
import SmoothScroll from '@/components/SmoothScroll'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

const projects = [
  { id: "01", title: 'Uni-Verse Portal', desc: "High-performance Full-Stack university portal with PGBouncer session pooling.", img: "/proj1.png", link: "https://github.com/banadhruva/UNI-verse" },
  { id: "02", title: "Vibe-Tribe", desc: "Social music platform with ML-based recommendations and WebSockets.", img: "/proj2.png", link: "https://github.com/banadhruva/Vibe-Tribe" },
  { id: "03", title: "Med-Vault", desc: "Multi-tenant SaaS for medical document storage using LangChain RAG.", img: "/proj3.png", link: "https://github.com/banadhruva/Med-Vault" }
];

const skillData = [
  { subject: 'AI Strategy', A: 130 },
  { subject: 'Full Stack', A: 140 },
  { subject: 'RAG / LLMs', A: 125 },
  { subject: 'ML Ops', A: 100 },
  { subject: 'Architecture', A: 110 },
];

const services = [
  { title: "Custom AI Agent", desc: "Automating workflows with specialized LLM agents." },
  { title: "Enterprise Web", desc: "Building secure, scalable SaaS architectures." },
  { title: "Cloud Strategy", desc: "Optimizing database pooling and deployments." },
  { title: "Technical R&D", desc: "Prototyping complex technical concepts into reality." }
];

const experiences = [
  {
    id: "01",
    role: "Intern",
    org: "DRDO-SAG",
    period: "2025 — Present",
    location: "New Delhi, India",
    tags: ["Cryptography", "Software Development", "Defence R&D"],
    desc: "Working at the Scientific Analysis Group under the Defence Research and Development Organisation. Contributing to applied research in secure communications and cryptographic systems for defence applications.",
    highlight: true,
  },
  {
    id: "02",
    role: "Full Stack Developer",
    org: "Freelance",
    period: "2024 — Present",
    location: "Remote",
    tags: ["Next.js", "AI/ML", "SaaS"],
    desc: "Designing and shipping end-to-end production systems — from ML pipelines to cloud-deployed web platforms.",
    highlight: false,
  },
  {
    id: "03",
    role: "ML Intern",
    org: "MedTourEasy",
    period: "Jun 2023 — Jan 2024",
    location: "Remote",
    tags: ["ML Algos", "LLMs", "Feature Engineering"],
    desc: " Engineered a Machine Learning pipeline for PII (Personally Identifiable Information) extraction from unstructured text",
    highlight: false,
  },
];

const stats = [
  { value: 15, suffix: "+", label: "Projects Shipped" },
  { value: 1, suffix: "", label: "Defence Research Org" },
  { value: 21, suffix: ".1KM", label: "Half Marathon" },
  { value: 4, suffix: "", label: "Awards & Honours" },
];

const personalAchievements = [
  { title: "First Half Marathon", stat: "21.1 KM", desc: "A test of mental endurance and physical limit pushing.", img: "/marathon.jpg", category: "Endurance" },
  { title: "Contingent Commander", stat: "COMMAND", desc: "Discipline and precision leading the Jalandhar Grp Contingent at IGC-RDC", img: "/ncc.jpg", category: "Leadership" },
  { title: "Best Cadet Award", stat: "GOLD", desc: "Awarded for excellence in drill, theory, and character.", img: "/cadet.jpg", category: "Excellence" },
  { title: "Cultural Performance", stat: "GUITAR", desc: "Musical Duet Performance at Inter College Cultural Fest", img: "/guitar.jpg", category: "Creative" }
];

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/dhruv-bana/", icon: Linkedin },
  { name: "GitHub", url: "https://github.com/banadhruva", icon: Github },
  { name: "YouTube", url: "https://youtu.be/TPa-T2sFLfo?si=XBwPt5KA5Q8YnErM", icon: Youtube },
  { name: "Pinterest", url: "https://in.pinterest.com/bana_dhruva/", icon: Pin },
  { name: "Email", url: "mailto:banad972@gmail.com", icon: Mail },
];

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.floor(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── PAGE TRANSITION OVERLAY ─────────────────────────────────────────────────
function PageTransition({ isTransitioning }: { isTransitioning: boolean }) {
  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        background: "#dc2626",
        transform: isTransitioning ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: isTransitioning ? "bottom" : "top",
        transition: "transform 0.55s cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    />
  );
}

// ─── EXPERIENCE TIMELINE SECTION ─────────────────────────────────────────────
function ExperienceSection() {
  return (
    <section id="experience-sec" className="relative z-50 bg-[#070707] py-32 px-6 md:px-10 border-t border-white/5 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-red-600 font-bold tracking-[0.5em] text-[10px] mb-2 uppercase italic">Chapter 02.5</p>
          <h2 className="text-6xl font-black italic uppercase tracking-tighter">EXPERIENCE</h2>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
          <div className="flex flex-col gap-0">
            {experiences.map((exp, i) => (
              <div key={i} className="group relative md:pl-10 py-10 border-b border-white/5 last:border-0">
                <div className={`absolute left-[-4px] top-12 w-2 h-2 rounded-full hidden md:block transition-colors duration-300 ${exp.highlight ? "bg-red-600" : "bg-zinc-600 group-hover:bg-red-600"}`} />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-2">
                    <p className="text-red-600 font-mono text-sm mb-1">/ {exp.id}</p>
                    <p className="text-zinc-500 text-[10px] tracking-widest uppercase">{exp.period}</p>
                    <p className="text-zinc-600 text-[9px] tracking-widest uppercase mt-1">{exp.location}</p>
                  </div>
                  <div className="md:col-span-7">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter group-hover:text-red-600 transition-colors duration-300">
                        {exp.role}
                      </h3>
                      {exp.highlight && (
                        <span className="text-[8px] font-black uppercase tracking-widest bg-red-600 text-white px-2 py-0.5 italic">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-400 text-sm font-bold tracking-widest uppercase mb-4">{exp.org}</p>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">{exp.desc}</p>
                  </div>
                  <div className="md:col-span-3 flex flex-wrap gap-2 md:justify-end">
                    {exp.tags.map((tag, t) => (
                      <span key={t} className="text-[9px] font-black uppercase tracking-widest border border-white/10 px-3 py-1.5 group-hover:border-red-600/50 transition-colors duration-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [activeBranch, setActiveBranch] = useState('developer');
  const [isChapterOpen, setIsChapterOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const switchBranch = (branch: string) => {
    if (branch === activeBranch) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveBranch(branch);
      window.scrollTo({ top: 0 });
      setTimeout(() => setIsTransitioning(false), 600);
    }, 400);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (activeBranch === 'developer') {
        gsap.to(".puzzle-piece", {
          scale: 1.05,
          stagger: { grid: [5, 5], from: "random", amount: 0.8 },
          scrollTrigger: { trigger: ".hero-trigger", start: "top top", end: "20% top", scrub: true }
        });

        gsap.timeline({
          scrollTrigger: { trigger: ".hero-trigger", start: "25% top", end: "85% top", scrub: 1.2 }
        })
        .fromTo(".intro-layer", { opacity: 0 }, { opacity: 1, duration: 0.1 })
        .fromTo(".moving-engine", { x: "80vw", y: "80vh" }, { x: "-80vw", y: "-80vh", ease: "none" });

        const sections = gsap.utils.toArray(".project-card");
        if (sections.length > 0) {
          gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: ".project-wrapper",
              pin: true,
              scrub: 1,
              end: () => "+=" + ((horizontalRef.current as HTMLDivElement)?.offsetWidth || 2000),
            }
          });
        }
      }

      if (activeBranch === 'man') {
        gsap.fromTo(".man-card",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".achievements-grid", start: "top 75%" }
          }
        );
      }
    });

    return () => ctx.revert();
  }, [activeBranch]);

  const scrollToAnchor = (id: string) => {
    setIsChapterOpen(false);
    gsap.to(window, { duration: 1.5, scrollTo: id, ease: "power4.inOut" });
  };

  return (
    <SmoothScroll>
      <PageTransition isTransitioning={isTransitioning} />

      <main ref={containerRef} className="relative bg-white overflow-x-hidden min-h-screen">

        {/* --- NAVIGATION --- */}
        <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 md:px-10 py-8 pointer-events-none">
          <div className="pointer-events-auto cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-2xl font-black italic tracking-tighter text-black mix-blend-difference">DB.23</span>
          </div>

          <div className="flex gap-4 md:gap-8 pointer-events-auto bg-white/90 backdrop-blur-md px-4 md:px-6 py-3 border border-zinc-200 rounded-sm shadow-sm">
            <button
              onClick={() => switchBranch('developer')}
              className={`text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase transition-all ${activeBranch === 'developer' ? 'text-red-600 underline underline-offset-8' : 'text-zinc-400 hover:text-black'}`}
            >
              MEET THE DEVELOPER
            </button>
            <div className="w-[1px] h-4 bg-zinc-200" />
            <button
              onClick={() => switchBranch('man')}
              className={`text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase transition-all ${activeBranch === 'man' ? 'text-red-600 underline underline-offset-8' : 'text-zinc-400 hover:text-black'}`}
            >
              MEET THE MAN
            </button>
          </div>

          <div className="hidden md:flex gap-5 pointer-events-auto relative items-center">
            <button onClick={() => setIsChapterOpen(true)} className="text-[10px] font-bold tracking-[0.3em] uppercase text-black border-b-2 border-red-600 pb-1">
              CHAPTERS
            </button>
            <button onClick={() => scrollToAnchor('#footer')} className="text-[10px] font-bold tracking-[0.3em] uppercase bg-black text-white px-5 py-2.5 hover:bg-red-600 transition-all rounded-sm">
              LET'S CONNECT
            </button>
          </div>
        </nav>

        {/* --- CHAPTERS OVERLAY --- */}
        {isChapterOpen && (
          <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-10 animate-in fade-in duration-300">
            <button onClick={() => setIsChapterOpen(false)} className="absolute top-10 right-10 text-white hover:text-red-600 transition-colors">
              <X size={40} strokeWidth={1} />
            </button>
            <div className="flex flex-col gap-8 text-center">
              <p className="text-red-600 font-bold tracking-[0.5em] uppercase text-[10px]">Navigation</p>
              {activeBranch === 'developer' ? (
                <>
                  <button onClick={() => scrollToAnchor('#genesis-sec')} className="text-4xl md:text-7xl font-black italic text-white uppercase hover:text-red-600 transition-colors tracking-tighter">01. Genesis</button>
                  <button onClick={() => scrollToAnchor('#portfolio')} className="text-4xl md:text-7xl font-black italic text-white uppercase hover:text-red-600 transition-colors tracking-tighter">02. Portfolio</button>
                  <button onClick={() => scrollToAnchor('#experience-sec')} className="text-4xl md:text-7xl font-black italic text-white uppercase hover:text-red-600 transition-colors tracking-tighter">03. Experience</button>
                  <button onClick={() => scrollToAnchor('#services-sec')} className="text-4xl md:text-7xl font-black italic text-white uppercase hover:text-red-600 transition-colors tracking-tighter">04. Services</button>
                </>
              ) : (
                <>
                  <button onClick={() => { setIsChapterOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="text-4xl md:text-7xl font-black italic text-white uppercase hover:text-red-600 transition-colors tracking-tighter">Top</button>
                  <button onClick={() => scrollToAnchor('#footer')} className="text-4xl md:text-7xl font-black italic text-white uppercase hover:text-red-600 transition-colors tracking-tighter">Contact</button>
                </>
              )}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/*  DEVELOPER BRANCH                                                   */}
        {/* ================================================================== */}
        {activeBranch === 'developer' && (
          <div key="dev-branch">
            <div id="genesis-sec" className="hero-trigger h-[300vh] w-full" />

            <div className="fixed inset-0 z-10 h-screen w-full overflow-hidden">
              <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                <source src="https://res.cloudinary.com/daookjsaa/video/upload/v1769755425/hero-video_e6rtqt.mp4" />
              </video>
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h1 className="text-[10vw] font-black uppercase italic tracking-tighter leading-none">Dhruv Bana</h1>
                <div className="mt-3 flex items-center gap-2 border border-red-600/40 bg-red-600/10 px-4 py-1.5 rounded-sm backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-red-400">Intern · DRDO SAG</span>
                </div>
                <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-red-500 mt-4 mb-2">architecting intelligence</p>
                <div className="mt-4 flex gap-3 text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-zinc-400 font-medium">
                  {services.map((s, idx) => (
                    <span key={idx}>{s.title} {idx < services.length - 1 && "•"}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="fixed inset-0 z-20 pointer-events-none grid grid-cols-5 grid-rows-5 h-screen w-full">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="puzzle-piece w-full h-full bg-white scale-y-0" style={{ outline: "1px solid white" }} />
              ))}
            </div>

            {/* --- GENESIS PANE --- */}
            <div className="intro-layer opacity-0 fixed inset-0 z-30 pointer-events-none flex items-center justify-center">
              <div className="moving-engine relative w-full max-w-4xl px-6">
                <div className="floating-pane pointer-events-auto relative z-10 overflow-hidden rounded-sm shadow-2xl">
                  <div className="grid min-h-[340px]" style={{ gridTemplateColumns: "44px 200px 1fr" }}>

                    {/* COL 1 — red accent strip */}
                    <div className="bg-red-600 flex items-center justify-center">
                      <span
                        className="text-white text-[8px] font-black uppercase tracking-[0.35em] select-none"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        Genesis — 01
                      </span>
                    </div>

                    {/* COL 2 — photo */}
                    <div className="relative bg-zinc-100 overflow-hidden">
                      <img
                        src="/dp.png"
                        alt="Dhruv"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 z-10">
                        <span className="text-white text-[8px] font-black uppercase tracking-[0.2em] italic">DB.23</span>
                      </div>
                    </div>

                    {/* COL 3 — content */}
                    <div className="bg-white flex flex-col justify-between p-8 border-l border-zinc-100">
                      <div className="flex items-center gap-3 border-b border-zinc-100 pb-5 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                        <span className="text-[9px] font-bold tracking-[0.5em] uppercase text-zinc-400">Dhruv Bana</span>
                      </div>

                      <div className="flex flex-col gap-4 flex-1">
                        <p className="text-[12px] text-zinc-500 leading-[1.85] tracking-wide">
                          I am a Computer Science student at{" "}
                          <span className="text-black font-semibold">IK Gujral Punjab Technical University</span>{" "}
                          and currently an Intern at{" "}
                          <span className="text-red-600 font-semibold">DRDO's Scientific Analysis Group (SAG)</span>.
                          My work at SAG focuses on applied cryptography and developing secure communication systems for critical defense applications.
                        </p>
                        <p className="text-[12px] text-zinc-500 leading-[1.85] tracking-wide">
                          Beyond security, I specialize in the intersection of machine learning, AI-driven applications, and production-ready web architectures. Passionate about engineering end-to-end products — transforming complex data and models into secure, scalable, and cloud-deployed platforms.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-zinc-100">
                        {["Cryptography", "Full Stack", "ML / AI", "Defence R&D", "Cloud Arch"].map((tag, i) => (
                          <span
                            key={i}
                            className="text-[8px] font-bold uppercase tracking-[0.15em] text-zinc-400 border border-zinc-200 px-3 py-1.5 hover:border-red-600 hover:text-red-600 transition-colors duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* --- PROJECTS HORIZONTAL SCROLL --- */}
            <section id="portfolio" className="project-wrapper relative bg-[#070707] min-h-screen overflow-hidden z-40">
              <div ref={horizontalRef} className="flex h-screen w-[300vw] items-center">
                {projects.map((proj, i) => (
                  <div key={i} className="project-card w-screen h-screen flex items-center justify-center px-10">
                    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                      <div className="text-white space-y-8 text-left">
                        <p className="text-red-600 font-mono text-lg mb-2">/ {proj.id}</p>
                        <h3 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">{proj.title}</h3>
                        <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">{proj.desc}</p>
                        <a href={proj.link} target="_blank" className="inline-block text-xs font-bold tracking-widest uppercase border-b border-red-600 pb-1 pt-4 hover:text-red-600 transition-colors">Launch System — {">"}</a>
                      </div>
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-sm blur opacity-20 group-hover:opacity-60 transition duration-1000"></div>
                        <div className="relative aspect-video w-full bg-black border border-white/10 overflow-hidden rounded-sm flex items-center justify-center">
                          <img src={proj.img} alt={proj.title} className="max-w-full max-h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* --- EXPERIENCE TIMELINE --- */}
            <div className="relative z-50">
              <ExperienceSection />
            </div>

            
            {/* --- SERVICES --- */}
            <section id="services-sec" className="relative z-50 bg-white py-32 px-10 border-t border-zinc-100 text-left">
              <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                  <p className="text-red-600 font-bold tracking-[0.5em] text-[10px] mb-2 uppercase italic">Chapter 04</p>
                  <h2 className="text-black text-6xl font-black italic uppercase tracking-tighter">SERVICES I OFFER</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="h-[450px] bg-zinc-50 p-8 rounded-sm border border-zinc-100">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                        <PolarGrid stroke="#e4e4e7" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#000', fontSize: 10, fontWeight: 'bold' }} />
                        <Radar name="Dhruv" dataKey="A" stroke="#dc2626" fill="#dc2626" fillOpacity={0.5} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((s, i) => (
                      <div key={i} className="p-8 border border-zinc-100 bg-white hover:border-red-600 transition-all duration-500 shadow-sm group">
                        <h5 className="font-black italic text-xl uppercase mb-3 group-hover:text-red-600 transition-colors">{s.title}</h5>
                        <p className="text-zinc-500 text-[10px] tracking-widest leading-relaxed uppercase">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================================================================== */}
        {/*  MAN BRANCH                                                         */}
        {/* ================================================================== */}
        {activeBranch === 'man' && (
          <div key="man-branch" className="bg-[#070707] min-h-screen text-white">
            <section className="h-screen w-full relative overflow-hidden flex items-end p-10 md:p-20">
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover grayscale-[40%] brightness-50">
                <source src="https://res.cloudinary.com/daookjsaa/video/upload/v1769703203/solo-hike_nlfzoi.mp4" type="video/mp4" />
              </video>
              <div className="relative z-10 w-full">
                <p className="text-red-600 font-bold tracking-[0.5em] text-[15px] uppercase mb-4">Behind the screen</p>
                <h2 className="text-7xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-[0.8]">Man on a Mission</h2>
                <div className="mt-12 h-px w-full bg-white/10" />
              </div>
            </section>


            <section className="achievements-grid py-32 px-6 md:px-10 max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                {personalAchievements.map((item, i) => (
                  <div key={i} className={`man-card group relative overflow-hidden rounded-sm border border-white/5 bg-zinc-900/50 ${i % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4'} ${i === 1 ? 'md:row-span-2' : 'aspect-square md:aspect-video'}`}>
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-left">
                      <span className="text-red-600 font-black text-[9px] tracking-[0.3em] uppercase mb-2 block">{item.category}</span>
                      <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2">{item.title}</h3>
                      <p className="text-zinc-400 text-[10px] uppercase tracking-widest leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-24 px-6 md:px-10 max-w-[1400px] mx-auto border-t border-white/5">
              <div className="mb-12 text-left">
                <p className="text-red-600 font-black text-[10px] tracking-[0.5em] uppercase mb-4 italic">Film & Adventure</p>
                <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">My First Solo Trek</h2>
              </div>
              <a href="https://youtu.be/TPa-T2sFLfo?si=XBwPt5KA5Q8YnErM" target="_blank" className="group relative block w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-sm border border-white/10 bg-black">
                <img src="/trek-thumb.jpg" alt="Trek" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-0 transition-opacity duration-700 grayscale group-hover:grayscale-0" />
                <video muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                  <source src="/solo-hike.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                    <Play className="text-white fill-white ml-1" size={32} />
                  </div>
                </div>
                <div className="absolute bottom-8 left-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  <span className="bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 italic">Watch Experience</span>
                  <p className="text-white text-xs tracking-widest uppercase font-medium">Kheerganga, HP — 2024</p>
                </div>
              </a>
            </section>
          </div>
        )}

        {/* --- CONTACT FOOTER --- */}
        <section id="footer" className={`py-32 px-10 text-center relative z-50 ${activeBranch === 'man' ? 'bg-black text-white border-t border-white/10' : 'bg-white text-black border-t border-zinc-100'}`}>
          <h2 className="text-6xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none mb-16">Let's Connect</h2>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 mb-20">
            {socialLinks.map((link, i) => {
              const IconComponent = link.icon;
              return (
                <a key={i} href={link.url} target="_blank" className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-3 duration-500">
                  <div className={`w-20 h-20 flex items-center justify-center border-2 rounded-2xl shadow-sm transition-all duration-300 ${activeBranch === 'man' ? 'border-white/10 group-hover:border-red-600 group-hover:bg-red-600/5' : 'border-zinc-100 group-hover:border-red-600 group-hover:bg-red-600/5'}`}>
                    <IconComponent className="transition-all duration-300 group-hover:scale-110 group-hover:text-red-600" size={32} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{link.name}</span>
                </a>
              )
            })}
          </div>
          <a href="mailto:banad972@gmail.com" className="inline-block px-16 py-6 bg-red-600 text-white text-[11px] font-black uppercase tracking-[0.5em] hover:bg-black transition-all duration-300 shadow-2xl rounded-sm">
            Initiate Contact — {">"}
          </a>
        </section>

      </main>
    </SmoothScroll>
  )
}
