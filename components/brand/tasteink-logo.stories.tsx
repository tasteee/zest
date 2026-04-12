import type { Meta, StoryObj } from "@storybook/nextjs";
import { TasteinkLogo } from "./tasteink-logo";

const meta: Meta<typeof TasteinkLogo> = {
  title: "Brand/TasteinkLogo",
  component: TasteinkLogo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type StoryT = StoryObj<typeof TasteinkLogo>;

export const Default: StoryT = {
  args: {},
};

export const Large: StoryT = {
  args: {
    scale: 2,
  },
};

export const Small: StoryT = {
  args: {
    scale: 0.5,
  },
};
