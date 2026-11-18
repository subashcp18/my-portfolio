
"use client";

import { motion, MotionValue } from "framer-motion";
import Image from "next/image";

type Props = {
  top: MotionValue<number>;
  left: MotionValue<number>;
  width: MotionValue<number>;
  height: MotionValue<number>;
  rotateY: MotionValue<number>;
};

export default function ScrollFlipCard({
  top,
  left,
  width,
  height,
  rotateY,
}: Props) {
  return (
    <motion.div
      style={{
        position: "fixed",
        top,
        left,
        x: "-50%",
        width,
        height,
        zIndex: 50,
        perspective: 1200,
        pointerEvents: "none",
      }}
      className="will-change-transform"
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* FRONT: HERO IMAGE */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl shadow-2xl bg-[#161616]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Image
            src="/avatar-dark.png"
            alt="Hero portrait"
            fill
            sizes="(max-width: 768px) 144px, 340px"
            className="object-cover"
            priority
          />
        </div>

        {/* BACK: ABOUT IMAGE */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl shadow-2xl bg-[#161616]"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Image
            src="/avatar-red.png"
            alt="Portrait with red lighting"
            fill
            sizes="(max-width: 768px) 144px, 340px"
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}
