/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        white_smoke: 'var(--white_smoke)',
        purple__prm: 'var(--purple__prm)',
        blue__prm: 'var(--blue__prm)',
        blue__light__0: 'var(--blue__light__0)',
        blue__dark__0: 'var(--blue__dark__0)',
        blue__dark__1: 'var(--blue__dark__1)',
        blue__dark__2: 'var(--blue__dark__2)',
        gray__0: 'var(--gray__0)',
        gray__1: 'var(--gray__1)',
        orange__prm: 'var(--orange__prm)',
      },
      borderWidth: {
        3: '3px',
      },
    },
  },
  plugins: [],
};
