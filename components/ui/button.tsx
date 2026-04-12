import React from "react";
import { cva } from "class-variance-authority";

type ButtonKindT = "outlined" | "solid" | "ghost";
type ButtonThemeT = "green" | "purple" | "pink" | "orange" | "white";
type ButtonSizeT = "xs" | "sm" | "md" | "lg" | "xl";

type ButtonPropsT = {
  kind: ButtonKindT;
  theme: ButtonThemeT;
  size: ButtonSizeT;
  isDisabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold rounded-md border transition-opacity cursor-pointer",
  {
    variants: {
      kind: {
        solid: "",
        outlined: "bg-transparent",
        ghost: "bg-transparent border-transparent",
      },
      theme: {
        green: "",
        purple: "",
        pink: "",
        orange: "",
        white: "",
      },
      size: {
        xs: "px-2.5 py-1 text-xs",
        sm: "px-3.5 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        xl: "px-8 py-4 text-lg",
      },
    },
    compoundVariants: [
      // solid
      {
        kind: "solid",
        theme: "green",
        class:
          "bg-neon-green  border-neon-green  text-primary-foreground hover:opacity-90",
      },
      {
        kind: "solid",
        theme: "purple",
        class:
          "bg-neon-purple border-neon-purple text-primary-foreground hover:opacity-90",
      },
      {
        kind: "solid",
        theme: "pink",
        class:
          "bg-neon-pink   border-neon-pink   text-primary-foreground hover:opacity-90",
      },
      {
        kind: "solid",
        theme: "orange",
        class:
          "bg-neon-orange border-neon-orange text-primary-foreground hover:opacity-90",
      },
      {
        kind: "solid",
        theme: "white",
        class:
          "bg-primary     border-primary     text-primary-foreground hover:opacity-90",
      },
      // outlined
      {
        kind: "outlined",
        theme: "green",
        class: "border-neon-green  text-neon-green  hover:bg-neon-green/10",
      },
      {
        kind: "outlined",
        theme: "purple",
        class: "border-neon-purple text-neon-purple hover:bg-neon-purple/10",
      },
      {
        kind: "outlined",
        theme: "pink",
        class: "border-neon-pink   text-neon-pink   hover:bg-neon-pink/10",
      },
      {
        kind: "outlined",
        theme: "orange",
        class: "border-neon-orange text-neon-orange hover:bg-neon-orange/10",
      },
      {
        kind: "outlined",
        theme: "white",
        class:
          "border-border       text-foreground  hover:border-foreground/50",
      },
      // ghost
      {
        kind: "ghost",
        theme: "green",
        class: "text-neon-green  hover:opacity-70",
      },
      {
        kind: "ghost",
        theme: "purple",
        class: "text-neon-purple hover:opacity-70",
      },
      {
        kind: "ghost",
        theme: "pink",
        class: "text-neon-pink   hover:opacity-70",
      },
      {
        kind: "ghost",
        theme: "orange",
        class: "text-neon-orange hover:opacity-70",
      },
      {
        kind: "ghost",
        theme: "white",
        class: "text-foreground  hover:opacity-70",
      },
    ],
    defaultVariants: {
      kind: "solid",
      theme: "white",
      size: "md",
    },
  },
);

const Button = (props: ButtonPropsT) => {
  const buttonClass = buttonVariants({
    kind: props.kind,
    theme: props.theme,
    size: props.size,
  });
  const disabledClass = props.isDisabled
    ? "opacity-50 pointer-events-none"
    : "";

  return (
    <button
      className={`${buttonClass} ${disabledClass}`}
      onClick={props.onClick}
      disabled={props.isDisabled}
    >
      {props.children}
    </button>
  );
};

export { Button };
