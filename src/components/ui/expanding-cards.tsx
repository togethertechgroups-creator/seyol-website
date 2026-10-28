"use client";

import * as React from "react";
import Link from "next/link";
import { type StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string | StaticImageData;
  icon?: React.ReactNode;
  linkHref?: string;
  actionText?: string;
  objectPosition?: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
  heightClass?: string;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, heightClass, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex,
  );
  
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};
    
    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "4.5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "4fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items.length, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul
      className={cn(
        "w-full max-w-7xl gap-3 sm:gap-4",
        "grid",
        heightClass || "h-[620px] md:h-[520px] lg:h-[540px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
        className,
      )}
      style={{
        ...gridStyle,
        ...(isDesktop 
          ? { gridTemplateRows: '1fr' }
          : { gridTemplateColumns: '1fr' }
        )
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        const imageSource = typeof item.imgSrc === "string" ? item.imgSrc : item.imgSrc.src;

        return (
          <li
            key={item.id}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-md transition-all duration-300",
              "border-[#EAE1D5] hover:border-[#7B1131]/40",
              "md:min-w-[85px]",
              "min-h-0 min-w-0 select-none",
              isActive && "ring-2 ring-[#7B1131]/30 shadow-xl"
            )}
            onMouseEnter={() => handleInteraction(index)}
            onFocus={() => handleInteraction(index)}
            onClick={() => handleInteraction(index)}
            tabIndex={0}
            data-active={isActive}
          >
            {/* Background Image with grayscale-to-color transition */}
            <img
              src={imageSource}
              alt={item.title}
              style={{ objectPosition: item.objectPosition || "center top" }}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out",
                isActive 
                  ? "scale-100 grayscale-0 brightness-100" 
                  : "scale-110 grayscale-[70%] brightness-90 group-hover:grayscale-0 group-hover:brightness-95"
              )}
            />

            {/* Gradient Overlays for readable text */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#26050E]/95 via-[#26050E]/45 to-transparent/10 transition-opacity duration-300" />
            <div className={cn(
              "absolute inset-0 bg-[#7B1131]/20 transition-opacity duration-300 pointer-events-none",
              isActive ? "opacity-0" : "opacity-40 group-hover:opacity-10"
            )} />

            {/* Inactive Label (Vertically centered so full text is always visible without clipping) */}
            <div className={cn(
              "absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 z-10",
              isActive ? "opacity-0 pointer-events-none" : "opacity-100"
            )}>
              {/* Desktop Vertical Label */}
              <div className="hidden md:flex items-center justify-center h-full max-h-[85%] py-4">
                <h3
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  className="whitespace-nowrap text-xs lg:text-[13px] font-bold uppercase tracking-[3px] text-white/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] select-none text-center"
                >
                  {item.title}
                </h3>
              </div>

              {/* Mobile Horizontal Label (when collapsed row) */}
              <div className="flex md:hidden items-center justify-between w-full px-5 py-3.5 bg-gradient-to-r from-black/85 via-black/60 to-transparent self-end">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white drop-shadow-md">
                  {item.title}
                </h3>
                <span className="text-[11px] text-cream-light/85 font-medium tracking-wide">
                  Tap to view ↓
                </span>
              </div>
            </div>

            {/* Active Content Overlay */}
            <article className="absolute inset-0 flex flex-col justify-end gap-3 p-5 sm:p-7 md:p-8 z-10 pointer-events-none">
              {item.icon && (
                <div className={cn(
                  "w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-[#E4CF9E] transition-all duration-300 delay-75 ease-out shadow-sm",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                )}>
                  {item.icon}
                </div>
              )}

              <div className="space-y-1.5">
                <h3 className={cn(
                  "font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-white transition-all duration-300 delay-150 ease-out leading-tight drop-shadow-sm",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                )}>
                  {item.title}
                </h3>

                <p className={cn(
                  "w-full max-w-md text-xs sm:text-sm text-cream-light/90 transition-all duration-300 delay-200 ease-out leading-relaxed",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                )}>
                  {item.description}
                </p>
              </div>

              {item.linkHref && (
                <div className={cn(
                  "pt-2 transition-all duration-300 delay-300 ease-out pointer-events-auto",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
                )}>
                  <Link
                    href={item.linkHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#7B1131] hover:bg-cream-light font-bold text-xs sm:text-sm tracking-wide shadow-warm-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    <span>{item.actionText || "Explore Care"}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
});

ExpandingCards.displayName = "ExpandingCards";
export default ExpandingCards;
