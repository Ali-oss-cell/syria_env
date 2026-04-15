"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Warehouse } from "lucide-react";
import type { Warehouse as WarehouseType } from "@/types";

const mockWarehouses: WarehouseType[] = [];

export default function WarehousesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">المستودعات</h1>
          <p className="text-muted-foreground text-sm mt-1">إدارة المستودعات والمخازن</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          إضافة مستودع
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الرمز</TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead>العنوان</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockWarehouses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    لا توجد مستودعات بعد. أضف مستودعاً جديداً للبدء.
                  </TableCell>
                </TableRow>
              ) : (
                mockWarehouses.map((w) => (
                  <TableRow key={w.id}>
                    <TableCell dir="ltr" className="font-mono text-sm">{w.code}</TableCell>
                    <TableCell className="font-medium">{w.name}</TableCell>
                    <TableCell>{w.address || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="success">نشط</Badge>
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
