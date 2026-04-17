"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable, type PropDefinition } from "@/components/docs/props-table"
import { CodeBlock } from "@/components/docs/code-block"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table"

const tableProps: PropDefinition[] = [
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply to the table element."
  },
]

const invoices = [
  { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { id: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  { id: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
]

export default function TableDocsPage() {
  return (
    <div className="space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/docs" className="hover:text-foreground transition-colors">
          Docs
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/docs/components" className="hover:text-foreground transition-colors">
          Components
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Table</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            ZTable
          </h1>
          <Badge kind="ghost" color="white">Component</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A responsive table component for displaying tabular data with proper 
          accessibility and styling.
        </p>
      </div>

      {/* Quick Preview */}
      <ComponentPreview
        title="Default Table"
        description="A basic table with headers and data rows."
        code={`import {
  ZTable,
  ZTableBody,
  ZTableCaption,
  ZTableCell,
  ZTableHead,
  ZTableHeader,
  ZTableRow,
} from '@tasteee/zest'

export function TableDemo() {
  return (
    <ZTable>
      <ZTableCaption>A list of recent invoices.</ZTableCaption>
      <ZTableHeader>
        <ZTableRow>
          <ZTableHead className="w-[100px]">Invoice</ZTableHead>
          <ZTableHead>Status</ZTableHead>
          <ZTableHead>Method</ZTableHead>
          <ZTableHead className="text-right">Amount</ZTableHead>
        </ZTableRow>
      </ZTableHeader>
      <ZTableBody>
        {invoices.map((invoice) => (
          <ZTableRow key={invoice.id}>
            <ZTableCell className="font-medium">{invoice.id}</ZTableCell>
            <ZTableCell>{invoice.status}</ZTableCell>
            <ZTableCell>{invoice.method}</ZTableCell>
            <ZTableCell className="text-right">{invoice.amount}</ZTableCell>
          </ZTableRow>
        ))}
      </ZTableBody>
    </ZTable>
  )
}`}
      >
        <Table>
          <TableCaption>A list of recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.method}</TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ComponentPreview>

      {/* Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          code={`import {
  ZTable,
  ZTableBody,
  ZTableCaption,
  ZTableCell,
  ZTableHead,
  ZTableHeader,
  ZTableRow,
} from '@tasteee/zest'`}
          language="tsx"
        />
        <CodeBlock
          code={`<ZTable>
  <ZTableHeader>
    <ZTableRow>
      <ZTableHead>Name</ZTableHead>
      <ZTableHead>Email</ZTableHead>
    </ZTableRow>
  </ZTableHeader>
  <ZTableBody>
    <ZTableRow>
      <ZTableCell>John Doe</ZTableCell>
      <ZTableCell>john@example.com</ZTableCell>
    </ZTableRow>
  </ZTableBody>
</ZTable>`}
          language="tsx"
        />
      </section>

      {/* Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        {/* With Footer */}
        <ComponentPreview
          title="With Footer"
          description="A table with a footer row for totals or summaries."
          code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map((invoice) => (
      <TableRow key={invoice.id}>
        <TableCell>{invoice.id}</TableCell>
        <TableCell>{invoice.status}</TableCell>
        <TableCell className="text-right">{invoice.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell className="text-right">$1,750.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell className="text-right">{invoice.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell className="text-right">$1,750.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </ComponentPreview>

        {/* With Status Badges */}
        <ComponentPreview
          title="With Status Badges"
          description="Using badges to indicate status in table cells."
          code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map((invoice) => (
      <TableRow key={invoice.id}>
        <TableCell className="font-medium">{invoice.id}</TableCell>
        <TableCell>
          <Badge
            kind={
              invoice.status === "Paid" ? "solid" :
              invoice.status === "Pending" ? "ghost" : "solid"
            }
            color={
              invoice.status === "Paid" ? "green" :
              invoice.status === "Pending" ? "white" : "pink"
            }
          >
            {invoice.status}
          </Badge>
        </TableCell>
        <TableCell>{invoice.method}</TableCell>
        <TableCell className="text-right">{invoice.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>
                  <Badge
                    kind={
                      invoice.status === "Paid" ? "solid" :
                      invoice.status === "Pending" ? "ghost" : "solid"
                    }
                    color={
                      invoice.status === "Paid" ? "green" :
                      invoice.status === "Pending" ? "white" : "pink"
                    }
                  >
                    {invoice.status}
                  </Badge>
                  </TableCell>
                  <TableCell>{invoice.method}</TableCell>
                  <TableCell className="text-right">{invoice.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <PropsTable title="Table" props={tableProps} />
        <p className="text-sm text-muted-foreground">
          All table components (TableHeader, TableBody, TableFooter, TableRow, TableHead, 
          TableCell, TableCaption) accept standard HTML attributes for their respective 
          elements plus a <code className="text-xs bg-muted px-1 py-0.5 rounded">className</code> prop.
        </p>
      </section>

      {/* Accessibility */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Accessibility
        </h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Semantic HTML</h3>
              <p className="text-sm text-muted-foreground">
                The Table component uses native HTML table elements which provide 
                built-in accessibility for screen readers and other assistive technologies.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Table Caption</h3>
              <p className="text-sm text-muted-foreground">
                Use the TableCaption component to provide a description of the 
                table&apos;s contents. This helps screen reader users understand 
                the purpose of the table.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Column Headers</h3>
              <p className="text-sm text-muted-foreground">
                Always use TableHead for column headers. Screen readers use these 
                to announce column names when navigating table cells.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
