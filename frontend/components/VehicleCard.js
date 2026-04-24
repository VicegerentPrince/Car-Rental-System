'use client';

import Link from 'next/link';
import { Gauge, DollarSign, Tag, Eye, Edit2, Trash2, Calendar } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function VehicleCard({ vehicle, onDelete }) {
  return (
    <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.05] overflow-hidden hover:-translate-y-1 hover:border-rose-500/30 hover:shadow-glow-rose transition-all duration-300 group">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E1E28]/80 to-[#121218]/80 px-6 py-5 border-b border-white/[0.02] relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="min-w-0">
            <h3 className="text-white font-bold text-xl leading-tight truncate tracking-wide">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-semibold">{vehicle.manufactureYear} · {vehicle.color}</p>
          </div>
          <StatusBadge status={vehicle.status} />
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2.5 text-sm text-slate-300">
            <div className="w-7 h-7 rounded-lg bg-white/[0.03] flex items-center justify-center border border-white/[0.05]">
              <Tag className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <span className="font-mono font-semibold truncate">{vehicle.licensePlate}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-slate-300">
            <div className="w-7 h-7 rounded-lg bg-white/[0.03] flex items-center justify-center border border-white/[0.05]">
              <Gauge className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="font-semibold">{Number(vehicle.mileage).toLocaleString()} <span className="text-slate-500 text-xs uppercase">mi</span></span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-sm bg-black/20 p-3 rounded-xl border border-white/[0.02]">
          <DollarSign className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="font-bold text-white text-xl">
            {Number(vehicle.dailyRentRate).toFixed(2)}
          </span>
          <span className="text-slate-400 tracking-wider text-xs uppercase font-semibold">/ day</span>
        </div>

        {vehicle.lastServiceDate && (
          <div className="flex items-center gap-2.5 text-xs text-slate-400 pt-3 border-t border-white/[0.05]">
            <Calendar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>
              Last service: <span className="text-slate-300 font-medium">
                {new Date(vehicle.lastServiceDate).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'short', day: 'numeric',
                })}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-4 bg-black/40 border-t border-white/[0.05] flex gap-2">
        <Link
          href={`/vehicles/${vehicle.vehicleId}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:bg-white/[0.08] hover:text-white transition-all duration-200"
        >
          <Eye className="w-4 h-4" />
          View
        </Link>
        <Link
          href={`/vehicles/${vehicle.vehicleId}/edit`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 rounded-xl border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-200 shadow-[0_0_10px_rgba(59,130,246,0.05)] hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </Link>
        <button
          onClick={() => onDelete(vehicle.vehicleId)}
          className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all duration-200 shadow-[0_0_10px_rgba(239,68,68,0.05)] hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
