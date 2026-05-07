// app/gallery/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type GalleryItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  date: string;
  location: string;
};

const categories = ['All', 'Outreaches', 'School Programs', 'Counseling', 'Community Events', 'Advocacy'];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/gallery');
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setItems(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load gallery images');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading gallery...</div>;

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
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-primary text-white' 
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
        {error && <p className="text-red-600 text-center mb-8">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-neutral-200">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2 text-sm text-primary mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                  <MapPin className="w-4 h-4 ml-3" />
                  <span>{item.location}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-neutral-600 line-clamp-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-4 text-white hover:text-red-500"
              >
                <X className="w-10 h-10" />
              </button>

              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
                <Image
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="bg-white p-8 rounded-b-2xl text-neutral-900">
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