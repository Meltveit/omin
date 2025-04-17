/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          red: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c', // Primary brand color
            800: '#991b1b',
            900: '#7f1d1d',
            950: '#450a0a',
          },
        },
        fontFamily: {
          sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        },
        typography: (theme) => ({
          DEFAULT: {
            css: {
              color: theme('colors.gray.700'),
              a: {
                color: theme('colors.red.700'),
                '&:hover': {
                  color: theme('colors.red.800'),
                },
              },
              h2: {
                color: theme('colors.gray.900'),
              },
              h3: {
                color: theme('colors.gray.900'),
              },
            },
          },
        }),
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      function({ addUtilities }) {
        const newUtilities = {
          '.card-shadow': {
            'box-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
          '.hover-scale': {
            'transition': 'transform 0.3s',
            '&:hover': {
              'transform': 'scale(1.05)',
            },
          },
        }
        addUtilities(newUtilities)
      }
    ],
    // Reduce file size in production
    future: {
      removeDeprecatedGapUtilities: true,
      purgeLayersByDefault: true,
    },
  }