import type { Meta, StoryObj } from "@storybook/nextjs";
import { Switch } from "./switch";
import { Label } from "./label";

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "green", "purple", "pink", "orange"],
    },
    disabled: {
      control: "boolean",
    },
    defaultChecked: {
      control: "boolean",
    },
  },
};

export default meta;

type StoryT = StoryObj<typeof Switch>;

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
  width: 320,
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const switchRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
};

const labelStyle: React.CSSProperties = {
  fontSize: 14,
  color: "var(--color-foreground, #fff)",
};

// ─── Types ──────────────────────────────────────────────────────────────────

type VariantT = "default" | "green" | "purple" | "pink" | "orange";

const allVariants: VariantT[] = ["default", "green", "purple", "pink", "orange"];

// ─── All Variants Story ─────────────────────────────────────────────────────

export const AllVariants: StoryT = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div style={gridWrapperStyle}>
        {/* All Variants - Off State */}
        <div>
          <span style={sectionLabelStyle}>All Variants (Off)</span>
          <div style={rowStyle}>
            {allVariants.map((variant) => (
              <div key={`${variant}-off`} style={switchRowStyle}>
                <span style={labelStyle}>{variant}</span>
                <Switch variant={variant} />
              </div>
            ))}
          </div>
        </div>

        {/* All Variants - On State */}
        <div>
          <span style={sectionLabelStyle}>All Variants (On)</span>
          <div style={rowStyle}>
            {allVariants.map((variant) => (
              <div key={`${variant}-on`} style={switchRowStyle}>
                <span style={labelStyle}>{variant}</span>
                <Switch variant={variant} defaultChecked />
              </div>
            ))}
          </div>
        </div>

        {/* With Labels */}
        <div>
          <span style={sectionLabelStyle}>Settings Example</span>
          <div style={rowStyle}>
            <div style={switchRowStyle}>
              <Label htmlFor="notifications">Push notifications</Label>
              <Switch id="notifications" variant="green" defaultChecked />
            </div>
            <div style={switchRowStyle}>
              <Label htmlFor="email">Email updates</Label>
              <Switch id="email" variant="purple" />
            </div>
            <div style={switchRowStyle}>
              <Label htmlFor="sound">Sound effects</Label>
              <Switch id="sound" variant="pink" defaultChecked />
            </div>
            <div style={switchRowStyle}>
              <Label htmlFor="dark">Dark mode</Label>
              <Switch id="dark" variant="orange" defaultChecked />
            </div>
          </div>
        </div>

        {/* Disabled States */}
        <div>
          <span style={sectionLabelStyle}>Disabled States</span>
          <div style={rowStyle}>
            <div style={switchRowStyle}>
              <span style={{ ...labelStyle, opacity: 0.5 }}>Disabled (off)</span>
              <Switch variant="green" disabled />
            </div>
            <div style={switchRowStyle}>
              <span style={{ ...labelStyle, opacity: 0.5 }}>Disabled (on)</span>
              <Switch variant="green" disabled defaultChecked />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// ─── Individual Stories ─────────────────────────────────────────────────────

export const Default: StoryT = {
  args: {},
};

export const Checked: StoryT = {
  args: {
    defaultChecked: true,
  },
};

export const Green: StoryT = {
  render: () => {
    return (
      <div className="flex gap-4">
        <Switch variant="green" />
        <Switch variant="green" defaultChecked />
      </div>
    );
  },
};

export const Purple: StoryT = {
  render: () => {
    return (
      <div className="flex gap-4">
        <Switch variant="purple" />
        <Switch variant="purple" defaultChecked />
      </div>
    );
  },
};

export const Pink: StoryT = {
  render: () => {
    return (
      <div className="flex gap-4">
        <Switch variant="pink" />
        <Switch variant="pink" defaultChecked />
      </div>
    );
  },
};

export const Orange: StoryT = {
  render: () => {
    return (
      <div className="flex gap-4">
        <Switch variant="orange" />
        <Switch variant="orange" defaultChecked />
      </div>
    );
  },
};

export const WithLabel: StoryT = {
  render: () => {
    return (
      <div className="flex items-center gap-2">
        <Switch id="notifications" variant="green" />
        <Label htmlFor="notifications">Enable notifications</Label>
      </div>
    );
  },
};

export const Disabled: StoryT = {
  render: () => {
    return (
      <div className="flex gap-4">
        <Switch variant="green" disabled />
        <Switch variant="green" disabled defaultChecked />
      </div>
    );
  },
};

export const SettingsPanel: StoryT = {
  render: () => {
    return (
      <div className="w-64 space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="wifi">WiFi</Label>
          <Switch id="wifi" variant="green" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="bluetooth">Bluetooth</Label>
          <Switch id="bluetooth" variant="purple" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="airdrop">AirDrop</Label>
          <Switch id="airdrop" variant="pink" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="hotspot">Personal Hotspot</Label>
          <Switch id="hotspot" variant="orange" />
        </div>
      </div>
    );
  },
};
