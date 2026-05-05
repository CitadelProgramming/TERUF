'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Donation = {
  id: string;
  reference: string;
  amount: number;
  email: string;
  status: string;
  created_at: string;
  metadata?: {
    project?: string;
  };
};

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

export default function AdminPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [supportLoading, setSupportLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
    fetchSupportRequests();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await fetch('/api/admin/donations');
      const data = await res.json();
      setDonations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSupportRequests = async () => {
    try {
      const res = await fetch('/api/admin/support');
      const data = await res.json();
      setSupportRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSupportLoading(false);
    }
  };

  // LOGOUT FUNCTION
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  // EXPORT CSV (donations only for now)
  const exportToCSV = () => {
    if (donations.length === 0) return;

    const headers = ['Email', 'Amount', 'Project', 'Status', 'Date'];

    const rows = donations.map((d) => [
      d.email,
      d.amount,
      d.metadata?.project || 'General',
      d.status,
      new Date(d.created_at).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'donations.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const total = donations.reduce((sum, d) => sum + d.amount, 0);

  const chartData = Object.values(
    donations.reduce((acc: any, donation) => {
      const date = new Date(donation.created_at).toLocaleDateString(
        'en-US',
        {
          month: 'short',
          day: 'numeric',
        }
      );

      if (!acc[date]) {
        acc[date] = { date, amount: 0 };
      }
      acc[date].amount += donation.amount;

      return acc;
    }, {})
  );

  return (
    <div className="p-10 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={exportToCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Export CSV
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="p-6 bg-white border rounded-xl">
          <p className="text-sm text-gray-500">Total Donations</p>
          <p className="text-2xl font-bold">{donations.length}</p>
        </div>

        <div className="p-6 bg-white border rounded-xl">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-2xl font-bold">₦{total.toLocaleString()}</p>
        </div>

        <div className="p-6 bg-white border rounded-xl">
          <p className="text-sm text-gray-500">Support Requests</p>
          <p className="text-2xl font-bold">{supportRequests.length}</p>
        </div>

        <div className="p-6 bg-white border rounded-xl">
          <p className="text-sm text-gray-500">Successful Payments</p>
          <p className="text-2xl font-bold">
            {donations.filter((d) => d.status === 'success').length}
          </p>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white border rounded-xl p-6 mb-10">
        <h2 className="text-lg font-semibold mb-4">Donations Over Time</h2>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#15803d"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SUPPORT REQUESTS TABLE */}
      <div className="bg-white border rounded-xl p-6 mb-10">
        <h2 className="text-lg font-semibold mb-4">
          Support Requests
        </h2>

        <div className="overflow-auto">
          <table className="w-full text-left min-w-[900px]">
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
              {supportLoading ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center">
                    Loading...
                  </td>
                </tr>
              ) : supportRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center">
                    No support requests yet
                  </td>
                </tr>
              ) : (
                supportRequests.map((r) => (
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

      {/* DONATIONS TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="p-4">Email</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Project</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : donations.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  No donations yet
                </td>
              </tr>
            ) : (
              donations.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="p-4">{d.email}</td>
                  <td className="p-4">₦{d.amount}</td>
                  <td className="p-4">
                    {d.metadata?.project || 'General'}
                  </td>
                  <td className="p-4">
                    <span className="text-green-600 font-medium">
                      {d.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {new Date(d.created_at).toLocaleDateString()}
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