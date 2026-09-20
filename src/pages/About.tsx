import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Target, Eye, Heart, Leaf, ShieldCheck, Globe2, Users, Sprout } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';
import aboutHeroImage from '../../assets/ChatGPT Image Sep 18, 2026, 01_51_35 PM.png';
import farmImageOne from '../../assets/ChatGPT Image Sep 18, 2026, 01_50_44 PM.png';
import farmImageTwo from '../../assets/ChatGPT Image Sep 18, 2026, 01_50_56 PM.png';
import farmImageThree from '../../assets/ChatGPT Image Sep 18, 2026, 01_51_17 PM.png';
import farmImageFour from '../../assets/ChatGPT Image Sep 18, 2026, 01_51_27 PM.png';

const storySlides = [
  {
    id: 1,
    title: 'Where It Begins',
    description: 'Carefully selected coconuts from thriving tropical farms.',
    image: aboutHeroImage,
    alt: 'Fresh coconut water being poured from a ripe coconut in a tropical paradise',
  },
  {
    id: 2,
    title: 'Fresh From the Farm',
    description: 'Freshness starts with responsible sourcing.',
    image: farmImageOne,
    alt: 'Coconut palms growing in a sunny tropical plantation',
  },
  {
    id: 3,
    title: 'Crafted With Care',
    description: 'Every step is guided by quality and consistency.',
    image: farmImageTwo,
    alt: 'Fresh coconuts and coconut water prepared naturally in a tropical setting',
  },
  {
    id: 4,
    title: 'Pure Coconut Goodness',
    description: 'Natural coconut goodness, carefully crafted.',
    image: farmImageThree,
    alt: 'Fresh green coconuts shown in a scenic tropical plantation',
  },
  {
    id: 5,
    title: 'From Our Farms to the World',
    description: 'Bringing quality coconut products to customers everywhere.',
    image: farmImageFour,
    alt: 'Farmer harvesting coconuts at golden hour in a beautiful island landscape',
  },
];

