export type DeskKey = "laptop" | "journal" | "books" | "coffee" | "mixer" | "lily";

export const deskItems: Record<DeskKey, { object: string; title: string; body: string }> = {
  laptop: {
    object: "The MacBook Pro",
    title: "Full Stack Engineer",
    body: "This is what I do, day to day.",
  },
  journal: {
    object: "The journal",
    title: "Writing things down",
    body: "This blog. Notes on software, and the occasional detour into life.",
  },
  books: {
    object: "The book stack",
    title: "What I read",
    body: "Human behaviour, meaning and productivity. The ones I recommend are on the shelf below.",
  },
  coffee: {
    object: "The cup",
    title: "Coffee, correctly made",
    body: "I care more than is reasonable about coffee.",
  },
  mixer: {
    object: "The mixer",
    title: "Experimenting with music",
    body: "I love to try out music and experiment with it.",
  },
  lily: {
    object: "The lily",
    title: "Growing things",
    body: "Plants now, and a long-standing pull toward farming.",
  },
};

export type Book = {
  id: string;
  title: string;
  author: string;
  // spine height in px, and its colors (CSS values, so they can use tokens)
  height: number;
  bg: string;
  fg: string;
  // What the book is about, shown in the modal.
  description: string;
  // Your own reason for recommending it. Shown under the description when set.
  why?: string;
  // Cover image URL. Omit to show a plain block in the spine's colors.
  cover?: string;
};

const openLibraryIsbn = (isbn: string) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
const openLibraryId = (id: number) => `https://covers.openlibrary.org/b/id/${id}-L.jpg`;

// Add a book here and it shows up on the shelf. `why` is the sentence
// shown under the title when its spine is pulled out.
export const books: Book[] = [
  {
    id: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    height: 210,
    bg: "#15110f",
    fg: "#f2e9e4",
    description:
      "Marcus Aurelius's private notes to himself, written while he ruled Rome. Short reflections on discipline, impermanence and acting well.",
    // Modern Library edition (Gregory Hays translation)
    cover: openLibraryIsbn("9780812968255"),
  },
  {
    id: "thinking-fast-and-slow",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    height: 250,
    bg: "#f3ecdc",
    fg: "#3a2d12",
    description:
      "Daniel Kahneman on the two modes of thinking: a fast, intuitive one and a slow, deliberate one, and the biases that show up when they disagree.",
    cover: openLibraryIsbn("9780374533557"),
  },
  {
    id: "designing-data-intensive-applications",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    height: 330,
    bg: "#c9283a",
    fg: "#ffffff",
    description:
      "A tour of the ideas behind modern data systems: storage engines, replication, partitioning, transactions and stream processing, and the trade-offs between them.",
    cover: openLibraryIsbn("9781449373320"),
  },
  {
    id: "you-dont-know-js",
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    height: 230,
    bg: "#f0db4f",
    fg: "#1a1a1a",
    description:
      "A series that digs into how JavaScript really works: scope, closures, types, this and prototypes. Up & Going, shown here, is the opening volume.",
    // Up & Going, the first book of the series
    cover: openLibraryId(8114557),
  },
  {
    id: "the-pragmatic-programmer",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    height: 270,
    bg: "#1f2a37",
    fg: "#ffffff",
    description:
      "Practical habits for working programmers: own your work, keep code easy to change, automate the boring parts and keep learning. This is the 20th anniversary edition.",
    cover: openLibraryIsbn("9780135957059"),
  },
];
