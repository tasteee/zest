import type { Meta, StoryObj } from "@storybook/nextjs";
import { Toggle } from "./toggle";
import * as Phosphor from "@phosphor-icons/react";

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
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
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
};

export default meta;

type StoryT = StoryObj<typeof Toggle>;

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

const variantLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: "var(--color-muted-foreground, #888)",
  width: 100,
  flexShrink: 0,
};

// ─── Types ──────────────────────────────────────────────────────────────────

type VariantT =
  | "default"
  | "outline"
  | "green"
  | "purple"
  | "pink"
  | "orange"
  | "green-outline"
  | "purple-outline"
  | "pink-outline"
  | "orange-outline";

type SizeT = "sm" | "default" | "lg";

const coreVariants: VariantT[] = ["default", "outline"];
const neonSolidVariants: VariantT[] = ["green", "purple", "pink", "orange"];
const neonOutlineVariants: VariantT[] = [
  "green-outline",
  "purple-outline",
  "pink-outline",
  "orange-outline",
];
const sizes: SizeT[] = ["sm", "default", "lg"];

// ─── All Variants Story ─────────────────────────────────────────────────────

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
              <div key={variant} style={{ display: "flex", gap: 8 }}>
                <Toggle variant={variant} aria-label={variant}>
                  <Phosphor.Star />
                </Toggle>
                <Toggle variant={variant} defaultPressed aria-label={variant}>
                  <Phosphor.Star weight="fill" />
                </Toggle>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Neon Solid */}
        <div>
          <span style={sectionLabelStyle}>Brand Neon - Solid</span>
          <div style={rowStyle}>
            {neonSolidVariants.map((variant) => (
              <div key={variant} style={{ display: "flex", gap: 8 }}>
                <Toggle variant={variant} aria-label={variant}>
                  <Phosphor.Star />
                </Toggle>
                <Toggle variant={variant} defaultPressed aria-label={variant}>
                  <Phosphor.Star weight="fill" />
                </Toggle>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Neon Outline */}
        <div>
          <span style={sectionLabelStyle}>Brand Neon - Outline</span>
          <div style={rowStyle}>
            {neonOutlineVariants.map((variant) => (
              <div key={variant} style={{ display: "flex", gap: 8 }}>
                <Toggle variant={variant} aria-label={variant}>
                  <Phosphor.Star />
                </Toggle>
                <Toggle variant={variant} defaultPressed aria-label={variant}>
                  <Phosphor.Star weight="fill" />
                </Toggle>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <span style={sectionLabelStyle}>Sizes</span>
          <div style={rowStyle}>
            {sizes.map((size) => (
              <div key={size} style={{ display: "flex", gap: 8 }}>
                <Toggle size={size} variant="green" aria-label={size}>
                  <Phosphor.Star />
                </Toggle>
                <Toggle
                  size={size}
                  variant="green"
                  defaultPressed
                  aria-label={size}
                >
                  <Phosphor.Star weight="fill" />
                </Toggle>
              </div>
            ))}
          </div>
        </div>

        {/* With Text */}
        <div>
          <span style={sectionLabelStyle}>With Text</span>
          <div style={rowStyle}>
            <Toggle variant="green">
              <Phosphor.Star />
              Favorite
            </Toggle>
            <Toggle variant="purple" defaultPressed>
              <Phosphor.Bell weight="fill" />
              Notifications On
            </Toggle>
            <Toggle variant="pink">
              <Phosphor.Heart />
              Like
            </Toggle>
            <Toggle variant="orange" defaultPressed>
              <Phosphor.Eye weight="fill" />
              Watching
            </Toggle>
          </div>
        </div>

        {/* Text Formatting Example */}
        <div>
          <span style={sectionLabelStyle}>Text Formatting Toolbar</span>
          <div style={rowStyle}>
            <Toggle variant="green-outline" aria-label="Bold">
              <Phosphor.TextB weight="bold" />
            </Toggle>
            <Toggle variant="purple-outline" aria-label="Italic">
              <Phosphor.TextItalic />
            </Toggle>
            <Toggle variant="pink-outline" aria-label="Underline">
              <Phosphor.TextUnderline />
            </Toggle>
            <Toggle variant="orange-outline" aria-label="Strikethrough">
              <Phosphor.TextStrikethrough />
            </Toggle>
          </div>
        </div>

        {/* Disabled */}
        <div>
          <span style={sectionLabelStyle}>Disabled</span>
          <div style={rowStyle}>
            <Toggle variant="green" disabled aria-label="Disabled off">
              <Phosphor.Star />
            </Toggle>
            <Toggle
              variant="green"
              disabled
              defaultPressed
              aria-label="Disabled on"
            >
              <Phosphor.Star weight="fill" />
            </Toggle>
            <Toggle
              variant="purple-outline"
              disabled
              aria-label="Disabled outline"
            >
              <Phosphor.Bell />
            </Toggle>
          </div>
        </div>
      </div>
    );
  },
};

// ─── Individual Stories ─────────────────────────────────────────────────────

export const Default: StoryT = {
  args: {
    children: "Toggle",
    variant: "default",
  },
};

export const Outline: StoryT = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Green: StoryT = {
  render: () => {
    return (
      <div className="flex gap-2">
        <Toggle variant="green" aria-label="Green toggle">
          <Phosphor.Star />
        </Toggle>
        <Toggle variant="green" defaultPressed aria-label="Green toggle on">
          <Phosphor.Star weight="fill" />
        </Toggle>
      </div>
    );
  },
};

export const Purple: StoryT = {
  render: () => {
    return (
      <div className="flex gap-2">
        <Toggle variant="purple" aria-label="Purple toggle">
          <Phosphor.Bell />
        </Toggle>
        <Toggle variant="purple" defaultPressed aria-label="Purple toggle on">
          <Phosphor.Bell weight="fill" />
        </Toggle>
      </div>
    );
  },
};

export const Pink: StoryT = {
  render: () => {
    return (
      <div className="flex gap-2">
        <Toggle variant="pink" aria-label="Pink toggle">
          <Phosphor.Heart />
        </Toggle>
        <Toggle variant="pink" defaultPressed aria-label="Pink toggle on">
          <Phosphor.Heart weight="fill" />
        </Toggle>
      </div>
    );
  },
};

export const Orange: StoryT = {
  render: () => {
    return (
      <div className="flex gap-2">
        <Toggle variant="orange" aria-label="Orange toggle">
          <Phosphor.Lightning />
        </Toggle>
        <Toggle variant="orange" defaultPressed aria-label="Orange toggle on">
          <Phosphor.Lightning weight="fill" />
        </Toggle>
      </div>
    );
  },
};

export const GreenOutline: StoryT = {
  render: () => {
    return (
      <div className="flex gap-2">
        <Toggle variant="green-outline" aria-label="Green outline toggle">
          <Phosphor.Star />
        </Toggle>
        <Toggle
          variant="green-outline"
          defaultPressed
          aria-label="Green outline toggle on"
        >
          <Phosphor.Star weight="fill" />
        </Toggle>
      </div>
    );
  },
};

export const WithIcon: StoryT = {
  render: () => {
    return (
      <div className="flex gap-2">
        <Toggle variant="green" aria-label="Bold">
          <Phosphor.TextB weight="bold" />
        </Toggle>
        <Toggle variant="purple" aria-label="Italic">
          <Phosphor.TextItalic />
        </Toggle>
        <Toggle variant="pink" aria-label="Underline">
          <Phosphor.TextUnderline />
        </Toggle>
      </div>
    );
  },
};

export const Disabled: StoryT = {
  render: () => {
    return (
      <div className="flex gap-2">
        <Toggle variant="green" disabled aria-label="Disabled">
          <Phosphor.Star />
        </Toggle>
        <Toggle variant="green" disabled defaultPressed aria-label="Disabled on">
          <Phosphor.Star weight="fill" />
        </Toggle>
      </div>
    );
  },
};
