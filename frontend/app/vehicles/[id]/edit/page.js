'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit2 } from 'lucide-react';
import { getVehicle, updateVehicle } from '@/lib/api';
import VehicleForm from '@/components/VehicleForm';

export default function EditVehiclePage() {
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

  const handleSubmit = async (data) => {
    await updateVehicle(id, data);
    router.push(`/vehicles/${id}`);
  };

  if (loading) return (
    <div className="p-8 lg:p-12">
      <div className="text-center py-32">
         <div className="w-12 h-12 border-[3px] border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6 shadow-glow-blue" />
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest animate-pulse">Loading vehicle...</p>
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

  return (
    <div className="p-8 lg:p-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <Link
          href={`/vehicles/${id}`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Vehicle
        </Link>

        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-gradient-to-br from-rose-500/20 via-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center shadow-glow-blue backdrop-blur-md">
            <Edit2 className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Edit Vehicle</h1>
            <p className="text-slate-400 text-sm font-medium mt-1 tracking-wide">
              Updating details for <span className="text-white font-bold">{vehicle?.make} {vehicle?.model}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Form wrapper */}
      <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.05] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {vehicle && <VehicleForm initialData={vehicle} onSubmit={handleSubmit} isEdit />}
      </div>
    </div>
  );
}
