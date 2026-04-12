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
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "green",
        "purple",
        "pink",
        "orange",
        "green-outline",
        "purple-outline",
        "pink-outline",
        "orange-outline",
      ],
    },
  },
};

export default meta;

type StoryT = StoryObj<typeof Badge>;

export const Default: StoryT = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

// ─── Shared styles ──────────────────────────────────────────────────────────

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

// ─── All Variants Story ─────────────────────────────────────────────────────

type VariantT =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "green"
  | "purple"
  | "pink"
  | "orange"
  | "green-outline"
  | "purple-outline"
  | "pink-outline"
  | "orange-outline";

const coreVariants: VariantT[] = [
  "default",
  "secondary",
  "destructive",
  "outline",
];

const neonSolidVariants: VariantT[] = ["green", "purple", "pink", "orange"];

const neonOutlineVariants: VariantT[] = [
  "green-outline",
  "purple-outline",
  "pink-outline",
  "orange-outline",
];

export const AllVariants: StoryT = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div style={gridWrapperStyle}>
        {/* Core Variants */}
        <div>
          <span style={sectionLabelStyle}>Core Variants</span>
          <div style={rowStyle}>
            {coreVariants.map((variant) => (
              <Badge key={variant} variant={variant}>
                {variant}
              </Badge>
            ))}
          </div>
        </div>

        {/* Neon Solid Variants */}
        <div>
          <span style={sectionLabelStyle}>Brand Neon - Solid</span>
          <div style={rowStyle}>
            {neonSolidVariants.map((variant) => (
              <Badge key={variant} variant={variant}>
                {variant}
              </Badge>
            ))}
          </div>
        </div>

        {/* Neon Outline Variants */}
        <div>
          <span style={sectionLabelStyle}>Brand Neon - Outline</span>
          <div style={rowStyle}>
            {neonOutlineVariants.map((variant) => (
              <Badge key={variant} variant={variant}>
                {variant}
              </Badge>
            ))}
          </div>
        </div>

        {/* With Icons */}
        <div>
          <span style={sectionLabelStyle}>With Icons</span>
          <div style={rowStyle}>
            <Badge variant="green">
              <Phosphor.CheckCircle weight="fill" />
              Success
            </Badge>
            <Badge variant="destructive">
              <Phosphor.XCircle weight="fill" />
              Error
            </Badge>
            <Badge variant="purple">
              <Phosphor.Star weight="fill" />
              Featured
            </Badge>
            <Badge variant="pink">
              <Phosphor.Heart weight="fill" />
              Liked
            </Badge>
            <Badge variant="orange">
              <Phosphor.Lightning weight="fill" />
              Active
            </Badge>
            <Badge variant="green-outline">
              <Phosphor.CheckCircle />
              Verified
            </Badge>
            <Badge variant="purple-outline">
              <Phosphor.Tag />
              Tagged
            </Badge>
          </div>
        </div>

        {/* As Link */}
        <div>
          <span style={sectionLabelStyle}>As Interactive Link</span>
          <div style={rowStyle}>
            <Badge variant="green" asChild>
              <a href="#">Click me</a>
            </Badge>
            <Badge variant="purple-outline" asChild>
              <a href="#">Another link</a>
            </Badge>
            <Badge variant="orange" asChild>
              <a href="#">
                <Phosphor.ArrowRight />
                With icon
              </a>
            </Badge>
          </div>
        </div>
      </div>
    );
  },
};

// ─── Individual Stories ─────────────────────────────────────────────────────

export const Secondary: StoryT = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: StoryT = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outline: StoryT = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Green: StoryT = {
  args: {
    children: "Green",
    variant: "green",
  },
};

export const Purple: StoryT = {
  args: {
    children: "Purple",
    variant: "purple",
  },
};

export const Pink: StoryT = {
  args: {
    children: "Pink",
    variant: "pink",
  },
};

export const Orange: StoryT = {
  args: {
    children: "Orange",
    variant: "orange",
  },
};

export const GreenOutline: StoryT = {
  args: {
    children: "Green Outline",
    variant: "green-outline",
  },
};

export const PurpleOutline: StoryT = {
  args: {
    children: "Purple Outline",
    variant: "purple-outline",
  },
};

export const PinkOutline: StoryT = {
  args: {
    children: "Pink Outline",
    variant: "pink-outline",
  },
};

export const OrangeOutline: StoryT = {
  args: {
    children: "Orange Outline",
    variant: "orange-outline",
  },
};
