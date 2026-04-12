import type { Meta, StoryObj } from "@storybook/nextjs";
import { Navigation } from "./navigation";

const meta: Meta<typeof Navigation> = {
  title: "Brand/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type StoryT = StoryObj<typeof Navigation>;

export const Default: StoryT = {
  args: {
    activeSection: "hero",
  },
};

export const ColorSystemActive: StoryT = {
  args: {
    activeSection: "color-system",
  },
};
