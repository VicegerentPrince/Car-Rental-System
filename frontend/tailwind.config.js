/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'glow-rose': '0 0 20px 0 rgba(244, 63, 94, 0.4)',
        'glow-blue': '0 0 20px 0 rgba(59, 130, 246, 0.4)',
        'glow-emerald': '0 0 20px 0 rgba(16, 185, 129, 0.4)',
        'glow-amber': '0 0 20px 0 rgba(245, 158, 11, 0.4)',
        'glow-red': '0 0 20px 0 rgba(239, 68, 68, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
};
