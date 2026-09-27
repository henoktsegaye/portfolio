const CategoryTag: React.FC<{ category: string }> = ({ category }) => (
  <span className="inline-block rounded border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-xs text-black dark:border-gray-700">
    {category}
  </span>
);

export default CategoryTag;
