/**
 * SEYOL Typography Scale & Helpers
 * Adhering to Garet as primary font for page titles, headings, card headings and headers.
 * Times New Roman reserved exclusively for special quotes and callout labels.
 * Lato for clean, highly legible body copy.
 * Typography scale inspired by Maven Clinic.
 */

export const typography = {
  h1: 'font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[62px] font-extrabold text-brown tracking-tight leading-[1.12]',
  h2: 'font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold text-brown tracking-tight leading-[1.18]',
  h3: 'font-heading text-xl sm:text-2xl md:text-3xl font-bold text-brown leading-snug',
  h4: 'font-heading text-lg sm:text-xl md:text-2xl font-bold text-brown leading-snug',
  h5: 'font-heading text-base sm:text-lg font-bold text-brown leading-normal',
  h6: 'font-heading text-sm sm:text-base font-bold text-brown leading-normal',
  quote: 'font-serif italic font-normal text-xl sm:text-2xl md:text-3xl text-brown leading-relaxed',
  bodyLarge: 'font-sans text-base sm:text-lg text-brown/90 leading-relaxed',
  body: 'font-sans text-sm sm:text-base text-brown leading-relaxed',
  bodySmall: 'font-sans text-xs sm:text-sm text-brown-muted leading-relaxed',
  caption: 'font-heading text-xs sm:text-[13px] text-maroon uppercase tracking-[0.14em] font-bold',
  badge: 'font-heading text-[11px] font-bold uppercase tracking-wider',
  goldGradient: 'gold-gradient-text font-heading',
  maroonGradient: 'maroon-gradient-text font-heading',
};
