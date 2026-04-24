'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Car } from 'lucide-react';
import VehicleForm from '@/components/VehicleForm';
import { createVehicle } from '@/lib/api';

export default function AddVehiclePage() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    await createVehicle(data);
    router.push('/vehicles');
  };

  return (
    <div className="p-8 lg:p-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/vehicles"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Vehicles
        </Link>

        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-gradient-to-br from-rose-500/20 via-blue-500/20 to-blue-600/20 border border-rose-500/30 rounded-2xl flex items-center justify-center shadow-glow-rose backdrop-blur-md">
            <Car className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Add New Vehicle</h1>
            <p className="text-slate-400 text-sm font-medium mt-1 tracking-wide">Register a new vehicle to the fleet database.</p>
          </div>
        </div>
      </div>

      {/* Form wrapper */}
      <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.05] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <VehicleForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
