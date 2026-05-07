// app/components/GalleryUpload.tsx
'use client';

import { useState } from 'react';

const categories = ['Outreaches', 'School Programs', 'Counseling', 'Community Events', 'Advocacy'];

export default function GalleryUpload() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    location: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert('Please select an image');

    setUploading(true);
    setMessage('');

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append('image', image);

    const res = await fetch('/api/gallery/upload', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();

    if (result.success) {
      setMessage('✅ Gallery item uploaded successfully!');
      // Reset form
      setFormData({ title: '', description: '', category: '', date: '', location: '' });
      setImage(null);
    } else {
      setMessage('❌ ' + result.error);
    }

    setUploading(false);
  };

  return (
    <div className="bg-white border rounded-xl p-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Gallery Item</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border rounded-lg h-24"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload Gallery Item'}
        </button>

        {message && (
          <p className="text-center font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}