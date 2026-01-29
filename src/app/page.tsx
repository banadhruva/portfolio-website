"use client"
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import { Linkedin, Github, Youtube, Mail, Pin, Play, X } from 'lucide-react' 
import SmoothScroll from '@/components/SmoothScroll'

// Register GSAP Plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

// --- DATA CONFIG: DEVELOPER ---
const projects = [
  { id: "01", title: 'Uni-Verse Portal', desc: "High-performance Full-Stack university portal with PGBouncer session pooling.", img: "/proj1.png", link: "https://uni-verse-99.vercel.app/" },
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

// --- DATA CONFIG: THE MAN ---
const personalAchievements = [
  { title: "First Half Marathon", stat: "21.1 KM", desc: "A test of mental endurance and physical limit pushing.", img: "/marathon.jpg", category: "Endurance" },
  { title: "Contingent Commander", stat: "COMMAND", desc: "Discipline and precision leading the Jalandhar Grp Contingent at IGC-RDC", img: "/ncc.jpg", category: "Leadership" },
  { title: "Best Cadet Award", stat: "GOLD", desc: "Awarded for excellence in drill, theory, and character.", img: "/cadet.jpg", category: "Excellence" },
  { title: "Cultural Performance", stat: "GUITAR", desc: "Musical Duet Performance at Inter College Cultural Fest", img: "/guitar.jpg", category: "Creative" }
];

// --- DATA CONFIG: SOCIALS ---
const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/dhruv-bana/", icon: Linkedin },
  { name: "GitHub", url: "https://github.com/banadhruva", icon: Github },
  { name: "YouTube", url: "https://youtu.be/TPa-T2sFLfo?si=XBwPt5KA5Q8YnErM", icon: Youtube },
  { name: "Pinterest", url: "https://in.pinterest.com/bana_dhruva/", icon: Pin },
  { name: "Email", url: "mailto:banad972@gmail.com", icon: Mail },
];

export default function Home() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const [activeBranch, setActiveBranch] = useState('developer');
  const [isChapterOpen, setIsChapterOpen] = useState(false);

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
              end: () => "+=" + (horizontalRef.current?.offsetWidth || 2000),
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
      <main ref={containerRef} className="relative bg-white overflow-x-hidden min-h-screen">
        
        {/* --- NAVIGATION --- */}
        <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 md:px-10 py-8 pointer-events-none">
          <div className="pointer-events-auto cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
             <span className="text-2xl font-black italic tracking-tighter text-black mix-blend-difference">DB.23</span>
          </div>

          <div className="flex gap-4 md:gap-8 pointer-events-auto bg-white/90 backdrop-blur-md px-4 md:px-6 py-3 border border-zinc-200 rounded-sm shadow-sm">
            <button onClick={() => setActiveBranch('developer')} className={`text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase transition-all ${activeBranch === 'developer' ? 'text-red-600 underline underline-offset-8' : 'text-zinc-400 hover:text-black'}`}>MEET THE DEVELOPER</button>
            <div className="w-[1px] h-4 bg-zinc-200" />
            <button onClick={() => setActiveBranch('man')} className={`text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase transition-all ${activeBranch === 'man' ? 'text-red-600 underline underline-offset-8' : 'text-zinc-400 hover:text-black'}`}>MEET THE MAN</button>
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

        {/* --- CHAPTERS OVERLAY (STRICT OVERLAY FIX) --- */}
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
                  <button onClick={() => scrollToAnchor('#services-sec')} className="text-4xl md:text-7xl font-black italic text-white uppercase hover:text-red-600 transition-colors tracking-tighter">03. Services</button>
                </>
              ) : (
                <>
                  <button onClick={() => { setIsChapterOpen(false); window.scrollTo({top:0, behavior:'smooth'}) }} className="text-4xl md:text-7xl font-black italic text-white uppercase hover:text-red-600 transition-colors tracking-tighter">Top</button>
                  <button onClick={() => scrollToAnchor('#footer')} className="text-4xl md:text-7xl font-black italic text-white uppercase hover:text-red-600 transition-colors tracking-tighter">Contact</button>
                </>
              )}
            </div>
          </div>
        )}

        {/* --- DEVELOPER BRANCH --- */}
        {activeBranch === 'developer' && (
          <div key="dev-branch">
            <div id="genesis-sec" className="hero-trigger h-[300vh] w-full" />
            
            <div className="fixed inset-0 z-10 h-screen w-full overflow-hidden">
              <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h1 className="text-[10vw] font-black uppercase italic tracking-tighter leading-none">Dhruv Bana</h1>
                <p className="text-[10px] md:text-xs font-bold tracking-[0.6em] uppercase text-red-500 mt-4 mb-2">architecting intelligence</p>
                <div className="flex gap-3 text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-zinc-400 font-medium">
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

            <div className="intro-layer opacity-0 fixed inset-0 z-30 pointer-events-none flex items-center justify-center">
              <div className="moving-engine relative w-full max-w-4xl px-6">
                <div className="floating-pane pointer-events-auto relative z-10 bg-white p-8 md:p-12 shadow-2xl border border-zinc-100 rounded-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                    <div className="lg:col-span-12 flex items-center gap-4 border-b border-zinc-100 pb-6 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-600" />
                      <p className="text-xs font-bold tracking-widest uppercase text-black italic">The Genesis — 01</p>
                    </div>
                    <div className="lg:col-span-4">
                      <img src="/dp.png" alt="Dhruv" className="w-full aspect-square object-cover shadow-lg rounded-sm" />
                    </div>
                    <div className="lg:col-span-8 flex flex-col justify-center text-sm md:text-base text-zinc-700 leading-relaxed font-sans">
                        I am a Computer Science student at <span className="text-black font-semibold">IK Gujral Punjab Technical University</span> with a strong interest in building intelligent, scalable, and real-time systems. My work focuses on the intersection of <span className="text-red-600 font-medium italic">Machine Learning, AI-driven applications, and Production-Ready Web Architectures.</span>
                        <br/><br/>
                        I enjoy designing end-to-end products—from data processing and model development to secure cloud-deployed platforms.
                    </div>
                  </div>
                </div>
              </div>
            </div>

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

            <section id="services-sec" className="relative z-50 bg-white py-32 px-10 border-t border-zinc-100 text-left">
              <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                   <p className="text-red-600 font-bold tracking-[0.5em] text-[10px] mb-2 uppercase italic">Chapter 03</p>
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

        {/* --- MAN BRANCH --- */}
        {activeBranch === 'man' && (
          <div key="man-branch" className="bg-[#070707] min-h-screen text-white">
            <section className="h-screen w-full relative overflow-hidden flex items-end p-10 md:p-20">
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover grayscale-[40%] brightness-50">
                <source src="https://res.cloudinary.com/daookjsaa/video/upload/v1769703203/solo-hike_nlfzoi.mp4" type="video/mp4" />
              </video>
              <div className="relative z-10 w-full">
                <p className="text-red-600 font-bold tracking-[0.5em] text-[15px] uppercase mb-4">Behind the screen</p>
                <h2 className="text-7xl md:text-[08vw] font-black italic uppercase tracking-tighter leading-[0.8]">Man on a Mission</h2>
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