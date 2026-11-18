
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const technologies = [
  // Frontend
  [
    { name: "HTML", logo: "/images/tech/html5.png" },
    { name: "CSS", logo: "/images/tech/css.png" },
    { name: "JavaScript", logo: "/images/tech/javascript.png" },
    { name: "TypeScript", logo: "/images/tech/typescript.png" },
    { name: "React", logo: "/images/tech/reactjs.png" },
    { name: "Next.js", logo: "/images/tech/nextjs.png" },
    { name: "Tailwind CSS", logo: "/images/tech/tailwindcss.png" },
  ],

  // Backend & Databases
  [
    { name: "Node.js", logo: "/images/tech/nodejs.png" },
    { name: "Express", logo: "/images/tech/expressjs.png" },
    { name: "MongoDB", logo: "/images/tech/mongodb.png" },
    { name: "PostgreSQL", logo: "/images/tech/postgresql.png" },
    { name: "MySQL", logo: "/images/tech/mysql.png" },
    { name: "Supabase", logo: "/images/tech/supabase.png" },
    { name: "Firebase", logo: "/images/tech/firebasee.png" },
    { name: "Redis", logo: "/images/tech/redis.png" },
  ],

  // Development & Design Tools
  [
    { name: "Git", logo: "/images/tech/git.png" },
    { name: "GitHub", logo: "/images/tech/github.svg" },
    { name: "Docker", logo: "/images/tech/docker.png" },
    { name: "Kubernetes", logo: "/images/tech/kubernets.png" },
    { name: "AWS", logo: "/images/tech/aws.png" },
    { name: "Vercel", logo: "/images/tech/vercel.png" },
    { name: "Figma", logo: "/images/tech/figma.png" },
    { name: "Postman", logo: "/images/tech/postman.png" },
    { name: "Apidog", logo: "/images/tech/apidog.png" },
  ],

  // Programming & Mobile
  [
    { name: "Python", logo: "/images/tech/pythonn.png" },
    { name: "Java", logo: "/images/tech/java.png" },
    { name: "Dart", logo: "/images/tech/dart.png" },
    { name: "Flutter", logo: "/images/tech/flutter2.png" },
    { name: "Kotlin", logo: "/images/tech/kotlin.png" },
    { name: "Android Studio", logo: "/images/tech/android-studio.png" },
    { name: "Xcode", logo: "/images/tech/Xcode.png" },
  ],
];

const speeds = [32, 36, 30, 34];

export default function TechMarquee() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const directionRef = useRef(1);

  useEffect(() => {
    const rows = rowRefs.current.filter(
      (row): row is HTMLDivElement => row !== null
    );

    const widths: number[] = [];

    const measure = () => {
      rows.forEach((row, index) => {
        const sequence = row.children[0] as HTMLElement;

        if (sequence) {
          widths[index] = sequence.getBoundingClientRect().width;
        }
      });
    };

    measure();

    const observer = new ResizeObserver(measure);

    rows.forEach((row) => {
      observer.observe(row);

      if (row.firstElementChild) {
        observer.observe(row.firstElementChild);
      }
    });

    let previousTime = 0;
    let previousScrollY = window.scrollY;
    let frame = 0;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > previousScrollY) {
        directionRef.current = 1;
      } else if (currentY < previousScrollY) {
        directionRef.current = -1;
      }

      previousScrollY = currentY;
    };

    const animate = (time: number) => {
      if (!previousTime) previousTime = time;

      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      rows.forEach((row, index) => {
        const width = widths[index];

        if (!width) return;

        const current = Number(row.dataset.offset || 0);

        const rowDirection = index % 2 === 0 ? 1 : -1;
        const direction = rowDirection * directionRef.current;

        const next =
          ((current + speeds[index] * delta * direction) % width +
            width) %
          width;

        row.dataset.offset = String(next);

        row.style.transform = `translate3d(${-next}px, 0, 0)`;
      });

      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="w-full bg-transparent py-20 md:py-28">
      {/* 12-column page grid */}
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-12 px-3 md:px-5 lg:px-6">
        {/* One single rounded black container */}
        <div className="col-span-12 overflow-hidden rounded-3xl border border-white/10 bg-black">

          {/* Header inside black container */}
          <div className="px-5 pb-10 pt-12 text-center md:px-10 md:pb-12 md:pt-16">

            <span className="text-xs font-medium tracking-[0.35em] text-neutral-500">
              MY TOOLKIT
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Technologies I work with.
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-neutral-500">
              Tools and technologies I use to bring ideas to life.
            </p>

          </div>

          {/* Animated logo rows */}
          <div className="space-y-8 pb-12 md:space-y-10 md:pb-16">

            {technologies.map((row, index) => (
              <div
                key={index}
                className="relative w-full overflow-hidden"
              >
                {/* Edge fades */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-black to-transparent md:w-16" />

                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black to-transparent md:w-16" />

                {/* Infinite track */}
                <div
                  ref={(el) => {
                    rowRefs.current[index] = el;
                  }}
                  data-offset="0"
                  className="flex w-max will-change-transform"
                >
                  {[0, 1].map((copy) => (
                    <div
                      key={copy}
                      aria-hidden={copy === 1}
                      className="flex w-max shrink-0 items-center gap-5 px-3 sm:gap-7 sm:px-4 md:gap-9 md:px-5"
                    >
                      {row.map((tech) => (
                        <div
                          key={tech.name}
                          className="group/item flex w-[76px] shrink-0 flex-col items-center gap-3 opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:w-20 md:w-24"
                        >
                          <div className="flex h-12 w-12 items-center justify-center md:h-14 md:w-14">
                            <Image
                              src={tech.logo}
                              alt={copy === 0 ? tech.name : ""}
                              width={64}
                              height={64}
                              draggable={false}
                              className="h-full w-full select-none object-contain"
                            />
                          </div>

                          <span className="whitespace-nowrap text-center text-[11px] font-medium text-neutral-400 transition-colors duration-300 group-hover/item:text-white md:text-xs">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
