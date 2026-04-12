import type { Meta, StoryObj } from "@storybook/nextjs";
import { UsageExamples } from "./usage-examples";

const meta: Meta<typeof UsageExamples> = {
  title: "Brand/UsageExamples",
  component: UsageExamples,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type StoryT = StoryObj<typeof UsageExamples>;

export const Default: StoryT = {
  args: {
    onInView: () => {},
  },
};
