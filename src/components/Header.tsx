import { useEffect, useState } from 'react';
import { Menu, X, Leaf, Zap } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Link, useRouter } from './Router';

export function Header() {
  const { path } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-coco-cream/90 backdrop-blur-md shadow-sm shadow-coco-green/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container-coco">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="logo-link group">
            <span className="logo-mark" aria-hidden="true">
              <svg viewBox="0 0 120 120" className="logo-mark__svg">
                <defs>
                  <linearGradient id="badgeRing" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#f7e55c" />
                    <stop offset="50%" stopColor="#f6c945" />
                    <stop offset="100%" stopColor="#d7f938" />
                  </linearGradient>
                  <linearGradient id="badgeCore" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#2aa34d" />
                    <stop offset="100%" stopColor="#0d5a3d" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="52" fill="url(#badgeRing)" opacity="0.98" />
                <circle cx="60" cy="60" r="41" fill="#f3f0df" />
                <path d="M49 36c-7 11-10 24-8 38 2 15 12 27 26 30 18 3 33-3 42-20 9-18 2-38-16-48-10-7-29-4-44 0Z" fill="url(#badgeCore)" />
                <path d="M54 59c-9 0-18 7-19 18 9 9 23 11 34 4 8-5 14-15 15-23-9-2-20-3-30 1Z" fill="#f4f0dc" opacity="0.8" />
                <path d="M33 48c11-6 14-14 15-23 4 10 14 18 28 19-12 2-22 11-29 22-6-5-11-11-14-18Z" fill="#2e8b57"/>
                <path d="M65 31c8 10 9 22 6 35-9-4-18-4-25-2 1-12 8-24 19-33Z" fill="#5abf5a" opacity="0.85" />
                <path d="M82 72c-8 7-16 9-26 8 10 14 29 18 43 11-4-9-10-16-17-19Z" fill="#3ca56a" opacity="0.8" />
                <path d="M56 41 68 22l8 20-11 12-5-10-9 11-9-15 10-10Z" fill="#f5d542" opacity="0.95" />
                <path d="M59 50 41 58 58 66 64 84 72 66 90 58 72 50 64 34 59 50Z" fill="#f5d542" />
                <path d="M66 36h8v17h-8z" fill="#f9efbb" opacity="0.8" />
                <path d="M46 59c8 5 18 6 28 4" stroke="#e7f9e1" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
                <circle cx="49" cy="45" r="3" fill="#dfe9ff" opacity="0.85" />
                <circle cx="78" cy="42" r="3" fill="#dfe9ff" opacity="0.85" />
                <circle cx="85" cy="77" r="3" fill="#dfe9ff" opacity="0.85" />
                <circle cx="41" cy="82" r="3" fill="#dfe9ff" opacity="0.85" />
                <path d="M52 52 66 32" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
              </svg>
              <span className="logo-mark__glow">
                <Zap className="h-4 w-4 text-amber-100" fill="currentColor" />
              </span>
            </span>
            <span className="logo-wordmark" aria-label="CocoBlitz">
              <span className="logo-wordmark__text">CocoBlitz</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {siteConfig.nav.map((item) => {
              const isActive = path === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-5 py-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                    isActive
                      ? 'text-coco-green'
                      : 'text-coco-dark/60 hover:text-coco-green'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-accent-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Link to="/contact" className="btn-primary !py-3 !px-6 text-xs">
              Get in Touch
            </Link>
          </div>

          <button
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg text-coco-green"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-coco pb-6 pt-2">
          <nav className="flex flex-col gap-1 bg-white rounded-2xl shadow-lg shadow-coco-green/10 p-4">
            {siteConfig.nav.map((item) => {
              const isActive = path === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-coco-green text-coco-cream'
                      : 'text-coco-dark/70 hover:bg-coco-cream'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link to="/contact" className="btn-primary mt-2 text-sm">
              Get in Touch
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
