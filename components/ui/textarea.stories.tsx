import type { Meta, StoryObj } from "@storybook/nextjs";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type StoryT = StoryObj<typeof Textarea>;

export const Default: StoryT = {
  args: {
    placeholder: "Type your message here...",
    className: "w-64",
  },
};

export const Disabled: StoryT = {
  args: {
    placeholder: "Disabled textarea",
    disabled: true,
    className: "w-64",
  },
};
