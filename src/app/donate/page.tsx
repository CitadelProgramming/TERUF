// app/donate/page.tsx
'use client';

import { useState } from 'react';
import { Heart, ArrowRight, Users, BookOpen } from 'lucide-react';

const donationOptions = [
  { amount: 5000, label: "₦5,000", impact: "Supports 5 youth in one outreach session" },
  { amount: 10000, label: "₦10,000", impact: "Provides counseling for 10 people" },
  { amount: 25000, label: "₦25,000", impact: "Sponsors one full school outreach" },
  { amount: 50000, label: "₦50,000", impact: "Funds a community seminar" },
];

const projects = [
  { id: "outreach", label: "School & Community Outreaches", icon: Users },
  { id: "counseling", label: "Free Counseling Services", icon: Heart },
  { id: "resources", label: "Educational Materials & Resources", icon: BookOpen },
];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState("outreach");
  const [isRecurring, setIsRecurring] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [email, setEmail] = useState(""); // ✅ ADDED

  const handleDonate = async () => {
    const amount = selectedAmount || parseInt(customAmount) || 5000;

    if (!email) {
      alert("Please enter your email to receive receipt");
      return;
    }

    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          project: selectedProject,
          recurring: isRecurring,
          email, // ✅ ADDED
        }),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = data.authorization_url;
      } else {
        alert('Failed to initialize payment');
      }

    } catch (error) {
      console.error(error);
      alert('Payment error. Try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          Every Gift Makes an Impact
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Support TERUF's Mission
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-neutral-600">
          Your donation helps provide free SRH education, counseling, and advocacy to youth and communities across Nigeria.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">

        {/* Donation Form */}
        <div className="lg:col-span-3 bg-white border rounded-3xl p-10">
          <h2 className="text-2xl font-semibold mb-8">Make a Donation</h2>

          {/* Frequency Toggle */}
          <div className="flex bg-neutral-100 rounded-2xl p-1 mb-10 w-fit">
            <button
              onClick={() => setIsRecurring(false)}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${!isRecurring ? 'bg-white shadow' : 'text-neutral-500'}`}
            >
              One-time
            </button>
            <button
              onClick={() => setIsRecurring(true)}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${isRecurring ? 'bg-white shadow' : 'text-neutral-500'}`}
            >
              Monthly
            </button>
          </div>

          {/* EMAIL INPUT (NEW) */}
          <div className="mb-8">
            <p className="text-sm font-medium text-neutral-600 mb-3">
              Your Email (for receipt)
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-6 py-4 border rounded-2xl focus:outline-none focus:border-primary"
            />
          </div>

          {/* Suggested Amounts */}
          <div className="mb-10">
            <p className="text-sm font-medium text-neutral-600 mb-4">Choose an amount</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {donationOptions.map((option) => (
                <button
                  key={option.amount}
                  onClick={() => {
                    setSelectedAmount(option.amount);
                    setCustomAmount("");
                  }}
                  className={`p-6 border rounded-2xl text-center transition-all hover:border-primary ${selectedAmount === option.amount ? 'border-primary bg-primary/5' : 'border-neutral-200'}`}
                >
                  <div className="font-semibold text-2xl mb-1">{option.label}</div>
                  <div className="text-xs text-neutral-500">{option.impact}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="mb-10">
            <p className="text-sm font-medium text-neutral-600 mb-3">Or enter custom amount (₦)</p>
            <div className="relative">
              <span className="absolute left-5 top-4 text-neutral-500">₦</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                placeholder="5000"
                className="w-full pl-10 pr-6 py-4 border rounded-2xl focus:outline-none focus:border-primary text-2xl font-medium"
              />
            </div>
          </div>

          {/* Project Selection */}
          <div className="mb-10">
            <p className="text-sm font-medium text-neutral-600 mb-4">Support a specific area</p>
            <div className="grid gap-3">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  className={`flex items-center gap-4 p-5 border rounded-2xl transition-all hover:border-primary ${selectedProject === project.id ? 'border-primary bg-primary/5' : 'border-neutral-200'}`}
                >
                  <project.icon className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-medium text-left">{project.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Donate Button */}
          <button
            onClick={handleDonate}
            className="w-full bg-primary hover:bg-accent text-white py-5 rounded-2xl font-semibold text-xl flex items-center justify-center gap-3 active:scale-[0.985] transition-all"
          >
            Donate Now Securely
            <ArrowRight className="w-6 h-6" />
          </button>

          <p className="text-center text-xs text-neutral-500 mt-6">
            🔒 Secured by Paystack • Tax-deductible receipts issued
          </p>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 space-y-8">

          <div className="bg-neutral-900 text-white rounded-3xl p-10">
            <Heart className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Your Gift Changes Lives</h3>
            <ul className="space-y-6 text-sm">
              <li className="flex gap-4">
                <span className="text-primary">→</span>
                <span>Reaches young people with life-saving SRH knowledge</span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary">→</span>
                <span>Provides free counseling to those who can't afford it</span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary">→</span>
                <span>Supports advocacy against sexual violence and stigma</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border rounded-3xl p-8 text-sm">
            <h4 className="font-semibold mb-4">Transparency Note</h4>
            <p className="text-neutral-600">
              TERUF is a registered non-profit. 85%+ of donations go directly to programs.
            </p>
          </div>

          <div className="text-center text-xs text-neutral-500">
            Paradise Hills, FHA/ENL, Guzape<br />
            Abuja, Nigeria
          </div>
        </div>
      </div>
    </div>
  );
}