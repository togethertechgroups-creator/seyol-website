'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ExpandingCards, CardItem } from '@/components/ui/expanding-cards';

import pregnancyCareImg from '../../assets4/preganancy care .jpg';
import newbornCareImg from '../../assets4/new born baby care.jpg';
import postpartumCareImg from '../../assets4/Postpartum Care.jpg';
import parentingClassesImg from '../../assets4/Parenting Classes.JPEG';

const PARENT_CARDS: CardItem[] = [
  {
    id: 'pregnancy-care',
    title: 'Pregnancy Care',
    description:
      'Feel supported through pregnancy with nurturing guidance, mindful practices and preparation for birth.',
    imgSrc: pregnancyCareImg,
    linkHref: '/pregnancy-care',
    actionText: 'Explore Care',
    objectPosition: 'center 0%',
  },
  {
    id: 'newborn-care',
    title: 'Newborn Baby Care',
    description:
      'Learn the essentials of newborn care, soothing, feeding routines and creating a comforting environment.',
    imgSrc: newbornCareImg,
    linkHref: '/newborn-care',
    actionText: 'Explore Care',
    objectPosition: 'center 0%',
  },
  {
    id: 'postpartum-care',
    title: 'Postpartum Care',
    description:
      'Give yourself space to recover with thoughtful maternal care, rest and emotional support after birth.',
    imgSrc: postpartumCareImg,
    linkHref: '/postpartum-care',
    actionText: 'Explore Care',
    objectPosition: '20% 0%',
  },
  {
    id: 'parenting-classes',
    title: 'Parenting Classes',
    description:
      'Build confidence with practical learning, expert-led guidance and skills for your growing family.',
    imgSrc: parentingClassesImg,
    linkHref: '/parenting-classes',
    actionText: 'Explore Classes',
    objectPosition: 'center 0%',
  },
];

export const MostParentsStartHere: React.FC = () => {
  return (
    <section className="w-full bg-[#FAF6EE] text-[#292E29] py-16 sm:py-20 lg:py-24 border-b border-[#EAE1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <header className="text-center max-w-[680px] mx-auto mb-10 sm:mb-12">
          <div className="text-[#7B1131] text-xs font-bold tracking-[3px] uppercase mb-3 sm:mb-4">
            Your Journey, Our Care
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-semibold text-[#7B1131] leading-[1.2] mb-4 sm:mb-4.5 tracking-tight">
            Most Parents Start Here
          </h2>
          <p className="text-[#6E5652] text-sm sm:text-base leading-[1.8]">
            Every family&apos;s journey is different. Find thoughtful care,
            trusted guidance and practical support for every stage
            of motherhood and early parenthood.
          </p>
        </header>

        {/* Expanding Cards Animation */}
        <div className="flex justify-center w-full">
          <ExpandingCards items={PARENT_CARDS} defaultActiveIndex={0} />
        </div>

        {/* Section Footer */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-[#7B1131] hover:bg-[#5A0C24] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 shadow-warm-md hover:shadow-warm-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default MostParentsStartHere;
