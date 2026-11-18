
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useTime,
  MotionValue,
} from "framer-motion";
import StrategyCardFront from "./TestimonialCard";


interface Testimonial {
  quote: string;
  name: string;
  title: string;
  frontImage: string;
  backImage: string;

  frontContent: {
    heading: string;
    items: string[];
    footerText?: string;
    accentColor?: string;
  };
}



const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Templyo completely changed how I approach building sites. Everything feels intentional and beautifully structured.",
    name: "Yakoub Kashmiri",
    title: "Marketing Director",
    frontImage: "/images/card_cover2.png",
    backImage: "/images/testimonial-yakoub-back.jpg",

    frontContent: {
      heading: "Strategy",
      items: [
        "Digital Experience Strategy",
        "Technology Strategy",
        "Creative Direction",
        "Discovery",
        "Research",
      ],
      footerText: "Strategy",
      accentColor: "#2638FF",
    },
  },
  {
    quote:
      "Everything feels intentional, from the layout to the smallest interactions.",
    name: "Daniel K.",
    title: "Indie Maker",
    frontImage: "/images/card_cover2.png",
    backImage: "/images/testimonial-daniel-back.jpg",

    frontContent: {
      heading: "Design",
      items: [
        "Visual Identity",
        "Digital Art Direction",
        "Brand Systems",
        "Interface Design",
        "Design Systems",
      ],
      footerText: "Design",
      accentColor: "#2638FF",
    },
  },
  {
    quote:
      "I was able to launch my landing page in a day, and it still looks fully custom.",
    name: "Mark M.",
    title: "Startup Founder",
    frontImage: "/images/card_cover2.png",
    backImage: "/images/testimonial-mark-back.jpg",

    frontContent: {
      heading: "Development",
      items: [
        "Frontend Development",
        "Creative Development",
        "Web Applications",
        "Performance",
        "Technology",
      ],
      footerText: "Development",
      accentColor: "#2638FF",
    },
  },
  {
    quote:
      "Clean structure, smooth animations, and super easy to customize.",
    name: "Omar H.",
    title: "Frontend Developer",
    frontImage: "/images/card_cover2.png",
    backImage: "/images/testimonial-omar-back.jpg",

    frontContent: {
      heading: "Experience",
      items: [
        "User Experience",
        "Interaction Design",
        "Prototyping",
        "User Research",
        "Accessibility",
      ],
      footerText: "Experience",
      accentColor: "#2638FF",
    },
  },
];


// --------------------------------------------------
// SHARED CARD
// --------------------------------------------------

interface CardProps {
  item: Testimonial;
  progress: MotionValue<number>;
  width?: string | number;
}

