import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { COMPONENT_CATALOG } from "./catalog"

const categories = ["Inputs", "Data Display", "Navigation", "Overlays", "Feedback", "Layout"] as const

const statusMap = {
  ready: { label: "Ready", variant: "green-outline" as const },
  "in-progress": { label: "In Progress", variant: "purple-outline" as const },
  planned: { label: "Planned", variant: "orange-outline" as const },
}

export default function ComponentsPage() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <Badge variant="secondary" className="font-mono text-xs">
          Component Inventory
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Premium Component Library</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Every target component now has a dedicated documentation route with configurable controls for density,
          accent emphasis, and presentation behavior. Build-ready components are flagged as ready; active design
          items are marked in progress.
        </p>
      </section>

      {categories.map((category) => {
        const entries = COMPONENT_CATALOG.filter((entry) => entry.category === category)

        return (
          <section key={category} className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">{category}</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {entries.map((entry) => (
                <Link key={entry.slug} href={`/docs/components/${entry.slug}`}>
                  <Card isHoverable isPremium tone="green" className="h-full">
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-lg font-semibold text-foreground">{entry.name}</p>
                        <Badge variant={statusMap[entry.status].variant}>{statusMap[entry.status].label}</Badge>
                        <Badge variant="outline">{entry.foundation}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.description}</p>
                      <p className="text-xs text-muted-foreground">Primary export: <span className="font-mono">{entry.zName}</span></p>
                      {entry.notes && <p className="text-xs text-muted-foreground">{entry.notes}</p>}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
