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
    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Dashboard</h1>
          <p className="text-slate-400 mt-2 font-medium tracking-wide">Fleet overview & quick stats</p>
        </div>
        <Link
          href="/vehicles/add"
          className="group flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-rose-500 via-blue-500 to-blue-600 text-white text-sm font-bold uppercase tracking-wider rounded-xl hover:from-rose-400 hover:via-blue-400 hover:to-blue-500 transition-all duration-300 shadow-glow-rose hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
          Add Vehicle
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          label="Total Vehicles"
          value={vehicles.length}
          icon={Car}
          iconBg="bg-rose-500/20 border-rose-500/30"
          iconColor="text-rose-400"
          sub="in fleet"
        />
        <StatCard
          label="Available"
          value={available}
          icon={CheckCircle}
          iconBg="bg-emerald-500/20 border-emerald-500/30"
          iconColor="text-emerald-400"
          sub="ready to rent"
        />
        <StatCard
          label="Rented Out"
          value={rented}
          icon={Clock}
          iconBg="bg-blue-500/20 border-blue-500/30"
          iconColor="text-blue-400"
          sub="currently active"
        />
        <StatCard
          label="In Service"
          value={service}
          icon={Wrench}
          iconBg="bg-amber-500/20 border-amber-500/30"
          iconColor="text-amber-400"
          sub="under maintenance"
        />
      </div>

      {/* Daily Revenue Banner */}
      {rented > 0 && (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1E1E28] to-[#121218] rounded-3xl p-8 mb-10 flex flex-col sm:flex-row sm:items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/[0.05] group">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-blue-600/20 transition-colors duration-700 pointer-events-none" />
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 bg-white/[0.05] border border-white/[0.1] rounded-2xl flex items-center justify-center backdrop-blur-md">
              <TrendingUp className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Estimated Daily Revenue</p>
              <p className="text-white text-4xl font-extrabold tracking-tight">${revenue.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-6 sm:mt-0 relative z-10 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
             <p className="text-emerald-400 text-sm font-bold tracking-wide uppercase">{rented} vehicle{rented > 1 ? 's' : ''} rented</p>
          </div>
        </div>
      )}

      {/* Fleet Table */}
      <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/[0.05] overflow-hidden">
        <div className="px-8 py-6 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
          <h2 className="font-bold text-white tracking-wide text-lg">Fleet Overview</h2>
          <Link
            href="/vehicles"
            className="text-xs text-rose-400 hover:text-rose-300 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors group"
          >
            View all <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {loading && (
          <div className="px-8 py-24 text-center">
            <div className="w-10 h-10 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-400 text-sm font-medium tracking-wide">Loading fleet data...</p>
          </div>
        )}

        {error && (
          <div className="px-8 py-16 text-center">
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 inline-block max-w-lg">
              <p className="text-red-400 font-bold text-lg mb-2">{error}</p>
              <p className="text-slate-400 text-sm">Make sure the backend server is running on port 5000.</p>
            </div>
          </div>
        )}

        {!loading && !error && vehicles.length === 0 && (
          <div className="px-8 py-24 text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-6">
              <Car className="w-10 h-10 text-slate-600" />
            </div>
            <p className="text-white font-bold text-xl mb-2 tracking-wide">No vehicles in fleet</p>
            <p className="text-slate-400 text-sm mb-8 font-medium">Get started by adding your first vehicle.</p>
            <Link
              href="/vehicles/add"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-white/[0.05] border border-white/[0.1] text-white text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-white/[0.1] transition-all"
            >
              <Plus className="w-4 h-4" /> Add Vehicle
            </Link>
          </div>
        )}

        {!loading && !error && vehicles.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.05] bg-black/20">
                  <th className="px-8 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Vehicle</th>
                  <th className="px-8 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">License</th>
                  <th className="px-8 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Mileage</th>
                  <th className="px-8 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Daily Rate</th>
                  <th className="px-8 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {vehicles.slice(0, 8).map(v => (
                  <tr key={v.vehicleId} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-5">
                      <p className="font-bold text-white text-base tracking-wide">{v.make} {v.model}</p>
                      <p className="text-slate-400 text-[11px] uppercase tracking-wider mt-1 font-semibold">{v.manufactureYear} · {v.color}</p>
                    </td>
                    <td className="px-8 py-5 font-mono text-slate-300 font-medium">{v.licensePlate}</td>
                    <td className="px-8 py-5 text-slate-300 font-medium">{Number(v.mileage).toLocaleString()} <span className="text-slate-500 text-[10px] uppercase ml-0.5">mi</span></td>
                    <td className="px-8 py-5 font-bold text-white text-base">${Number(v.dailyRentRate).toFixed(2)}</td>
                    <td className="px-8 py-5"><StatusBadge status={v.status} /></td>
                    <td className="px-8 py-5 text-right">
                      <Link
                        href={`/vehicles/${v.vehicleId}`}
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all opacity-0 group-hover:opacity-100"
                      >
                         <ArrowRight className="w-4 h-4" />
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
    <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.05] p-6 relative overflow-hidden group hover:border-white/[0.1] transition-colors">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/[0.03] transition-colors" />
      <div className="flex items-start justify-between mb-8 relative z-10">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <div className={`w-10 h-10 border rounded-xl flex items-center justify-center shadow-lg ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-4xl font-extrabold text-white tracking-tight">{value}</p>
        <p className="text-[11px] text-slate-500 mt-2 font-bold uppercase tracking-wider">{sub}</p>
      </div>
    </div>
  );
}
