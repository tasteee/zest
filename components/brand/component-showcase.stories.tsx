import type { Meta, StoryObj } from "@storybook/nextjs";
import { ComponentShowcase } from "./component-showcase";

const meta: Meta<typeof ComponentShowcase> = {
  title: "Brand/ComponentShowcase",
  component: ComponentShowcase,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type StoryT = StoryObj<typeof ComponentShowcase>;

export const Default: StoryT = {
  args: {
    onInView: () => {},
  },
};
