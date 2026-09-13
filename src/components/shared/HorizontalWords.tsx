import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import babyFaceImg from '../../assets4/Sleeping_Cartoon_Baby_Face_PNG_Transparent_With_Clear_Background_ID_173600___TopPNG-removebg-preview.png';
import bgImageSrc from '../../assets4/ChatGPT Image Aug 19, 2026, 08_18_59 PM.png';
import './HorizontalWords.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const HorizontalWords = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const container = sectionRef.current;
        if (!container) return;

        const ctx = gsap.context(() => {
            const textRef = container.querySelector('.horizontal-words__relative');
            const letters = container.querySelectorAll('.letter');
            const stickers = container.querySelectorAll('.horizontal-words__sticker-watch, .horizontal-words__sticker-cursor, .horizontal-words__sticker-phone');
            const arrows = container.querySelectorAll('.horizontal-words__arrow-svg path, .horizontal-words__arrow-end-svg path');

            // 1. Horizontal ScrollTween with Pinning
            const scrollTween = gsap.fromTo(textRef, {
                xPercent: 50 // Start position
            }, {
                xPercent: -100, // End position
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=2200", // Scroll length
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });

            // 2. Elastic Bounce & Rotation for each letter
            letters.forEach((letter) => {
                gsap.from(letter, {
                    yPercent: (Math.random() - 0.5) * 500,
                    rotation: (Math.random() - 0.5) * 60,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: letter,
                        containerAnimation: scrollTween,
                        start: 'left 90%',
                        end: 'left 10%',
                        scrub: 0.5
                    }
                });
            });

            // 3. Stickers Bounce Animation
            stickers.forEach((sticker) => {
                gsap.from(sticker, {
                    scale: 0,
                    yPercent: (Math.random() - 0.5) * 400,
                    rotation: (Math.random() - 0.5) * 60,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: sticker,
                        containerAnimation: scrollTween,
                        start: 'left 90%',
                        end: 'left 10%',
                        scrub: 0.5
                    }
                });
            });

            // 4. SVG Arrow Drawing Animation
            arrows.forEach((arrowPath: any) => {
                if (arrowPath.getTotalLength) {
                    const pathLen = arrowPath.getTotalLength();
                    gsap.set(arrowPath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
                    gsap.to(arrowPath, {
                        strokeDashoffset: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: arrowPath.parentElement,
                            containerAnimation: scrollTween,
                            start: 'left 90%',
                            end: 'left 30%',
                            scrub: 0.5
                        }
                    });
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="horizontal-words-section content-section relative overflow-hidden">
            {/* Ambient Aesthetic Background Image - Shifted down to merge directly with the curve */}
            <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
                <Image
                    src={bgImageSrc}
                    alt="Parenthood Journey Background"
                    fill
                    priority={false}
                    className="object-cover object-[center_75%] sm:object-[center_80%] lg:object-[center_85%] opacity-90 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#f7f4ef]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="horizontal-words__relative relative z-10">
                <div className="horizontal-words__sticker-svg">
                    {/* Top Arrow SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 386 127" fill="none" className="horizontal-words__arrow-svg text-maroon">
                        <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    {/* Thumbs-up / Watch Sticker */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 104 134" fill="none" className="horizontal-words__sticker-watch">
                        <path d="M102.369 108.557C98.1432 118.675 89.4469 121.518 79.9347 124.888C76.1885 126.151 72.4937 127.755 68.6287 128.523C65.5437 129.038 62.2688 128.781 59.1561 129.418C55.8217 130.012 52.7051 131.395 49.3985 132.088C44.2028 133.299 38.3854 133.485 33.075 132.369C20.5215 129.383 9.82922 119.744 4.43557 108.184C1.15662 101.052 0.115111 91.8055 1.24374 84.0279C1.84963 80.0559 3.31487 76.2661 4.58209 72.504C6.26513 67.4668 7.52444 62.1009 7.52048 56.7745C7.5086 52.9451 6.37602 49.3691 5.35431 45.5714C4.51873 42.5023 3.77028 39.4056 3.10498 36.3008C2.20604 32.214 1.64767 27.9649 2.76837 23.8701C4.34053 17.5934 9.59953 12.0532 16.205 11.3641C20.1453 10.8929 24.0697 12.3423 27.808 13.7402C30.4494 14.6431 33.2413 16.342 35.6411 17.3716C38.4488 18.5676 40.5199 17.328 41.8268 14.5401C43.1534 11.9304 43.9771 8.97225 45.7987 6.61995C49.8103 0.980782 57.9641 -1.39923 64.13 1.95497C67.0605 3.4598 69.4009 6.00615 72.1017 7.81591C74.2045 9.29302 76.4974 10.4969 78.4734 12.1443C84.271 16.7974 85.269 23.9454 82.5444 30.7884C80.996 35.3504 74.8579 42.1539 79.9981 46.011C80.7267 46.5733 81.59 47.0485 82.4058 47.5198C85.5264 49.2306 88.6311 51.967 90.4725 55.2182C92.3971 58.5724 92.9991 62.1761 94.8207 65.463C95.8107 67.4034 97.074 69.2567 97.8621 71.3081C99.1491 75.082 99.4659 79.1134 100.757 82.8992C102.008 86.5267 102.305 90.364 102.864 94.134C103.727 99.0762 104.559 103.563 102.396 108.481L102.361 108.565L102.369 108.557Z" fill="#E6FAB9"/>
                        <path d="M89.4665 98.4901C84.7184 93.3499 88.4765 96.1496 89.0586 91.3461C89.1537 89.1997 88.5676 86.788 87.0628 85.2158C86.2747 84.3723 85.2292 83.8456 84.156 83.4377C83.1343 82.9269 84.0966 81.8022 84.354 81.0696C84.8213 80.0954 85.3124 79.1569 85.6094 78.1154C86.2945 75.771 85.356 74.1632 83.3838 73.0306C81.974 72.0485 80.485 71.0902 78.5882 70.813C77.8357 70.7298 77.7961 70.3457 78.1288 69.7635C82.3621 61.8473 78.3743 58.4377 70.9135 56.0814C67.2267 55.032 63.4606 55.2063 59.7144 55.5587C54.9939 55.8874 50.3646 56.8338 45.6758 57.4793C43.3592 57.6853 40.5515 57.2576 38.9872 55.3488C38.2942 54.4301 38.0091 53.2737 37.5378 52.2164C36.4845 49.9235 35.5499 47.5633 34.8925 45.1159C34.0569 41.7142 33.3679 38.2769 31.9264 35.0652C30.9166 32.9545 30.1642 30.6695 28.7662 28.7687C26.9961 26.4639 24.2993 25.165 21.3569 25.2442C20.153 25.3868 19.4838 24.2423 18.5809 23.6641C14.7871 21.0029 11.9952 26.9233 12.815 30.028C13.6822 33.9643 14.4901 37.8927 15.4841 41.7895C16.9295 46.4861 18.4106 51.3095 18.8224 56.228C18.8502 56.9329 18.7789 57.6378 18.6482 58.3347C17.8324 62.2552 18.0581 66.3539 16.581 70.1477C16.2127 70.9595 16.6048 71.8862 16.4345 72.7019C15.6346 75.0027 14.3634 77.157 13.6228 79.4895C12.7952 81.8379 11.9952 84.2694 11.5755 86.7563C11.3379 88.8037 11.5874 90.8708 11.7656 92.9341C11.9873 94.823 12.015 96.7397 12.4507 98.593C13.1833 101.638 14.5891 104.482 16.3078 107.198C19.0521 111.337 22.7509 114.695 26.8337 117.538C27.4158 117.867 28.1405 117.788 28.7346 118.096C29.7167 118.714 30.6433 119.542 31.7482 119.95C36.0488 121.554 42.2741 121.443 46.6777 120.049C48.7013 119.348 50.8279 118.932 52.7446 117.958C55.2038 116.552 57.5482 113.97 60.5064 115.994C61.7261 116.809 63.2943 116.889 64.712 116.964C65.3218 116.952 65.9475 116.782 66.5257 116.485C67.8959 115.748 69.1948 114.988 70.5531 114.287C71.6936 113.602 73.0916 114.196 74.3113 113.721C75.0122 113.515 75.6814 113.198 76.3388 112.885C78.2555 111.939 80.4296 111.297 82.477 110.493C85.8312 109.186 88.9438 107.476 90.2269 103.896C90.9555 102.094 91.0228 100.011 89.5299 98.5534L89.4784 98.494L89.4665 98.4901Z" fill="#A0325A"/>
                    </svg>

                    {/* Sleeping Cartoon Baby Face PNG Sticker */}
                    <div className="horizontal-words__sticker-cursor">
                        <Image
                            src={babyFaceImg}
                            alt="Sleeping Baby Face"
                            width={160}
                            height={160}
                            className="w-full h-auto object-contain drop-shadow-xl select-none pointer-events-none"
                        />
                    </div>

                    {/* End Arrow SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 140 127" fill="none" className="horizontal-words__arrow-end-svg text-maroon">
                        <path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.437 125.078L99.6875 107.891" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.438 125.078L137.969 110.234" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    {/* Kinetic Typography */}
                    <h2 className="display horizontal-words__h2 font-serif text-brown" aria-label="Your Trusted Partner In The Beautiful Journey Of Parenthood">
                        {[
                            { text: "Your", whiteLetters: [] },
                            { text: "Trusted", whiteLetters: [3] }, // 's'
                            { text: "Partner", whiteLetters: [5] }, // 'e'
                            { text: "In", whiteLetters: [] },
                            { text: "The", whiteLetters: [] },
                            { text: "Beautiful", whiteLetters: [8] }, // 'l'
                            { text: "Journey", whiteLetters: [6] }, // 'y'
                            { text: "Of", whiteLetters: [] },
                            { text: "Parenthood", whiteLetters: [] },
                        ].map((wordObj, wordIdx, arr) => (
                            <React.Fragment key={wordIdx}>
                                <span className="inline-block whitespace-nowrap">
                                    {wordObj.text.split('').map((char, charIdx) => {
                                        const isWhite = wordObj.whiteLetters.includes(charIdx);
                                        return (
                                            <span
                                                key={charIdx}
                                                className={`letter inline-block ${isWhite ? 'letter--white' : ''}`}
                                                aria-hidden="true"
                                                style={{ position: "relative", display: "inline-block" }}
                                            >
                                                {char}
                                            </span>
                                        );
                                    })}
                                </span>
                                {wordIdx < arr.length - 1 && (
                                    <span className="letter inline-block" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>
                                        {'\u00A0'}
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                    </h2>
                </div>
            </div>

            {/* Bottom Centered Subtitle */}
            <div className="horizontal-words__bottom-text">
                <div className="horizontal-words__bottom-text-l font-playfair text-brown">
                    Rooted in Siddha, Ayurveda <em>&</em> ancestral Tamil wellness traditions.<br />
                    Serving modern families across pregnancy, sacred confinement, and gentle infant rituals.
                </div>
            </div>
        </section>
    );
};

export default HorizontalWords;
