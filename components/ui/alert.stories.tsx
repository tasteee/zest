import type { Meta, StoryObj } from "@storybook/nextjs";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import { AlertCircle, CheckCircle } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
  },
};

export default meta;

type StoryT = StoryObj<typeof Alert>;

export const Default: StoryT = {
  render: () => {
    return (
      <Alert className="w-96">
        <CheckCircle />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved.</AlertDescription>
      </Alert>
    );
  },
};

export const Destructive: StoryT = {
  render: () => {
    return (
      <Alert variant="destructive" className="w-96">
        <AlertCircle />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again.
        </AlertDescription>
      </Alert>
    );
  },
};
