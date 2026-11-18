
"use client";

import { motion } from "framer-motion";
import ShaderText from "@/components/ShaderText";
import Image from "next/image";

const textEase = [0.25, 0.1, 0.25, 1] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden
      select-none bg-[#f4f3f0]"
    >

      {/* Hero Content */}
      <div className="
          relative z-10 min-h-screen w-full
          flex flex-col justify-between
          pt-24 pb-8 px-6 md:px-12 lg:px-16
        ">

        {/* Top Spacer */}
        <div className="w-full h-4 sm:h-8" />

        {/* Main Typography */}
        <div className="relative w-full flex flex-col items-center
            justify-center my-auto py-8">

          <div className="
              relative flex flex-col items-center text-center
              font-extrabold tracking-[-3.48px] uppercase
              text-[#111111] leading-[0.9]
              text-[clamp(3.5rem,12vw,174px)]
            ">

            {/* SOFTWARE */}
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: textEase }}
              className="relative inline-flex items-center justify-center"
            >
              {/* Chrome Star */}
              <motion.div
                initial={{ scale: 0, rotate: -45, opacity: 0 }}
                animate={{ scale: 1, rotate: -12, opacity: 1 }}
                transition={{
                  delay: 1.2,
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
                className="absolute -left-12 sm:-left-16 md:-left-24
                    lg:-left-28 -top-4 sm:-top-6 md:-top-10
                    w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24
                    lg:w-28 lg:h-28 pointer-events-none drop-shadow-xl"
              >
                <motion.div
                  animate={{
                    y: [-3, 3, -3],
                    rotate: [-12, -8, -12],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="w-full h-full relative"
                >
                  <Image
                    src="/images/chrome-star.png"
                    alt="Chrome Star Accent"
                    fill
                    sizes="(max-width: 768px) 64px, 112px"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </motion.div>

              <span>SOFTWARE</span>
            </motion.div>

            {/* DEVELOPER */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45,
                duration: 1.3,
                ease: textEase,
              }}
              className="relative inline-flex items-center justify-center"
            >
              <span>DEVELOPER</span>

              {/* Chrome Lightning */}
              <motion.div
                initial={{ scale: 0, rotate: 45, opacity: 0 }}
                animate={{ scale: 1, rotate: 14, opacity: 1 }}
                transition={{
                  delay: 1.75,
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
                className="absolute -right-10 sm:-right-14 md:-right-20
                    lg:-right-24 -bottom-4 sm:-bottom-6 md:-bottom-8
                    w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20
                    lg:w-24 lg:h-24 pointer-events-none drop-shadow-xl"
              >
                <motion.div
                  animate={{
                    y: [3, -3, 3],
                    rotate: [14, 18, 14],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.6,
                    ease: "easeInOut",
                  }}
                  className="w-full h-full relative"
                >
                  <Image
                    src="/images/chrome-lightning.png"
                    alt="Chrome Lightning Accent"
                    fill
                    sizes="(max-width: 768px) 56px, 96px"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.85,
            duration: 1.1,
            ease: textEase,
          }}
          className="w-full max-w-7xl mx-auto flex items-end
              justify-between gap-4 pt-4"
        >
          <div className="w-1/3 flex justify-start">
            <span className="
                font-semibold text-[32px] sm:text-[40px]
                md:text-[48px] lg:text-[58px]
                tracking-[-1.16px] leading-[58px] text-[#111111]
              ">
              ©2026
            </span>
          </div>

          <div className="w-1/3 flex justify-center">
            <div
              id="hero-card-origin"
              className="relative w-40 h-48 sm:w-44 sm:h-52
                  md:w-48 md:h-56 rounded-lg opacity-0
                  pointer-events-none"
            />
          </div>

          <div className="w-1/3 flex justify-end">
            <span className="font-mono text-xs sm:text-sm
                uppercase tracking-wider text-neutral-800">
              /DEVELOPING SINCE 2023
            </span>
          </div>
        </motion.div>

        {/* Invisible Card Origin */}
        <div
          id="hero-card-origin"
          className="absolute right-6 md:right-12 bottom-28
              w-28 h-36 sm:w-32 sm:h-40 md:w-36 md:h-44
              opacity-0 pointer-events-none"
        />

      </div>
    </section>
  );
}
