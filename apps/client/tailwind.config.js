/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      screens: {
        xxl: '1440px',
      },
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
      fontSize: {
        hd__xl: ['24px', { lineHeight: '35px', letterSpacing: '-0.33px', fontWeight: '700' }],
        hd__lg: ['20px', { lineHeight: '29px', letterSpacing: '-0.25px', fontWeight: '700' }],
        hd__md: ['18px', { lineHeight: '26px', letterSpacing: '-0.25px', fontWeight: '700' }],
        hd__sm__bold: ['14px', { lineHeight: '20px', letterSpacing: '-0.2px', fontWeight: '700' }],
        hd__sm__reg: ['14px', { lineHeight: '20px', letterSpacing: '-0.2px', fontWeight: '400' }],

        bd__lg__reg: ['16px', { lineHeight: '23px', fontWeight: '400' }],
        bd__lg__bold: ['16px', { lineHeight: '23px', fontWeight: '700' }],

        bd__md__reg: ['15px', { lineHeight: '22px', fontWeight: '400' }],
        bd__md__med: ['15px', { lineHeight: '22px', fontWeight: '500' }],
        bd__md__bold: ['15px', { lineHeight: '22px', fontWeight: '700' }],

        bd__sm__reg: ['13px', { lineHeight: '19px', fontWeight: '400' }],
        bd__sm__semi: ['13px', { lineHeight: '19px', fontWeight: '600' }],
        bd__sm__bold: ['13px', { lineHeight: '19px', fontWeight: '700' }],
      },
      borderWidth: {
        3: '3px',
      },
      zIndex: {
        sidebar__bg: '200',
        navbar: '300',
        sidebar: '400',

        popup__bg: '600',
        popup: '800',

        toast: '9999',
      },
    },
  },
  plugins: [],
};
