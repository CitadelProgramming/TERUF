// app/programs/page.tsx
import { Users, Heart, BookOpen, Shield, Calendar } from 'lucide-react';
import Link from 'next/link';

const programs = [
  {
    icon: Users,
    title: "School & Community Outreaches",
    description: "Age-appropriate sexual and reproductive health (SRH) education sessions in secondary schools and communities across Abuja and beyond.",
    impact: "Reached 120+ schools & communities",
  },
  {
    icon: Heart,
    title: "Free Confidential Counseling",
    description: "One-on-one and group counseling on consent, STIs, relationships, mental wellbeing, and reproductive health — completely free and stigma-free.",
    impact: "Hundreds of youth & adults supported",
  },
  {
    icon: BookOpen,
    title: "Seminars & Workshops",
    description: "Interactive sessions on topics including male SRH, prevention of sexual violence, FGM, child marriage, and online safety.",
    impact: "Regular seminars for youth, parents & educators",
  },
  {
    icon: Shield,
    title: "Advocacy & Awareness Campaigns",
    description: "Advocating against sexual violence, reducing stigma, and promoting evidence-based SRH knowledge while respecting faith-based values.",
    impact: "Community sensitization and policy advocacy",
  },
];

export default function ProgramsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          Our Core Work
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Our Programs & Initiatives
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-neutral-600">
          Empowering individuals and communities through holistic sexual and reproductive health education, counseling, and advocacy since 2015.
        </p>
      </div>

      {/* Programs Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        {programs.map((program, index) => (
          <div
            key={index}
            className="bg-white border border-neutral-200 rounded-3xl p-10 hover:border-primary/30 transition-all group"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
              <program.icon className="w-8 h-8 text-primary" />
            </div>
            
            <h3 className="text-2xl font-semibold mb-4">{program.title}</h3>
            
            <p className="text-neutral-700 leading-relaxed mb-8">
              {program.description}
            </p>
            
            <div className="pt-6 border-t border-neutral-100">
              <p className="text-sm font-medium text-primary flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
                {program.impact}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="bg-neutral-900 text-white rounded-3xl p-12 md:p-16 text-center">
        <Calendar className="w-12 h-12 mx-auto mb-6 text-primary" />
        <h2 className="text-3xl font-semibold mb-4">Want to Host or Join a Program?</h2>
        <p className="max-w-lg mx-auto text-neutral-400 mb-10">
          Schools, churches, community groups, and organizations can partner with us for tailored SRH education sessions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/support"
            className="bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center justify-center gap-2"
          >
            Request a Session
          </Link>
          <Link
            href="/about"
            className="border border-white/50 hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg"
          >
            Learn More About Us
          </Link>
        </div>
      </div>

      {/* Simple Note */}
      <div className="text-center mt-12 text-sm text-neutral-500">
        All programs are delivered with cultural sensitivity, respect for faith values, and evidence-based science.
      </div>
    </div>
  );
}