import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
};

export default meta;

type StoryT = StoryObj<typeof Badge>;

export const Default: StoryT = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

export const Secondary: StoryT = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: StoryT = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outline: StoryT = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};
