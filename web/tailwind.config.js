/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-kanit)',
      },
      colors: {
        pgray: {
          200: '#F1F1F1',
          400: '##BFBFBF',
          600: '##8C8C8C',
          800: '#404040',
        },
        pblack: '#0D0D0D',
      },
    },
  },
  plugins: [],
}
