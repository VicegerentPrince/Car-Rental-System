'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Car, CheckCircle, Clock, Wrench, Plus, ArrowRight, TrendingUp } from 'lucide-react';
import { getVehicles } from '@/lib/api';
import StatusBadge from '@/components/StatusBadge';

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading,  setLoading ] = useState(true);
  const [error,    setError   ] = useState('');

  useEffect(() => {
    getVehicles()
      .then(setVehicles)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const available = vehicles.filter(v => v.status === 'Available').length;
  const rented    = vehicles.filter(v => v.status === 'Rented').length;
  const service   = vehicles.filter(v => v.status === 'Service').length;
  const revenue   = vehicles
    .filter(v => v.status === 'Rented')
    .reduce((sum, v) => sum + Number(v.dailyRentRate), 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Fleet overview & quick stats</p>
        </div>
        <Link
          href="/vehicles/add"
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
        >
          <Plus className="w-4 h-4" />
          Add Vehicle
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          label="Total Vehicles"
          value={vehicles.length}
          icon={Car}
          iconBg="bg-slate-100"
          iconColor="text-slate-600"
          sub="in fleet"
        />
        <StatCard
          label="Available"
          value={available}
          icon={CheckCircle}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
          sub="ready to rent"
        />
        <StatCard
          label="Rented Out"
          value={rented}
          icon={Clock}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          sub="currently active"
        />
        <StatCard
          label="In Service"
          value={service}
          icon={Wrench}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
          sub="under maintenance"
        />
      </div>

      {/* Daily Revenue Banner */}
      {rented > 0 && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 mb-8 flex items-center justify-between shadow-lg shadow-blue-600/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-blue-100 text-sm font-medium">Estimated Daily Revenue</p>
              <p className="text-white text-2xl font-bold">${revenue.toFixed(2)}</p>
            </div>
          </div>
          <p className="text-blue-200 text-sm">{rented} vehicle{rented > 1 ? 's' : ''} rented</p>
        </div>
      )}

      {/* Fleet Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Fleet Overview</h2>
          <Link
            href="/vehicles"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading && (
          <div className="px-6 py-16 text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Loading fleet data...</p>
          </div>
        )}

        {error && (
          <div className="px-6 py-10 text-center">
            <p className="text-red-500 font-medium">{error}</p>
            <p className="text-gray-400 text-sm mt-1">Make sure the backend server is running on port 5000.</p>
          </div>
        )}

        {!loading && !error && vehicles.length === 0 && (
          <div className="px-6 py-16 text-center">
            <Car className="w-14 h-14 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-semibold">No vehicles in fleet</p>
            <p className="text-gray-400 text-sm mt-1">Get started by adding your first vehicle.</p>
            <Link
              href="/vehicles/add"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add Vehicle
            </Link>
          </div>
        )}

        {!loading && !error && vehicles.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">License</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Mileage</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Daily Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {vehicles.slice(0, 8).map(v => (
                  <tr key={v.vehicleId} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{v.make} {v.model}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{v.manufactureYear} · {v.color}</p>
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-700">{v.licensePlate}</td>
                    <td className="px-6 py-4 text-gray-600">{Number(v.mileage).toLocaleString()} mi</td>
                    <td className="px-6 py-4 font-bold text-gray-900">${Number(v.dailyRentRate).toFixed(2)}</td>
                    <td className="px-6 py-4"><StatusBadge status={v.status} /></td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/vehicles/${v.vehicleId}`}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-xs"
                      >
                        Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, iconBg, iconColor, sub }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <div className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-4.5 h-4.5 ${iconColor} w-5 h-5`} />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
    </div>
  );
}
