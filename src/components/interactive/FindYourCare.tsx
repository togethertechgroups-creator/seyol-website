'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Heart,
  Sprout,
  ArrowRight, 
  RotateCcw,
  Check
} from 'lucide-react';

import pregnancyStageImg from '../../assets4/preganancy servicepg.JPG';
import newbornStageImg from '../../assets4/newborn servicepg.jpg';
import postpartumStageImg from '../../assets4/post service pg.jpg';
import growingTogetherStageImg from '../../assets4/guid servicepg.jpg';

interface StageCardItem {
  id: string;
  title: string;
  description: string;
  imgSrc: any;
  imgAlt: string;
  href: string;
  objectPosition?: string;
}

const STAGE_CARDS: StageCardItem[] = [
  {
    id: 'pregnancy',
    title: 'Pregnancy',
    description: 'Prepare for birth with nurturing guidance and support throughout pregnancy.',
    imgSrc: pregnancyStageImg,
    imgAlt: 'Pregnancy journey',
    href: '/services/preconception-support',
    objectPosition: 'center 55%',
  },
  {
    id: 'newborn',
    title: 'Newborn Care',
    description: 'Learn the basics of newborn care, feeding and everyday baby routines.',
    imgSrc: newbornStageImg,
    imgAlt: 'Newborn and parent care',
    href: '/services/birth-doula-support',
    objectPosition: 'center 15%',
  },
  {
    id: 'postpartum',
    title: 'Postpartum',
    description: 'Find support for maternal recovery, wellbeing and adjusting to life after birth.',
    imgSrc: postpartumStageImg,
    imgAlt: 'Motherhood and self-care',
    href: '/services/postpartum-massage-and-wrap',
    objectPosition: 'center 8%',
  },
  {
    id: 'parenting',
    title: 'Growing Together',
    description: 'Build parenting confidence with practical skills for your growing family.',
    imgSrc: growingTogetherStageImg,
    imgAlt: 'Family and parenting journey',
    href: '/services/holistic-care-guidance-consultation',
    objectPosition: 'center 20%',
  },
];

interface NeedOption {
  id: string;
  bookingServiceId: string;
  strong: string;
  small: string;
}

const NEED_OPTIONS: NeedOption[] = [
  {
    id: 'pregnancy',
    bookingServiceId: 'prenatal-massage',
    strong: 'Pregnancy Guidance',
    small: "Prepare for your baby's arrival",
  },
  {
    id: 'newborn',
    bookingServiceId: 'infant-massage-bath',
    strong: 'Newborn Baby Care',
    small: 'Feeding, bathing and daily care',
  },
  {
    id: 'postpartum',
    bookingServiceId: 'postpartum-massage-wrap',
    strong: 'Postpartum Recovery',
    small: 'Care and support after birth',
  },
  {
    id: 'massage',
    bookingServiceId: 'infant-massage-bath',
    strong: 'Baby Massage',
    small: 'Gentle massage guidance',
  },
  {
    id: 'parenting',
    bookingServiceId: 'general-consultation',
    strong: 'Parenting Confidence',
    small: 'Learn practical parenting skills',
  },
  {
    id: 'selfcare',
    bookingServiceId: 'postpartum-massage-wrap',
    strong: "Mom's Self-Care",
    small: 'Make time for your wellbeing',
  },
];

