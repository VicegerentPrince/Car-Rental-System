'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, LayoutDashboard, PlusCircle, List } from 'lucide-react';

const navItems = [
  { href: '/',             label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/vehicles',     label: 'All Vehicles', icon: List },
  { href: '/vehicles/add', label: 'Add Vehicle',  icon: PlusCircle },
];

function isActive(href, pathname) {
  if (href === '/') return pathname === '/';
  if (href === '/vehicles')
    return pathname === '/vehicles' ||
      (pathname.startsWith('/vehicles/') && !pathname.startsWith('/vehicles/add'));
  return pathname.startsWith(href);
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white/[0.02] backdrop-blur-2xl border-r border-white/[0.05] flex flex-col z-20">
      {/* Brand */}
      <div className="flex items-center gap-4 px-6 py-8 border-b border-white/[0.05]">
        <div className="w-12 h-12 bg-gradient-to-br from-rose-500 via-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-glow-rose relative group">
          <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <Car className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-lg tracking-wide leading-tight">CarRental</p>
          <p className="text-rose-400 text-xs mt-0.5 tracking-wider uppercase font-semibold">Management system</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest px-3 mb-4">
          Menu
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(href, pathname);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 relative group overflow-hidden ${
                active
                  ? 'text-white bg-white/[0.02] border border-white/[0.05] shadow-[inset_4px_0_0_0_#F43F5E]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {active && (
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-blue-500/5 to-transparent opacity-100 z-0" />
              )}
              <Icon className={`w-5 h-5 flex-shrink-0 relative z-10 transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="relative z-10">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-6 border-t border-white/[0.05] bg-white/[0.01]">
        <div className="flex flex-col gap-1">
          <p className="text-slate-500 text-[11px] uppercase tracking-wider font-bold">DB Lab — Assignment 1</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-glow-emerald" />
            <p className="text-slate-300 text-xs font-semibold">Vehicle Fleet Module</p>
          </div>
        </div>
      </div>
    </div>
  );
}
