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
    if (!confirm('Delete this vehicle? This action cannot be undone.')) return;
    try {
      await deleteVehicle(id);
      router.push('/vehicles');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return (
    <div className="p-8 lg:p-12">
      <div className="text-center py-32">
        <div className="w-12 h-12 border-[3px] border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-6 shadow-glow-rose" />
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest animate-pulse">Loading vehicle details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-8 lg:p-12">
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-5 rounded-2xl max-w-xl shadow-[0_0_20px_rgba(239,68,68,0.1)]">
        <p className="font-bold">{error}</p>
      </div>
    </div>
  );

  if (!vehicle) return null;

  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto">
      {/* Back */}
      <Link
        href="/vehicles"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white mb-10 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Return to Fleet
      </Link>

      {/* Title bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {vehicle.make} {vehicle.model}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <StatusBadge status={vehicle.status} />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <span className="text-slate-400 text-sm uppercase tracking-wider font-bold shadow-sm">
              ID: <span className="font-mono text-slate-200 bg-white/[0.05] border border-white/[0.1] px-2 py-0.5 rounded-md ml-1">{vehicle.vehicleId}</span>
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/vehicles/${id}/edit`}
            className="flex items-center gap-2.5 px-6 py-3.5 bg-white/[0.02] text-white text-sm font-bold uppercase tracking-wider rounded-xl border border-white/[0.05] hover:bg-white/[0.08] transition-all hover:-translate-y-0.5"
          >
            <Edit2 className="w-4 h-4 text-blue-400" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2.5 px-6 py-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-red-500/20 transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:-translate-y-0.5"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Hero card */}
      <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.05] overflow-hidden mb-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="bg-gradient-to-r from-rose-500/30 via-blue-500/20 to-blue-600/10 p-[1px]">
          <div className="bg-gradient-to-br from-[#1E1E28]/90 to-[#121218]/90 px-8 py-10 md:px-12 md:py-14 flex items-center gap-8 relative overflow-hidden rounded-[23px]">
            {/* Subtle light effect */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="w-24 h-24 md:w-32 md:h-32 bg-white/[0.03] border border-white/[0.1] backdrop-blur-xl rounded-3xl flex items-center justify-center flex-shrink-0 shadow-[0_0_40px_rgba(255,255,255,0.05)] relative z-10">
              <Car className="w-12 h-12 md:w-16 md:h-16 text-slate-300" />
            </div>
            <div className="relative z-10">
              <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight">{vehicle.make} {vehicle.model}</h2>
              <p className="text-slate-400 mt-3 text-lg font-medium tracking-wide">{vehicle.manufactureYear} Model · <span className="text-slate-300 font-bold">{vehicle.color}</span></p>
            </div>
          </div>
        </div>

        {/* Detail grid */}
        <div className="p-8 md:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          <Field icon={Hash}       label="Vehicle ID"     value={vehicle.vehicleId}            mono />
          <Field icon={Tag}        label="License Plate"  value={vehicle.licensePlate}         mono />
          <Field icon={Palette}    label="Color"          value={vehicle.color} />
          <Field
            icon={Gauge}
            label="Mileage"
            value={<>{Number(vehicle.mileage).toLocaleString()} <span className="text-slate-500 text-sm">mi</span></>}
          />
          <Field
            icon={DollarSign}
            label="Daily Rate"
            value={<span className="text-3xl">${Number(vehicle.dailyRentRate).toFixed(2)}<span className="text-slate-500 text-sm ml-1 uppercase tracking-wider font-bold">/ day</span></span>}
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
    <div className="flex items-start gap-5">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border ${highlight ? 'bg-rose-500/20 border-rose-500/30 shadow-glow-rose text-rose-400' : 'bg-white/[0.03] border-white/[0.05] text-slate-400'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
        <p className={`font-medium tracking-wide ${mono ? 'font-mono text-lg text-slate-200' : ''} ${highlight ? 'text-white font-extrabold' : 'text-slate-200 text-lg'}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
