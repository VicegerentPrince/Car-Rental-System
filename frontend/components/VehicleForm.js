'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STATUSES = ['Available', 'Rented', 'Service'];
const COLORS   = ['Black', 'White', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Brown'];

const STATUS_ACTIVE = {
  Available: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-glow-emerald',
  Rented:    'bg-blue-500/20   text-blue-400 border-blue-500/40 shadow-glow-blue',
  Service:   'bg-amber-500/20  text-amber-400 border-amber-500/40 shadow-glow-amber',
};

export default function VehicleForm({ initialData = {}, onSubmit, isEdit = false }) {
  const router = useRouter();

  const [form, setForm] = useState({
    vehicleId:       initialData.vehicleId       || '',
    make:            initialData.make            || '',
    model:           initialData.model           || '',
    manufactureYear: initialData.manufactureYear || '',
    licensePlate:    initialData.licensePlate    || '',
    color:           initialData.color           || '',
    mileage:         initialData.mileage         ?? '',
    dailyRentRate:   initialData.dailyRentRate   ?? '',
    status:          initialData.status          || 'Available',
    lastServiceDate: initialData.lastServiceDate
      ? new Date(initialData.lastServiceDate).toISOString().split('T')[0]
      : '',
  });

  const [loading, setLoading] = useState(false);
  const [error,   setError  ] = useState('');

  const set = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const inputCls =
    'w-full border border-white/[0.08] rounded-xl px-4 py-3 text-sm bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 transition-all placeholder-slate-600 backdrop-blur-md font-medium';

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-4 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          {error}
        </div>
      )}

      {/* Section: Identity */}
      <div className="bg-white/[0.01] border border-white/[0.03] p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
            <span className="text-rose-400 font-bold text-xs">01</span>
          </div>
          <h2 className="text-sm font-bold text-white uppercase tracking-widest">
            Vehicle Identity
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {!isEdit && (
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Vehicle ID <span className="text-rose-400">*</span>
                <span className="text-slate-600 font-normal ml-2 text-[10px] lowercase tracking-normal">(exactly 4 chars)</span>
              </label>
              <input
                name="vehicleId"
                value={form.vehicleId}
                onChange={set}
                required
                maxLength={4}
                minLength={1}
                placeholder="V001"
                className={`${inputCls} font-mono`}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Make <span className="text-rose-400">*</span>
            </label>
            <input
              name="make"
              value={form.make}
              onChange={set}
              required
              maxLength={30}
              placeholder="Toyota"
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Model <span className="text-rose-400">*</span>
            </label>
            <input
              name="model"
              value={form.model}
              onChange={set}
              required
              maxLength={30}
              placeholder="Camry"
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Manufacture Year <span className="text-rose-400">*</span>
            </label>
            <input
              name="manufactureYear"
              value={form.manufactureYear}
              onChange={set}
              required
              maxLength={4}
              placeholder="2024"
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              License Plate <span className="text-rose-400">*</span>
            </label>
            <input
              name="licensePlate"
              value={form.licensePlate}
              onChange={set}
              required
              maxLength={10}
              placeholder="ABC-1234"
              className={`${inputCls} font-mono`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Color <span className="text-rose-400">*</span>
            </label>
            <select
              name="color"
              value={form.color}
              onChange={set}
              required
              className={`${inputCls} appearance-none`}
            >
              <option value="" className="bg-slate-900 text-slate-400">Select a color</option>
              {COLORS.map(c => (
                <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section: Financials & Metrics */}
      <div className="bg-white/[0.01] border border-white/[0.03] p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
            <span className="text-blue-400 font-bold text-xs">02</span>
          </div>
          <h2 className="text-sm font-bold text-white uppercase tracking-widest">
            Financials & Metrics
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Mileage <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                name="mileage"
                type="number"
                value={form.mileage}
                onChange={set}
                required
                min="0"
                step="0.1"
                placeholder="15000"
                className={`${inputCls} pr-12 font-mono`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold uppercase">mi</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Daily Rent Rate <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">$</span>
              <input
                name="dailyRentRate"
                type="number"
                value={form.dailyRentRate}
                onChange={set}
                required
                min="0"
                step="0.01"
                placeholder="59.99"
                className={`${inputCls} pl-9 font-mono`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section: Status & Service */}
      <div className="bg-white/[0.01] border border-white/[0.03] p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
            <span className="text-emerald-400 font-bold text-xs">03</span>
          </div>
          <h2 className="text-sm font-bold text-white uppercase tracking-widest">
            Status & Service
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Status <span className="text-rose-400">*</span>
            </label>
            <div className="flex gap-3">
              {STATUSES.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm(p => ({ ...p, status: s }))}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all duration-300 ${
                    form.status === s
                      ? STATUS_ACTIVE[s]
                      : 'bg-white/[0.02] text-slate-400 border-white/[0.05] hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Last Service Date
            </label>
            {/* Tailwind dark mode date inputs sometimes need color-scheme: dark to show up cleanly. We'll use a wrapper style. */}
            <input
              name="lastServiceDate"
              type="date"
              value={form.lastServiceDate}
              onChange={set}
              style={{ colorScheme: 'dark' }}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/[0.05]">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3.5 bg-gradient-to-r from-rose-500 via-blue-500 to-blue-600 text-white text-sm font-bold uppercase tracking-wider rounded-xl hover:from-rose-400 hover:via-blue-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-glow-rose hover:scale-[1.02]"
        >
          {loading ? 'Saving Data...' : isEdit ? 'Update Vehicle' : 'Add Vehicle'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-3.5 bg-white/[0.02] text-slate-300 text-sm font-bold uppercase tracking-wider rounded-xl border border-white/[0.05] hover:bg-white/[0.05] hover:text-white transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
