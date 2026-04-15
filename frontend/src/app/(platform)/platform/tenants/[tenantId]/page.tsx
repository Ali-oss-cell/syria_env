import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const featureNames = [
  "CRM",
  "Inventory",
  "Sales",
  "Purchases",
  "Accounting",
  "Reports",
  "POS",
];

export default async function TenantSubscriptionDetailsPage({
  params,
}: {
  params: Promise<{ tenantId: string }>;
}) {
  const { tenantId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">تفاصيل اشتراك الشركة</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          المعرّف: {tenantId} — صفحة تجريبية لإدارة تفعيل المزايا.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>المزايا المتاحة</CardTitle>
          <CardDescription>واجهة العرض فقط حالياً. الربط الحقيقي سيكون مع Backend لاحقاً.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {featureNames.map((feature) => (
            <label key={feature} className="flex items-center justify-between rounded-md border p-3 text-sm">
              <span>{feature}</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button>حفظ التغييرات (Mock)</Button>
        <Button variant="outline">إلغاء</Button>
      </div>
    </div>
  );
}
