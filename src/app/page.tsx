"use client"
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import SmoothScroll from '@/components/SmoothScroll'

gsap.registerPlugin(ScrollTrigger)

// --- DATA CONFIG ---
const techLogos = [
  { name: "Python", url: "https://cdn.simpleicons.org/python/3776AB", top: "-15%", left: "-5%" },
  { name: "PyTorch", url: "https://cdn.simpleicons.org/pytorch/EE4C2C", top: "20%", left: "-15%" },
  { name: "Next.js", url: "https://cdn.simpleicons.org/nextdotjs/000000", top: "-10%", left: "105%" },
  { name: "Docker", url: "https://cdn.simpleicons.org/docker/2496ED", top: "40%", left: "110%" },
  { name: "PostgreSQL", url: "https://cdn.simpleicons.org/postgresql/4169E1", top: "105%", left: "80%" },
];

const projects = [
  {
    id: "01",
    title: 'Uni-Verse Portal',
    desc: "Developed a high-performance Full-Stack university portal solving complex IPv4-to-IPv6 networking constraints using PGBouncer session pooling.",
    tags: ["React", "PostgreSQL", "PGBouncer", "Node.js"],
    img: "/proj1.png",
    link: "https://uni-verse-99.vercel.app/"
  },
  {
    id: "02",
    title: "Vibe-Tribe",
    desc: "Social music platform combining Django streaming with ML-based recommendations using K-Means clustering.",
    tags: ["Django", "ML", "WebSockets", "React"],
    img: "/proj2.png",
    link: "#"
  },
  {
    id: "03",
    title: "Med-Vault",
    desc: "Multi-tenant SaaS for medical document storage. Implemented Retrieval-Augmented Generation (RAG) using LangChain and OpenAI.",
    tags: ["RAG", "LangChain", "OpenAI", "SaaS"],
    img: "/proj3.png",
    link: "#"
  }
];

const skillData = [
  { subject: 'AI Strategy', A: 130, fullMark: 150 },
  { subject: 'Full Stack', A: 140, fullMark: 150 },
  { subject: 'RAG / LLMs', A: 125, fullMark: 150 },
  { subject: 'ML Ops', A: 100, fullMark: 150 },
  { subject: 'Architecture', A: 110, fullMark: 150 },
];

const services = [
  { title: "Custom AI Agent", desc: "Automating workflows with specialized LLM agents and RAG pipelines." },
  { title: "Enterprise Web", desc: "Building secure, scalable SaaS architectures with modern tech stacks." },
  { title: "Cloud Strategy", desc: "Optimizing database pooling and containerized deployment." },
  { title: "Technical R&D", desc: "Rapid prototyping of complex technical concepts into MVP reality." }
];

