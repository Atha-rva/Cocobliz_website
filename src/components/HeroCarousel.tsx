import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, Droplet, Heart, ShieldCheck, Zap } from 'lucide-react';
import { Link } from './Router';

const slides = [
  {
    id: 0,
    eyebrow: ['NATURAL', 'FRESH', 'HYGIENIC', 'READY TO DRINK'],
    headline: ["Nature's", 'Electrolyte', 'Powerhouse.'],
    highlightLine: 2,
    subhead: 'Refresh. Rehydrate. Recharge.',
    body: 'CocoBlitz delivers natural electrolytes, essential minerals and pure coconut goodness — anytime, anywhere.',
    image: 'https://images.pexels.com/photos/11218810/pexels-photo-11218810.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900',
    imageAlt: 'Fresh coconut with straw held in hand',
    decorativeTop: 'Pure\nGoodness\nin Every Sip',
    decorativeBottom: 'From\nFarm to\nYou',
    tagLines: ['100% NATURAL', 'NO ADDED SUGAR', 'BEST SERVED CHILLED'],
  },
  {
    id: 1,
    eyebrow: ['NATURAL', 'FRESH', 'HYGIENIC', 'READY TO DRINK'],
    headline: ['Fresh', 'Coconut,', 'Reimagined.'],
    highlightLine: 2,
    subhead: 'Naturally sourced. Carefully processed.',
    body: 'From our partner farms in Pollachi, Tamil Nadu to your hands — every sip delivers the pure essence of tender green coconuts, flash-pasteurised to lock in natural goodness.',
    image: 'https://images.pexels.com/photos/5945745/pexels-photo-5945745.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900',
    imageAlt: 'Fresh green coconut with refreshing drink',
    decorativeTop: 'Tropical\nFreshness\nBottled',
    decorativeBottom: 'Nature\'s\nBest in\nEvery Drop',
    tagLines: ['100% TENDER COCONUT', 'NATURAL ELECTROLYTES', 'FSSAI CERTIFIED'],
  },
  {
    id: 2,
    eyebrow: ['NATURAL', 'FRESH', 'HYGIENIC', 'READY TO DRINK'],
    headline: ['Pure', 'Hydration,', 'Naturally.'],
    highlightLine: 2,
    subhead: 'No preservatives. No added sugar.',
    body: 'Packed with potassium, sodium, magnesium and calcium — CocoBlitz tender coconut water is nature\'s ultimate hydration drink, sealed fresh for you.',
    image: 'https://images.pexels.com/photos/4985526/pexels-photo-4985526.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900',
    imageAlt: 'Close-up fresh coconut with straw',
    decorativeTop: 'Real\nElectrolytes\nReal Refresh',
    decorativeBottom: 'Drink\nNaturally\nFeel Alive',
    tagLines: ['RICH IN POTASSIUM', 'ZERO ADDED SUGAR', 'CHILL & ENJOY'],
  },
  {
    id: 3,
    eyebrow: ['NATURAL', 'FRESH', 'HYGIENIC', 'READY TO DRINK'],
    headline: ['Taste', 'the Tropics,', 'Anywhere.'],
    highlightLine: 2,
    subhead: 'From farm to you, with care.',
    body: 'Every CocoBlitz coconut is hand-picked at peak ripeness from our partner farms, then hygienically sealed to preserve the authentic tropical flavour you love.',
    image: 'https://images.pexels.com/photos/19068966/pexels-photo-19068966.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900',
    imageAlt: 'Hand holding coconut with straw on tropical beach',
    decorativeTop: 'Sun-Kissed\nFlavour\nin Your Hands',
    decorativeBottom: 'From\nTropics\nto You',
    tagLines: ['HAND-PICKED', 'HYGIENICALLY SEALED', 'PEAK FRESHNESS'],
  },
];

