import {
  DocsTitle,
  DocsDescription,
  DocsSection,
  DocsSectionTitle,
  DocsSectionSubtitle,
  DocsText,
  DocsList,
  DocsNote,
} from "@/components/docs/mdx-components";
import { CodeBlock } from "@/components/docs/code-block";

export default function InstallationPage() {
  return (
    <div>
      <DocsTitle>Installation</DocsTitle>
      <DocsDescription>
        Get up and running with the tasteink component library in minutes.
      </DocsDescription>

      <DocsSection>
        <DocsSectionTitle>Prerequisites</DocsSectionTitle>
        <DocsText>
          Before you begin, make sure you have the following installed:
        </DocsText>
        <DocsList>
          <li>Node.js 18.17 or later</li>
          <li>React 18 or later</li>
          <li>Tailwind CSS 4.0 or later</li>
        </DocsList>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Dependencies</DocsSectionTitle>
        <DocsText>
          Install the required dependencies for the component library:
        </DocsText>
        <CodeBlock
          code={`npm install class-variance-authority clsx tailwind-merge @radix-ui/react-slot`}
          language="bash"
          filename="Terminal"
        />

        <DocsSectionSubtitle>Radix Primitives</DocsSectionSubtitle>
        <DocsText>
          Most components are built on top of Radix UI primitives. Install them as needed:
        </DocsText>
        <CodeBlock
          code={`# Core primitives
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-tabs @radix-ui/react-accordion
npm install @radix-ui/react-tooltip @radix-ui/react-popover

# Form primitives  
npm install @radix-ui/react-checkbox @radix-ui/react-radio-group
npm install @radix-ui/react-select @radix-ui/react-switch
npm install @radix-ui/react-slider @radix-ui/react-label`}
          language="bash"
          filename="Terminal"
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Configuration</DocsSectionTitle>
        
        <DocsSectionSubtitle>Tailwind CSS</DocsSectionSubtitle>
        <DocsText>
          Configure your tailwind.config.ts to include the design tokens:
        </DocsText>
        <CodeBlock
          code={`import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        "neon-green": "var(--neon-green)",
        "neon-pink": "var(--neon-pink)",
        "neon-purple": "var(--neon-purple)",
        "neon-orange": "var(--neon-orange)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}

export default config`}
          language="typescript"
          filename="tailwind.config.ts"
          showLineNumbers
        />

        <DocsSectionSubtitle>CSS Variables</DocsSectionSubtitle>
        <DocsText>
          Add the design tokens to your globals.css:
        </DocsText>
        <CodeBlock
          code={`:root {
  /* Deep green-black gradient base */
  --background: oklch(0.12 0.02 145);
  --foreground: oklch(0.65 0 0);
  
  /* Cards and surfaces */
  --card: oklch(0.14 0.018 145);
  --card-foreground: oklch(0.7 0 0);
  
  /* Primary - white for hierarchy */
  --primary: oklch(0.98 0 0);
  --primary-foreground: oklch(0.12 0.02 145);
  
  /* Secondary - muted gray */
  --secondary: oklch(0.22 0.015 145);
  --secondary-foreground: oklch(0.65 0 0);
  
  /* Muted elements */
  --muted: oklch(0.2 0.012 145);
  --muted-foreground: oklch(0.55 0 0);
  
  /* Accent - neon green */
  --accent: oklch(0.85 0.25 145);
  --accent-foreground: oklch(0.12 0.02 145);
  
  /* Destructive */
  --destructive: oklch(0.65 0.25 25);
  --destructive-foreground: oklch(0.98 0 0);
  
  /* Borders */
  --border: oklch(0.28 0.015 145);
  --input: oklch(0.22 0.015 145);
  --ring: oklch(0.85 0.25 145);
  
  /* Brand neon colors */
  --neon-green: oklch(0.85 0.28 145);
  --neon-pink: oklch(0.75 0.25 350);
  --neon-purple: oklch(0.7 0.25 300);
  --neon-orange: oklch(0.8 0.22 55);
  
  --radius: 0.5rem;
}`}
          language="css"
          filename="globals.css"
          showLineNumbers
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Utils</DocsSectionTitle>
        <DocsText>
          Create the cn utility function for merging class names:
        </DocsText>
        <CodeBlock
          code={`import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
          language="typescript"
          filename="lib/utils.ts"
        />
      </DocsSection>

      <DocsNote variant="success">
        You&apos;re all set. Start building interfaces that hit different.
      </DocsNote>
    </div>
  );
}
