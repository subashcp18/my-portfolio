
"use client";

import { useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

import Hero from "@/components/Hero";
import About from "@/components/About";

import ScrollFlipCard from "@/components/FlipCard";

type CardGeometry = {
  startLeft: number;
  startTop: number;
  startWidth: number;
  startHeight: number;
  endLeft: number;
  endTop: number;
  endWidth: number;
  endHeight: number;
  startScroll: number;
  endScroll: number;
};

export default function HomeIntro() {
  const { scrollY } = useScroll();

  const [geometry, setGeometry] =
    useState<CardGeometry | null>(null);

  useEffect(() => {
    const measurePositions = () => {
      const origin = document.getElementById("hero-card-origin");
      const destination = document.getElementById(
        "about-card-destination"
      );
      const about = document.getElementById("about");

      if (!origin || !destination || !about) return;

      const start = origin.getBoundingClientRect();
      const end = destination.getBoundingClientRect();
      const aboutRect = about.getBoundingClientRect();

      const currentScroll = window.scrollY;

      setGeometry({
        startLeft: start.left,
        startTop: start.top + currentScroll,
        startWidth: start.width,
        startHeight: start.height,

        endLeft: end.left,
        endTop: end.top + currentScroll,
        endWidth: end.width,
        endHeight: end.height,

        startScroll: currentScroll,
        endScroll: aboutRect.top + currentScroll,
      });
    };

    measurePositions();

    window.addEventListener("resize", measurePositions);

    return () => {
      window.removeEventListener("resize", measurePositions);
    };
  }, []);

  // Keep the card's position connected to document scrolling.
  const endScroll = geometry?.endScroll ?? 1;
  const startScroll = geometry?.startScroll ?? 0;

  const documentTop = useTransform(
    scrollY,
    [startScroll, Math.max(endScroll, startScroll + 1)],
    [
      geometry?.startTop ?? 0,
      geometry?.endTop ?? 0,
    ]
  );

  const top = useTransform(
    () => documentTop.get() - scrollY.get()
  );

  const left = useTransform(
  scrollY,
  [startScroll, Math.max(endScroll, startScroll + 1)],
  [
    (geometry?.startLeft ?? 0) +
      (geometry?.startWidth ?? 0) / 2,

    (geometry?.endLeft ?? 0) +
      (geometry?.endWidth ?? 0) / 2,
  ]
);

  const width = useTransform(
    scrollY,
    [startScroll, Math.max(endScroll, startScroll + 1)],
    [
      geometry?.startWidth ?? 112,
      geometry?.endWidth ?? 340,
    ]
  );

  const height = useTransform(
    scrollY,
    [startScroll, Math.max(endScroll, startScroll + 1)],
    [
      geometry?.startHeight ?? 144,
      geometry?.endHeight ?? 425,
    ]
  );

  const rotateY = useTransform(
    scrollY,
    [
      startScroll + (endScroll - startScroll) * 0.15,
      startScroll + (endScroll - startScroll) * 0.85,
    ],
    [0, 180]
  );

  return (
    <>
      <Hero />
      <About />

      {geometry && (
        <ScrollFlipCard
          top={top}
          left={left}
          width={width}
          height={height}
          rotateY={rotateY}
        />
      )}
    </>
  );
}
