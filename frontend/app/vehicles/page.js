'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Car, RefreshCw } from 'lucide-react';
import { getVehicles, deleteVehicle } from '@/lib/api';
import VehicleCard from '@/components/VehicleCard';

const STATUS_FILTERS = ['All', 'Available', 'Rented', 'Service'];

export default function VehiclesPage() {
  const [vehicles,     setVehicles    ] = useState([]);
  const [loading,      setLoading     ] = useState(true);
  const [error,        setError       ] = useState('');
  const [search,       setSearch      ] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const load = () => {
    setLoading(true);
    setError('');
    getVehicles()
      .then(setVehicles)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm(`Are you sure you want to delete vehicle ${id}?\nThis action cannot be undone.`)) return;
    try {
      await deleteVehicle(id);
      setVehicles(prev => prev.filter(v => v.vehicleId !== id));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const filtered = vehicles.filter(v => {
    const q = search.toLowerCase();
    const matchSearch = !search
      || v.make?.toLowerCase().includes(q)
      || v.model?.toLowerCase().includes(q)
      || v.licensePlate?.toLowerCase().includes(q)
      || v.color?.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">All Vehicles</h1>
          <p className="text-slate-400 mt-2 font-medium tracking-wide">
            {loading ? 'Crunching data...' : `${vehicles.length} vehicle${vehicles.length !== 1 ? 's' : ''} in fleet`}
          </p>
        </div>
        <Link
          href="/vehicles/add"
          className="group flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-rose-500 via-blue-500 to-blue-600 text-white text-sm font-bold uppercase tracking-wider rounded-xl hover:from-rose-400 hover:via-blue-400 hover:to-blue-500 transition-all duration-300 shadow-glow-rose hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
          Add Vehicle
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-10 p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl backdrop-blur-xl">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search by make, model, plate, or color..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 text-sm font-medium border border-white/[0.05] rounded-xl bg-black/40 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-1 bg-black/40 border border-white/[0.05] rounded-xl p-1.5 overflow-hidden">
          {STATUS_FILTERS.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                statusFilter === s
                  ? 'bg-gradient-to-r from-rose-500 via-blue-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={load}
          title="Refresh"
          className="p-3.5 text-slate-400 bg-black/40 border border-white/[0.05] rounded-xl hover:bg-white/[0.05] hover:text-white transition-colors group flex-shrink-0"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-rose-400' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-32">
          <div className="w-12 h-12 border-[3px] border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-6 shadow-glow-rose" />
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest animate-pulse">Loading vehicles...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 max-w-xl mx-auto shadow-[0_0_20px_rgba(239,68,68,0.1)]">
          <p className="text-red-400 font-bold text-lg mb-2">{error}</p>
          <p className="text-slate-400 text-sm font-medium">Make sure the backend server is running on port 5000.</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-32 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 border border-white/10 rounded-full animate-ping opacity-20" />
            <Car className="w-10 h-10 text-slate-600" />
          </div>
          <p className="text-white font-extrabold text-2xl mb-3 tracking-tight">No vehicles found</p>
          <p className="text-slate-400 text-sm mb-8 font-medium max-w-sm">
            {search || statusFilter !== 'All'
              ? 'Try adjusting your search query or filter settings.'
              : 'Your fleet is currently empty. Add your first vehicle to get started.'}
          </p>
          {!search && statusFilter === 'All' && (
            <Link
              href="/vehicles/add"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/[0.05] border border-white/[0.1] text-white text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-white/[0.1] transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" /> Add Vehicle
            </Link>
          )}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && filtered.length > 0 && (
        <>
          {(search || statusFilter !== 'All') && (
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-glow-rose" />
              Showing {filtered.length} of {vehicles.length} result{filtered.length !== 1 ? 's' : ''}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map(v => (
              <VehicleCard key={v.vehicleId} vehicle={v} onDelete={handleDelete} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
