'use client';

import React from 'react';
import Link from 'next/link';

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

export const FindYourCare: React.FC = () => {
  return (
    <div className="w-full font-sans">
      {/* SECTION: CHOOSE BY STAGE */}
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
    </div>
  );
};

export default FindYourCare;
