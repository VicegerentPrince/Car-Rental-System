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
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Vehicles</h1>
          <p className="text-gray-500 mt-1">
            {loading ? '—' : `${vehicles.length} vehicle${vehicles.length !== 1 ? 's' : ''} in fleet`}
          </p>
        </div>
        <Link
          href="/vehicles/add"
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
        >
          <Plus className="w-4 h-4" />
          Add Vehicle
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by make, model, plate, or color..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1">
          {STATUS_FILTERS.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3.5 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                statusFilter === s
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={load}
          title="Refresh"
          className="p-2.5 text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-24">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Loading vehicles...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <p className="text-red-700 font-medium text-sm">{error}</p>
          <p className="text-red-400 text-xs mt-1">Make sure the backend server is running on port 5000.</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-24">
          <Car className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-600 font-semibold text-lg">No vehicles found</p>
          <p className="text-gray-400 text-sm mt-1">
            {search || statusFilter !== 'All'
              ? 'Try adjusting your search or filter.'
              : 'Add your first vehicle to get started.'}
          </p>
          {!search && statusFilter === 'All' && (
            <Link
              href="/vehicles/add"
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700"
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
            <p className="text-sm text-gray-400 mb-4">
              Showing {filtered.length} of {vehicles.length} vehicles
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(v => (
              <VehicleCard key={v.vehicleId} vehicle={v} onDelete={handleDelete} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
