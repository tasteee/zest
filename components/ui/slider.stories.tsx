import type { Meta, StoryObj } from "@storybook/nextjs";
import { Slider } from "./slider";

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type StoryT = StoryObj<typeof Slider>;

export const Default: StoryT = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    className: "w-64",
  },
};

export const Range: StoryT = {
  args: {
    defaultValue: [20, 80],
    min: 0,
    max: 100,
    className: "w-64",
  },
};

export const Disabled: StoryT = {
  args: {
    defaultValue: [40],
    disabled: true,
    className: "w-64",
  },
};
