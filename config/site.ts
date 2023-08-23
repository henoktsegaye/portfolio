export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Henok Tsegaye",
  description: "Sharing my development experience",
  navItems: [
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "About",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/henoktsegaye",
    twitter: "https://twitter.com/henokcode",
  },
};

export const Tools = [
  {
    title: "TD Manager",
    description: "Helps you manage TD(Technical Debit) right from Vscode.",
    link: "https://marketplace.visualstudio.com/items?itemName=HenokTsegaye.td-manager",
  },
  {
    title: "JSON Formatter",
    description:
      "Formats JSON with foldable code snippets and let you export the TS definition.",
    link: "https://json-formatter.henoktsegaye.com/",
  },
  {
    title: "Diagram Studio",
    description: "Helps you build basic diagrams with color support",
    link: "http://flow-chart-maker.henoktsegaye.com/",
  },
  {
    title: "Audio Visualizer",
    description:
      "Helps you visualize the audio with a background image and export as video.",
    link: "http://audio-waveform.henoktsegaye.com/",
  },
];
