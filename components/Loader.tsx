
"use client";

import { useEffect, useState } from "react";

const greetings = [
  "வணக்கம்",
  "नमस्ते",
  "مرحبا",
  "こんにちは",
  "Hola",
  "Bonjour",
  "Hallo",
  "Ciao",
  "Olá",
  "Привет",
  "你好",
  "안녕하세요",
  "Hello",
];

export default function Loader() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let index = 0;

    const showNext = () => {
      if (index < greetings.length - 1) {
        index++;
        setActiveIndex(index);

        // Last greeting stays longer
        const delay = index === greetings.length - 1 ? 1400 : 350;

        timeout = setTimeout(showNext, delay);
      } else {
        timeout = setTimeout(() => {
          setIsFinished(true);
        }, 1400);
      }
    };

    let timeout = setTimeout(showNext, 350);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black transition-opacity duration-700 ${
        isFinished
          ? "pointer-events-none opacity-0"
          : "opacity-100"
      }`}
    >
      <div className="relative flex h-[60px] w-[280px] items-center justify-center overflow-hidden">
        {greetings.map((greeting, index) => (
          <div
            key={greeting}
            className={`absolute transition-all duration-300 ease-in-out ${
              activeIndex === index
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0"
            }`}
          >
            <h1 className="whitespace-nowrap text-4xl font-light text-white">
              {greeting}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
