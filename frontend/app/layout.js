import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Car Rental System',
  description: 'Car Rental Fleet Management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0A0A0B] text-slate-200 min-h-screen selection:bg-rose-500/30 selection:text-white`}>
        <div className="flex min-h-screen relative overflow-hidden">
          {/* Subtle background ambient glows */}
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-rose-500/15 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black rounded-full blur-[120px] pointer-events-none" />
          
          <Sidebar />
          <main className="flex-1 ml-64 min-h-screen relative z-10 transition-all duration-300">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
