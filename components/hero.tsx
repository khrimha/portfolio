"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useTheme } from "./theme-provider";

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.05,
      duration: 0.5,
      // FIXED: Added "as const" to satisfy TypeScript
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  const { theme } = useTheme();
  const name = "Emmanuel Jedidiah";

  return (
    <section className="relative min-h-screen bg-coffee-50 dark:bg-coffee-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left Content */}
          <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-32 lg:py-0 lg:ml-[48px]">
            {/* Role Tag */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-coffee-600 dark:text-coffee-400 font-medium mb-4"
            >
              Product Manager & Developer
            </motion.p>

            {/* Name */}
            <motion.h1
              key={theme}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-normal text-coffee-900 dark:text-coffee-100 tracking-tight leading-[1.05] mb-8 overflow-hidden"
            >
              {name.split("").map((letter, i) => (
                <motion.span
                  key={`${letter}-${i}`}
                  custom={i}
                  variants={letterVariants}
                  className="inline-block"
                  style={{ display: letter === " " ? "inline" : "inline-block" }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="border-l-2 border-coffee-300 dark:border-coffee-700 pl-6 max-w-md"
            >
              <p className="text-base sm:text-lg text-coffee-700 dark:text-coffee-300 leading-relaxed">
                jedidiah. is an accomplished product manager and developer with a knack for creating smarter and enriching digital experiences for people and businesses.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-3 text-coffee-900 dark:text-coffee-100 font-medium hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors"
              >
                <span className="text-sm uppercase tracking-wider">View My Work</span>
                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute top-16 left-8 w-36 h-36 rounded-full bg-gradient-to-br from-coffee-300 to-coffee-500 dark:from-coffee-500 dark:to-coffee-700 blur-2xl opacity-70"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute bottom-20 right-10 w-28 h-28 rounded-full bg-gradient-to-br from-[#b48a70] to-[#6F4E37] dark:from-[#d1a88f] dark:to-[#8a5f45] blur-2xl opacity-70"
            />
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-full w-full flex items-center justify-center px-14"
            >
              <div className="relative w-full max-w-md rounded-3xl border border-coffee-300/80 dark:border-coffee-600/70 bg-white/85 dark:bg-[#221914]/80 backdrop-blur-md p-9 shadow-xl shadow-[#6F4E37]/10 dark:shadow-black/30">
                <p className="text-xs uppercase tracking-[0.18em] text-[#6F4E37] dark:text-[#d1a88f] mb-4">
                  Product + Execution
                </p>
                <p className="text-2xl font-serif text-coffee-900 dark:text-coffee-100 leading-snug">
                  I build clear product direction and turn it into shipped outcomes.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-zinc-100 dark:bg-[#31231c] px-3 py-2 text-coffee-700 dark:text-coffee-200">
                    Strategy
                  </div>
                  <div className="rounded-xl bg-zinc-100 dark:bg-[#31231c] px-3 py-2 text-coffee-700 dark:text-coffee-200">
                    UX Thinking
                  </div>
                  <div className="rounded-xl bg-zinc-100 dark:bg-[#31231c] px-3 py-2 text-coffee-700 dark:text-coffee-200">
                    Execution
                  </div>
                  <div className="rounded-xl bg-zinc-100 dark:bg-[#31231c] px-3 py-2 text-coffee-700 dark:text-coffee-200">
                    Growth
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile decorative element */}
      <div className="lg:hidden absolute bottom-0 right-0 w-32 h-32 bg-coffee-600 dark:bg-coffee-500 dark:ring-2 dark:ring-white/20 rounded-tl-[60px]" />
    </section>
  );
}