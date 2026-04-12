import type { Meta, StoryObj } from "@storybook/nextjs";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type StoryT = StoryObj<typeof Skeleton>;

export const Default: StoryT = {
  args: {
    className: "h-4 w-48",
  },
};

export const Circle: StoryT = {
  args: {
    className: "size-12 rounded-full",
  },
};

export const Card: StoryT = {
  render: () => {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-32 w-64 rounded-lg" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
  },
};
