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
    <div className="p-8">
      <div className="text-center py-24">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">Loading vehicle...</p>
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

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/vehicles/${id}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Vehicle
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Edit2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Vehicle</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Updating <span className="font-semibold text-gray-700">{vehicle?.make} {vehicle?.model}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 max-w-3xl">
        {vehicle && <VehicleForm initialData={vehicle} onSubmit={handleSubmit} isEdit />}
      </div>
    </div>
  );
}
