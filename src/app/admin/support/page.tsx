'use client';

import { useEffect, useState } from 'react';

type SupportRequest = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  age: string;
  gender: string;
  issue: string;
  preferredContact: string;
  created_at: string;
};

export default function SupportAdminPage() {
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/admin/support');
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Support Requests Dashboard
      </h1>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-auto">

        <table className="w-full text-left min-w-[1000px]">

          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Email</th>
              <th className="p-4">Age</th>
              <th className="p-4">Gender</th>
              <th className="p-4">Issue</th>
              <th className="p-4">Preferred Contact</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-6 text-center">
                  No support requests yet
                </td>
              </tr>
            ) : (
              requests.map((r) => (
                <tr key={r.id} className="border-t">

                  <td className="p-4 font-medium">
                    {r.fullName}
                  </td>

                  <td className="p-4">{r.phone}</td>
                  <td className="p-4">{r.email}</td>
                  <td className="p-4">{r.age}</td>
                  <td className="p-4 capitalize">{r.gender}</td>

                  <td className="p-4 max-w-xs truncate">
                    {r.issue}
                  </td>

                  <td className="p-4 capitalize">
                    {r.preferredContact}
                  </td>

                  <td className="p-4">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}