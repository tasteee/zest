import type * as Storybook from "@storybook/nextjs";
import * as React from "react";

import { Layout } from "./layout";

type ExampleBoxPropsT = {
  label: string;
  minWidth?: number;
};

const exampleBoxBaseStyle: React.CSSProperties = {
  border: "1px solid var(--border, #2a2a2a)",
  borderRadius: 8,
  backgroundColor: "var(--card, #141414)",
  color: "var(--foreground, #e6e6e6)",
  minHeight: 44,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 12,
  fontSize: 12,
  fontWeight: 600,
};

const sectionStyle: React.CSSProperties = {
  border: "1px solid var(--border, #2a2a2a)",
  borderRadius: 12,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  backgroundColor: "var(--background, #101010)",
};

const headingStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 14,
  letterSpacing: "0.02em",
  color: "var(--foreground, #e6e6e6)",
};

const pageStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 1100,
  margin: "0 auto",
  padding: 24,
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

const semanticLinkStyle: React.CSSProperties = {
  color: "var(--foreground, #e6e6e6)",
  textDecoration: "none",
  border: "1px solid var(--border, #2a2a2a)",
  borderRadius: 8,
  padding: "8px 12px",
};

const ExampleBox = (props: ExampleBoxPropsT): React.ReactElement => {
  const boxStyle: React.CSSProperties = {
    ...exampleBoxBaseStyle,
    minWidth: props.minWidth,
  };

  return <div style={boxStyle}>{props.label}</div>;
};

const meta: Storybook.Meta<typeof Layout> = {
  title: "UI/Layout",
  component: Layout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    gap: {
      control: "text",
      description: "Flex gap. Accepts numbers or valid CSS length values.",
    },
    align: {
      control: "select",
      options: ["start", "end", "center", "stretch", "baseline"],
    },
    justify: {
      control: "select",
      options: ["start", "end", "center", "between", "around", "evenly"],
    },
    wrap: {
      control: "boolean",
    },
    fill: {
      control: "boolean",
    },
    fillX: {
      control: "boolean",
    },
    fillY: {
      control: "boolean",
    },
    inline: {
      control: "boolean",
    },
    isCentered: {
      control: "boolean",
      description: "Shorthand for align='center' and justify='center'.",
    },
    column: {
      control: "boolean",
      description: "Direction toggle on base Layout component.",
    },
    as: {
      control: "text",
      description: "Polymorphic intrinsic element.",
    },
  },
};

export default meta;

type StoryT = Storybook.StoryObj<typeof Layout>;

export const Playground: StoryT = {
  args: {
    gap: 12,
    align: "center",
    justify: "between",
    wrap: false,
    fill: false,
    fillX: false,
    fillY: false,
    inline: false,
    isCentered: false,
    column: false,
    as: "div",
  },
  render: (args) => {
    return (
      <div style={pageStyle}>
        <Layout
          gap={args.gap}
          align={args.align}
          justify={args.justify}
          wrap={args.wrap}
          fill={args.fill}
          fillX={args.fillX}
          fillY={args.fillY}
          inline={args.inline}
          isCentered={args.isCentered}
          column={args.column}
          as={args.as}
          style={{
            border: "1px dashed var(--border, #3a3a3a)",
            minHeight: 120,
            padding: 12,
          }}
        >
          <ExampleBox label="Item A" />
          <ExampleBox label="Item B" />
          <ExampleBox label="Item C" />
        </Layout>
      </div>
    );
  },
};

export const BaseComponentRowByDefault: StoryT = {
  render: () => {
    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Layout defaults to row direction</h3>
          <Layout gap={16}>
            <ExampleBox label="Card" />
            <ExampleBox label="Card" />
          </Layout>
        </div>
      </div>
    );
  },
};

export const Subcomponents: StoryT = {
  render: () => {
    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Layout.Row</h3>
          <Layout.Row gap={8} align="center" justify="between">
            <ExampleBox label="Logo" minWidth={120} />
            <ExampleBox label="Nav" minWidth={240} />
          </Layout.Row>
        </div>

        <div style={sectionStyle}>
          <h3 style={headingStyle}>Layout.Column</h3>
          <Layout.Column gap={24} align="stretch">
            <ExampleBox label="Header" />
            <ExampleBox label="Main" />
            <ExampleBox label="Footer" />
          </Layout.Column>
        </div>
      </div>
    );
  },
};

