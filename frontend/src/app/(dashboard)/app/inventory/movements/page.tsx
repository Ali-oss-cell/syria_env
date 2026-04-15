"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import type { StockMovement } from "@/types";

const mockMovements: StockMovement[] = [];

export default function MovementsPage() {
  const typeLabels: Record<string, { label: string; variant: "default" | "success" | "destructive" | "secondary" }> = {
    in: { label: "وارد", variant: "success" },
    out: { label: "صادر", variant: "destructive" },
    transfer: { label: "تحويل", variant: "default" },
    adjustment: { label: "تسوية", variant: "secondary" },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">حركات المخزون</h1>
          <p className="text-muted-foreground text-sm mt-1">سجل حركات المخزون الواردة والصادرة</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          حركة جديدة
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>التاريخ</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>المنتج</TableHead>
                <TableHead>المستودع</TableHead>
                <TableHead>الكمية</TableHead>
                <TableHead>ملاحظات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMovements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    لا توجد حركات بعد. أضف حركة مخزون جديدة للبدء.
                  </TableCell>
                </TableRow>
              ) : (
                mockMovements.map((m) => {
                  const typeInfo = typeLabels[m.type] || { label: m.type, variant: "default" as const };
                  return (
                    <TableRow key={m.id}>
                      <TableCell>{new Date(m.created_at).toLocaleDateString("ar")}</TableCell>
                      <TableCell>
                        <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>
                      </TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>—</TableCell>
                      <TableCell dir="ltr" className="font-mono">{m.quantity}</TableCell>
                      <TableCell>{m.notes || "—"}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
