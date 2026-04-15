"use client";

import { useOnlineStatus } from "@/hooks/use-online-status";
import { useSyncQueue } from "@/hooks/use-sync-queue";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Wifi, WifiOff, AlertCircle, CheckCircle } from "lucide-react";

export default function SyncStatusPage() {
  const isOnline = useOnlineStatus();
  const { sync, isSyncing, pendingCount, errorCount, queue } = useSyncQueue();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">حالة المزامنة</h1>
          <p className="text-muted-foreground text-sm mt-1">مراقبة قائمة المزامنة</p>
        </div>
        <Button onClick={sync} disabled={!isOnline || isSyncing || pendingCount === 0}>
          <RefreshCw className={isSyncing ? "animate-spin h-4 w-4" : "h-4 w-4"} />
          مزامنة الآن
        </Button>
      </div>

      {/* Status cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">حالة الاتصال</CardTitle>
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isOnline ? "متصل" : "غير متصل"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">قيد الانتظار</CardTitle>
            <Badge variant="warning">{pendingCount}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">أخطاء</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{errorCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">تمت المزامنة</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {queue.filter((i) => i.status !== "pending" && i.status !== "error").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Queue table */}
      {queue.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>قائمة المزامنة</CardTitle>
            <CardDescription>العمليات المعلّقة والتي تمت مزامنتها</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>النوع</TableHead>
                  <TableHead>الطريقة</TableHead>
                  <TableHead>المسار</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الخطأ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queue.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.type}</TableCell>
                    <TableCell dir="ltr" className="font-mono">{item.method}</TableCell>
                    <TableCell dir="ltr" className="font-mono text-sm">{item.endpoint}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "pending"
                            ? "warning"
                            : item.status === "error"
                              ? "destructive"
                              : "success"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-destructive text-sm max-w-xs truncate">
                      {item.error || "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
