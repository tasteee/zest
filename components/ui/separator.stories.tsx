import type { Meta, StoryObj } from "@storybook/nextjs";
import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;

type StoryT = StoryObj<typeof Separator>;

export const Horizontal: StoryT = {
  args: {
    orientation: "horizontal",
    className: "w-64",
  },
};

export const Vertical: StoryT = {
  args: {
    orientation: "vertical",
    className: "h-16",
  },
};
