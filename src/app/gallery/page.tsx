// app/gallery/page.tsx
'use client';

import { useState } from 'react';
import { X, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryItems = [
  {
    id: 1,
    title: "School Outreach Program",
    category: "School Programs",
    image: "https://picsum.photos/id/1015/800/600",
    date: "March 12, 2026",
    location: "Abuja Municipal Area",
    description: "Over 450 students received comprehensive sexual and reproductive health education.",
  },
  {
    id: 2,
    title: "Free Counseling Session",
    category: "Counseling",
    image: "https://picsum.photos/id/1027/800/600",
    date: "March 8, 2026",
    location: "TERUF Center",
    description: "Confidential counseling for young women and girls.",
  },
  {
    id: 3,
    title: "Community Sensitization",
    category: "Outreaches",
    image: "https://picsum.photos/id/106/800/600",
    date: "February 28, 2026",
    location: "Gwagwalada",
    description: "Raising awareness on consent and reproductive health rights.",
  },
  {
    id: 4,
    title: "Youth Empowerment Workshop",
    category: "Community Events",
    image: "https://picsum.photos/id/201/800/600",
    date: "February 15, 2026",
    location: "Kubwa",
    description: "Interactive session with over 200 youths.",
  },
];

const categories = ['All', 'Outreaches', 'School Programs', 'Counseling', 'Community Events', 'Advocacy'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Impact in Pictures</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Real moments, real lives transformed through education, counseling, and advocacy.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 bg-white border-b z-40">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-md bg-neutral-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="mt-5 px-1">
                <div className="flex items-center gap-2 text-xs text-primary mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                  <MapPin className="w-4 h-4 ml-2" />
                  <span>{item.location}</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-neutral-600 line-clamp-3">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-14 right-0 text-white hover:text-red-400"
              >
                <X size={40} />
              </button>

              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="bg-white p-8 rounded-b-2xl">
                <h2 className="text-2xl font-bold mb-3">{selectedImage.title}</h2>
                <p className="text-neutral-600">{selectedImage.description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}