"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  category: string;
  image: string;
  aspect?: string;
  tagline?: string;
  link?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Calculator",
    category: "Mobile Application",
    image: "/images/pro-img/calc.png",
    tagline: "BRINGING YOUR VISION TO LIFE",
    link: "https://damas.framer.website",
  },
  {
    title: "MyBus",
    category: "Mobile Application",
    image: "/images/pro-img/mybus.jpg",
    tagline: "Your AI-Powered Design Assistant",
    link: "https://najm.framer.website",
  },
  {
    title: "Design Smarter. Build Faster.",
    category: "Design System & UI Kit",
    image: "/images/project-3.jpg",
    tagline: "High-converting templates for fast-moving founders",
    link: "https://templyo.com",
  },
  {
    title: "Break Out The Square Space",
    category: "Editorial Studio Template",
    image: "/images/project-4.jpg",
    tagline: "Subscription-based creative agency system",
    link: "https://templyo.com",
  },
];

export default function Projects() {
  return (
    <section id="works" className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-neutral-300/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f0f0f]">
              Featured
              <br />
              Projects
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <a
              href="https://templyo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 hover:border-black text-sm font-medium text-neutral-900 bg-white/40 hover:bg-white backdrop-blur-sm transition-all duration-200 active:scale-95 shadow-sm"
            >
              <span>View All Work</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-700" />
            </a>
          </motion.div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group flex flex-col cursor-pointer"
            >
              {/* Preview Container */}
              <div className="relative w-full aspect-[16/11] rounded-3xl overflow-hidden bg-neutral-200 shadow-md group-hover:shadow-2xl transition-all duration-500 border border-neutral-300/50">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Meta Below Preview */}
              <div className="mt-5 flex items-baseline justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#0f0f0f] group-hover:text-neutral-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-500 font-medium mt-1">
                    {project.category}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full border border-transparent group-hover:border-neutral-300 flex items-center justify-center transition-all duration-200">
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

