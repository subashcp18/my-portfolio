
"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";

const MANIFESTO_TEXT =
  "From ideas to real-world solutions. Thoughtfully built digital experiences, intuitive applications, and connected technologies, driven by curiosity, clean code, and a passion for making things work.";

const FILL_THRESHOLD = 0.75;

// Controls how many words animate simultaneously
const OVERLAP = 3.5;

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const words = MANIFESTO_TEXT.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh] bg-[#f4f3f0]"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-6 md:px-16">
        <div className="mx-auto w-full max-w-4xl">
          <p className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-center text-xl font-medium leading-[1.4] tracking-tight sm:text-2xl md:text-3xl lg:text-4xl select-none">
            {words.map((word, index) => {
              const start =
                (index / words.length) * FILL_THRESHOLD;

              const end =
                start +
                (OVERLAP / words.length) * FILL_THRESHOLD;

              return (
                <WordItem
                  key={index}
                  progress={scrollYProgress}
                  range={[start, Math.min(end, FILL_THRESHOLD)]}
                  word={word}
                />
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

function WordItem({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const smoothProgress = useTransform(
    progress,
    range,
    [0, 1]
  );

  const opacity = useTransform(
    smoothProgress,
    [0, 1],
    [0.3, 1]
  );

  const color = useTransform(
    smoothProgress,
    [0, 1],
    ["#c4c4c8", "#121212"]
  );

  return (
    <motion.span
      style={{
        opacity,
        color,
      }}
      className="inline-block"
    >
      {word}
    </motion.span>
  );
}
