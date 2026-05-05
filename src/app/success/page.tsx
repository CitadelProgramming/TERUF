'use client';

import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const [status, setStatus] = useState('Checking payment...');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get('reference');

    if (!reference) {
      setStatus('Invalid payment reference');
      return;
    }

    setStatus('Payment received. Processing confirmation...');

    // ONLY FOR DISPLAY (no DB work)
    fetch(`/api/verify?reference=${reference}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus('✅ Payment successful! Thank you for your donation.');
        } else {
          setStatus('⚠️ Payment received but not verified yet.');
        }
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">Donation Status</h1>
        <p className="text-lg">{status}</p>
      </div>
    </div>
  );
}