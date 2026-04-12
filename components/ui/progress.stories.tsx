import type { Meta, StoryObj } from "@storybook/nextjs";
import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type StoryT = StoryObj<typeof Progress>;

export const Default: StoryT = {
  args: {
    value: 60,
    className: "w-64",
  },
};

export const Empty: StoryT = {
  args: {
    value: 0,
    className: "w-64",
  },
};

export const Full: StoryT = {
  args: {
    value: 100,
    className: "w-64",
  },
};
