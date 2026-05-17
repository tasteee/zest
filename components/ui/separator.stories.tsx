import type { Meta, StoryObj } from "@storybook/nextjs";
import { Line } from "./line";

const meta: Meta<typeof Line> = {
  title: "UI/Line",
  component: Line,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isVertical: {
      control: "boolean",
    },
    isHorizontal: {
      control: "boolean",
    },
  },
};

export default meta;

type StoryT = StoryObj<typeof Line>;

export const Horizontal: StoryT = {
  args: {
    isHorizontal: true,
    className: "w-64",
  },
};

export const Vertical: StoryT = {
  args: {
    isVertical: true,
    className: "h-16",
  },
};
