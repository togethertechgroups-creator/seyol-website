// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";

import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* Inline stand-in for @gsap/react's useGSAP. Mirrors its default
   `revertOnUpdate: false`: one gsap.context lives for the component's
   lifetime, the callback is re-added when dependencies change, and the
   context is reverted only on unmount. A callback may return its own
   cleanup, which runs before the next re-add and on unmount. */
function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useIsomorphicLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export type JourneyItem = {
  id: string;
  year: string;
  month: string;
  content: string;
  order?: number;
};

type SplitTextInstance = InstanceType<typeof SplitText>;

export type TimelineProps = {
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  topData?: JourneyItem[];
  bottomData?: JourneyItem[];
  /** Reveal animation duration, in seconds. */
  duration?: number;
  /** Fallback reveal duration when `duration` is omitted, in seconds. */
  scrollDuration?: number;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);

  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;

  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

const defaultTopJourneyData: JourneyItem[] = [
  {
    id: "stage-conception",
    year: "Stage 01",
    month: "Preconception",
    content: "Holistic fertility preparation, pelvic basin tonification, and Siddha herbal oil therapy.",
    order: 1,
  },
  {
    id: "stage-birth",
    year: "Stage 03",
    month: "Birth & Doula",
    content: "Continuous certified labor doula companion care, physiological breathing, and sanctuary arrival.",
    order: 3,
  },
  {
    id: "stage-40days",
    year: "Stage 05",
    month: "Sacred 40 Days",
    content: "Daily restorative uterine involution massage, warm cotton belly binding (Kattu), and herbal Kizhi steam.",
    order: 5,
  },
  {
    id: "stage-family",
    year: "Stage 07",
    month: "Growing Family",
    content: "Lactation coach guidance, infant sleep milestone stabilization, and continuous village care.",
    order: 7,
  },
];

const defaultBottomJourneyData: JourneyItem[] = [
  {
    id: "stage-pregnant",
    year: "Stage 02",
    month: "Pregnancy",
    content: "Prenatal massage therapy, lower back sciatic comfort, and partner counterpressure workshops.",
    order: 2,
  },
  {
    id: "stage-infant-bath",
    year: "Stage 04",
    month: "Infant Bath",
    content: "Traditional almond oil infant bodywork, warm-water bucket bath rituals, and hygienic cord healing.",
    order: 4,
  },
  {
    id: "stage-postpartum",
    year: "Stage 06",
    month: "Postpartum & Beyond",
    content: "Pelvic floor rehabilitation, herbal lactation tonics, and stay-in or hourly respite care.",
    order: 6,
  },
];

