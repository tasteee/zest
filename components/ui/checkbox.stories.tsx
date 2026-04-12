import type { Meta, StoryObj } from "@storybook/nextjs";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
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

type StoryT = StoryObj<typeof Checkbox>;

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

const checkboxRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
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
        {/* All Variants - Unchecked */}
        <div>
          <span style={sectionLabelStyle}>All Variants (Unchecked)</span>
          <div style={rowStyle}>
            {allVariants.map((variant) => (
              <div key={`${variant}-unchecked`} style={checkboxRowStyle}>
                <Checkbox variant={variant} id={`${variant}-unchecked`} />
                <Label htmlFor={`${variant}-unchecked`}>{variant}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* All Variants - Checked */}
        <div>
          <span style={sectionLabelStyle}>All Variants (Checked)</span>
          <div style={rowStyle}>
            {allVariants.map((variant) => (
              <div key={`${variant}-checked`} style={checkboxRowStyle}>
                <Checkbox
                  variant={variant}
                  id={`${variant}-checked`}
                  defaultChecked
                />
                <Label htmlFor={`${variant}-checked`}>{variant}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Form Example */}
        <div>
          <span style={sectionLabelStyle}>Preferences Form</span>
          <div style={rowStyle}>
            <div style={checkboxRowStyle}>
              <Checkbox variant="green" id="notifications" defaultChecked />
              <Label htmlFor="notifications">Enable notifications</Label>
            </div>
            <div style={checkboxRowStyle}>
              <Checkbox variant="purple" id="updates" defaultChecked />
              <Label htmlFor="updates">Receive product updates</Label>
            </div>
            <div style={checkboxRowStyle}>
              <Checkbox variant="pink" id="newsletter" />
              <Label htmlFor="newsletter">Subscribe to newsletter</Label>
            </div>
            <div style={checkboxRowStyle}>
              <Checkbox variant="orange" id="beta" />
              <Label htmlFor="beta">Join beta program</Label>
            </div>
          </div>
        </div>

        {/* Disabled States */}
        <div>
          <span style={sectionLabelStyle}>Disabled States</span>
          <div style={rowStyle}>
            <div style={checkboxRowStyle}>
              <Checkbox variant="green" id="disabled-unchecked" disabled />
              <Label
                htmlFor="disabled-unchecked"
                className="text-muted-foreground"
              >
                Disabled unchecked
              </Label>
            </div>
            <div style={checkboxRowStyle}>
              <Checkbox
                variant="green"
                id="disabled-checked"
                disabled
                defaultChecked
              />
              <Label
                htmlFor="disabled-checked"
                className="text-muted-foreground"
              >
                Disabled checked
              </Label>
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
        <Checkbox variant="green" />
        <Checkbox variant="green" defaultChecked />
      </div>
    );
  },
};

export const Purple: StoryT = {
  render: () => {
    return (
      <div className="flex gap-4">
        <Checkbox variant="purple" />
        <Checkbox variant="purple" defaultChecked />
      </div>
    );
  },
};

export const Pink: StoryT = {
  render: () => {
    return (
      <div className="flex gap-4">
        <Checkbox variant="pink" />
        <Checkbox variant="pink" defaultChecked />
      </div>
    );
  },
};

export const Orange: StoryT = {
  render: () => {
    return (
      <div className="flex gap-4">
        <Checkbox variant="orange" />
        <Checkbox variant="orange" defaultChecked />
      </div>
    );
  },
};

export const WithLabel: StoryT = {
  render: () => {
    return (
      <div className="flex items-center gap-2">
        <Checkbox variant="green" id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    );
  },
};

export const Disabled: StoryT = {
  render: () => {
    return (
      <div className="flex gap-4">
        <Checkbox variant="green" disabled />
        <Checkbox variant="green" disabled defaultChecked />
      </div>
    );
  },
};

export const TodoList: StoryT = {
  render: () => {
    return (
      <div className="w-64 space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox variant="green" id="task1" defaultChecked />
          <Label htmlFor="task1" className="line-through text-muted-foreground">
            Complete project setup
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox variant="green" id="task2" defaultChecked />
          <Label htmlFor="task2" className="line-through text-muted-foreground">
            Design system review
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox variant="purple" id="task3" />
          <Label htmlFor="task3">Implement components</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox variant="pink" id="task4" />
          <Label htmlFor="task4">Write documentation</Label>
        </div>
      </div>
    );
  },
};
