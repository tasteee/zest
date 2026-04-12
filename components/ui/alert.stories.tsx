import type { Meta, StoryObj } from "@storybook/nextjs";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import * as Phosphor from "@phosphor-icons/react";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
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
        "success",
        "warning",
        "info",
        "accent",
      ],
    },
  },
};

export default meta;

type StoryT = StoryObj<typeof Alert>;

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
  gap: 24,
  maxWidth: 600,
};

// ─── All Variants Story ─────────────────────────────────────────────────────

type VariantT =
  | "default"
  | "destructive"
  | "success"
  | "warning"
  | "info"
  | "accent";

const allVariants: VariantT[] = [
  "default",
  "destructive",
  "success",
  "warning",
  "info",
  "accent",
];

const variantIcons: Record<VariantT, React.ReactNode> = {
  default: <Phosphor.Info weight="fill" />,
  destructive: <Phosphor.XCircle weight="fill" />,
  success: <Phosphor.CheckCircle weight="fill" />,
  warning: <Phosphor.Warning weight="fill" />,
  info: <Phosphor.Info weight="fill" />,
  accent: <Phosphor.Heart weight="fill" />,
};

const variantTitles: Record<VariantT, string> = {
  default: "Default Alert",
  destructive: "Error",
  success: "Success",
  warning: "Warning",
  info: "Information",
  accent: "Featured",
};

const variantDescriptions: Record<VariantT, string> = {
  default: "This is a default alert message with neutral styling.",
  destructive: "Something went wrong. Please check your input and try again.",
  success: "Your changes have been saved successfully.",
  warning: "Please review this before continuing.",
  info: "Here is some helpful information you should know.",
  accent: "This content has been marked as featured.",
};

export const AllVariants: StoryT = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div style={gridWrapperStyle}>
        <span style={sectionLabelStyle}>All Alert Variants</span>
        {allVariants.map((variant) => (
          <Alert key={variant} variant={variant}>
            {variantIcons[variant]}
            <AlertTitle>{variantTitles[variant]}</AlertTitle>
            <AlertDescription>{variantDescriptions[variant]}</AlertDescription>
          </Alert>
        ))}
      </div>
    );
  },
};

// ─── Without Icons ──────────────────────────────────────────────────────────

export const WithoutIcons: StoryT = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div style={gridWrapperStyle}>
        <span style={sectionLabelStyle}>Without Icons</span>
        {allVariants.map((variant) => (
          <Alert key={variant} variant={variant}>
            <AlertTitle>{variantTitles[variant]}</AlertTitle>
            <AlertDescription>{variantDescriptions[variant]}</AlertDescription>
          </Alert>
        ))}
      </div>
    );
  },
};

// ─── Title Only ─────────────────────────────────────────────────────────────

export const TitleOnly: StoryT = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div style={gridWrapperStyle}>
        <span style={sectionLabelStyle}>Title Only</span>
        {allVariants.map((variant) => (
          <Alert key={variant} variant={variant}>
            {variantIcons[variant]}
            <AlertTitle>{variantTitles[variant]}</AlertTitle>
          </Alert>
        ))}
      </div>
    );
  },
};

// ─── Individual Stories ─────────────────────────────────────────────────────

export const Default: StoryT = {
  render: () => {
    return (
      <Alert className="w-96">
        <Phosphor.Info weight="fill" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the CLI.
        </AlertDescription>
      </Alert>
    );
  },
};

export const Destructive: StoryT = {
  render: () => {
    return (
      <Alert variant="destructive" className="w-96">
        <Phosphor.XCircle weight="fill" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again.
        </AlertDescription>
      </Alert>
    );
  },
};

export const Success: StoryT = {
  render: () => {
    return (
      <Alert variant="success" className="w-96">
        <Phosphor.CheckCircle weight="fill" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your changes have been saved successfully.
        </AlertDescription>
      </Alert>
    );
  },
};

export const Warning: StoryT = {
  render: () => {
    return (
      <Alert variant="warning" className="w-96">
        <Phosphor.Warning weight="fill" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This action cannot be undone. Please proceed with caution.
        </AlertDescription>
      </Alert>
    );
  },
};

export const Info: StoryT = {
  render: () => {
    return (
      <Alert variant="info" className="w-96">
        <Phosphor.Info weight="fill" />
        <AlertTitle>Did you know?</AlertTitle>
        <AlertDescription>
          You can customize your experience in the settings panel.
        </AlertDescription>
      </Alert>
    );
  },
};

export const Accent: StoryT = {
  render: () => {
    return (
      <Alert variant="accent" className="w-96">
        <Phosphor.Heart weight="fill" />
        <AlertTitle>Featured</AlertTitle>
        <AlertDescription>
          This content has been specially curated for you.
        </AlertDescription>
      </Alert>
    );
  },
};
