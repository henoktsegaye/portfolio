import { Button, Input } from "../basic/ui";

interface BlogHeader {
  search: string;
  onSearchChange: (val: string) => void;

  tags: string[];
  activeTag: string;

  onTagChange: (tag: string) => void;
}

const BlogHeader = ({
  search,
  onSearchChange,
  tags,
  activeTag,
  onTagChange,
}: BlogHeader) => {
  return (
    <div className="mb-8 flex w-full flex-1 flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex w-full gap-3 overflow-auto py-1 lg:w-auto">
        {tags.map((el) => (
          <Button
            key={el}
            size="sm"
            variant={el === activeTag ? "primary" : "ghost"}
            onClick={() => onTagChange(el)}
            className="whitespace-nowrap normal-case tracking-normal"
          >
            {el}
          </Button>
        ))}
      </div>
      <div className="w-full lg:max-w-xs">
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          type="search"
          placeholder="search posts..."
          shell
        />
      </div>
    </div>
  );
};

export { BlogHeader };
