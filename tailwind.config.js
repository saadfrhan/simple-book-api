/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              margin: 0
            },
            h2: {
              marginTop: '1em',
              marginBottom: '0.5em'
            },
            h3: {
              marginTop: '0.8em',
              marginBottom: '0.3em'
            }
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

