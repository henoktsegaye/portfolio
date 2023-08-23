import { FC, useState, useEffect } from "react";
import { SwitchProps, useSwitch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import clsx from "clsx";

import MoonFilledIcon from "icons/moon.svg";
import SunFilledIcon from "icons/sun.svg";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const { Component, slots, isSelected } = useSwitch({
    isSelected: theme === "light",
    onChange,
  });

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  // Prevent Hydration Mismatch
  if (!isMounted) return <div className="w-6 h-6" />;

  return (
    <div className=" cursor-pointer ">
      {isSelected ? (
        <MoonFilledIcon
          onClick={onChange}
          className="  text-default-500"
          width="22px"
          height="22px"
        />
      ) : (
        <SunFilledIcon
          onClick={onChange}
          className="  text-default-500"
          width="22px"
          height="22px"
        />
      )}
    </div>
  );
};
