/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        white_smoke: '#f5f5f5',
        purple__prm: '#AD1FEA',
        blue__prm: '#4661E6',
        blue__light__0: '#62BCFA',
        blue__dark__0: '#647196',
        blue__dark__1: '#3A4374',
        blue__dark__2: '#4661E6',
        gray__0: '#F2F4FF',
        gray__1: '#F7F8FD',
        orange__prm: '#F49F85',
      },
      borderWidth: {
        3: '3px',
      },
    },
  },
  plugins: [],
};
