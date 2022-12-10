/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    // ...
    require('@tailwindcss/line-clamp'),
  ],
  
  corePlugins: {
    preflight: false // <== disable this!
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Public Sans'],
        oswald: ['oswald']
      },
      colors: {
        primary: {
          'dark-blue': 'hsl(233, 26%, 24%)',
          'lime-green': 'hsl(0, 50%, 10%)',
          'bright-cyan': 'hsl(192, 70%, 51%)',
        },
        neutral: {
          'grayish-blue': 'hsl(233, 8%, 62%)',
          'light-grayish-blue': 'hsl(220, 16%, 96%)',
          'very-light-gray': 'hsl(0, 0%, 98%)',
          white: 'hsl(0, 0%, 100%)',
        },
      },
      backgroundImage: (theme) => ({
        'header-desktop': "url('/images/bg-intro-desktop.svg')",
        'header-mobile': "url('/images/bg-intro-mobile.svg')",
        'image-mockups': "url('/images/image-mockups.png')",
      }),
      backgroundSize: {
        'custom-mobile-header-size': '100% 50%',
        'custom-mobile-mockup-size': 'auto 60%',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '2rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '5rem',
        },
      },
      inset: {
        '-42.6%': '-42.6%',
      },
    },
  },
}