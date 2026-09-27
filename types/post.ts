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
// the home list, the spotlight search index, and prev/next navigation.
export interface IPostSummary {
  slug: string;
  date: string;
  title: string;
  description: string;
  category: string;
}
