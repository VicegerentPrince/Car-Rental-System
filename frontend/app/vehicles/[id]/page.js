'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Edit2, Trash2, Car,
  Calendar, Gauge, DollarSign, Tag, Hash, Palette,
} from 'lucide-react';
import { getVehicle, deleteVehicle } from '@/lib/api';
import StatusBadge from '@/components/StatusBadge';

export default function VehicleDetailPage() {
  const router = useRouter();
  const { id }  = useParams();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError  ] = useState('');

  useEffect(() => {
    getVehicle(id)
      .then(setVehicle)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Delete this vehicle? This cannot be undone.')) return;
    try {
      await deleteVehicle(id);
      router.push('/vehicles');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return (
    <div className="p-8">
      <div className="text-center py-24">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">Loading vehicle details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-8">
      <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl">
        {error}
      </div>
    </div>
  );

  if (!vehicle) return null;

  return (
    <div className="p-8">
      {/* Back */}
      <Link
        href="/vehicles"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        All Vehicles
      </Link>

      {/* Title bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {vehicle.make} {vehicle.model}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <StatusBadge status={vehicle.status} />
            <span className="text-gray-400 text-sm">
              ID: <span className="font-mono font-semibold text-gray-600">{vehicle.vehicleId}</span>
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/vehicles/${id}/edit`}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-sm shadow-red-600/20"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Hero card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 px-7 py-8 flex items-center gap-5">
          <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0">
            <Car className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-white text-2xl font-bold">{vehicle.make} {vehicle.model}</h2>
            <p className="text-slate-300 mt-1">{vehicle.manufactureYear} model · {vehicle.color}</p>
          </div>
        </div>

        {/* Detail grid */}
        <div className="p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Field icon={Hash}       label="Vehicle ID"     value={vehicle.vehicleId}            mono />
          <Field icon={Tag}        label="License Plate"  value={vehicle.licensePlate}         mono />
          <Field icon={Palette}    label="Color"          value={vehicle.color} />
          <Field
            icon={Gauge}
            label="Mileage"
            value={`${Number(vehicle.mileage).toLocaleString()} miles`}
          />
          <Field
            icon={DollarSign}
            label="Daily Rate"
            value={`$${Number(vehicle.dailyRentRate).toFixed(2)} / day`}
            highlight
          />
          <Field
            icon={Calendar}
            label="Last Service Date"
            value={
              vehicle.lastServiceDate
                ? new Date(vehicle.lastServiceDate).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })
                : 'Not recorded'
            }
          />
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value, mono, highlight }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
        <p className={`mt-0.5 font-semibold ${mono ? 'font-mono' : ''} ${highlight ? 'text-blue-600 text-lg' : 'text-gray-800'}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
