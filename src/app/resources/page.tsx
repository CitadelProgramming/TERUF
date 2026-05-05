// app/resources/page.tsx
import Link from 'next/link';
import { Download, FileText, Users, Heart, ShieldCheck } from 'lucide-react';

const resources = [
  {
    id: 1,
    title: "Understanding Consent & Healthy Relationships",
    description: "A beginner-friendly guide for youth on consent, boundaries, and building respectful relationships.",
    category: "Youth Education",
    type: "PDF Guide",
    icon: Users,
    downloadLink: "#", // Will connect to actual file later
    ageGroup: "13-24 years",
  },
  {
    id: 2,
    title: "Common STIs: Symptoms, Prevention & Treatment",
    description: "Evidence-based information on sexually transmitted infections, testing, and prevention methods.",
    category: "Health Information",
    type: "Infographic + Guide",
    icon: ShieldCheck,
    downloadLink: "#",
    ageGroup: "All Ages",
  },
  {
    id: 3,
    title: "Sexual & Reproductive Health for Parents",
    description: "How to talk to your children about sexuality, puberty, and reproductive health in a faith-sensitive way.",
    category: "Parents & Educators",
    type: "Booklet",
    icon: Heart,
    downloadLink: "#",
    ageGroup: "Parents",
  },
  {
    id: 4,
    title: "Preventing Sexual Violence: What Everyone Should Know",
    description: "Practical steps for individuals, families, and communities to prevent and respond to sexual violence.",
    category: "Advocacy",
    type: "Awareness Guide",
    icon: ShieldCheck,
    downloadLink: "#",
    ageGroup: "All Ages",
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          Free Educational Materials
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Resources & Learning Hub
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-neutral-600">
          Download free, reliable materials on sexual and reproductive health. All resources are culturally sensitive and combine faith values with scientific facts.
        </p>
      </div>

      {/* Filters (Simple for MVP) */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        <button className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium">All Resources</button>
        <button className="px-6 py-2 border border-neutral-300 hover:border-primary rounded-full text-sm font-medium">Youth</button>
        <button className="px-6 py-2 border border-neutral-300 hover:border-primary rounded-full text-sm font-medium">Parents</button>
        <button className="px-6 py-2 border border-neutral-300 hover:border-primary rounded-full text-sm font-medium">Educators</button>
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white border border-neutral-200 rounded-3xl overflow-hidden hover:shadow-lg transition-all group"
          >
            <div className="h-48 bg-neutral-100 flex items-center justify-center border-b">
              <resource.icon className="w-16 h-16 text-primary/70 group-hover:text-primary transition-colors" />
            </div>

            <div className="p-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary mb-3">
                {resource.category} • {resource.ageGroup}
              </div>

              <h3 className="font-semibold text-xl leading-tight mb-4 line-clamp-2">
                {resource.title}
              </h3>

              <p className="text-neutral-600 text-sm leading-relaxed mb-8 line-clamp-3">
                {resource.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">{resource.type}</span>
                
                <a
                  href={resource.downloadLink}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-accent text-white px-6 py-3 rounded-full text-sm font-semibold transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-20 bg-neutral-100 rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-semibold mb-4">Need Something Specific?</h2>
        <p className="text-neutral-600 max-w-md mx-auto mb-8">
          Can't find the exact resource you need? Request a custom topic or join our newsletter for new materials.
        </p>
        <Link
          href="/support"
          className="inline-block bg-primary text-white px-10 py-4 rounded-full font-semibold hover:bg-accent transition"
        >
          Request a Resource or Topic
        </Link>
      </div>

      <div className="text-center mt-12 text-sm text-neutral-500">
        All resources are free. Sharing is encouraged with proper credit to TERUF.
      </div>
    </div>
  );
}