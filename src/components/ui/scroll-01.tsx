"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { useRef, useState, Dispatch, SetStateAction, ReactNode } from "react";

export type Scroll01Item = {
  title: string;
  description: string;
  media?: string;
  mediaClassName?: string;
  cardContent?: ReactNode;
  badge?: string;
  subtitle?: string;
  quote?: string;
  author?: string;
  extraContent?: ReactNode;
};

export interface Scroll01Props {
  items: Scroll01Item[];
  className?: string;
}

function ScrollItem({
  item,
  index,
  setActive,
}: {
  item: Scroll01Item;
  index: number;
  setActive: Dispatch<SetStateAction<number>>;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 20%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [15, -15]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    index === 0 ? [1, 1, 0.8, 0.3] : [0.3, 1, 1, 0.3]
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.25 && v < 0.85) {
      setActive(index);
    }
  });

  return (
    <motion.article
      ref={ref}
      style={{ opacity, y }}
      className="flex flex-col items-start min-h-[38vh] justify-center"
    >
      <div className="text-left w-full space-y-4 max-w-xl">
        {item.badge && (
          <div className="inline-flex items-center space-x-2">
            <span className="text-xs font-bold tracking-widest text-[#8C6D4F] uppercase">{item.badge}</span>
            <span className="w-8 h-px bg-[#8C6D4F]" />
          </div>
        )}
        
        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#721832] tracking-tight leading-[1.15]">
          {item.title}
        </h3>

        {item.subtitle && (
          <div className="font-serif italic text-xs sm:text-sm text-[#A87C4F] font-medium">
            {item.subtitle}
          </div>
        )}

        <p className="font-sans text-xs sm:text-sm md:text-base text-[#5C4541] leading-relaxed">
          {item.description}
        </p>

        {item.quote && (
          <div className="pt-2 border-l-2 border-[#721832]/40 pl-4 space-y-1">
            <blockquote className="font-serif italic text-sm sm:text-base md:text-[17px] text-[#721832] font-semibold leading-snug">
              &ldquo;{item.quote.replace(/^[“"']+|[”"']+$/g, '')}&rdquo;
            </blockquote>
            {item.author && (
              <div className="text-xs text-[#8C6D4F] font-sans font-medium">
                — {item.author}
              </div>
            )}
          </div>
        )}

        {item.extraContent}
      </div>
    </motion.article>
  );
}

export function Scroll01({ items, className = "" }: Readonly<Scroll01Props>) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile view (< md) */}
      <div className="space-y-16 md:hidden">
        {items.map((item, index) => (
          <article
            key={`${item.title}-${index}`}
            className="flex flex-col items-start space-y-5"
          >
            <div className="space-y-3 text-left">
              {item.badge && (
                <div className="inline-flex items-center space-x-2">
                  <span className="text-xs font-bold tracking-widest text-[#8C6D4F] uppercase">{item.badge}</span>
                  <span className="w-8 h-px bg-[#8C6D4F]" />
                </div>
              )}
              <h3 className="font-serif text-2xl font-bold text-[#721832] leading-tight">
                {item.title}
              </h3>
              {item.subtitle && (
                <div className="font-serif italic text-xs text-[#A87C4F] font-medium">
                  {item.subtitle}
                </div>
              )}
              <p className="font-sans text-xs sm:text-sm text-[#5C4541] leading-relaxed">
                {item.description}
              </p>
              {item.quote && (
                <div className="border-l-2 border-[#721832]/40 pl-3 py-1 space-y-1">
                  <blockquote className="italic font-serif text-xs sm:text-sm text-[#721832] font-semibold leading-snug">
                    &ldquo;{item.quote.replace(/^[“"']+|[”"']+$/g, '')}&rdquo;
                  </blockquote>
                  {item.author && (
                    <div className="text-[11px] text-[#8C6D4F] font-sans">
                      — {item.author}
                    </div>
                  )}
                </div>
              )}
              {item.extraContent}
            </div>

            {/* Mobile Card / Photo */}
            <div className="w-full max-w-[380px] mx-auto aspect-[3/4] rounded-3xl overflow-hidden shadow-md border-4 border-white bg-[#F2EAE0] relative">
              {item.media ? (
                <img
                  src={item.media}
                  alt={item.title}
                  className={`h-full w-full object-cover ${item.mediaClassName || "object-top"}`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {item.cardContent}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Desktop sticky scroll view (>= md) */}
      <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-12 items-start relative">
        {/* Sticky Media on Left (5 cols) */}
        <div className="md:col-span-5 sticky top-28 self-start flex justify-center py-8">
          <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-[#F2EAE0]">
            {items.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                className="absolute inset-0 h-full w-full"
                initial={{ opacity: index === 0 ? 1 : 0 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  willChange: "opacity",
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeInOut",
                }}
              >
                {item.media ? (
                  <img
                    src={item.media}
                    alt={item.title}
                    className={`h-full w-full object-cover ${item.mediaClassName || "object-[center_20%]"}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {item.cardContent}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scrolling text on Right (7 cols) */}
        <div className="md:col-span-7 py-[10vh]">
          <div className="space-y-[28vh]">
            {items.map((item, index) => (
              <ScrollItem
                key={`${item.title}-${index}`}
                item={item}
                index={index}
                setActive={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scroll01;