export const DirectionToggleOnBase: StoryT = {
  render: () => {
    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Use column on base Layout</h3>
          <Layout column gap={12} align="start">
            <ExampleBox label="First" />
            <ExampleBox label="Second" />
            <ExampleBox label="Third" />
          </Layout>
        </div>
      </div>
    );
  },
};

export const CenteringShorthand: StoryT = {
  render: () => {
    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>isCentered + fill</h3>
          <div
            style={{
              width: "100%",
              height: 220,
              border: "1px dashed var(--border, #3a3a3a)",
            }}
          >
            <Layout.Row isCentered fill>
              <ExampleBox label="Spinner" />
            </Layout.Row>
          </div>
        </div>
      </div>
    );
  },
};

export const WrapAndInline: StoryT = {
  render: () => {
    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Wrapping</h3>
          <Layout.Row wrap gap={8}>
            <ExampleBox label="Tag" minWidth={72} />
            <ExampleBox label="Tag" minWidth={72} />
            <ExampleBox label="Tag" minWidth={72} />
            <ExampleBox label="Tag" minWidth={72} />
            <ExampleBox label="Tag" minWidth={72} />
            <ExampleBox label="Tag" minWidth={72} />
          </Layout.Row>
        </div>

        <div style={sectionStyle}>
          <h3 style={headingStyle}>Inline flex</h3>
          <div>
            <span>Before</span>
            <Layout.Row
              inline
              gap={4}
              align="center"
              style={{ marginLeft: 12 }}
            >
              <ExampleBox label="Icon" minWidth={44} />
              <ExampleBox label="Label" minWidth={88} />
            </Layout.Row>
            <span style={{ marginLeft: 12 }}>After</span>
          </div>
        </div>
      </div>
    );
  },
};

export const SemanticHtmlViaAs: StoryT = {
  render: () => {
    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Layout.Row as nav</h3>
          <Layout.Row
            as="nav"
            gap={16}
            justify="end"
            aria-label="Site navigation"
          >
            <a href="/about" style={semanticLinkStyle}>
              About
            </a>
            <a href="/work" style={semanticLinkStyle}>
              Work
            </a>
          </Layout.Row>
        </div>

        <div style={sectionStyle}>
          <h3 style={headingStyle}>Layout.Column as section</h3>
          <Layout.Column as="section" gap={32}>
            <h2 style={{ margin: 0 }}>Title</h2>
            <p style={{ margin: 0, color: "var(--muted-foreground, #9a9a9a)" }}>
              Body
            </p>
          </Layout.Column>
        </div>
      </div>
    );
  },
};

export const LayoutItemFlexChildControl: StoryT = {
  render: () => {
    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Layout.Item grow, shrink, basis</h3>
          <Layout.Row gap={16} align="stretch">
            <Layout.Item grow>
              <input
                placeholder="Input"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  border: "1px solid var(--border, #3a3a3a)",
                  backgroundColor: "var(--background, #111)",
                  color: "var(--foreground, #e6e6e6)",
                  padding: "0 12px",
                  minHeight: 44,
                }}
              />
            </Layout.Item>

            <Layout.Item shrink={0} basis={140}>
              <button
                style={{
                  width: "100%",
                  minHeight: 44,
                  borderRadius: 8,
                  border: "1px solid var(--border, #3a3a3a)",
                  backgroundColor: "var(--secondary, #1a1a1a)",
                  color: "var(--foreground, #e6e6e6)",
                  fontWeight: 600,
                }}
              >
                Submit
              </button>
            </Layout.Item>
          </Layout.Row>
        </div>
      </div>
    );
  },
};

export const NestedComposition: StoryT = {
  render: () => {
    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Nested Layout patterns</h3>
          <div
            style={{
              width: "100%",
              height: 340,
              border: "1px dashed var(--border, #3a3a3a)",
              padding: 12,
            }}
          >
            <Layout.Column gap={24} fill>
              <Layout.Row justify="between" align="center">
                <ExampleBox label="Title" minWidth={120} />
                <ExampleBox label="Actions" minWidth={150} />
              </Layout.Row>

              <Layout.Item grow>
                <Layout.Row gap={16} align="stretch" wrap>
                  <ExampleBox label="Sidebar" minWidth={200} />
                  <ExampleBox label="Content" minWidth={420} />
                </Layout.Row>
              </Layout.Item>
            </Layout.Column>
          </div>
        </div>
      </div>
    );
  },
};

