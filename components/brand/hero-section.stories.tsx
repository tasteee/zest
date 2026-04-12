import type { Meta, StoryObj } from "@storybook/nextjs";
import { HeroSection } from "./hero-section";

const meta: Meta<typeof HeroSection> = {
  title: "Brand/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type StoryT = StoryObj<typeof HeroSection>;

export const Default: StoryT = {
  args: {
    onInView: () => {},
  },
};
