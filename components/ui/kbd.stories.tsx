import type { Meta, StoryObj } from "@storybook/nextjs";
import { Kbd, KbdGroup } from "./kbd";

const meta: Meta<typeof Kbd> = {
  title: "UI/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type StoryT = StoryObj<typeof Kbd>;

export const Default: StoryT = {
  args: {
    children: "⌘K",
  },
};

export const Group: StoryT = {
  render: () => {
    return (
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    );
  },
};
