import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "./empty";
import { Button } from "./button";
import { Inbox } from "lucide-react";

const meta: Meta<typeof Empty> = {
  title: "UI/Empty",
  component: Empty,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type StoryT = StoryObj<typeof Empty>;

export const Default: StoryT = {
  render: () => {
    return (
      <Empty className="w-80">
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No results</EmptyTitle>
          <EmptyDescription>
            There are no items to display at this time.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm">Create item</Button>
        </EmptyContent>
      </Empty>
    );
  },
};
