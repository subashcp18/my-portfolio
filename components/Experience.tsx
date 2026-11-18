
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import LanyardWrapper from "@/components/LanyardWrapper";

interface ExperienceItem {
  number: string;
  title: string;
  tags: string[];
  description: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    number: "03",
    title: "TIC Global Services",
    tags: ["Flutter Developer - Fulltime", "Present"],
    description:
      "Creating beautiful, high-performance mobile applications for iOS and Android using the Flutter framework, ensuring a seamless user experience across both platforms.",
  },
  {
    number: "02",
    title: "Eagle Electronics",
    tags: ["IOT, Embedded - Internship", "2025"],
    description:
      "Created firmware and embedded systems for IoT devices, focusing on power efficiency, real-time performance, and seamless integration with cloud platforms.",
  },
  {
    number: "01",
    title: "Webstormers",
    tags: ["Flutter Developer - Fulltime", "2024"],
    description:
      "Creating beautiful, high-performance mobile applications for iOS and Android using the Flutter framework, ensuring a seamless user experience across both platforms.",
  },
];

const smoothTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as const,
};

const textReveal = {
  hidden: {
    opacity: 0,
    y: 25,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

export default function Experience() {
  return (
    <section
      id="services"
      className="relative isolate min-h-screen w-full overflow-hidden border-t border-neutral-300/60 px-6 py-24 md:px-12 md:py-36 lg:px-16"
    >
      {/* 3D INTERACTION LAYER */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="pointer-events-auto absolute inset-0">
          <LanyardWrapper />
        </div>
      </div>

      {/* EXPERIENCE CONTENT */}
      <div className="relative z-0 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-8">

            {/* SECTION HEADING */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              className="mb-10"
            >
              <motion.h2
                variants={textReveal}
                transition={smoothTransition}
                className="text-4xl font-bold tracking-tight text-[#0f0f0f] md:text-5xl lg:text-6xl"
              >
                Experience
              </motion.h2>

              <motion.p
                variants={textReveal}
                transition={{
                  ...smoothTransition,
                  duration: 1,
                }}
                className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600 md:text-base"
              >
                Solutions to build, launch, and scale mobile applications.
              </motion.p>
            </motion.div>

            {/* EXPERIENCE LIST */}
            <div className="flex flex-col">
              {EXPERIENCES.map((experience, index) => (
                <motion.div
                  key={experience.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.09,
                        delayChildren: 0.08,
                      },
                    },
                  }}
                  className="group relative cursor-pointer border-b border-neutral-300 py-8 md:py-10"
                >
                  {/* TITLE ROW */}
                  <div className="flex flex-col justify-between gap-4 transition-transform duration-500 ease-out group-hover:translate-x-2 md:flex-row md:items-baseline">

                    <div className="flex items-baseline gap-4 md:gap-6">

                      {/* NUMBER */}
                      <motion.span
                        variants={textReveal}
                        transition={smoothTransition}
                        className="font-mono text-xs text-neutral-400 transition-colors duration-300 group-hover:text-black"
                      >
                        {experience.number}
                      </motion.span>

                      {/* COMPANY NAME */}
                      <motion.h3
                        variants={textReveal}
                        transition={{
                          ...smoothTransition,
                          duration: 0.9,
                        }}
                        className="text-2xl font-semibold tracking-tight text-[#0f0f0f] md:text-3xl lg:text-4xl"
                      >
                        {experience.title}
                      </motion.h3>
                    </div>

                    {/* ARROW */}
                    <motion.div
                      variants={textReveal}
                      transition={smoothTransition}
                      className="flex items-center gap-2 self-start md:self-auto"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 opacity-0 transition-all duration-500 group-hover:border-black group-hover:opacity-100 group-hover:rotate-45">
                        <ArrowUpRight className="h-4 w-4 text-black" />
                      </div>
                    </motion.div>
                  </div>

                  {/* TAGS */}
                  <motion.div
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 15,
                        filter: "blur(5px)",
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      },
                    }}
                    transition={{
                      ...smoothTransition,
                      duration: 0.8,
                    }}
                    className="mt-4 flex flex-wrap items-center gap-2 pl-8 text-xs font-medium text-neutral-500 md:pl-10 md:text-sm"
                  >
                    {experience.tags.map((tag, i) => (
                      <span key={tag} className="inline-flex items-center">
                        {tag}
                        {i < experience.tags.length - 1 && (
                          <span className="mx-2 text-neutral-300">•</span>
                        )}
                      </span>
                    ))}
                  </motion.div>

                  {/* DESCRIPTION */}
                  <motion.p
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 18,
                        filter: "blur(6px)",
                      },
                      visible: {
                        opacity: 0.8,
                        y: 0,
                        filter: "blur(0px)",
                      },
                    }}
                    transition={{
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-3 max-w-xl pl-8 text-xs leading-relaxed text-neutral-600 md:pl-10 md:text-sm"
                  >
                    {experience.description}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="hidden lg:col-span-4 lg:block" />

        </div>
      </div>
    </section>
  );
}
