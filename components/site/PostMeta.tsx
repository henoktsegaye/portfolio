import { formatPostDate } from "../../lib/formatDate";

type Props = {
  date: string;
  category?: string;
  readingTime?: number;
  // Post pages spell it out ("4 min read"); lists keep it short ("4 min").
  long?: boolean;
  className?: string;
};

const Dot = () => <span aria-hidden="true">·</span>;

const PostMeta: React.FC<Props> = ({ date, category, readingTime, long = false, className = "" }) => (
  <p className={`flex flex-wrap gap-x-2.5 gap-y-1 text-sm text-mute ${className}`}>
    {category && (
      <>
        <span className="font-medium text-accent">{category}</span>
        <Dot />
      </>
    )}
    <time dateTime={date}>{formatPostDate(date)}</time>
    {readingTime ? (
      <>
        <Dot />
        <span>{readingTime} min{long ? " read" : ""}</span>
      </>
    ) : null}
  </p>
);

export default PostMeta;