export default function Timeline({
  title = "Where Are You Right Now?",
  periodLabel = "Preconception • Birth • Postpartum",
  textColor = "#FAF6EE",
  mutedTextColor = "rgba(250, 246, 238, 0.82)",
  activeColor = "#C8A45D",
  backgroundColor = "#7B1131",
  imageUrl = "/images/sleeping-newborn-heritage.jpg",
  imageAlt = "SEYOL Traditional Indian Mother & Baby Care",
  topData = defaultTopJourneyData,
  bottomData = defaultBottomJourneyData,
  duration,
  scrollDuration = 1.2,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const animationDuration = duration ?? scrollDuration;
  const normalizedDuration = Math.max(0.2, animationDuration);

  const topJourneyData = topData;
  const bottomJourneyData = bottomData;

  const allJourneyItems: JourneyItem[] = [
    ...topJourneyData,
    ...bottomJourneyData,
  ].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };

  useGSAP(() => {
    const section = sectionRef.current;

    if (!section) return;

    const isMobile = window.innerWidth < 600;
    const slidePercent = isMobile ? -57 : -65;
    const lineWidth = isMobile ? "65%" : "98%";
    const lineStart = isMobile ? "top 30%" : "top 25%";
    const slideEnd = isMobile ? "82% 50%" : "92% bottom";
    const lineEnd = isMobile ? "80% 50%" : "92% bottom";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: slideEnd,
        scrub: true,
      },
      defaults: {
        ease: "none",
      },
    });

    tl.fromTo(
      wholeSliderRef.current,
      { xPercent: 0 },
      { xPercent: slidePercent },
    );

    if (reducedMotion) {
      gsap.set(".journey-line", { width: lineWidth });
      return;
    }

    gsap.to(".journey-line", {
      width: lineWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: lineStart,
        end: lineEnd,
        scrub: true,
      },
    });
  }, { dependencies: [reducedMotion], scope: sectionRef });

  useGSAP(() => {
    const section = sectionRef.current;

    if (!section) return;

    const items = allJourneyItems;

    if (reducedMotion) {
      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(`.title-${item.id}`, { opacity: 1, clearProps: "transform" });
        gsap.set(`.description-${item.id}`, {
          opacity: 1,
          clearProps: "transform",
        });
      });
      return;
    }

    items.forEach((item) => {
      gsap.set(`.jl-${item.id}`, {
        scaleY: 0,
      });
      gsap.set(`.jd-${item.id}`, {
        scale: 0,
        transformOrigin: "center center",
      });
      gsap.set(`.title-${item.id}`, { opacity: 1 });
      gsap.set(`.description-${item.id}`, { opacity: 1 });
    });

    const titleSplits: Partial<Record<string, SplitTextInstance>> = {};
    const descriptionSplits: Partial<Record<string, SplitTextInstance>> = {};

    items.forEach((item) => {
      const titleEl = section.querySelector(`.title-${item.id}`);
      if (titleEl) {
        titleSplits[item.id] = new SplitText(titleEl, {
          type: "chars, words, lines",
          mask: "lines",
        });
      }

      const descEl = section.querySelector(`.description-${item.id}`);
      if (descEl) {
        descriptionSplits[item.id] = new SplitText(descEl, {
          type: "chars, words, lines",
          mask: "lines",
        });
      }
    });

    const createItemTimeline = (
      item: JourneyItem,
      startPos: number,
      endPos: number,
    ) => {
      const lineSelector = `.jl-${item.id}`;
      const dotSelector = `.jd-${item.id}`;
      const titleLines = titleSplits[item.id]?.lines || [];
      const descriptionLines = descriptionSplits[item.id]?.lines || [];

      const isTop = topJourneyData.some((topItem) => topItem.id === item.id);

      if (isTop) {
        gsap.set(lineSelector, { transformOrigin: "bottom center" });
      } else {
        gsap.set(lineSelector, { transformOrigin: "top center" });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: `${startPos}% 30%`,
          end: `${endPos}% 50%`,
          scrub: true,
        },
      });

      timeline
        .to(lineSelector, {
          scaleY: 1,
          duration: normalizedDuration * 0.4,
          ease: "none",
        })
        .to(
          dotSelector,
          {
            scale: 1,
            duration: normalizedDuration * 0.25,
            ease: "back.out(1.5)",
          },
          "-=0.15",
        )
        .fromTo(
          titleLines,
          { y: 100 },
          {
            y: 0,
            delay: -0.8 * normalizedDuration,
            duration: normalizedDuration,
            stagger: 0.02,
            ease: "power2.out",
          },
        )
        .fromTo(
          descriptionLines,
          { y: 100 },
          {
            y: 0,
            duration: normalizedDuration,
            stagger: 0.02,
            ease: "power2.out",
          },
          "<",
        );

      return timeline;
    };

    const positions: ReadonlyArray<readonly [number, number]> =
      window.innerWidth < 600
        ? [
            [22, 32],
            [28, 38],
            [36, 46],
            [45, 55],
            [52, 62],
            [60, 70],
            [69, 79],
          ]
        : [
            [6, 26],
            [16, 36],
            [26, 46],
            [35, 55],
            [45, 65],
            [55, 75],
            [65, 85],
          ];

    items.forEach((item, index) => {
      if (index < positions.length) {
        const [startPos, endPos] = positions[index];
        createItemTimeline(item, startPos, endPos);
      }
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      Object.values(titleSplits).forEach((split) => split?.revert?.());
      Object.values(descriptionSplits).forEach((split) => split?.revert?.());
      window.removeEventListener("resize", handleResize);
    };
  }, { dependencies: [normalizedDuration, reducedMotion], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="h-[200vw] max-[600px]:h-[400vh] w-full relative overflow-x-clip"
      style={sectionStyle}
    >
      <div className="h-screen w-full sticky top-[0%] pt-[8%] overflow-hidden max-[600px]:top-[5%] max-[600px]:pt-[12%]">
        <div
          ref={wholeSliderRef}
          className="mr-[2vw] flex h-[32vw] w-[240vw] items-center gap-[5vw] px-[5vw] max-[600px]:h-[80vh] max-[600px]:w-[800vw] max-[600px]:px-[7vw]"
        >
          {/* Hero Visual Card */}
          <div className="h-full w-[30vw] overflow-hidden rounded-[1.5vw] border-2 border-gold/40 shadow-2xl relative max-[600px]:h-[65vw] max-[600px]:w-[85vw] max-[600px]:rounded-[5vw]">
            <img
              src={imageUrl}
              alt={imageAlt}
              draggable={false}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold-light">
                SEYOL Heritage Care
              </span>
              <p className="font-serif text-sm sm:text-base font-bold text-white drop-shadow">
                Ancient Traditions &bull; Modern Family Healing
              </p>
            </div>
          </div>

          <div className="relative h-full w-full">
            {/* Central Animated Journey Line */}
            <div className="w-full absolute left-0 top-1/2 -translate-y-1/2 flex items-center h-fit pointer-events-none">
              <div
                className="h-[.8vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] w-[.8vw] rounded-full shadow-[0_0_12px_rgba(200,164,93,0.8)]"
                style={activeStyle}
              ></div>
              <div
                className="h-[2px] w-[0%] rounded-full journey-line shadow-[0_0_10px_rgba(200,164,93,0.6)]"
                style={activeStyle}
              ></div>
              <div
                className="h-[.8vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] w-[.8vw] rounded-full shadow-[0_0_12px_rgba(200,164,93,0.8)]"
                style={activeStyle}
              ></div>
            </div>

            {/* Top Milestones Row */}
            <div className="flex h-1/2 w-full items-center justify-start">
              <div className="h-full w-[42vw] shrink-0 pr-[4vw] pt-[2vw] max-[600px]:w-[95vw] max-[600px]:h-fit max-[600px]:pt-[5vw]">
                <h2 className="font-sans font-extrabold text-[2.4vw] leading-none tracking-tight text-white whitespace-nowrap max-[600px]:text-[6vw]">
                  {title}
                </h2>
              </div>

              <div className="w-full flex h-full gap-x-[16vw] max-[600px]:gap-x-[40vw]">
                {topJourneyData.map((item) => (
                  <div
                    key={`top-${item.id}`}
                    className="relative h-full w-[28vw] px-[3vw] max-[600px]:flex max-[600px]:w-[70vw] max-[600px]:flex-col max-[600px]:px-[7vw]"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[2.5vw] max-[600px]:w-[6vw] -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
                      <div
                        className={`size-[1vw] max-[600px]:size-[2.5vw] shrink-0 rounded-full shadow-[0_0_10px_rgba(200,164,93,0.9)] jd-${item.id}`}
                        style={activeStyle}
                      />
                      <div
                        className={`w-[2px] flex-1 -mt-[2px] origin-bottom rounded-full jl-${item.id}`}
                        style={activeStyle}
                      />
                    </div>

                    <div className="mt-[-1vw] space-y-[0.8vw] max-[600px]:mt-[-2vw]">
                      <h4
                        className={`title-${item.id} font-serif font-bold text-[2.2vw] leading-none text-white max-[600px]:text-[6.4vw]`}
                      >
                        <span className="text-gold-light text-[1.4vw] max-[600px]:text-[4vw] block font-sans uppercase font-bold tracking-wider mb-1">
                          {item.year}
                        </span>
                        {item.month}
                      </h4>
                      <p
                        className={`description-${item.id} w-[95%] text-[1.25vw] leading-[1.3] font-normal text-cream-light/85 max-[600px]:w-[90%] max-[600px]:text-[4.5vw]`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Milestones Row */}
            <div className="h-1/2 flex items-center justify-start w-full">
              <div className="h-full w-[42vw] shrink-0 pr-[4vw] pt-[2vw] max-[600px]:w-[95vw] max-[600px]:pt-[5vw]">
                <p
                  className="font-sans font-bold tracking-wider uppercase text-[1.1vw] leading-none text-gold-light whitespace-nowrap max-[600px]:text-[3.6vw]"
                  style={mutedTextStyle}
                >
                  {periodLabel}
                </p>
              </div>

              <div className="w-full flex h-full gap-x-[16vw] max-[600px]:gap-x-[40vw]">
                {bottomJourneyData.map((item) => (
                  <div
                    key={`bottom-${item.id}`}
                    className="relative h-full w-[28vw] px-[3vw] max-[600px]:w-[70vw] max-[600px]:px-[7vw]"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[2.5vw] max-[600px]:w-[6vw] -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
                      <div
                        className={`w-[2px] flex-1 -mb-[2px] origin-top rounded-full jl-${item.id}`}
                        style={activeStyle}
                      />
                      <div
                        className={`size-[1vw] max-[600px]:size-[2.5vw] shrink-0 rounded-full shadow-[0_0_10px_rgba(200,164,93,0.9)] jd-${item.id}`}
                        style={activeStyle}
                      />
                    </div>

                    <div className="flex h-full w-full flex-col justify-end space-y-[0.8vw]">
                      <h4
                        className={`title-${item.id} font-serif font-bold text-[2.2vw] leading-none text-white max-[600px]:text-[6.4vw]`}
                      >
                        <span className="text-gold-light text-[1.4vw] max-[600px]:text-[4vw] block font-sans uppercase font-bold tracking-wider mb-1">
                          {item.year}
                        </span>
                        {item.month}
                      </h4>
                      <p
                        className={`description-${item.id} w-[95%] text-[1.25vw] leading-[1.3] font-normal text-cream-light/85 max-[600px]:w-[90%] max-[600px]:text-[4.5vw]`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
