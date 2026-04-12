import type { Meta, StoryObj } from "@storybook/nextjs";
import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "green", "purple", "pink", "orange"],
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
};

export default meta;

type StoryT = StoryObj<typeof Progress>;

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
  width: 400,
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const labeledRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  color: "var(--color-muted-foreground, #888)",
  width: 60,
  flexShrink: 0,
};

// ─── All Variants Story ─────────────────────────────────────────────────────

type VariantT = "default" | "green" | "purple" | "pink" | "orange";

const allVariants: VariantT[] = [
  "default",
  "green",
  "purple",
  "pink",
  "orange",
];

export const AllVariants: StoryT = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div style={gridWrapperStyle}>
        {/* By Variant */}
        <div>
          <span style={sectionLabelStyle}>All Variants (60%)</span>
          <div style={rowStyle}>
            {allVariants.map((variant) => (
              <div key={variant} style={labeledRowStyle}>
                <span style={labelStyle}>{variant}</span>
                <Progress variant={variant} value={60} className="flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Progress States */}
        <div>
          <span style={sectionLabelStyle}>Progress States (Green)</span>
          <div style={rowStyle}>
            {[0, 25, 50, 75, 100].map((value) => (
              <div key={value} style={labeledRowStyle}>
                <span style={labelStyle}>{value}%</span>
                <Progress variant="green" value={value} className="flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Mixed Variants at Different States */}
        <div>
          <span style={sectionLabelStyle}>Mixed Progress</span>
          <div style={rowStyle}>
            <div style={labeledRowStyle}>
              <span style={labelStyle}>Upload</span>
              <Progress variant="purple" value={85} className="flex-1" />
            </div>
            <div style={labeledRowStyle}>
              <span style={labelStyle}>Build</span>
              <Progress variant="green" value={100} className="flex-1" />
            </div>
            <div style={labeledRowStyle}>
              <span style={labelStyle}>Deploy</span>
              <Progress variant="orange" value={45} className="flex-1" />
            </div>
            <div style={labeledRowStyle}>
              <span style={labelStyle}>Sync</span>
              <Progress variant="pink" value={20} className="flex-1" />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// ─── Individual Stories ─────────────────────────────────────────────────────

export const Default: StoryT = {
  args: {
    value: 60,
    className: "w-64",
  },
};

export const Green: StoryT = {
  args: {
    value: 60,
    variant: "green",
    className: "w-64",
  },
};

export const Purple: StoryT = {
  args: {
    value: 60,
    variant: "purple",
    className: "w-64",
  },
};

export const Pink: StoryT = {
  args: {
    value: 60,
    variant: "pink",
    className: "w-64",
  },
};

export const Orange: StoryT = {
  args: {
    value: 60,
    variant: "orange",
    className: "w-64",
  },
};

export const Empty: StoryT = {
  args: {
    value: 0,
    className: "w-64",
  },
};

export const Full: StoryT = {
  args: {
    value: 100,
    variant: "green",
    className: "w-64",
  },
};
