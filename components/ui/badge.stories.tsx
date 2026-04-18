import type { Meta, StoryObj } from "@storybook/nextjs";
import * as Phosphor from "@phosphor-icons/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    kind: {
      control: "select",
      options: ["outline", "ghost", "solid"],
    },
    color: {
      control: "select",
      options: ["white", "green", "purple", "pink", "orange"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type StoryT = StoryObj<typeof Badge>;

export const Default: StoryT = {
  args: {
    children: "Badge",
    kind: "outline",
    color: "white",
    size: "md",
  },
};

const sectionLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--color-muted-foreground, #888)",
  marginBottom: 12,
  display: "block",
};

const gridWrapperStyle: React.CSSProperties = {
  padding: 32,
  display: "flex",
  flexDirection: "column",
  gap: 32,
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
};

const kinds = ["outline", "ghost", "solid"] as const;
const colors = ["white", "green", "purple", "pink", "orange"] as const;

export const AllVariants: StoryT = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div style={gridWrapperStyle}>
        {kinds.map((kind) => (
          <div key={kind}>
            <span style={sectionLabelStyle}>{kind}</span>
            <div style={rowStyle}>
              {colors.map((color) => (
                <Badge key={`${kind}-${color}`} kind={kind} color={color}>
                  {color}
                </Badge>
              ))}
            </div>
          </div>
        ))}

        <div>
          <span style={sectionLabelStyle}>With Icons</span>
          <div style={rowStyle}>
            <Badge kind="solid" color="green">
              <Phosphor.CheckCircle weight="fill" />
              Success
            </Badge>
            <Badge kind="solid" color="pink">
              <Phosphor.XCircle weight="fill" />
              Error
            </Badge>
            <Badge kind="outline" color="purple">
              <Phosphor.Tag />
              Tagged
            </Badge>
          </div>
        </div>

        <div>
          <span style={sectionLabelStyle}>As Interactive Link</span>
          <div style={rowStyle}>
            <Badge kind="solid" color="green" asChild>
              <a href="#">Click me</a>
            </Badge>
            <Badge kind="outline" color="purple" asChild>
              <a href="#">Another link</a>
            </Badge>
          </div>
        </div>
      </div>
    );
  },
};
