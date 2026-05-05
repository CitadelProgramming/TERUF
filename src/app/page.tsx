// app/page.tsx
import Link from 'next/link';
import { ArrowRight, Users, BookOpen, HeartHandshake } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-bg min-h-[90vh] flex items-center relative bg-[url('https://picsum.photos/id/1015/2000/1200')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-4xl mx-auto px-6 text-white text-center">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Empowering Healthy Lives Through<br />
            <span className="text-primary">Knowledge & Compassion</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 opacity-90">
            Free sexual and reproductive health education, counseling, and advocacy across Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support"
              className="bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-3 group"
            >
              Get Confidential Support
              <ArrowRight className="group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/donate"
              className="border-2 border-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg"
            >
              Support Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Teaser */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <Users className="w-12 h-12 mx-auto text-primary mb-4" />
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <p className="text-neutral-600">Youth & Adults Reached</p>
            </div>
            <div className="p-8">
              <BookOpen className="w-12 h-12 mx-auto text-primary mb-4" />
              <div className="text-4xl font-bold text-primary mb-2">120+</div>
              <p className="text-neutral-600">Schools & Communities</p>
            </div>
            <div className="p-8">
              <HeartHandshake className="w-12 h-12 mx-auto text-primary mb-4" />
              <div className="text-4xl font-bold text-primary mb-2">Free</div>
              <p className="text-neutral-600">Counseling Sessions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick CTA Section */}
      <section className="bg-primary py-16 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg opacity-90 mb-8">Your support helps us reach more young people with life-saving information.</p>
          <Link href="/donate" className="inline-block bg-white text-primary px-10 py-4 rounded-full font-semibold text-lg hover:bg-neutral-100 transition">
            Donate Today
          </Link>
        </div>
      </section>
    </>
  );
}