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
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/vehicles"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Vehicles
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Car className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Vehicle</h1>
            <p className="text-gray-500 text-sm mt-0.5">Register a new vehicle to your fleet</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 max-w-3xl">
        <VehicleForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
