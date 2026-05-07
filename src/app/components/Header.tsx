// app/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Heart } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/programs', label: 'Programs' },
    { href: '/gallery', label: 'Gallery' }, // ✅ ADDED GALLERY LINK
    { href: '/resources', label: 'Resources' },
    { href: '/support', label: 'Get Support' },
    { href: '/donate', label: 'Donate' },
  ];

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <img
              src="/TERUF LOGO.png"
              alt="TERUF LOGO"
            />
          </div>
          <div>
            <div className="font-bold text-2xl tracking-tight text-primary">TERUF</div>
            <div className="text-xs text-muted -mt-1">
              Elizabeth Resources Universal Foundation
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="/donate"
          className="hidden md:block bg-primary hover:bg-accent text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95"
        >
          Donate Now
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-6 py-6 flex flex-col gap-4 text-base">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-primary text-white py-3 text-center rounded-full font-semibold"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}