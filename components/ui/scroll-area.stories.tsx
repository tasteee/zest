import type { Meta, StoryObj } from "@storybook/nextjs";
import { ScrollArea } from "./scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type StoryT = StoryObj<typeof ScrollArea>;

const tags = Array.from({ length: 50 }, (_, index) => {
  return `item-${index + 1}`;
});

export const Default: StoryT = {
  render: () => {
    return (
      <ScrollArea className="h-64 w-48 rounded-md border border-border p-4">
        {tags.map((tag) => {
          return (
            <div key={tag} className="text-sm py-1 text-foreground">
              {tag}
            </div>
          );
        })}
      </ScrollArea>
    );
  },
};
