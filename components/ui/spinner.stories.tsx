import type { Meta, StoryObj } from "@storybook/nextjs";
import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "UI/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type StoryT = StoryObj<typeof Spinner>;

export const Default: StoryT = {
  args: {},
};

export const Large: StoryT = {
  args: {
    className: "size-12",
  },
};
