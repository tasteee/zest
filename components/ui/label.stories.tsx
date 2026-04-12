import type { Meta, StoryObj } from "@storybook/nextjs";
import { Label } from "./label";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type StoryT = StoryObj<typeof Label>;

export const Default: StoryT = {
  args: {
    children: "Email address",
  },
};
