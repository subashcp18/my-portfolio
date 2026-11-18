"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  CheckCircle2,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About Me", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
];

export default function ContactAndFooter() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    project: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="contact" className="relative w-full">
      {/* Upper Contact Section (Ecru Canvas) */}
      <section className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-neutral-300/60">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Big Headline & Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 flex flex-col justify-between h-full space-y-10"
            >
              <div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0f0f0f]">
                  Let&apos;s talk.
                </h2>
                <p className="mt-4 text-base md:text-lg text-neutral-600 max-w-md leading-relaxed">
                  Have a project or need help? Fill out the form, and we&apos;ll get
                  back to you soon.
                </p>
              </div>

              {/* Social Icon Pills */}
              <div className="pt-8 flex items-center gap-3">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (formerly Twitter)"
                  className="w-12 h-12 rounded-xl border border-neutral-300/80 bg-white/50 hover:bg-white hover:border-black flex items-center justify-center text-neutral-800 hover:text-black transition-all active:scale-95 shadow-sm"
                >
                  <Twitter className="w-4 h-4 fill-current" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-12 h-12 rounded-xl border border-neutral-300/80 bg-white/50 hover:bg-white hover:border-black flex items-center justify-center text-neutral-800 hover:text-black transition-all active:scale-95 shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-12 h-12 rounded-xl border border-neutral-300/80 bg-white/50 hover:bg-white hover:border-black flex items-center justify-center text-neutral-800 hover:text-black transition-all active:scale-95 shadow-sm"
                >
                  <Linkedin className="w-4 h-4 fill-current" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube / Dribbble"
                  className="w-12 h-12 rounded-xl border border-neutral-300/80 bg-white/50 hover:bg-white hover:border-black flex items-center justify-center text-neutral-800 hover:text-black transition-all active:scale-95 shadow-sm"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Right Column: Dark Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6"
            >
              <div className="bg-[#141414] text-white p-7 sm:p-9 md:p-10 rounded-3xl border border-white/[0.08] shadow-2xl">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Message Received!
                    </h3>
                    <p className="text-sm text-neutral-400 max-w-sm">
                      Thank you for reaching out, {formState.name}. We&apos;ll review
                      your project and reply within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({ name: "", email: "", project: "" });
                      }}
                      className="mt-4 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-medium text-white transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                    {/* Name */}
                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="name"
                        className="text-xs font-medium text-neutral-300"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="bg-transparent border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="email"
                        className="text-xs font-medium text-neutral-300"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="bg-transparent border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
                      />
                    </div>

                    {/* Your Project */}
                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="project"
                        className="text-xs font-medium text-neutral-300"
                      >
                        Your Project
                      </label>
                      <textarea
                        id="project"
                        rows={4}
                        placeholder="Tell us about your project"
                        value={formState.project}
                        onChange={(e) =>
                          setFormState({ ...formState, project: e.target.value })
                        }
                        className="bg-transparent border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-2 py-3.5 px-6 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Submit</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full-Width Dark Footer Strip */}
      <footer className="w-full bg-[#0d0d0d] text-white pt-20 pb-16 px-6 md:px-12 lg:px-16 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Left Headline */}
            <div className="lg:col-span-5">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1] max-w-sm">
                Scaling Start-ups for Growth.
              </h3>
            </div>

            {/* Center Quick Links */}
            <div className="lg:col-span-4 flex flex-col">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-4">
                /Quick links
              </span>
              <div className="flex flex-wrap gap-2">
                {QUICK_LINKS.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleScroll(link.href)}
                    className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors active:scale-95"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Contact Info */}
            <div className="lg:col-span-3 flex flex-col">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-4">
                /Contact
              </span>
              <a
                href="mailto:Mejed@Templyo.io"
                className="text-base md:text-lg text-white hover:text-neutral-300 font-medium transition-colors"
              >
                subashtechmaverick@gmail.com
              </a>
              <p className="mt-4 text-xs text-neutral-500 font-mono">
                Chennai , Tamil Nadu , India
              </p>
            </div>
          </div>

          {/* Bottom Copyright and Framer Badges */}
          <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
            <div>
              <span>© {new Date().getFullYear()} Subash. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://framer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-neutral-400 hover:text-white transition-colors"
              >
                Use for Free
              </a>
              <a
                href="https://templyo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-neutral-400 hover:text-white transition-colors"
              >
                More Templates
              </a>
              <span className="px-3 py-1 rounded-md bg-white/[0.06] text-neutral-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Made in Framer
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

