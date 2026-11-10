'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

import infantMassageImg from '../../assets4/baby massage.JPG';
import postpartumWrapImg from '../../assets4/Postpartum Massage & Wrap.JPG';
import birthPrepImg from '../../assets4/preganancy care .jpg';
import confinementPrepImg from '../../assets4/Parenting Classes.JPEG';

interface CoreOffering {
  id: string;
  category: string;
  categoryType: 'service' | 'class';
  title: string;
  description: string;
  imgSrc: any;
  linkHref: string;
  actionText: string;
}

const CORE_OFFERINGS: CoreOffering[] = [
  {
    id: 'infant-massage-bath',
    category: 'CLINICAL SERVICE',
    categoryType: 'service',
    title: 'Signature Infant Massage & Bath',
    description:
      'Traditional Indian newborn bodywork with safe head-holding, gentle colic relief strokes, and calming warm bath rituals.',
    imgSrc: infantMassageImg,
    linkHref: '/services/infant-massage-and-bath',
    actionText: 'Explore Service',
  },
  {
    id: 'postpartum-massage-wrap',
    category: 'CLINICAL SERVICE',
    categoryType: 'service',
    title: 'Postpartum Massage & Wrap',
    description:
      'Sacred 40-day Mandalam recovery, hot herbal Kizhi fomentation, uterine tonification, and traditional Bengkung belly binding.',
    imgSrc: postpartumWrapImg,
    linkHref: '/services/postpartum-massage-and-wrap',
    actionText: 'Explore Service',
  },
  {
    id: 'birth-prep-class',
    category: 'PARENT WORKSHOP',
    categoryType: 'class',
    title: 'Birth Preparation Class',
    description:
      'Evidence-informed labour physiology, partner counterpressure comfort techniques, breathing rhythms, and hospital sanctuary prep.',
    imgSrc: birthPrepImg,
    linkHref: '/classes/preparing-for-birth-with-seyol',
    actionText: 'Book a Class',
  },
  {
    id: 'postpartum-prep-class',
    category: 'PARENT WORKSHOP',
    categoryType: 'class',
    title: 'Postpartum & Confinement Preparation Class',
    description:
      'Master sacred fourth-trimester healing, Ayurvedic confinement nutrition, maternal restorative rest, and newborn bonding.',
    imgSrc: confinementPrepImg,
    linkHref: '/classes/postpartum-and-confinement-preparation',
    actionText: 'Book a Class',
  },
];

export const MostParentsStartHere: React.FC = () => {
  return (
    <section 
      id="your-journey-our-care"
      className="w-full bg-[#FAF6EE] text-[#3A1D1D] py-16 sm:py-20 lg:py-24 border-b border-[#EAE1D5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Heading: "Your Journey, Our Care" */}
        <header className="text-center max-w-[760px] mx-auto mb-12 sm:mb-16">
          <div className="text-[#7B1131] text-xs font-heading font-extrabold tracking-[3px] uppercase mb-3">
            MOST PARENTS START HERE
          </div>
          
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-extrabold text-[#7B1131] leading-[1.15] mb-4 tracking-tight">
            Your Journey, Our Care
          </h2>
          
          <p className="text-[#6E5652] text-sm sm:text-base leading-[1.8] max-w-2xl mx-auto">
            Discover SEYOL&apos;s core clinical services and parent-empowering workshops designed to support every sacred stage of your motherhood journey.
          </p>
        </header>

        {/* 4 Image-Based Offering Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6.5 lg:gap-7 items-stretch">
          {CORE_OFFERINGS.map((item) => (
            <article 
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#EAE1D5] hover:border-[#7B1131]/40 shadow-[0_8px_30px_rgba(58,29,29,0.06)] hover:shadow-[0_20px_45px_rgba(58,29,29,0.14)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              {/* Card Image Container */}
              <div className="relative w-full aspect-[4/3] sm:h-[210px] overflow-hidden bg-[#FAF6EE]">
                <Image
                  src={item.imgSrc}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Category Badge on Image */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span 
                    className={`inline-block px-3 py-1 rounded-full text-[10px] font-heading font-extrabold tracking-wider shadow-xs ${
                      item.categoryType === 'service'
                        ? 'bg-[#7B1131] text-white border border-white/20'
                        : 'bg-[#C8A45D] text-[#3A1D1D] border border-white/30'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="font-heading text-lg sm:text-[19px] font-extrabold text-[#7B1131] group-hover:text-[#5A0C24] transition-colors leading-snug min-h-[48px] flex items-center">
                    <Link href={item.linkHref} className="hover:underline">
                      {item.title}
                    </Link>
                  </h3>
                  
                  <p className="text-xs sm:text-[13px] text-[#6E5652] leading-relaxed line-clamp-3 min-h-[56px]">
                    {item.description}
                  </p>
                </div>

                {/* Card Action CTA Button */}
                <div className="pt-2">
                  <Link
                    href={item.linkHref}
                    className="w-full py-3 px-4 rounded-xl bg-[#FAF6EE] group-hover:bg-[#7B1131] text-[#7B1131] group-hover:text-white font-heading font-bold text-xs tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 border border-[#EAE1D5] group-hover:border-[#7B1131] shadow-2xs hover:scale-[1.02]"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Section Footer: Supporting Links */}
        <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-[#7B1131] hover:bg-[#5A0C24] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-heading font-bold tracking-wide transition-all duration-200 shadow-warm-md hover:shadow-warm-lg hover:scale-[1.02] cursor-pointer"
          >
            <span>Explore All 10 Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 bg-transparent hover:bg-[#FAF0EB] text-[#7B1131] border border-[#7B1131]/40 hover:border-[#7B1131] px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-heading font-bold tracking-wide transition-all duration-200 cursor-pointer"
          >
            <span>Browse All 8 Workshops</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default MostParentsStartHere;
