'use client';

import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

import babyBathImg from '../../assets4/baby bath.jpg';
import babyMassageImg from '../../assets4/baby massage.JPG';
import babySleepImg from '../../assets4/baby sleep.JPG';
import motherCareImg from '../../assets4/mother care.jpg';

interface RoutineCardItem {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
  href: string;
  objectPosition: string;
}

const ROUTINES: RoutineCardItem[] = [
  {
    id: 'bath-time',
    title: 'Bath Time',
    description: 'Make bath time a comforting ritual with thoughtfully selected care.',
    image: babyBathImg,
    alt: 'Bath and body care essentials for baby',
    href: '/products',
    objectPosition: 'center 15%',
  },
  {
    id: 'baby-massage',
    title: 'Baby Massage',
    description: 'Create a soothing bonding moment with gentle massage essentials.',
    image: babyMassageImg,
    alt: 'Massage oil and relaxation essentials',
    href: '/products',
    objectPosition: 'center 50%',
  },
  {
    id: 'bedtime-routine',
    title: 'Bedtime Routine',
    description: 'Settle into quieter evenings with a simple, calming care ritual.',
    image: babySleepImg,
    alt: 'Soft and calming sleep essentials for newborn',
    href: '/products',
    objectPosition: 'center 42%',
  },
  {
    id: 'mom-self-care',
    title: "Mom's Self-Care",
    description: 'Make room for yourself with nourishing essentials for everyday care.',
    image: motherCareImg,
    alt: 'A peaceful self-care and postpartum wellness setting',
    href: '/products',
    objectPosition: 'center 20%',
  },
];

export const ShopByRoutine: React.FC = () => {
  const { homeSettings } = useAdminData();

  const routineImageMap: Record<string, string | undefined> = {
    'bath-time': homeSettings?.routineBathImage,
    'baby-massage': homeSettings?.routineMassageImage,
    'bedtime-routine': homeSettings?.routineSleepImage,
    'mom-self-care': homeSettings?.routineMomCareImage,
  };

  return (
    <section className="w-full bg-[#F8F5EF] text-[#292E29] py-16 sm:py-20 lg:py-24 border-b border-[#EAE1D5]">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Routine Header (Centered) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="text-[#7B1131] text-xs font-bold tracking-[3px] uppercase">
            SEY by SEYOL · Everyday Rituals
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-semibold text-[#7B1131] tracking-tight leading-[1.15]">
            Shop by Routine
          </h2>
          <p className="text-[#6E5652] text-sm sm:text-base leading-[1.8] max-w-2xl mx-auto">
            Thoughtfully chosen essentials for the little moments that matter. Discover a care routine made for you and your baby&apos;s everyday needs.
          </p>
          <div className="pt-1">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-[#7B1131] hover:text-[#5A0C24] font-bold text-xs sm:text-[13px] border-b-2 border-[#7B1131] pb-1 transition-all group"
            >
              <span>Explore All Products</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Routine Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {ROUTINES.map((routine) => {
            const customImage = routineImageMap[routine.id];
            const activeImage = customImage || routine.image;
            const isCustomString = typeof activeImage === 'string';

            return (
              <article
                key={routine.id}
                className="group bg-white rounded-[14px] overflow-hidden border border-[#EAE5DC] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(123,17,49,0.11)] hover:border-[#7B1131]/30 flex flex-col justify-between"
              >
                {/* Routine Image without overlay tag */}
                <div className="relative h-[270px] sm:h-[285px] w-full overflow-hidden bg-[#E9E5DC]">
                  <Image
                    src={activeImage}
                    alt={routine.alt}
                    fill
                    unoptimized={isCustomString}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectPosition: routine.objectPosition }}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                  />
                </div>

                {/* Routine Info */}
                <div className="p-5 sm:p-5.5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-[21px] sm:text-[22px] font-semibold text-[#292E29] group-hover:text-[#7B1131] transition-colors mb-2 leading-snug">
                      {routine.title}
                    </h3>
                    <p className="text-[#6E5652] text-xs sm:text-[13px] leading-[1.8] min-h-[58px] mb-4">
                      {routine.description}
                    </p>
                  </div>

                  <Link
                    href={routine.href}
                    className="w-full flex items-center justify-between bg-[#7B1131] hover:bg-[#5A0C24] text-white py-3 px-4 rounded-lg font-semibold text-xs sm:text-[13px] tracking-wide transition-all duration-200 shadow-xs group/btn cursor-pointer"
                  >
                    <span>Shop Now</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Routine Note */}
        <div className="text-center mt-9 text-xs sm:text-[13px] text-[#7A6363] tracking-wide font-serif italic">
          Thoughtful care for every little moment and every stage of motherhood.
        </div>

      </div>
    </section>
  );
};

export default ShopByRoutine;
