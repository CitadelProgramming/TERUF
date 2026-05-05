// app/about/page.tsx
import { Heart, Users, Target, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero Banner */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          Since 2015 • Abuja, Nigeria
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          About The Elizabeth Resources<br />Universal Foundation (TERUF)
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-neutral-600">
          Creating awareness and providing free, holistic sexual and reproductive health education, counseling, and advocacy across Nigeria.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div className="bg-white p-10 rounded-3xl border">
          <div className="flex items-center gap-4 mb-6">
            <Target className="w-10 h-10 text-primary" />
            <h2 className="text-3xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-lg leading-relaxed text-neutral-700">
            To empower individuals and communities with evidence-based sexual and reproductive health knowledge, free counseling services, and advocacy that reduces sexual violence, stigma, and health risks — while respecting faith-based values.
          </p>
        </div>

        <div className="bg-white p-10 rounded-3xl border">
          <div className="flex items-center gap-4 mb-6">
            <Award className="w-10 h-10 text-primary" />
            <h2 className="text-3xl font-semibold">Our Vision</h2>
          </div>
          <p className="text-lg leading-relaxed text-neutral-700">
            A Nigeria where young people and families make informed, healthy decisions about their sexuality and reproductive lives, free from ignorance, violence, and preventable harm.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold text-center mb-10">Our Story</h2>
        <div className="prose prose-lg max-w-3xl mx-auto text-neutral-700">
          <p>
            The Elizabeth Resources Universal Foundation (TERUF) was established in 2015 in Abuja, Nigeria, with a vision to address critical gaps in sexual and reproductive health (SRH) education and support.
          </p>
          <p>
            As one of the indigenous NGOs focused on this sensitive area, we provide free counseling, school and community outreaches, seminars on topics such as consent, STIs, male SRH, prevention of sexual violence, and more.
          </p>
          <p>
            We bridge faith-based values with scientific evidence to create safe, non-judgmental spaces for youth, adolescents, couples, parents, and educators.
          </p>
        </div>
      </div>

      {/* Core Values / What We Do */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="text-center p-8">
          <Users className="w-12 h-12 mx-auto text-primary mb-6" />
          <h3 className="font-semibold text-xl mb-3">Free Counseling</h3>
          <p className="text-neutral-600">Confidential one-on-one and group counseling on sexual and reproductive health matters.</p>
        </div>
        <div className="text-center p-8">
          <Heart className="w-12 h-12 mx-auto text-primary mb-6" />
          <h3 className="font-semibold text-xl mb-3">School & Community Outreaches</h3>
          <p className="text-neutral-600">Age-appropriate SRH education sessions in secondary schools and communities.</p>
        </div>
        <div className="text-center p-8">
          <Target className="w-12 h-12 mx-auto text-primary mb-6" />
          <h3 className="font-semibold text-xl mb-3">Advocacy & Awareness</h3>
          <p className="text-neutral-600">Campaigns against sexual violence, child marriage, FGM, and stigma reduction.</p>
        </div>
      </div>

      {/* Location */}
      <div className="bg-neutral-100 rounded-3xl p-10 text-center">
        <h3 className="text-2xl font-semibold mb-4">Our Location</h3>
        <p className="text-lg mb-2">Paradise Hills, FHA/ENL, Guzape</p>
        <p className="text-neutral-600">Abuja, Federal Capital Territory, Nigeria</p>
        <div className="mt-8 text-sm text-neutral-500">
          For inquiries or to book a session: <span className="font-medium">info@teruf.org</span>
        </div>
      </div>
    </div>
  );
}