import type { Meta, StoryObj } from "@storybook/nextjs";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type StoryT = StoryObj<typeof Checkbox>;

export const Default: StoryT = {
  args: {},
};

export const Checked: StoryT = {
  args: {
    defaultChecked: true,
  },
};

export const WithLabel: StoryT = {
  render: () => {
    return (
      <div className="flex items-center gap-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    );
  },
};

export const Disabled: StoryT = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};