export function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % storySlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + storySlides.length) % storySlides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % storySlides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') nextSlide();
      if (event.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const distance = touchStartX.current - event.changedTouches[0].clientX;
    if (Math.abs(distance) > 50) {
      if (distance > 0) nextSlide();
      else prevSlide();
    }

    touchStartX.current = null;
  };

  const currentSlide = storySlides[activeIndex];

  return (
    <>
      <section className="about-hero-carousel-wrapper">
        <div
          className="about-hero-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="about-hero-carousel__slides" aria-live="polite">
            {storySlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`about-hero-carousel__slide ${index === activeIndex ? 'is-active' : ''}`}
                aria-hidden={index !== activeIndex}
              >
                <img src={slide.image} alt={slide.alt} className="about-hero-carousel__image" loading={index === 0 ? 'eager' : 'lazy'} />
                <div className="about-hero-carousel__overlay" />
              </div>
            ))}
          </div>

          <div className="container-coco about-hero-carousel__content-wrap">
            <div className="about-hero-carousel__content">
              <div className="mb-6 flex items-center justify-center gap-2.5 animate-fade-in-up md:justify-start">
                <span className="h-px w-8 bg-accent-gold" />
                <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">
                  About CocoBlitz
                </span>
                <span className="h-px w-8 bg-accent-gold" />
              </div>

              <h1 className="about-hero-carousel__title animate-fade-in-up animate-delay-100">
                From a single coconut
                <br />
                to a global standard.
              </h1>

              <p className="about-hero-carousel__description animate-fade-in-up animate-delay-200">
                What began as a passion for the humble coconut has grown into a trusted name in premium coconut products — serving customers across the world with an unwavering commitment to quality, sustainability, and community.
              </p>

              <div className="about-hero-carousel__controls">
                <button
                  type="button"
                  className="about-hero-carousel__nav about-hero-carousel__nav--prev"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  className="about-hero-carousel__nav about-hero-carousel__nav--next"
                  onClick={nextSlide}
                  aria-label="Next slide"
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="about-hero-carousel__progress" role="tablist" aria-label="Carousel progress">
                {storySlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    className={`about-hero-carousel__indicator ${index === activeIndex ? 'is-active' : ''}`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`View slide ${index + 1}: ${slide.title}`}
                    aria-current={index === activeIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white pb-12 pt-4 md:pb-16 md:pt-6">
        <div className="container-coco">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="scale">
              <div className="relative">
                <div className="rounded-[2rem] overflow-hidden shadow-xl shadow-coco-green/10 aspect-[4/3] group">
                  <img
                    src={farmImageOne}
                    alt="Fresh green coconuts growing in a tropical plantation"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal direction="left">
              <div>
                <SectionHeading
                  eyebrow="Our Story"
                  title="Built on quality. Driven by consistency."
                  align="left"
                />
                <div className="mt-6 space-y-4 text-coco-dark/55 leading-relaxed">
                  <p>
                    CocoBlitz was founded in Sri Lanka — one of the world's finest coconut-growing regions — with a simple but ambitious goal: to transform the way coconut products are sourced, processed, and delivered.
                  </p>
                  <p>
                    We started by working directly with local farmers, building relationships based on trust and fair trade. Over the years, we invested in modern processing technology, rigorous quality systems, and a team that treats every coconut as if it were destined for their own family table.
                  </p>
                  <p>
                    Today, CocoBlitz products reach customers in over 20 countries — but our philosophy hasn't changed. Quality comes first, always.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-coco-cream">
        <div className="container-coco">
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal direction="left">
              <div className="group rounded-3xl bg-white p-8 md:p-10 shadow-sm border border-coco-green/8 transition-all duration-500 hover:shadow-xl hover:shadow-coco-green/5 hover:-translate-y-1">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-coco-green/8 text-coco-green mb-6 transition-all duration-500 group-hover:bg-coco-green group-hover:text-coco-cream group-hover:scale-110">
                  <Eye className="h-7 w-7" />
                </span>
                <h3 className="font-display text-2xl font-bold text-coco-green mb-4">Our Vision</h3>
                <p className="text-coco-dark/55 leading-relaxed">
                  To be the most trusted name in premium coconut products worldwide — recognised for quality, integrity, and a genuine commitment to the communities and ecosystems we depend on.
                </p>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div className="group rounded-3xl bg-white p-8 md:p-10 shadow-sm border border-coco-green/8 transition-all duration-500 hover:shadow-xl hover:shadow-coco-green/5 hover:-translate-y-1">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-gold/12 text-accent-gold mb-6 transition-all duration-500 group-hover:bg-accent-gold group-hover:text-white group-hover:scale-110">
                  <Target className="h-7 w-7" />
                </span>
                <h3 className="font-display text-2xl font-bold text-coco-green mb-4">Our Mission</h3>
                <p className="text-coco-dark/55 leading-relaxed">
                  To source, process, and deliver the finest coconut products with uncompromising quality standards — while supporting sustainable farming practices and building lasting partnerships with our customers and communities.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding bg-coco-green relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-accent-gold/8 via-transparent to-transparent" />
        <div className="container-coco relative z-10">
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              title="What we do"
              subtitle="From raw coconut to finished product, our capabilities span the entire value chain."
              light
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Leaf, title: 'Sourcing', desc: "Direct relationships with coconut farmers across Sri Lanka's prime growing regions." },
              { icon: Sprout, title: 'Processing', desc: 'Modern facility with cold-press, drying, and packaging lines for diverse product ranges.' },
              { icon: ShieldCheck, title: 'Quality Assurance', desc: 'In-house laboratory testing at every stage, from raw material to finished goods.' },
              { icon: Globe2, title: 'Export & Distribution', desc: 'Reliable logistics network serving 20+ countries with full documentation support.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="group rounded-2xl bg-coco-deep/40 border border-coco-cream/10 p-7 transition-all duration-500 hover:bg-coco-deep/60 hover:border-accent-gold/30 hover:-translate-y-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-gold/15 text-accent-gold mb-5 transition-all duration-500 group-hover:bg-accent-gold group-hover:text-white group-hover:scale-110">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-coco-cream mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-coco-cream/50">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Philosophy */}
      <section className="section-padding bg-white">
        <div className="container-coco">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Reveal direction="left">
                <SectionHeading
                  eyebrow="Quality Philosophy"
                  title="Quality isn't a step. It's the standard."
                  align="left"
                />
                <div className="mt-6 space-y-5">
                  {[
                    { icon: ShieldCheck, title: 'Tested at every stage', desc: 'From raw material inspection to final product release, quality checks are embedded in every process.' },
                    { icon: Users, title: 'People who care', desc: 'Our team is trained to treat quality as a personal responsibility — not just a checklist.' },
                    { icon: Heart, title: 'Built on trust', desc: 'Our customers return because they know every batch will meet the same exacting standard.' },
                  ].map((item, i) => (
                    <Reveal key={item.title} delay={i * 100} direction="left">
                      <div className="group flex gap-4 transition-transform duration-300 hover:translate-x-1">
                        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-coco-green/8 text-coco-green transition-all duration-500 group-hover:bg-coco-green group-hover:text-coco-cream">
                          <item.icon className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-display font-bold text-coco-green mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-coco-dark/55 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="order-1 lg:order-2 relative">
              <Reveal direction="scale">
                <div className="rounded-[2rem] overflow-hidden shadow-xl shadow-coco-green/10 aspect-[4/3] group">
                  <img
                    src="https://images.pexels.com/photos/11809347/pexels-photo-11809347.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Coconut oil quality"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-coco-cream">
        <div className="container-coco">
          <Reveal direction="scale">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-coco-green px-8 py-16 md:px-16 md:py-20 text-center">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-radial from-accent-gold/15 via-transparent to-transparent" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-display font-extrabold text-coco-cream">
                  Partner with us.
                </h2>
                <p className="mt-5 text-lg text-coco-cream/60 leading-relaxed">
                  We'd love to learn about your business and explore how CocoBlitz can meet your coconut product needs.
                </p>
                <div className="mt-8">
                  <MagneticButton to="/contact" className="btn-gold">
                    Get in Touch
                  </MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
