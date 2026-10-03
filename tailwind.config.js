const token = (name) => `var(--${name})`;

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./hooks/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        page: token("page"),
        ink: token("ink"),
        copy: token("copy"),
        sub: token("sub"),
        mute: token("mute"),
        accent: token("accent"),
        fill: token("fill"),
        tint: token("tint"),
        field: token("field"),
        band: token("band"),
        rule: token("rule"),
        callout: token("callout"),
      },
      fontSize: {
        ui: "0.9375rem",
        small: "1.0625rem",
        body: "1.1875rem",
        lede: "1.3125rem",
        display: "2.5rem",
      },
      maxWidth: {
        col: "760px",
        wide: "1000px",
        post: "1120px",
      },
      fontFamily: {
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Menlo', 'Monaco', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  darkMode: "media",
};