function TestimonialCard({
  item,
  progress,
  width = "100%",
}: CardProps) {
  const rotateY = useTransform(
    progress,
    [0.15, 0.7],
    [0, 180]
  );

  return (
    <div
      className="relative mx-auto aspect-[3/4]"
      style={{
        width,
        maxWidth: "100%",
        perspective: 1200,
      }}
    >
      <motion.div
        style={{
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          y: {
            duration: 3.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
        className="relative h-full w-full"
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl bg-neutral-200 shadow-xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Image
            src={item.frontImage}
            alt={`${item.name} testimonial`}
            fill
            sizes="(max-width: 768px) 90vw, 280px"
            className="object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5">
            <p className="text-base font-semibold text-white">
              {item.name}
            </p>

            <p className="mt-1 text-xs text-white/75">
              {item.title}
            </p>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl bg-neutral-200 shadow-xl"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Image
            src={item.backImage}
            alt={`${item.name} alternate image`}
            fill
            sizes="(max-width: 768px) 90vw, 280px"
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}


function DesktopAnimatedCard({
  item,
  index,
  progress,
  cardWidth,
  gap,
}: {
  item: Testimonial;
  index: number;
  progress: MotionValue<number>;
  cardWidth: number;
  gap: number;
}) {
  // Visual order:
  // Yakoub = left
  // Daniel = center-left
  // Mark = center-right
  // Omar = right and initially on top.

  const visualIndex = 3 - index;

  const finalX =
    (visualIndex - 1.5) * (cardWidth + gap);

  // Corrected rotation directions.
  // Cards rotate outward from the stack.
  const fanRotation = [-16, -7, 7, 16];

  const initialRotation = [-5, -2, 2, 5];

  // Omar settles first, Yakoub last.
  const movementFinish = [0.64, 0.59, 0.54, 0.49];

  const finish = movementFinish[index];

  // --------------------------------
  // HORIZONTAL MOVEMENT
  // --------------------------------

  const x = useTransform(
    progress,
    [0, 0.06, 0.14, finish * 0.72, finish],
    [
      0,
      0,
      0,
      finalX * 0.85,
      finalX,
    ]
  );

  // --------------------------------
  // CARD ROTATION
  // --------------------------------

  const rotate = useTransform(
    progress,
    [
      0,
      0.07,
      0.14,
      finish * 0.62,
      finish * 0.88,
      finish,
    ],
    [
      0,
      initialRotation[visualIndex],
      fanRotation[visualIndex],
      fanRotation[visualIndex] * 0.75,
      fanRotation[visualIndex] * 0.2,
      0,
    ]
  );

  // --------------------------------
  // FLIP ANIMATION
  // --------------------------------

  // All start together while travelling.
  // Rightmost card completes first.

  const flipStart = 0.01;

  const flipFinish = [0.99, 0.94, 0.88, 0.82];

  const rotateY = useTransform(
    progress,
    [flipStart, flipFinish[index]],
    [0, 180],
    {
      clamp: true,
    }
  );

  // --------------------------------
  // FLOATING ANIMATION
  // --------------------------------

  const time = useTime();

  const floatY = useTransform(time, (latest) => {
    const scroll = progress.get();

    // Absolutely no floating in initial stack.
    if (scroll <= 0.14) return 0;

    // Gradually activate floating.
    const activation = Math.max(
      0,
      Math.min(1, (scroll - 0.14) / 0.38)
    );

    // More noticeable movement after spreading.
    const amplitude = activation * 14;

    return (
      Math.sin(latest / 650 + visualIndex * 0.8) *
      amplitude
    );
  });

  return (
    <motion.div
      style={{
        x,
        rotate,
        zIndex: 20 + visualIndex,
        position: "absolute",
        left: "50%",
        top: "50%",
        translateX: "-50%",
        translateY: "-50%",
        perspective: 1400,
      }}
      className="will-change-transform"
    >
      <div
        className="relative aspect-[3/4]"
        style={{ width: cardWidth }}
      >
        {/* FLOATING WRAPPER */}
        <motion.div
          style={{ y: floatY }}
          className="relative h-full w-full"
        >
          {/* FLIP WRAPPER */}
          <motion.div
            style={{
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative h-full w-full"
          >
            {/* FRONT */}
            <div
              className="absolute inset-7 overflow-hidden rounded-xl bg-neutral-200 shadow-2xl"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <Image
                src={item.frontImage}
                alt={`${item.name} testimonial`}
                fill
                sizes="(max-width: 1280px) 24vw, 300px"
                className="object-cover"
                priority={visualIndex === 3}
              />

              {/* <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                <p className="text-base font-semibold text-white">
                  {item.name}
                </p>

                <p className="mt-1 text-sm text-white/75">
                  {item.title}
                </p>
              </div> */}
            </div>

            {/* BACK */}
            <div
              className="absolute inset-0 overflow-hidden rounded-2xl bg-neutral-200 shadow-2xl"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <StrategyCardFront
    heading={item.frontContent.heading}
    items={item.frontContent.items}
    footerText={item.frontContent.footerText}
    accentColor={item.frontContent.accentColor}
  />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}


// --------------------------------------------------
// DESKTOP: STACK -> SPREAD -> ALL CARDS FLIP
// --------------------------------------------------

function DesktopTestimonials({
  viewportWidth,
}: {
  viewportWidth: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 22,
    mass: 0.5,
  });

  const headingOpacity = useTransform(
    progress,
    [0, 0.12, 0.3],
    [1, 1, 0]
  );

  // Container width.
  const containerWidth = Math.min(
    viewportWidth - 128,
    1440
  );

  // Desktop card gap.
  const gap = 32;

  // Calculate card width to fit all four cards.
  const cardWidth = Math.min(
    310,
    (containerWidth - gap * 3) / 4
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative h-[350vh] w-full border-t border-neutral-300/60"
    >
      <div className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden px-8 lg:px-12 xl:px-16">

        {/* HEADING */}
        <motion.div
          style={{ opacity: headingOpacity }}
          className="relative z-30 mx-auto w-full max-w-7xl pt-24 md:pt-28"
        >
          <h2 className="text-4xl font-bold tracking-tight text-[#0f0f0f] md:text-5xl lg:text-6xl">
            Testimonials
          </h2>
        </motion.div>

        {/* 12 COLUMN CONTAINER */}
        <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-12 items-center">
          <div className="relative col-span-12 flex h-full items-center justify-center">

            {TESTIMONIALS.map((item, index) => (
              <DesktopAnimatedCard
                key={item.name}
                item={item}
                index={index}
                progress={progress}
                cardWidth={cardWidth}
                gap={gap}
              />
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}


// --------------------------------------------------
// TABLET: 2x2 GRID, FIRST PAIR THEN SECOND PAIR FLIPS
// --------------------------------------------------

function TabletRow({
  items,
}: {
  items: Testimonial[];
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 85%", "center 35%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
  });

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-2 items-center justify-center gap-6"
    >
      {items.map((item) => (
        <TestimonialCard
          key={item.name}
          item={item}
          progress={progress}
          width="100%"
        />
      ))}
    </div>
  );
}

function TabletTestimonials() {
  return (
    <section
      id="testimonials"
      className="w-full border-t border-neutral-300/60 px-8 py-24"
    >
      <div className="mx-auto max-w-3xl">

        <h2 className="mb-16 text-5xl font-bold tracking-tight text-[#0f0f0f]">
          Testimonials
        </h2>

        <div className="space-y-20">
          {/* First two flip together */}
          <TabletRow items={TESTIMONIALS.slice(0, 2)} />

          {/* Second two flip together */}
          <TabletRow items={TESTIMONIALS.slice(2, 4)} />
        </div>

      </div>
    </section>
  );
}

// --------------------------------------------------
// MOBILE: SINGLE COLUMN, EACH CARD FLIPS INDIVIDUALLY
// --------------------------------------------------

function MobileCard({
  item,
}: {
  item: Testimonial;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "center 35%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
  });

  return (
    <div
      ref={cardRef}
      className="w-full"
    >
      <TestimonialCard
        item={item}
        progress={progress}
        width="100%"
      />
    </div>
  );
}

function MobileTestimonials() {
  return (
    <section
      id="testimonials"
      className="w-full border-t border-neutral-300/60 px-5 py-20"
    >
      <div className="mx-auto w-full max-w-[420px]">

        <h2 className="mb-14 text-4xl font-bold tracking-tight text-[#0f0f0f]">
          Testimonials
        </h2>

        <div className="flex flex-col gap-16">
          {TESTIMONIALS.map((item) => (
            <MobileCard
              key={item.name}
              item={item}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// --------------------------------------------------
// MAIN RESPONSIVE COMPONENT
// --------------------------------------------------

export default function Testimonials() {
  const [screenWidth, setScreenWidth] = useState(1440);

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  // DESKTOP: 1024px and above
  if (screenWidth >= 1024) {
    return (
      <DesktopTestimonials
        viewportWidth={screenWidth}
      />
    );
  }

  // TABLET: 768px - 1023px
  if (screenWidth >= 768) {
    return <TabletTestimonials />;
  }

  // MOBILE: below 768px
  return <MobileTestimonials />;
}