const benefits = [
  { icon: Droplet, line1: 'Natural', line2: 'Electrolytes' },
  { icon: Leaf, line1: 'No', line2: 'Preservatives' },
  { icon: Heart, line1: 'Low', line2: 'Calories' },
  { icon: ShieldCheck, line1: 'Hygienically', line2: 'Sealed' },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);
  const touchStartX = useRef(0);

  const goToSlide = useCallback((index) => {
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((prev) => (prev + 1) % slides.length);
  }, [goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [goToSlide]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 6000);
  }, [nextSlide]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prevSlide, nextSlide]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    resetTimer();
  };

  const slide = slides[current];

  return (
    <section
      className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-coco-cream"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="CocoBlitz product showcase"
    >
      {/* Desktop split layout */}
      <div className="flex flex-col lg:flex-row h-full min-h-screen lg:min-h-0">
        {/* LEFT PANEL — Content (~38% on desktop) */}
        <div className="relative flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-12 xl:px-16 lg:w-[38%] lg:py-0 z-20 bg-coco-cream">
          {/* Organic curve transition to image */}
          <svg
            className="absolute right-0 top-0 h-full w-16 hidden lg:block pointer-events-none"
            viewBox="0 0 64 800"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0,0 L64,0 L64,800 L0,800 C40,600 40,200 0,0 Z"
              fill="rgb(247,244,232)"
            />
          </svg>

          <div className="relative max-w-md lg:max-w-none">
            {/* Eyebrow row */}
            <div className="flex items-center gap-2 mb-6 lg:mb-8">
              <Leaf className="h-4 w-4 text-coco-forest flex-shrink-0" />
              {slide.eyebrow.map((item, i) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-coco-forest">
                    {item}
                  </span>
                  {i < slide.eyebrow.length - 1 && (
                    <span className="h-1 w-1 rounded-full bg-coco-forest/30" />
                  )}
                </span>
              ))}
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-coco-forest leading-[1.02] tracking-tight text-[2.5rem] sm:text-[3.5rem] lg:text-[3.2rem] xl:text-[4rem]">
              {slide.headline.map((line, i) => (
                <span key={i} className="block">
                  {i === slide.highlightLine ? (
                    <span className="text-accent-gold">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            {/* Subhead */}
            <p className="mt-5 text-lg font-semibold text-coco-forest/80">
              {slide.subhead}
            </p>

            {/* Body */}
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-coco-dark/50 max-w-sm">
              {slide.body}
            </p>

            {/* CTA Row */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-coco-forest px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-coco-green hover:shadow-xl hover:shadow-coco-forest/25 active:scale-95"
              >
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-coco-forest/25 bg-transparent px-7 py-3.5 text-sm font-semibold text-coco-forest transition-all duration-300 hover:bg-coco-forest/5 hover:border-coco-forest/40 active:scale-95"
              >
                Learn More
              </Link>
            </div>

            {/* Benefit Icon Row */}
            <div className="mt-10 grid grid-cols-4 gap-2 sm:gap-4 max-w-sm">
              {benefits.map((benefit) => (
                <div key={benefit.line1 + benefit.line2} className="flex flex-col items-center text-center">
                  <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-coco-forest/8 mb-2">
                    <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 text-coco-forest" strokeWidth={1.5} />
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold leading-tight text-coco-forest">
                    {benefit.line1}
                    <br />
                    {benefit.line2}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Image (~62% on desktop) */}
        <div className="relative flex-1 lg:w-[62%] h-[45vh] sm:h-[55vh] lg:h-full overflow-hidden">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              aria-hidden={i !== current}
            >
              <img
                src={s.image}
                alt={s.imageAlt}
                className={`h-full w-full object-cover ${i === current ? 'animate-slide-zoom' : ''}`}
                style={{ objectPosition: 'center 30%' }}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              {/* Subtle gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-coco-forest/15 via-transparent to-transparent" />
            </div>
          ))}

          {/* Decorative handwritten text — top right */}
          <div className="absolute top-6 right-4 sm:top-10 sm:right-8 lg:top-12 lg:right-12 z-20 hidden sm:block pointer-events-none">
            <p className="font-script text-2xl sm:text-3xl lg:text-4xl text-coco-forest/90 leading-tight whitespace-pre-line text-right">
              {slide.decorativeTop}
            </p>
            {/* Hand-drawn arrow */}
            <svg
              className="mt-1 ml-auto h-12 w-12 text-coco-forest/70"
              viewBox="0 0 60 60"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M50 8 C 35 15, 20 25, 15 45"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M15 45 L 12 38 M15 45 L 22 42"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Decorative leaf graphic — bottom right */}
          <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 lg:bottom-28 lg:right-12 z-20 hidden sm:flex items-end gap-2 pointer-events-none">
            <Leaf className="h-6 w-6 text-white/90 mb-1" fill="currentColor" />
            <p className="font-script text-2xl sm:text-3xl lg:text-4xl text-white leading-tight whitespace-pre-line drop-shadow-lg">
              {slide.decorativeBottom}
            </p>
          </div>

          {/* CocoBlitz branding on coconut area — floating badge */}
          <div className="absolute top-1/2 left-4 sm:left-8 lg:left-12 -translate-y-1/2 z-20 hidden md:block">
            <div className="rounded-2xl bg-coco-forest/85 backdrop-blur-md px-5 py-4 shadow-xl">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg font-extrabold text-coco-cream tracking-tight">
                  COCOBLITZ
                </span>
                <Zap className="h-4 w-4 text-accent-gold" fill="currentColor" />
              </div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-coco-cream/70">
                Fresh Coconut.
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-coco-cream/70">
                Anytime. Anywhere.
              </div>
            </div>
          </div>

          {/* Kraft paper tag */}
          <div className="absolute bottom-24 sm:bottom-28 left-4 sm:left-8 lg:left-12 z-20 hidden md:block">
            <div className="relative rounded-lg bg-coco-sand px-4 py-3 shadow-lg rotate-[-2deg]">
              {/* String */}
              <div className="absolute -top-3 left-4 w-px h-3 bg-coco-dark/30" />
              <div className="space-y-0.5">
                {slide.tagLines.map((tag) => (
                  <div key={tag} className="text-[9px] font-bold uppercase tracking-wide text-coco-forest">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carousel arrows */}
          <button
            onClick={() => { prevSlide(); resetTimer(); }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-coco-forest transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={() => { nextSlide(); resetTimer(); }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-coco-forest transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Pagination indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { goToSlide(i); resetTimer(); }}
                className={`h-2 rounded-full transition-all duration-400 ${
                  i === current
                    ? 'w-7 bg-coco-forest'
                    : 'w-2 bg-coco-sand hover:bg-coco-sanddark'
                }`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
