import type { Meta, StoryObj } from "@storybook/nextjs";
import { VoiceTone } from "./voice-tone";

const meta: Meta<typeof VoiceTone> = {
  title: "Brand/VoiceTone",
  component: VoiceTone,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type StoryT = StoryObj<typeof VoiceTone>;

export const Default: StoryT = {
  args: {
    onInView: () => {},
  },
};
