// app/components/Footer.tsx
import Link from 'next/link';
import { Heart, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid md:grid-cols-12 gap-10">
          
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 text-white mb-6">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-2xl">TERUF</span>
                <p className="text-xs text-neutral-500">Elizabeth Resources Universal Foundation</p>
              </div>
            </div>
            
            <p className="text-neutral-300 leading-relaxed max-w-md">
              Dedicated to providing holistic sexual and reproductive health education, 
              free confidential counseling, and advocacy against sexual violence in Nigeria since 2015.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-semibold mb-5 text-lg">Quick Links</h4>
            <div className="space-y-3 text-sm">
              <Link href="/about" className="block hover:text-white transition-colors">About Us</Link>
              <Link href="/programs" className="block hover:text-white transition-colors">Our Programs</Link>
              <Link href="/resources" className="block hover:text-white transition-colors">Resources</Link>
              <Link href="/gallery" className="block hover:text-white transition-colors">Gallery</Link>
              <Link href="/support" className="block hover:text-white transition-colors">Get Support</Link>
              <Link href="/donate" className="block hover:text-white transition-colors">Donate</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4">
            <h4 className="text-white font-semibold mb-5 text-lg">Get In Touch</h4>
            
            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                <div>
                  <p>Abuja, Nigeria</p>
                  <p className="text-xs text-neutral-500">Head Office</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                <div>
                  <p>+234 XXX XXX XXXX</p>
                  <p className="text-xs text-neutral-500">Mon - Fri, 9am - 5pm</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                <div>
                  <p>info@teruf.org</p>
                  <p className="text-xs text-neutral-500">General Inquiries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} The Elizabeth Resources Universal Foundation. 
          All Rights Reserved. | NDPR Compliant | Privacy Policy
        </div>
      </div>
    </footer>
  );
}