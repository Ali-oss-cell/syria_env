"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import type { SaleOrder } from "@/types";

const mockOrders: SaleOrder[] = [];

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "success" | "warning" | "destructive" }> = {
  draft: { label: "مسودة", variant: "secondary" },
  confirmed: { label: "مؤكد", variant: "default" },
  completed: { label: "مكتمل", variant: "success" },
  cancelled: { label: "ملغي", variant: "destructive" },
};

export default function SalesOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">طلبات المبيعات</h1>
          <p className="text-muted-foreground text-sm mt-1">إدارة طلبات المبيعات</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الطلب</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>المستودع</TableHead>
                <TableHead>الإجمالي</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>التاريخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    لا توجد طلبات مبيعات بعد.
                  </TableCell>
                </TableRow>
              ) : (
                mockOrders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell dir="ltr" className="font-mono">{o.order_number}</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell dir="ltr">{o.total}</TableCell>
                    <TableCell>
                      <Badge variant={statusMap[o.status]?.variant || "default"}>
                        {statusMap[o.status]?.label || o.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(o.created_at).toLocaleDateString("ar")}</TableCell>
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