export const FindYourCare: React.FC = () => {
  const router = useRouter();

  // Multi-select Care Interests
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  const handleToggleNeed = (needId: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(needId) ? prev.filter((id) => id !== needId) : [...prev, needId]
    );
  };

  const handleClearSelection = () => {
    setSelectedNeeds([]);
  };

  const handleFindMyCare = () => {
    if (selectedNeeds.length === 0) return;
    const match = NEED_OPTIONS.find((opt) => opt.id === selectedNeeds[0]);
    if (match) {
      router.push(`/book?service=${match.bookingServiceId}&interests=${selectedNeeds.join(',')}`);
    } else {
      router.push('/book');
    }
  };

  return (
    <div className="w-full font-sans">
      {/* SECTION 1: CHOOSE BY STAGE */}
      <section className="w-full bg-[#FAF6EE] text-[#70152B] py-16 sm:py-20 lg:py-24 border-b border-[#EAE1D5]" id="choose-stage">
        <div className="max-w-[96%] xl:max-w-[95%] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <header className="text-center max-w-[680px] mx-auto mb-10 sm:mb-14">
            <div className="text-[#70152B] text-xs font-bold tracking-[3px] uppercase mb-3 sm:mb-4">
              Care for Every Chapter
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#70152B] leading-[1.2] mb-4 tracking-tight">
              Choose by Stage
            </h2>
            <p className="text-[#6E5652] text-sm sm:text-base leading-[1.8]">
              Wherever you are in your motherhood journey, find
              thoughtful care and guidance for your next step.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {STAGE_CARDS.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className="group bg-white border border-[#EAE1D5] hover:border-[#70152B] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-warm-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-[280px] sm:h-[260px] lg:h-[295px] xl:h-[305px] relative overflow-hidden bg-[#FAF0EB]">
                    <img
                      src={typeof card.imgSrc === 'string' ? card.imgSrc : card.imgSrc.src}
                      alt={card.imgAlt}
                      loading="lazy"
                      style={{ objectPosition: card.objectPosition || 'center top' }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 sm:p-6 pb-2">
                    <h3 className="font-serif text-xl sm:text-[22px] font-semibold text-[#70152B] group-hover:text-[#580F21] transition-colors mb-2.5">
                      {card.title}
                    </h3>
                    <p className="text-[#6E5652] text-xs sm:text-[13px] leading-[1.8] min-h-[52px]">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-2">
                  <div className="inline-flex items-center gap-1.5 text-[#70152B] font-bold text-xs sm:text-[13px] group-hover:gap-2.5 transition-all">
                    <span>Explore This Stage</span>
                    <span className="text-sm font-bold">↗</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 2: WHAT KIND OF SUPPORT DO YOU NEED? (USER MOCKUP DESIGN) */}
      <section className="w-full bg-[#FAF7F2] text-[#70152B] py-16 sm:py-20 lg:py-24 border-t border-[#ECE5DD]" id="service-finder">
        <div className="max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          
          {/* Main Centered Header */}
          <header className="text-center max-w-2xl mx-auto space-y-2.5">
            <div className="text-[#70152B] text-xs font-bold tracking-[2.5px] uppercase">
              YOUR JOURNEY, YOUR WAY
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[40px] font-semibold text-[#70152B] tracking-tight leading-[1.2]">
              What kind of support do you need?
            </h2>
            <p className="text-[#6E5652] text-xs sm:text-sm md:text-base leading-relaxed">
              Choose what feels right for you. We&apos;ll help you find the right care.
            </p>
          </header>

          {/* Two Top Summary / Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: Personalised */}
            <div className="bg-[#EFE9DF] rounded-2xl p-5 sm:p-6 flex items-start gap-4 border border-[#E5DAD0]/80 shadow-xs">
              <div className="text-[#70152B] pt-0.5 shrink-0">
                <Heart className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#70152B]">
                  Personalised
                </h4>
                <p className="text-xs sm:text-sm text-[#6E5652]">
                  Care for your stage
                </p>
              </div>
            </div>

            {/* Card 2: Thoughtful */}
            <div className="bg-[#EFE9DF] rounded-2xl p-5 sm:p-6 flex items-start gap-4 border border-[#E5DAD0]/80 shadow-xs">
              <div className="text-[#70152B] pt-0.5 shrink-0">
                <Sprout className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#70152B]">
                  Thoughtful
                </h4>
                <p className="text-xs sm:text-sm text-[#6E5652]">
                  Support that fits you
                </p>
              </div>
            </div>
          </div>

          {/* Middle Sub-header */}
          <div className="space-y-1 pt-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#70152B]">
              Choose your care interests
            </h3>
            <p className="text-xs sm:text-sm text-[#6E5652]">
              Select one or more options to personalise your recommendations.
            </p>
          </div>

          {/* 6 Care Cards (3 Cards Per Row in 2 Rows as Requested by User) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {NEED_OPTIONS.map((option) => {
              const isSelected = selectedNeeds.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleToggleNeed(option.id)}
                  aria-pressed={isSelected}
                  className={`text-left rounded-2xl p-5 sm:p-6 min-h-[135px] transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-[#FAF0EB] border-2 border-[#70152B] shadow-warm-sm -translate-y-0.5'
                      : 'bg-white border-[#E5DAD0] hover:border-[#70152B]/60 hover:bg-[#FAF9F5] shadow-xs'
                  }`}
                >
                  {/* Top Row: Right circle indicator (Numbers 1, 2, 3 completely removed!) */}
                  <div className="flex items-center justify-end w-full mb-3">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#70152B] text-white border-2 border-[#70152B]'
                          : 'bg-[#CFC6BD]/80 border-2 border-[#CFC6BD]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                  </div>

                  {/* Card Content Area */}
                  <div className="space-y-1">
                    <h4 className="font-serif text-base sm:text-[17px] font-bold text-[#70152B] leading-snug">
                      {option.strong}
                    </h4>
                    <p className="text-[#6E5652] text-xs sm:text-[13px] leading-relaxed">
                      {option.small}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Action Area: Selection Count, Clear Selection & Find My Care CTA */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-[#6E5652] font-medium">
                {selectedNeeds.length} selected
              </span>
              <button
                type="button"
                onClick={handleClearSelection}
                disabled={selectedNeeds.length === 0}
                className="text-[#6E5652] hover:text-[#70152B] font-semibold transition-colors disabled:opacity-40 disabled:hover:text-[#6E5652] cursor-pointer"
              >
                Clear selection
              </button>
            </div>

            {/* Find My Care Button */}
            <button
              type="button"
              onClick={handleFindMyCare}
              disabled={selectedNeeds.length === 0}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-xs ${
                selectedNeeds.length > 0
                  ? 'bg-[#70152B] hover:bg-[#580F21] text-white shadow-warm-md hover:shadow-warm-lg cursor-pointer active:scale-[0.99]'
                  : 'bg-[#ECE5DD] text-[#8C7D73] cursor-not-allowed'
              }`}
            >
              <span>Find My Care</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Bottom Caption */}
            <p className="text-center text-xs text-[#8C7D73] pt-1">
              Gentle guidance for every stage of your journey.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default FindYourCare;
