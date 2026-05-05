// app/components/Footer.tsx
import Link from 'next/link';
import { Heart, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 text-white mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl">TERUF</span>
          </div>
          <p className="text-sm leading-relaxed">
            Providing holistic sexual and reproductive health education, free counseling, and advocacy since 2015 in Abuja, Nigeria.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2 text-sm">
            <Link href="/about" className="block hover:text-white">About Us</Link>
            <Link href="/programs" className="block hover:text-white">Our Programs</Link>
            <Link href="/resources" className="block hover:text-white">Resources</Link>
            <Link href="/support" className="block hover:text-white">Get Support</Link>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Abuja, Nigeria</span>
            </div>
            <div className="flex gap-3">
              <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>+234 XXX XXX XXXX</span>
            </div>
            <div className="flex gap-3">
              <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>info@teruf.org</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800 mt-12 pt-6 text-center text-xs">
        © {new Date().getFullYear()} The Elizabeth Resources Universal Foundation. All Rights Reserved.<br />
        Privacy Policy | NDPR Compliant
      </div>
    </footer>
  );
}