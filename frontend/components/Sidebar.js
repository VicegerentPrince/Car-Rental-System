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
    <div className="fixed inset-y-0 left-0 w-64 bg-slate-900 flex flex-col z-20">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-800">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
          <Car className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">CarRental</p>
          <p className="text-slate-400 text-xs mt-0.5">Management System</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
          Menu
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(href, pathname);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-5 border-t border-slate-800">
        <p className="text-slate-500 text-xs">DB Lab — Assignment 1</p>
        <p className="text-slate-300 text-xs font-semibold mt-0.5">Vehicle Fleet Module</p>
      </div>
    </div>
  );
}
