import type { Meta, StoryObj } from "@storybook/nextjs";
import { TypographySystem } from "./typography-system";

const meta: Meta<typeof TypographySystem> = {
  title: "Brand/TypographySystem",
  component: TypographySystem,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type StoryT = StoryObj<typeof TypographySystem>;

export const Default: StoryT = {
  args: {
    onInView: () => {},
  },
};
