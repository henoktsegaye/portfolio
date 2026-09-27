import { formatPostDate } from "../../lib/formatDate";
import CategoryTag from "./CategoryTag";

const PostMeta: React.FC<{ date: string; category: string }> = ({
  date,
  category,
}) => (
  <div className="flex items-center gap-2 font-mono text-xs text-gray-600 dark:text-gray-400">
    <span>{formatPostDate(date)}</span>
    <CategoryTag category={category} />
  </div>
);

export default PostMeta;
