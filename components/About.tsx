
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex items-end pt-40 pb-12 md:pt-48 md:pb-16 px-6 md:px-12 lg:px-16 bg-[#f4f3f0]"
    >
      {/* Full-width 12-column grid */}
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-stretch">

          {/* Left: 3 columns, starting at column 2 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-start-2 lg:col-span-3 flex flex-col justify-between min-h-full"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111]">
              Hey!
            </h2>

            <p className="text-neutral-900 text-base md:text-lg leading-relaxed max-w-sm font-bold">
              I'm Subash, a software developer based in India, passionate about building meaningful digital experiences and turning ideas into reality.
            </p>
          </motion.div>

          {/* Center: 4 columns */}
          <div className="lg:col-span-4 flex justify-center items-center">
            <div
              id="about-card-destination"
              className="
                relative
                w-full
                max-w-[420px]
                aspect-[4/5]
                rounded-xl
              "
            />
          </div>

          {/* Right: 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-3 flex flex-col justify-end space-y-6"
          >
            <div className="space-y-4 text-neutral-800 text-[18px] font-normal tracking-[-0.702px] leading-[25.2px]">
              <p>
                I'm a software developer and freelancer who enjoys building intuitive applications and solving real-world problems. My work revolves around creating clean interfaces, smooth user experiences, and well-structured solutions.
              </p>

              <p>
                My journey spans mobile and web development, freelance projects, and exploring the world of IoT. I enjoy experimenting with hardware, connecting devices, and bringing ideas to life through technology. I'm always curious to learn, explore new possibilities, and build things that make a difference.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-900 text-sm font-semibold hover:bg-neutral-900 hover:text-white transition-all duration-200 active:scale-95 shadow-sm"
              >
                <span>Get Started</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
