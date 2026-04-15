"use client";

import { useAppStore } from "@/store/app";
import { useSyncQueue } from "@/hooks/use-sync-queue";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  Users,
  ShoppingCart,
  ArrowDownUp,
  TrendingUp,
  AlertTriangle,
  Plus,
  ArrowRight,
  Clock,
  FileText,
  Truck,
  Warehouse,
  TrendingDown,
} from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "صباح الخير";
  if (hour < 17) return "مساء الخير";
  return "مساء الخير";
}

function formatDateArabic() {
  return new Date().toLocaleDateString("ar-SY", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Mock data for demonstration
const recentActivities = [
  { time: "٠٩:٣٠ ص", icon: ShoppingCart, color: "text-green-500", text: "تم إنشاء طلب مبيعات #١٠٢٤" },
  { time: "١٠:١٥ ص", icon: Package, color: "text-blue-500", text: "حركة وارد — ٥٠ وحدة من المورد أ" },
  { time: "١١:٠٠ ص", icon: Users, color: "text-purple-500", text: "عميل جديد: شركة النور للتجارة" },
  { time: "١٢:٣٠ م", icon: FileText, color: "text-orange-500", text: "فاتورة #٣٠٥ — غير مدفوعة" },
  { time: "٠٢:٠٠ م", icon: Truck, color: "text-cyan-500", text: "طلب شراء #٢٠١ من المورد ب" },
];

const lowStockAlerts = [
  { product: "منتج أ", warehouse: "المستودع الرئيسي", qty: 3, min: 10 },
  { product: "منتج ب", warehouse: "مستودع الفرع", qty: 0, min: 5 },
  { product: "منتج ج", warehouse: "المستودع الرئيسي", qty: 2, min: 20 },
];

const todayStats = [
  { label: "مبيعات اليوم", value: "٠", icon: ShoppingCart, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/30", trend: "٠%", trendUp: true },
  { label: "عدد العملاء", value: "٠", icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30", trend: "٠%", trendUp: true },
  { label: "المنتجات النشطة", value: "٠", icon: Package, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30", trend: "", trendUp: true },
  { label: "حركات المخزون", value: "٠", icon: ArrowDownUp, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950/30", trend: "", trendUp: true },
];

const quickActions = [
  { label: "نقطة البيع", href: "/pos", icon: ShoppingCart, desc: "بيع سريع" },
  { label: "إضافة عميل", href: "/app/crm/customers", icon: Plus, desc: "بيانات العميل" },
  { label: "حركة مخزون", href: "/app/inventory/movements", icon: ArrowDownUp, desc: "وارد / صادر" },
  { label: "طلب شراء", href: "/app/purchases/orders", icon: FileText, desc: "من مورد" },
];

export default function HomePage() {
  const { user, company } = useAppStore();
  const { pendingCount } = useSyncQueue();

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {getGreeting()}، {user?.name || "مستخدم"} 👋
          </h1>
          <p className="text-muted-foreground mt-1">{formatDateArabic()}</p>
          {company && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {company.name} — {company.default_currency}
            </p>
          )}
        </div>
        {pendingCount > 0 && (
          <Badge variant="warning" className="text-sm px-3 py-1">
            {pendingCount} عملية قيد المزامنة
          </Badge>
        )}
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {todayStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <div className={`rounded-lg p-2 ${stat.bg}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                {stat.trend && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    {stat.trendUp ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span>{stat.trend} عن الأمس</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions + Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
            <CardDescription>الوصول إلى الإجراءات الأكثر استخداماً</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <a
                  key={action.label}
                  href={action.href}
                  className="group flex items-center gap-4 rounded-lg border bg-card p-4 transition-all hover:bg-muted hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              آخر النشاطات
            </CardTitle>
            <CardDescription>آخر العمليات التي تمت في النظام</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivities.length === 0 ? (
              <p className="text-center py-6 text-muted-foreground text-sm">
                لا توجد نشاطات بعد. ابدأ بإضافة بيانات أو إجراء عملية بيع.
              </p>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity, i) => {
                  const Icon = activity.icon;
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`mt-0.5 rounded-full p-1.5 ${activity.color} bg-primary/5`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.text}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Alerts + Revenue */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              تنبيهات المخزون
            </CardTitle>
            <CardDescription>منتجات وصلت أو اقتربت من الحد الأدنى</CardDescription>
          </CardHeader>
          <CardContent>
            {lowStockAlerts.length === 0 ? (
              <p className="text-sm text-muted-foreground">لا توجد تنبيهات — المخزون بحالة جيدة ✓</p>
            ) : (
              <div className="space-y-3">
                {lowStockAlerts.map((alert, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between rounded-lg border p-3 ${
                      alert.qty === 0 ? "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20" : ""
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium">{alert.product}</p>
                      <p className="text-xs text-muted-foreground">{alert.warehouse}</p>
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-bold ${alert.qty === 0 ? "text-red-600" : "text-yellow-600"}`}>
                        {alert.qty}
                      </p>
                      <p className="text-xs text-muted-foreground">من {alert.min}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weekly Sales Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              مبيعات الأسبوع
            </CardTitle>
            <CardDescription>نظرة عامة على المبيعات آخر ٧ أيام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-40 items-end gap-2">
              {[35, 50, 25, 65, 45, 55, 40].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-primary/20 transition-all hover:bg-primary/40"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {["سبت", "أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة"][i]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
