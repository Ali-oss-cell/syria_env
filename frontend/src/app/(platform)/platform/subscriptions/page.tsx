import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const plans = [
  { name: "Inventory Focus", price: 45, modules: "Inventory, CRM, Purchases" },
  { name: "Financial Focus", price: 55, modules: "Accounting, Reports, CRM" },
  { name: "Full ERP", price: 95, modules: "All modules" },
];

export default function PlatformSubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">الاشتراكات</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          نظرة على باقات المنصة الحالية (واجهة تجريبية قابلة للتخصيص).
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.modules}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">${plan.price}</p>
              <p className="text-xs text-muted-foreground">شهرياً</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
