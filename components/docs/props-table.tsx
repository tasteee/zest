import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { InlineCode } from "./code-block";

interface Prop {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  props: Prop[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[180px]">Prop</TableHead>
            <TableHead className="w-[200px]">Type</TableHead>
            <TableHead className="w-[120px]">Default</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name} className="hover:bg-muted/30">
              <TableCell className="font-mono text-sm">
                <span className="text-primary">{prop.name}</span>
                {prop.required && (
                  <Badge variant="pink-outline" className="ml-2 text-[10px]">
                    Required
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <InlineCode>{prop.type}</InlineCode>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {prop.default ? <InlineCode>{prop.default}</InlineCode> : "—"}
              </TableCell>
              <TableCell className="text-foreground">{prop.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
