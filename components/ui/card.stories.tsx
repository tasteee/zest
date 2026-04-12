import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "./card";
import { Button } from "./button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type StoryT = StoryObj<typeof Card>;

export const Default: StoryT = {
  render: () => {
    return (
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content and body text.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    );
  },
};

export const WithAction: StoryT = {
  render: () => {
    return (
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage your preferences.</CardDescription>
          <CardAction>
            <Button size="sm" variant="ghost">
              Edit
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>You have 3 unread messages.</p>
        </CardContent>
      </Card>
    );
  },
};
