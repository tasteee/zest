import React from "react";
import type { Preview } from "@storybook/nextjs";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: { disable: true },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        dark: "dark",
        light: "",
      },
      defaultTheme: "dark",
    }),
    (Story) => {
      return React.createElement(
        "div",
        {
          style: {
            background: "var(--background)",
            minHeight: "100vh",
            padding: "2rem",
          },
        },
        React.createElement(Story),
      );
    },
  ],
  tags: ["autodocs"],
};

export default preview;
