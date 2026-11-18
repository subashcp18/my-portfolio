"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ThoughtPost {
  title: string;
  category: string;
  date: string;
  image?: string;
  isDarkBanner?: boolean;
}

const POSTS: ThoughtPost[] = [
  {
    title: "Building Trust Through Clear Design",
    category: "Design Strategy",
    date: "Feb 2026",
    image: "/images/thought-1.jpg",
  },
  {
    title: "The Role of Art Direction in Branding",
    category: "Creative Direction",
    date: "Jan 2026",
    image: "/images/thought-2.jpg",
  },
  {
    title: "See how we shape brands with intentional design systems.",
    category: "Philosophy",
    date: "Featured",
    isDarkBanner: true,
  },
];

export default function Thoughts() {
  return (
    <section
      id="thoughts"
      className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-neutral-300/60"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f0f0f]">
            Thoughts
          </h2>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col cursor-pointer"
            >
              {post.isDarkBanner ? (
                /* Dark Accent Card */
                <div className="relative w-full aspect-[16/11] rounded-3xl overflow-hidden bg-[#141414] text-white p-8 flex flex-col justify-between border border-white/[0.08] shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono uppercase tracking-wider">
                    <span>{post.category}</span>
                    <span className="w-2 h-2 rounded-full bg-white/40"></span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white leading-snug">
                    {post.title}
                  </h3>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                    <span className="text-xs text-neutral-400">Read Article</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </div>
              ) : (
                /* Photo Post Card */
                <>
                  <div className="relative w-full aspect-[16/11] rounded-3xl overflow-hidden bg-neutral-200 shadow-md group-hover:shadow-2xl transition-all duration-500 border border-neutral-300/40">
                    <Image
                      src={post.image!}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="mt-5 flex flex-col">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-[#0f0f0f] group-hover:text-neutral-700 transition-colors leading-snug flex items-baseline justify-between gap-4">
                      <span>{post.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </h3>
                  </div>
                </>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

