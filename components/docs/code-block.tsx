"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className={cn("relative group rounded-lg border border-border overflow-hidden", className)}>
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
          <span className="text-xs font-mono text-muted-foreground">{filename}</span>
          <span className="text-xs font-mono text-muted-foreground uppercase">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm font-mono bg-card">
          <code className="text-foreground">
            {showLineNumbers ? (
              <table className="border-collapse">
                <tbody>
                  {lines.map((line, i) => (
                    <tr key={i}>
                      <td className="pr-4 text-right text-muted-foreground select-none w-8">
                        {i + 1}
                      </td>
                      <td className="whitespace-pre">{line}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              code
            )}
          </code>
        </pre>
        <button
          onClick={copyToClipboard}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-md transition-all",
            "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground",
            "opacity-0 group-hover:opacity-100 focus:opacity-100"
          )}
          aria-label="Copy code"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-neon-green" />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

interface InlineCodeProps {
  children: React.ReactNode;
  className?: string;
}

export function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.4em] py-[0.2em] font-mono text-sm text-foreground",
        className
      )}
    >
      {children}
    </code>
  );
}
