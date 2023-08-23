import { Text } from "./text";
interface TagProps {
  value: string;
  onClick: (value: string | null) => void;
  isActive: boolean | undefined;
}

const Tag = ({ value, onClick, isActive }: TagProps) => {
  return (
    <div
      onClick={() => onClick(value !== "All" ? value : null)}
      key={value}
      className={` text-center transition-all  px-2 capitalize cursor-pointer  rounded-lg  line-clamp-1 ${
        isActive
          ? "border-green-500   bg-green-400 bg-opacity-10 ring-green-500 "
          : " border-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:bg-opacity-20 bg-gray-400 bg-opacity-10 border-transparent "
      }`}
      style={{
        minWidth: 'min-content'
      }}
    >
      <Text
        size="xl"
        className={`${isActive ? "text-green-500 dark:text-green-500" : ""}`}
        bold="bold"
      >
        {value}
      </Text>
    </div>
  );
};

export { Tag };
