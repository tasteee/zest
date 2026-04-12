import type { Meta, StoryObj } from "@storybook/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type StoryT = StoryObj<typeof Avatar>;

export const WithImage: StoryT = {
  render: () => {
    return (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );
  },
};

export const WithFallback: StoryT = {
  render: () => {
    return (
      <Avatar>
        <AvatarImage src="/broken-image.jpg" alt="Broken" />
        <AvatarFallback>SH</AvatarFallback>
      </Avatar>
    );
  },
};
