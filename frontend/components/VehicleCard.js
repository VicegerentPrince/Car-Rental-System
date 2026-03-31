'use client';

import Link from 'next/link';
import { Gauge, DollarSign, Tag, Eye, Edit2, Trash2, Calendar } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function VehicleCard({ vehicle, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 px-5 py-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-white font-bold text-lg leading-tight truncate">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-slate-300 text-sm mt-0.5">{vehicle.manufactureYear} · {vehicle.color}</p>
          </div>
          <StatusBadge status={vehicle.status} />
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Tag className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="font-mono font-medium truncate">{vehicle.licensePlate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Gauge className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span>{Number(vehicle.mileage).toLocaleString()} mi</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
          <span className="font-bold text-gray-900 text-base">
            ${Number(vehicle.dailyRentRate).toFixed(2)}
          </span>
          <span className="text-gray-400">/ day</span>
        </div>

        {vehicle.lastServiceDate && (
          <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t border-gray-50">
            <Calendar className="w-3 h-3 flex-shrink-0" />
            <span>
              Last service: {new Date(vehicle.lastServiceDate).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric',
              })}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex gap-2">
        <Link
          href={`/vehicles/${vehicle.vehicleId}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          View
        </Link>
        <Link
          href={`/vehicles/${vehicle.vehicleId}/edit`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5" />
          Edit
        </Link>
        <button
          onClick={() => onDelete(vehicle.vehicleId)}
          className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-red-700 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
