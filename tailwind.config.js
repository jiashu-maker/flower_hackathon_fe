/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'medical-blue': '#2563eb',
        'medical-gray': '#f8fafc',
        'medical-dark-gray': '#64748b',
      },
    },
  },
  plugins: [],
}
