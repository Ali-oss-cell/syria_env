"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import type { PurchaseOrder } from "@/types";

const mockPOs: PurchaseOrder[] = [];

export default function PurchaseOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">طلبات الشراء</h1>
          <p className="text-muted-foreground text-sm mt-1">إدارة طلبات شراء المواد</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          طلب شراء جديد
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الطلب</TableHead>
                <TableHead>المورد</TableHead>
                <TableHead>الإجمالي</TableHead>
                <TableHead>التاريخ المتوقع</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPOs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    لا توجد طلبات شراء بعد.
                  </TableCell>
                </TableRow>
              ) : (
                mockPOs.map((po) => (
                  <TableRow key={po.id}>
                    <TableCell dir="ltr" className="font-mono">{po.order_number}</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell dir="ltr">{po.total}</TableCell>
                    <TableCell>{po.expected_date || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{po.status}</Badge>
                    </TableCell>
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
