import type { Meta, StoryObj } from "@storybook/nextjs";
import { Switch } from "./switch";
import { Label } from "./label";

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type StoryT = StoryObj<typeof Switch>;

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
        <Switch id="notifications" />
        <Label htmlFor="notifications">Enable notifications</Label>
      </div>
    );
  },
};

export const Disabled: StoryT = {
  args: {
    disabled: true,
  },
};
