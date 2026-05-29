export const examples = {
	quickPreview: `import {
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
          <ZTableHead className="w-25">Invoice</ZTableHead>
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
}`,

	usageImport: `import {
  ZTable,
  ZTableBody,
  ZTableCaption,
  ZTableCell,
  ZTableHead,
  ZTableHeader,
  ZTableRow,
} from '@tasteee/zest'`,

	usage: `<ZTable>
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
</ZTable>`,

	withFooter: `<Table>
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
</Table>`,

	withStatusBadges: `<Table>
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
          <z.badge {...getInvoiceStatusBadgeProps(invoice.status)}>
            {invoice.status}
          </z.badge>
        </TableCell>
        <TableCell>{invoice.method}</TableCell>
        <TableCell className="text-right">{invoice.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`
} as const
