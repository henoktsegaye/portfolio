import { useState } from "react";
import classNames from "classnames";
/**
 * genial-button component
 * @param {string} label
 * @param {string} color
 * @param {string} size
 * @param {string} variant
 * @param {string} icon
 * @param {string} iconPosition
 * @param {string} iconSize
 * @param {string} iconColor
 * @param {boolean} disabled
 * @param {boolean} loading
 * @param {boolean} rounded
 * @param {boolean} outline
 * @param {boolean} block
 * @param {boolean} fluid
 * @param {boolean} ghost
 */

type Varaint = "solid" | "outline" | "ghost";
type Color = "primary" | "secondary" | "gray" | "red" | "yellow" | "green";
type Size = "sm" | "md" | "lg";
type IconPosition = "left" | "right";
type Rounded = "sm" | "md" | "lg" | "full";

type Props = {
  label?: string;
  color?: Color;
  size?: Size;
  variant?: Varaint;
  icon?: string;
  iconPosition?: IconPosition;
  iconSize?: Size;
  iconColor?: Color;
  disabled?: boolean;
  loading?: boolean;
  rounded?: Rounded;
  outline?: boolean;
  block?: boolean;
  fluid?: boolean;
  ghost?: boolean;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: any;
};

const Button = ({
  label,
  color = "primary",
  size = "md",
  variant = "solid",
  icon,
  iconPosition = "left",
  iconSize = "md",
  iconColor = "gray",
  disabled = false,
  loading = false,
  rounded = "md",
  outline = false,
  block = false,
  fluid = false,
  ghost = false,
  children,
  ...props
}: Props) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive(!isActive);
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const buttonClasses = classNames({
    "genial-button": true,
    "genial-button--solid": variant === "solid",
    "genial-button--outline": variant === "outline" || outline,
    "genial-button--ghost": variant === "ghost" || ghost,
    "genial-button--primary": color === "primary",
    "genial-button--secondary": color === "secondary",
    "genial-button--gray": color === "gray",
    "genial-button--red": color === "red",
    "genial-button--yellow": color === "yellow",
    "genial-button--green": color === "green",
    "genial-button--sm": size === "sm",
    "genial-button--md": size === "md",
    "genial-button--lg": size === "lg",
    "genial-button--left": iconPosition === "left",
    "genial-button--right": iconPosition === "right",
    "genial-button--icon-sm": iconSize === "sm",
    "genial-button--icon-md": iconSize === "md",
    "genial-button--icon-lg": iconSize === "lg",
    "genial-button--icon-primary": iconColor === "primary",
    "genial-button--icon-secondary": iconColor === "secondary",
    "genial-button--icon-gray": iconColor === "gray",
    "genial-button--icon-red": iconColor === "red",
    "genial-button--icon-yellow": iconColor === "yellow",
    "genial-button--icon-green": iconColor === "green",
    "genial-button--rounded-sm": rounded === "sm",
    "genial-button--rounded-md": rounded === "md",
    "genial-button--rounded-lg": rounded === "lg",
    "genial-button--rounded-full": rounded === "full",
    "genial-button--block": block,
    "genial-button--fluid": fluid,
    "genial-button--active": isActive,
    "genial-button--disabled": disabled,
    "genial-button--loading": loading,
  });

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {icon && <i className={`genial-icon ${icon}`}></i>}
      {label && <span>{label}</span>}
      {children}
    </button>
  );
};

export default Button;
