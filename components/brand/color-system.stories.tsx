import type { Meta, StoryObj } from "@storybook/nextjs";
import { ColorSystem } from "./color-system";

const meta: Meta<typeof ColorSystem> = {
  title: "Brand/ColorSystem",
  component: ColorSystem,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type StoryT = StoryObj<typeof ColorSystem>;

export const Default: StoryT = {
  args: {
    onInView: () => {},
  },
};
