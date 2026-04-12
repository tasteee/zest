import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type StoryT = StoryObj<typeof Input>;

export const Default: StoryT = {
  args: {
    placeholder: "Enter text...",
    className: "w-64",
  },
};

export const WithValue: StoryT = {
  args: {
    defaultValue: "Hello world",
    className: "w-64",
  },
};

export const Password: StoryT = {
  args: {
    type: "password",
    placeholder: "Enter password...",
    className: "w-64",
  },
};

export const Disabled: StoryT = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
    className: "w-64",
  },
};
