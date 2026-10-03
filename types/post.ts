export interface IPost {
  slug: string;
  date: string;
  category: string;
  thumbnail: string;
  title: string;
  description: string;
  author: string;
  color?: string;
  type?: string;
  tech?: string[];
}

// Lightweight shape used anywhere a list of posts is shown or searched:
// the home list, the spotlight search index, and "keep reading".
export interface IPostSummary {
  slug: string;
  date: string;
  title: string;
  description: string;
  category: string;
  readingTime: number;
}

export interface ITocItem {
  id: string;
  label: string;
  // 0 for the post's main sections, 1 and 2 for sub-sections under them
  depth: number;
}
