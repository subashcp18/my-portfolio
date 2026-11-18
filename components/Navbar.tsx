
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About Me", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Works", href: "#works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Thoughts", href: "#thoughts" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);

    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="fixed top-7 left-0 right-0 z-[99999] flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -15, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          height: isOpen ? "auto" : 58,
        }}
        transition={{
          height: {
            type: "spring",
            stiffness: 140,
            damping: 25,
            mass: 0.8,
          },
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="pointer-events-auto w-full max-w-[320px] overflow-hidden rounded-[20px] bg-[#111111] text-[#f8f7f4] shadow-2xl"
      >
        {/* Navbar Header */}
        <div className="flex h-[58px] shrink-0 items-center justify-between px-4">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#hero");
            }}
            className="text-[21px] font-semibold tracking-tight"
          >
            Subash
          </a>

          {/* Animated Toggle */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="flex h-[35px] w-[45px] items-center justify-center rounded-[8px] bg-[#f8f7f4] text-[#111111] transition-colors hover:bg-white active:scale-95"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.22 }}
                >
                  <X size={21} strokeWidth={2.3} />
                </motion.div>
              ) : (
                <motion.div
                  key="dots"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  className="flex items-center gap-[4px]"
                >
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      animate={{ y: [0, -2, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: dot * 0.12,
                      }}
                      className="h-[4px] w-[4px] rounded-full bg-[#111111]"
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Expandable Menu */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-start gap-2 px-4 pb-4 pt-1"
            >
              {NAV_LINKS.map((link, index) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.025,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => handleLinkClick(link.href)}
                  className="group rounded-[10px] bg-[#f8f7f4] px-4 py-[9px] text-left text-[15px] font-medium leading-tight text-[#111111]"
                >
                  <span className="block transition-transform duration-300 ease-out group-hover:translate-x-1">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
