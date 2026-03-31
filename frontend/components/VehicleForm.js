'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STATUSES = ['Available', 'Rented', 'Service'];
const COLORS   = ['Black', 'White', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Brown'];

const STATUS_ACTIVE = {
  Available: 'bg-emerald-600 text-white border-emerald-600',
  Rented:    'bg-blue-600   text-white border-blue-600',
  Service:   'bg-amber-500  text-white border-amber-500',
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
    'w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-300';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* Section: Identity */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Vehicle Identity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {!isEdit && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Vehicle ID <span className="text-red-400">*</span>
                <span className="text-gray-400 font-normal ml-1 text-xs">(exactly 4 chars, e.g. V001)</span>
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Make <span className="text-red-400">*</span>
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Model <span className="text-red-400">*</span>
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Manufacture Year <span className="text-red-400">*</span>
            </label>
            <input
              name="manufactureYear"
              value={form.manufactureYear}
              onChange={set}
              required
              maxLength={4}
              placeholder="2022"
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              License Plate <span className="text-red-400">*</span>
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Color <span className="text-red-400">*</span>
            </label>
            <select
              name="color"
              value={form.color}
              onChange={set}
              required
              className={inputCls}
            >
              <option value="">Select a color</option>
              {COLORS.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section: Financials & Metrics */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Financials & Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mileage <span className="text-red-400">*</span>
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
                className={`${inputCls} pr-10`}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">mi</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Daily Rent Rate <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
              <input
                name="dailyRentRate"
                type="number"
                value={form.dailyRentRate}
                onChange={set}
                required
                min="0"
                step="0.01"
                placeholder="59.99"
                className={`${inputCls} pl-8`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section: Status & Service */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Status & Service
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2">
              {STATUSES.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm(p => ({ ...p, status: s }))}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border transition-all ${
                    form.status === s
                      ? STATUS_ACTIVE[s]
                      : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Last Service Date
            </label>
            <input
              name="lastServiceDate"
              type="date"
              value={form.lastServiceDate}
              onChange={set}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm shadow-blue-600/20"
        >
          {loading ? 'Saving...' : isEdit ? 'Update Vehicle' : 'Add Vehicle'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 bg-white text-gray-600 text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
