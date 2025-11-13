"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const messages = [
  "여진스월드 OPEN!✨",
  "여진스월드 사랑해요💕",
  "멤버 quite-도, 오늘도 귀여워😍",
  "제이우, 반짝반짝 우리 별⭐",
  "leader-진, 믿고 따르는 리더👍",
  "20-iron, 에너지 폭발!🔥",
  "여진스월드 forever🌈",
  "여진스월드가 짱이야!🙌",
];

export default function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 2000); // 2초마다 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 py-4 z-10">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3 relative h-10 overflow-hidden">
          <div className="relative w-fit text-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="inline-block"
              >
                {messages[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>
      </div>
    </header>
  );
}
