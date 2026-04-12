import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "./button-group";
import { Button } from "./button";

const meta: Meta<typeof ButtonGroup> = {
  title: "UI/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;

type StoryT = StoryObj<typeof ButtonGroup>;

export const Horizontal: StoryT = {
  render: () => {
    return (
      <ButtonGroup>
        <Button variant="outline">Bold</Button>
        <ButtonGroupSeparator />
        <Button variant="outline">Italic</Button>
        <ButtonGroupSeparator />
        <Button variant="outline">Underline</Button>
      </ButtonGroup>
    );
  },
};

export const Vertical: StoryT = {
  render: () => {
    return (
      <ButtonGroup orientation="vertical">
        <Button variant="outline">Top</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Bottom</Button>
      </ButtonGroup>
    );
  },
};

export const WithText: StoryT = {
  render: () => {
    return (
      <ButtonGroup>
        <Button variant="outline">Copy</Button>
        <ButtonGroupText>or</ButtonGroupText>
        <Button variant="outline">Paste</Button>
      </ButtonGroup>
    );
  },
};
