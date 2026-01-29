"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import SmoothScroll from '@/components/SmoothScroll'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. THE PUZZLE TRANSITION (Video to White)
    const transitionTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-trigger",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    transitionTl.to(".puzzle-piece", {
      scaleY: 1.05,
      scaleX: 1.05,
      stagger: { grid: [5, 5], from: "random", amount: 1 },
      ease: "power2.inOut",
    });

    // 2. THE FLOATING CONTENT (Refined Scale & Delayed Entrance)
    gsap.fromTo(".floating-pane", 
      { 
        x: "40vw", 
        y: "40vh", 
        opacity: 0,
      },
      { 
        x: 0, 
        y: 0, 
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hero-trigger",
          // '70% top' ensures the puzzle is nearly finished before the text starts moving
          start: "70% top", 
          end: "120% top",
          scrub: 1.5,
        }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <SmoothScroll>
      <main ref={containerRef} className="relative bg-white font-sans overflow-x-hidden text-[#1a1a1a]">
        
        {/* FIXED RHOMBUS & GRID BACKGROUND */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.03]" style={{ 
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0l50 50-50 50L0 50z' fill='%23000'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
            filter: 'blur(2px)'
          }} />
        </div>

        {/* TRIGGER AREA */}
        <div className="hero-trigger h-[180vh] w-full" />

        {/* LAYER 1: VIDEO HERO */}
        <div className="fixed inset-0 z-10 h-screen w-full overflow-hidden">
          <video autoPlay muted loop playsInline className="h-full w-full object-cover">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white italic">
            <h1 className="text-[10vw] font-black uppercase tracking-tighter">Dhruv Bana</h1>
          </div>
        </div>

        {/* LAYER 2: THE TRANSITION (White Blocks) */}
        <div className="fixed inset-0 z-20 pointer-events-none grid grid-cols-5 grid-rows-5 h-screen w-full">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="puzzle-piece w-full h-full bg-white origin-top scale-y-0" style={{ outline: "1px solid white" }} />
          ))}
        </div>

        {/* LAYER 3: REFINED EDITORIAL CONTENT */}
        <div className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center px-6">
          <div className="floating-pane pointer-events-auto max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-x-12">
            
            {/* Sidebar (Small and minimal) */}
            <div className="lg:col-span-3 flex items-center lg:items-start gap-3 border-t border-black/10 pt-4 mb-8 lg:mb-0">
              <div className="w-1.5 h-1.5 rounded-full bg-black mt-1.5" />
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-70">The Engineer</p>
            </div>

            {/* Main Bio Content */}
            <div className="lg:col-span-9">
              {/* Smaller Headline Title */}
              <h2 className="text-xl md:text-[2.2vw] font-light leading-tight text-black mb-12 max-w-3xl">
                Talent. Intelligence. Hard work. Fun. These are just some of the qualities that define the architecture of Dhruv's high-speed solutions.
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Scaled Down Image Container */}
                <div className="relative aspect-square w-full lg:max-w-[320px] overflow-hidden rounded-sm shadow-xl bg-zinc-100">
                  <img 
                    src="/profile.jpg" 
                    alt="Dhruv Profile" 
                    className="object-cover w-full h-full grayscale"
                  />
                </div>

                {/* Body Text (Small and Clean) */}
                <div className="space-y-6 text-zinc-500 text-sm md:text-base leading-relaxed">
                  <p>
                    As a very precocious three and a half-year-old, he climbed into a kart and never climbed out. 
                    He has gone full speed from the kart championships, moving up in the ranks to making his debut in engineering excellence.
                  </p>
                  <p>
                    Since then, by developing high-performance AI solutions and managing robust cloud infrastructures, 
                    he has been building the future of autonomous systems.
                  </p>
                  
                  <div className="pt-6">
                    <div className="h-[1px] w-12 bg-red-600 mb-2" />
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-red-600">Chapter 01</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL SPACE FOR GSAP */}
        <section className="h-[200vh] w-full" />

      </main>
    </SmoothScroll>
  )
}