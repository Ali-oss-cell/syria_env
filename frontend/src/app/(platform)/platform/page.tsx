import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PlatformHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">الإدارة العامة</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          لوحة تشغيل المنصة لإدارة الشركات والاشتراكات (واجهة تجريبية بدون Backend).
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>الشركات النشطة</CardTitle>
            <CardDescription>إجمالي الشركات المسجلة</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">24</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>اشتراكات مدفوعة</CardTitle>
            <CardDescription>الشركات التي لديها مزايا مفعلة</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">18</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>تحتاج متابعة</CardTitle>
            <CardDescription>اشتراكات منتهية أو معلقة</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">6</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button asChild>
            <Link href="/platform/tenants">إدارة الشركات</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/platform/subscriptions">إدارة الاشتراكات</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
