import type { Meta, StoryObj } from "@storybook/nextjs";
import * as Phosphor from "@phosphor-icons/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
  },
};

export default meta;

type StoryT = StoryObj<typeof Button>;

export const Default: StoryT = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

// ─── Exhaustive grid ────────────────────────────────────────────────────────

type VariantT =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type SizeT = "sm" | "default" | "lg";
type IconSizeT = "icon-sm" | "icon" | "icon-lg";

const variants: VariantT[] = [
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
];
const sizes: SizeT[] = ["sm", "default", "lg"];
const iconSizes: IconSizeT[] = ["icon-sm", "icon", "icon-lg"];

const sectionLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--color-muted-foreground, #888)",
  marginBottom: 12,
  display: "block",
};

const variantLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: "var(--color-muted-foreground, #888)",
  width: 100,
  flexShrink: 0,
  paddingTop: 8,
};

const columnHeaderStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-muted-foreground, #888)",
  textAlign: "center",
  minWidth: 90,
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  paddingBottom: 8,
};

const cellStyle: React.CSSProperties = {
  minWidth: 90,
  display: "flex",
  justifyContent: "center",
};

const gridWrapperStyle: React.CSSProperties = {
  padding: 32,
  display: "flex",
  flexDirection: "column",
  gap: 32,
};

const tableBlockStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const headerRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  paddingBottom: 4,
  borderBottom: "1px solid var(--color-border, #333)",
  marginBottom: 4,
};

export const AllVariants: StoryT = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div style={gridWrapperStyle}>
        {/* Text buttons */}
        <div>
          <span style={sectionLabelStyle}>Text Buttons</span>
          <div style={tableBlockStyle}>
            {/* Header row */}
            <div style={headerRowStyle}>
              <div style={{ ...variantLabelStyle, color: "transparent" }}>
                placeholder
              </div>
              {sizes.map((size) => {
                return (
                  <div key={`header-enabled-${size}`} style={columnHeaderStyle}>
                    {size} / enabled
                  </div>
                );
              })}
              {sizes.map((size) => {
                return (
                  <div
                    key={`header-disabled-${size}`}
                    style={columnHeaderStyle}
                  >
                    {size} / disabled
                  </div>
                );
              })}
            </div>

            {/* Variant rows */}
            {variants.map((variant) => {
              return (
                <div key={variant} style={rowStyle}>
                  <div style={variantLabelStyle}>{variant}</div>
                  {sizes.map((size) => {
                    return (
                      <div key={`${variant}-${size}-enabled`} style={cellStyle}>
                        <Button variant={variant} size={size}>
                          Button
                        </Button>
                      </div>
                    );
                  })}
                  {sizes.map((size) => {
                    return (
                      <div
                        key={`${variant}-${size}-disabled`}
                        style={cellStyle}
                      >
                        <Button variant={variant} size={size} disabled>
                          Button
                        </Button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Icon-only buttons */}
        <div>
          <span style={sectionLabelStyle}>Icon Buttons</span>
          <div style={tableBlockStyle}>
            {/* Header row */}
            <div style={headerRowStyle}>
              <div style={{ ...variantLabelStyle, color: "transparent" }}>
                placeholder
              </div>
              {iconSizes.map((size) => {
                return (
                  <div
                    key={`header-icon-enabled-${size}`}
                    style={columnHeaderStyle}
                  >
                    {size} / enabled
                  </div>
                );
              })}
              {iconSizes.map((size) => {
                return (
                  <div
                    key={`header-icon-disabled-${size}`}
                    style={columnHeaderStyle}
                  >
                    {size} / disabled
                  </div>
                );
              })}
            </div>

            {/* Variant rows */}
            {variants.map((variant) => {
              return (
                <div key={variant} style={rowStyle}>
                  <div style={variantLabelStyle}>{variant}</div>
                  {iconSizes.map((size) => {
                    return (
                      <div
                        key={`${variant}-${size}-icon-enabled`}
                        style={cellStyle}
                      >
                        <Button variant={variant} size={size}>
                          <Phosphor.Plus />
                        </Button>
                      </div>
                    );
                  })}
                  {iconSizes.map((size) => {
                    return (
                      <div
                        key={`${variant}-${size}-icon-disabled`}
                        style={cellStyle}
                      >
                        <Button variant={variant} size={size} disabled>
                          <Phosphor.Plus />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Text + icon buttons */}
        <div>
          <span style={sectionLabelStyle}>Text + Icon Buttons</span>
          <div style={tableBlockStyle}>
            {/* Header row */}
            <div style={headerRowStyle}>
              <div style={{ ...variantLabelStyle, color: "transparent" }}>
                placeholder
              </div>
              {sizes.map((size) => {
                return (
                  <div
                    key={`header-icon-text-enabled-${size}`}
                    style={columnHeaderStyle}
                  >
                    {size} / enabled
                  </div>
                );
              })}
              {sizes.map((size) => {
                return (
                  <div
                    key={`header-icon-text-disabled-${size}`}
                    style={columnHeaderStyle}
                  >
                    {size} / disabled
                  </div>
                );
              })}
            </div>

            {/* Variant rows */}
            {variants.map((variant) => {
              return (
                <div key={variant} style={rowStyle}>
                  <div style={variantLabelStyle}>{variant}</div>
                  {sizes.map((size) => {
                    return (
                      <div
                        key={`${variant}-${size}-icontext-enabled`}
                        style={cellStyle}
                      >
                        <Button variant={variant} size={size}>
                          <Phosphor.Plus />
                          Button
                        </Button>
                      </div>
                    );
                  })}
                  {sizes.map((size) => {
                    return (
                      <div
                        key={`${variant}-${size}-icontext-disabled`}
                        style={cellStyle}
                      >
                        <Button variant={variant} size={size} disabled>
                          <Phosphor.Plus />
                          Button
                        </Button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
};
