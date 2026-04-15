"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Invoice } from "@/types";

const mockInvoices: Invoice[] = [];

const statusMap: Record<string, { label: string; variant: "default" | "success" | "warning" | "destructive" }> = {
  unpaid: { label: "غير مدفوع", variant: "destructive" },
  partial: { label: "جزئي", variant: "warning" },
  paid: { label: "مدفوع", variant: "success" },
};

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">الفواتير</h1>
        <p className="text-muted-foreground text-sm mt-1">عرض وطباعة الفواتير</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الفاتورة</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>الإجمالي</TableHead>
                <TableHead>المدفوع</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>التاريخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    لا توجد فواتير بعد.
                  </TableCell>
                </TableRow>
              ) : (
                mockInvoices.map((i) => (
                  <TableRow key={i.id}>
                    <TableCell dir="ltr" className="font-mono">{i.invoice_number}</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell dir="ltr">{i.total}</TableCell>
                    <TableCell dir="ltr">{i.paid}</TableCell>
                    <TableCell>
                      <Badge variant={statusMap[i.status]?.variant || "default"}>
                        {statusMap[i.status]?.label || i.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(i.created_at).toLocaleDateString("ar")}</TableCell>
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