export const FillVariantsReference: StoryT = {
  render: () => {
    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>fill, fillX, fillY behavior</h3>
          <Layout.Column gap={12}>
            <div
              style={{
                width: 360,
                height: 120,
                border: "1px dashed var(--border, #3a3a3a)",
                padding: 8,
              }}
            >
              <Layout.Row
                fillX
                style={{
                  border: "1px solid var(--border, #2a2a2a)",
                  minHeight: 44,
                }}
              >
                <ExampleBox label="fillX" />
              </Layout.Row>
            </div>

            <div
              style={{
                width: 360,
                height: 120,
                border: "1px dashed var(--border, #3a3a3a)",
                padding: 8,
              }}
            >
              <Layout.Row
                fillY
                style={{ border: "1px solid var(--border, #2a2a2a)" }}
              >
                <ExampleBox label="fillY" />
              </Layout.Row>
            </div>

            <div
              style={{
                width: 360,
                height: 120,
                border: "1px dashed var(--border, #3a3a3a)",
                padding: 8,
              }}
            >
              <Layout.Row
                fill
                style={{ border: "1px solid var(--border, #2a2a2a)" }}
              >
                <ExampleBox label="fill" />
              </Layout.Row>
            </div>
          </Layout.Column>
        </div>
      </div>
    );
  },
};

export const AlignmentAndJustificationReference: StoryT = {
  render: () => {
    const alignOptions: Array<
      "start" | "end" | "center" | "stretch" | "baseline"
    > = ["start", "end", "center", "stretch", "baseline"];
    const justifyOptions: Array<
      "start" | "end" | "center" | "between" | "around" | "evenly"
    > = ["start", "end", "center", "between", "around", "evenly"];

    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Align options</h3>
          <Layout.Column gap={10}>
            {alignOptions.map((alignOption) => {
              return (
                <div key={`align-${alignOption}`}>
                  <div
                    style={{ fontSize: 12, marginBottom: 6 }}
                  >{`align="${alignOption}"`}</div>
                  <Layout.Row
                    align={alignOption}
                    gap={8}
                    style={{
                      minHeight: 74,
                      border: "1px dashed var(--border, #3a3a3a)",
                      padding: 10,
                    }}
                  >
                    <ExampleBox label="A" />
                    <ExampleBox label="B" />
                    <ExampleBox label="C" />
                  </Layout.Row>
                </div>
              );
            })}
          </Layout.Column>
        </div>

        <div style={sectionStyle}>
          <h3 style={headingStyle}>Justify options</h3>
          <Layout.Column gap={10}>
            {justifyOptions.map((justifyOption) => {
              return (
                <div key={`justify-${justifyOption}`}>
                  <div
                    style={{ fontSize: 12, marginBottom: 6 }}
                  >{`justify="${justifyOption}"`}</div>
                  <Layout.Row
                    justify={justifyOption}
                    gap={8}
                    style={{
                      minHeight: 74,
                      border: "1px dashed var(--border, #3a3a3a)",
                      padding: 10,
                    }}
                  >
                    <ExampleBox label="A" />
                    <ExampleBox label="B" />
                    <ExampleBox label="C" />
                  </Layout.Row>
                </div>
              );
            })}
          </Layout.Column>
        </div>
      </div>
    );
  },
};

export const FullSurfaceQuickReference: StoryT = {
  render: () => {
    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Full prop surface on Layout.Row</h3>
          <Layout.Row
            gap={16}
            align="center"
            justify="between"
            wrap
            fillX
            inline={false}
            isCentered={false}
            as="div"
            style={{
              minHeight: 88,
              border: "1px dashed var(--border, #3a3a3a)",
              padding: 12,
            }}
          >
            <ExampleBox label="A" />
            <ExampleBox label="B" />
            <ExampleBox label="C" />
          </Layout.Row>
        </div>
      </div>
    );
  },
};
