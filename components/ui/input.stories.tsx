import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from "./input";
import { Label } from "./label";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    focusColor: {
      control: "select",
      options: ["default", "green", "purple", "pink", "orange"],
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "search", "tel", "url"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type StoryT = StoryObj<typeof Input>;

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

const fieldStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: "var(--color-foreground, #fff)",
};

// ─── All Focus Colors Story ─────────────────────────────────────────────────

type FocusColorT = "default" | "green" | "purple" | "pink" | "orange";

const allFocusColors: FocusColorT[] = [
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
        {/* Focus Colors */}
        <div>
          <span style={sectionLabelStyle}>
            Focus Colors (click to see focus state)
          </span>
          <div style={rowStyle}>
            {allFocusColors.map((color) => (
              <div key={color} style={fieldStyle}>
                <label style={labelStyle}>{color} focus</label>
                <Input
                  focusColor={color}
                  placeholder={`Focus me to see ${color} ring`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Input Types */}
        <div>
          <span style={sectionLabelStyle}>Input Types</span>
          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Text</label>
              <Input type="text" placeholder="Enter text..." focusColor="green" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Password</label>
              <Input
                type="password"
                placeholder="Enter password..."
                focusColor="purple"
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                focusColor="pink"
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Number</label>
              <Input type="number" placeholder="0" focusColor="orange" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Search</label>
              <Input type="search" placeholder="Search..." focusColor="green" />
            </div>
          </div>
        </div>

        {/* States */}
        <div>
          <span style={sectionLabelStyle}>States</span>
          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Default</label>
              <Input placeholder="Default state" focusColor="green" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>With Value</label>
              <Input
                defaultValue="Hello world"
                focusColor="green"
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Disabled</label>
              <Input placeholder="Disabled input" disabled focusColor="green" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Invalid</label>
              <Input
                placeholder="Invalid input"
                aria-invalid="true"
                focusColor="green"
              />
            </div>
          </div>
        </div>

        {/* File Input */}
        <div>
          <span style={sectionLabelStyle}>File Input</span>
          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Upload file</label>
              <Input type="file" focusColor="purple" />
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
    placeholder: "Enter text...",
    className: "w-64",
  },
};

export const GreenFocus: StoryT = {
  args: {
    placeholder: "Green focus ring...",
    focusColor: "green",
    className: "w-64",
  },
};

export const PurpleFocus: StoryT = {
  args: {
    placeholder: "Purple focus ring...",
    focusColor: "purple",
    className: "w-64",
  },
};

export const PinkFocus: StoryT = {
  args: {
    placeholder: "Pink focus ring...",
    focusColor: "pink",
    className: "w-64",
  },
};

export const OrangeFocus: StoryT = {
  args: {
    placeholder: "Orange focus ring...",
    focusColor: "orange",
    className: "w-64",
  },
};

export const WithValue: StoryT = {
  args: {
    defaultValue: "Hello world",
    focusColor: "green",
    className: "w-64",
  },
};

export const Password: StoryT = {
  args: {
    type: "password",
    placeholder: "Enter password...",
    focusColor: "purple",
    className: "w-64",
  },
};

export const Disabled: StoryT = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
    className: "w-64",
  },
};

export const Invalid: StoryT = {
  args: {
    placeholder: "Invalid input",
    "aria-invalid": true,
    className: "w-64",
  },
};

export const File: StoryT = {
  args: {
    type: "file",
    focusColor: "green",
    className: "w-64",
  },
};

export const WithLabel: StoryT = {
  render: () => {
    return (
      <div className="flex w-64 flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          focusColor="green"
        />
      </div>
    );
  },
};
