// app/support/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { Shield, Lock, Phone, Mail, Clock } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required").optional().or(z.literal('')),
  age: z.string().optional(),
  gender: z.enum(["Male", "Female", "Prefer not to say"]),
  issue: z.string().min(20, "Please describe your concern in at least 20 characters"),
  preferredContact: z.enum(["Phone", "Email", "WhatsApp"]),
  consent: z.boolean().refine(val => val === true, "You must agree to the privacy terms"),
});

type FormData = z.infer<typeof formSchema>;

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "Prefer not to say",
      preferredContact: "Phone",
    },
  });

const onSubmit = async (data: FormData) => {
  setIsSubmitting(true);

  try {
    const res = await fetch('/api/support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      setSubmitted(true);
      reset();                    // Reset form using react-hook-form
    } else {
      alert(result.message || 'Something went wrong. Please try again.');
    }
  } catch (error) {
    console.error(error);
    alert('Network error. Please check your connection and try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          Confidential • Free • Safe
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Get Confidential Support
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-neutral-600">
          We're here to listen without judgment. Request free counseling on sexual and reproductive health matters.
        </p>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-8 mb-16 text-sm">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          <span>100% Confidential</span>
        </div>
        <div className="flex items-center gap-3">
          <Lock className="w-6 h-6 text-primary" />
          <span>NDPR Compliant</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-primary" />
          <span>Response within 48 hours</span>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-12">
        {/* Form Section */}
        <div className="md:col-span-3">
          <div className="bg-white border rounded-3xl p-10">
            <h2 className="text-2xl font-semibold mb-8">Counseling Request Form</h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  ✓
                </div>
                <h3 className="text-2xl font-semibold mb-3">Thank You!</h3>
                <p className="text-neutral-600">
                  Your request has been received. A counselor will contact you within 48 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-primary hover:underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      {...register("fullName")}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-primary"
                      placeholder="Your full name"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      {...register("phone")}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-primary"
                      placeholder="+234 XXX XXX XXXX"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email (optional)</label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-primary"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Age Group</label>
                    <select {...register("age")} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-primary">
                      <option value="">Select age group</option>
                      <option value="13-17">13-17 years</option>
                      <option value="18-24">18-24 years</option>
                      <option value="25-35">25-35 years</option>
                      <option value="36+">36 years and above</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Gender</label>
                    <select {...register("gender")} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-primary">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">What would you like to discuss? *</label>
                  <textarea
                    {...register("issue")}
                    rows={5}
                    className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:border-primary resize-y"
                    placeholder="Please describe your concern or question..."
                  />
                  {errors.issue && <p className="text-red-500 text-sm mt-1">{errors.issue.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Contact Method</label>
                  <div className="flex gap-4">
                    {["Phone", "Email", "WhatsApp"].map((method) => (
                      <label key={method} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value={method}
                          {...register("preferredContact")}
                          className="accent-primary"
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    {...register("consent")}
                    className="mt-1 accent-primary"
                  />
                  <p className="text-sm text-neutral-600">
                    I understand that all information shared is strictly confidential and will be handled in accordance with NDPR guidelines. 
                    I consent to TERUF contacting me for counseling purposes.
                  </p>
                </div>
                {errors.consent && <p className="text-red-500 text-sm">{errors.consent.message}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-accent disabled:bg-neutral-400 text-white py-4 rounded-2xl font-semibold text-lg transition-all active:scale-[0.985]"
                >
                  {isSubmitting ? "Submitting Request..." : "Submit Confidential Request"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white border rounded-3xl p-8">
            <h3 className="font-semibold text-xl mb-6 flex items-center gap-3">
              <Lock className="w-6 h-6 text-primary" /> Why Choose TERUF Counseling?
            </h3>
            <ul className="space-y-6 text-sm">
              <li className="flex gap-4">
                <div className="text-primary mt-1">•</div>
                <div>Completely free and confidential</div>
              </li>
              <li className="flex gap-4">
                <div className="text-primary mt-1">•</div>
                <div>Faith-sensitive and non-judgmental approach</div>
              </li>
              <li className="flex gap-4">
                <div className="text-primary mt-1">•</div>
                <div>Trained counselors combining science and compassion</div>
              </li>
              <li className="flex gap-4">
                <div className="text-primary mt-1">•</div>
                <div>Response within 48 hours</div>
              </li>
            </ul>
          </div>

          <div className="bg-neutral-900 text-white rounded-3xl p-8">
            <h3 className="font-semibold mb-4">Other Ways to Reach Us</h3>
            <div className="space-y-6 text-sm">
              <div className="flex gap-4">
                <Phone className="w-5 h-5 mt-0.5" />
                <div>+234 XXX XXX XXXX<br />(Mon–Fri, 9am–5pm)</div>
              </div>
              <div className="flex gap-4">
                <Mail className="w-5 h-5 mt-0.5" />
                <div>info@teruf.org</div>
              </div>
            </div>
            <p className="text-xs text-neutral-400 mt-10">
              For emergencies, please contact nearest medical facility or helpline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}