export default function Home() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const [activeBranch, setActiveBranch] = useState('developer');

  useEffect(() => {
    // 1. PUZZLE TRANSITION
    gsap.to(".puzzle-piece", {
      scale: 1.05,
      stagger: { grid: [5, 5], from: "random", amount: 0.8 },
      scrollTrigger: {
        trigger: ".hero-trigger",
        start: "top top",
        end: "20% top",
        scrub: true,
      }
    });

    // 2. THE UNIFIED INTRO SWEEP
    const sweepTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-trigger",
        start: "25% top",
        end: "85% top",
        scrub: 1.2,
      }
    });

    sweepTl
      .fromTo(".intro-layer", { opacity: 0 }, { opacity: 1, duration: 0.1 })
      .fromTo(".moving-engine", 
        { x: "80vw", y: "80vh" },
        { x: "-80vw", y: "-80vh", ease: "none" }
      );

    // 3. HORIZONTAL PROJECT SLIDER
    const sections = gsap.utils.toArray(".project-card");
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".project-wrapper",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + horizontalRef.current?.offsetWidth,
      }
    });

    // 4. ICON IDLE FLOAT
    gsap.to(".tech-node", {
      y: "+=15",
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { amount: 1 }
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <SmoothScroll>
      <main ref={containerRef} className="relative bg-white overflow-x-hidden">
        
        {/* --- DYNAMIC HEADER (CHARLES LECLERC STYLE) --- */}
        <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-10 py-8 pointer-events-none">
          <div className="pointer-events-auto">
             <span className="text-2xl font-black italic tracking-tighter text-black mix-blend-difference">DB.23</span>
          </div>

          <div className="flex gap-8 pointer-events-auto bg-white/90 backdrop-blur-md px-6 py-3 border border-zinc-200 rounded-sm shadow-sm">
            <button 
              onClick={() => setActiveBranch('developer')}
              className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-all ${activeBranch === 'developer' ? 'text-red-600' : 'text-zinc-400 hover:text-black'}`}
            >
              KNOW THE DEVELOPER
            </button>
            <div className="w-[1px] h-4 bg-zinc-200" />
            <button 
              onClick={() => setActiveBranch('man')}
              className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-all ${activeBranch === 'man' ? 'text-red-600' : 'text-zinc-400 hover:text-black'}`}
            >
              KNOW THE MAN
            </button>
          </div>

          <div className="hidden md:block pointer-events-auto">
            <button className="text-[10px] font-bold tracking-[0.3em] uppercase text-black border-b-2 border-red-600 pb-1">
              CHAPTERS
            </button>
          </div>
        </nav>

        {/* --- STATIC CORNER UTILITY --- */}
        <div className="fixed bottom-10 right-10 z-[100] pointer-events-auto">
          <button className="w-14 h-14 bg-black text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-2xl">
            <div className="relative w-6 h-6">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white -translate-y-1/2" />
              <div className="absolute top-0 left-1/2 w-[2px] h-full bg-white -translate-x-1/2" />
            </div>
          </button>
        </div>

        {/* GRID BACKGROUND */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]" 
             style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

        <div className="hero-trigger h-[300vh] w-full" />

        {/* HERO VIDEO */}
        <div className="fixed inset-0 z-10 h-screen w-full overflow-hidden">
          <video autoPlay muted loop playsInline className="h-full w-full object-cover">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-[10vw] font-black uppercase italic tracking-tighter">Dhruv Bana</h1>
          </div>
        </div>

        {/* TRANSITION OVERLAY */}
        <div className="fixed inset-0 z-20 pointer-events-none grid grid-cols-5 grid-rows-5 h-screen w-full">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="puzzle-piece w-full h-full bg-white scale-y-0" style={{ outline: "1px solid white" }} />
          ))}
        </div>

        {/* INTRO SWEEP */}
        <div className="intro-layer opacity-0 fixed inset-0 z-30 pointer-events-none flex items-center justify-center">
          <div className="moving-engine relative w-full max-w-4xl px-6">
            <svg className="absolute inset-0 w-full h-full opacity-10 overflow-visible">
              {techLogos.map((logo, i) => (
                <line key={i} x1="50%" y1="40%" x2={logo.left} y2={logo.top} stroke="black" strokeWidth="1" />
              ))}
            </svg>

            <div className="floating-pane pointer-events-auto relative z-10 bg-white p-8 md:p-12 shadow-2xl border border-zinc-100 rounded-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12 flex items-center gap-4 border-b border-zinc-100 pb-6 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-600" />
                  <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-60">The Genesis — 01</p>
                </div>
                <div className="lg:col-span-4">
                  <img src="/dp.png" alt="Dhruv" className="w-full aspect-square object-cover shadow-lg rounded-sm" />
                </div>
                <div className="lg:col-span-8 flex flex-col justify-center">
                  <p className="text-sm md:text-base text-zinc-700 leading-relaxed font-sans">
                    I am a Computer Science student at <span className="text-black font-semibold">IKGPTU</span> with a strong interest in building <span className="text-black font-semibold">intelligent systems</span>. 
                    <br /><br />
                    Focusing on <span className="text-red-600 font-medium italic">AI-powered SaaS and RAG architectures</span>.
                  </p>
                </div>
              </div>
            </div>

            {techLogos.map((logo, i) => (
              <div key={i} className="tech-node absolute" style={{ top: logo.top, left: logo.left }}>
                <div className="w-10 h-10 md:w-16 md:h-16 bg-white p-3 rounded-full shadow-xl flex items-center justify-center border border-zinc-100">
                  <img src={logo.url} alt={logo.name} className="w-full h-full object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HORIZONTAL PROJECTS SECTION */}
        <section className="project-wrapper relative bg-[#070707] min-h-screen overflow-hidden z-40">
          <div className="absolute top-24 left-10 z-50">
            <p className="text-red-600 font-bold tracking-[0.5em] text-[10px] mb-2 uppercase">Selected Works</p>
            <h2 className="text-white text-4xl font-black italic uppercase tracking-tighter">Portfolio</h2>
          </div>

          <div ref={horizontalRef} className="flex h-screen w-[300vw] items-center">
            {projects.map((proj, i) => (
              <div key={i} className="project-card w-screen h-screen flex items-center justify-center px-10 md:px-24">
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="text-white space-y-8 order-2 lg:order-1">
                    <p className="text-red-600 font-mono text-lg mb-2">/ {proj.id}</p>
                    <h3 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">{proj.title}</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">{proj.desc}</p>
                    <a href={proj.link} target="_blank" className="inline-block text-xs font-bold tracking-widest uppercase border-b border-red-600 pb-1 pt-4 hover:text-red-600 transition-colors">
                      View Project — {">"}
                    </a>
                  </div>
                  <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden rounded-sm order-1 lg:order-2 border border-white/5">
                    <img src={proj.img} alt={proj.title} className="w-full h-full object-cover opacity-80" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ROLE DYNAMICS & SKILL MATRIX SECTION */}
        <section className="relative z-50 bg-[#070707] text-white py-32 px-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <p className="text-red-600 font-bold tracking-[0.4em] text-[10px] uppercase mb-2">Capabilities — 02</p>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Role Dynamics</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative bg-zinc-900/30 p-8 rounded-sm border border-white/5 backdrop-blur-sm h-[450px] md:h-[550px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10, fontWeight: 'bold' }} />
                    <Radar name="Dhruv" dataKey="A" stroke="#dc2626" fill="#dc2626" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-full border border-red-600 flex items-center justify-center text-red-600 font-mono text-sm shrink-0">60%</div>
                    <div>
                      <h4 className="text-xl font-bold uppercase italic tracking-tight">AI & Research (R&D)</h4>
                      <p className="text-zinc-500 text-sm mt-2">Specializing in RAG pipelines and context-aware chat systems.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-500 font-mono text-sm shrink-0">40%</div>
                    <div>
                      <h4 className="text-xl font-bold uppercase italic tracking-tight">Platform Engineering</h4>
                      <p className="text-zinc-500 text-sm mt-2">Full-stack development with a focus on high-performance infrastructure.</p>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-white/10" />

                <div>
                  <h3 className="text-red-600 font-bold uppercase text-[10px] tracking-[0.3em] mb-8">Freelance Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((s, i) => (
                      <div key={i} className="p-6 border border-white/5 bg-zinc-900/10 hover:border-red-600/50 transition-all duration-500">
                        <h5 className="font-bold text-sm uppercase mb-2 text-white">{s.title}</h5>
                        <p className="text-zinc-500 text-xs leading-relaxed">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-white py-32 px-10 text-center relative z-50">
          <p className="text-[10px] font-bold tracking-[1em] uppercase text-zinc-400 mb-8 italic">End of Line</p>
          <h2 className="text-6xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none mb-12">Let's Build</h2>
          <a href="mailto:your-email@example.com" className="px-12 py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-red-600 transition-all duration-300">
            Initiate Contact — {">"}
          </a>
        </section>
      </main>
    </SmoothScroll>
  )
}