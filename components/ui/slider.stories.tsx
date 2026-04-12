import type { Meta, StoryObj } from "@storybook/nextjs";
import { Slider } from "./slider";
import { Label } from "./label";

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "green", "purple", "pink", "orange"],
    },
  },
};

export default meta;

type StoryT = StoryObj<typeof Slider>;

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
  gap: 20,
};

const fieldStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: "var(--color-foreground, #fff)",
};

// ─── Types ──────────────────────────────────────────────────────────────────

type VariantT = "default" | "green" | "purple" | "pink" | "orange";

const allVariants: VariantT[] = [
  "default",
  "green",
  "purple",
  "pink",
  "orange",
];

// ─── All Variants Story ─────────────────────────────────────────────────────

export const AllVariants: StoryT = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div style={gridWrapperStyle}>
        {/* All Variants */}
        <div>
          <span style={sectionLabelStyle}>All Variants (50%)</span>
          <div style={rowStyle}>
            {allVariants.map((variant) => (
              <div key={variant} style={fieldStyle}>
                <label style={labelStyle}>{variant}</label>
                <Slider variant={variant} defaultValue={[50]} />
              </div>
            ))}
          </div>
        </div>

        {/* Different Values */}
        <div>
          <span style={sectionLabelStyle}>Different Values (Green)</span>
          <div style={rowStyle}>
            {[0, 25, 50, 75, 100].map((value) => (
              <div key={value} style={fieldStyle}>
                <label style={labelStyle}>{value}%</label>
                <Slider variant="green" defaultValue={[value]} />
              </div>
            ))}
          </div>
        </div>

        {/* Range Sliders */}
        <div>
          <span style={sectionLabelStyle}>Range Sliders</span>
          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Green Range</label>
              <Slider variant="green" defaultValue={[20, 80]} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Purple Range</label>
              <Slider variant="purple" defaultValue={[30, 70]} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Pink Range</label>
              <Slider variant="pink" defaultValue={[10, 90]} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Orange Range</label>
              <Slider variant="orange" defaultValue={[40, 60]} />
            </div>
          </div>
        </div>

        {/* Disabled */}
        <div>
          <span style={sectionLabelStyle}>Disabled</span>
          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label style={{ ...labelStyle, opacity: 0.5 }}>
                Disabled slider
              </label>
              <Slider variant="green" defaultValue={[50]} disabled />
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
    defaultValue: [50],
    min: 0,
    max: 100,
    className: "w-64",
  },
};

export const Green: StoryT = {
  args: {
    defaultValue: [50],
    variant: "green",
    className: "w-64",
  },
};

export const Purple: StoryT = {
  args: {
    defaultValue: [50],
    variant: "purple",
    className: "w-64",
  },
};

export const Pink: StoryT = {
  args: {
    defaultValue: [50],
    variant: "pink",
    className: "w-64",
  },
};

export const Orange: StoryT = {
  args: {
    defaultValue: [50],
    variant: "orange",
    className: "w-64",
  },
};

export const Range: StoryT = {
  args: {
    defaultValue: [20, 80],
    variant: "green",
    min: 0,
    max: 100,
    className: "w-64",
  },
};

export const Disabled: StoryT = {
  args: {
    defaultValue: [40],
    variant: "green",
    disabled: true,
    className: "w-64",
  },
};

export const WithLabel: StoryT = {
  render: () => {
    return (
      <div className="w-64 space-y-2">
        <div className="flex items-center justify-between">
          <Label>Volume</Label>
          <span className="text-sm text-muted-foreground">75%</span>
        </div>
        <Slider variant="green" defaultValue={[75]} />
      </div>
    );
  },
};

export const AudioControls: StoryT = {
  render: () => {
    return (
      <div className="w-64 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Volume</Label>
            <span className="text-sm text-muted-foreground">80%</span>
          </div>
          <Slider variant="green" defaultValue={[80]} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Bass</Label>
            <span className="text-sm text-muted-foreground">50%</span>
          </div>
          <Slider variant="purple" defaultValue={[50]} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Treble</Label>
            <span className="text-sm text-muted-foreground">60%</span>
          </div>
          <Slider variant="pink" defaultValue={[60]} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Balance</Label>
            <span className="text-sm text-muted-foreground">50%</span>
          </div>
          <Slider variant="orange" defaultValue={[50]} />
        </div>
      </div>
    );
  },
};
