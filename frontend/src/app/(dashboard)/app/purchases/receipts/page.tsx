"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PackageCheck } from "lucide-react";
import type { PurchaseReceipt } from "@/types";

const mockReceipts: PurchaseReceipt[] = [];

export default function PurchaseReceiptsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">استلام المشتريات</h1>
        <p className="text-muted-foreground text-sm mt-1">تسجيل استلام البضائع</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الاستلام</TableHead>
                <TableHead>المورد</TableHead>
                <TableHead>تاريخ الاستلام</TableHead>
                <TableHead>ملاحظات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReceipts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    لا توجد عمليات استلام بعد.
                  </TableCell>
                </TableRow>
              ) : (
                mockReceipts.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell dir="ltr" className="font-mono">{r.id}</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>{new Date(r.received_at).toLocaleDateString("ar")}</TableCell>
                    <TableCell>{r.notes || "—"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
