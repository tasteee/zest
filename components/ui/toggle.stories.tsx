import type { Meta, StoryObj } from "@storybook/nextjs";
import { Toggle } from "./toggle";
import { Bold, Italic, Underline } from "lucide-react";

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
};

export default meta;

type StoryT = StoryObj<typeof Toggle>;

export const Default: StoryT = {
  args: {
    children: "Toggle",
    variant: "default",
  },
};

export const Outline: StoryT = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const WithIcon: StoryT = {
  render: () => {
    return (
      <div className="flex gap-2">
        <Toggle aria-label="Bold">
          <Bold />
        </Toggle>
        <Toggle aria-label="Italic">
          <Italic />
        </Toggle>
        <Toggle aria-label="Underline">
          <Underline />
        </Toggle>
      </div>
    );
  },
};
