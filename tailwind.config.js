module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./hooks/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      blur: {
        xs: '2px',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Menlo', 'Monaco', 'monospace'],
      },
    },
  },
  variants: {
    extend: {
      blur: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  darkMode: "class",
};
