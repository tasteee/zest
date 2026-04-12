import type { Meta, StoryObj } from "@storybook/nextjs";
import { IconsAssets } from "./icons-assets";

const meta: Meta<typeof IconsAssets> = {
  title: "Brand/IconsAssets",
  component: IconsAssets,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type StoryT = StoryObj<typeof IconsAssets>;

export const Default: StoryT = {
  args: {
    onInView: () => {},
  },
};
