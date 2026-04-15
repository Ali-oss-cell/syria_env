import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockTenants = [
  { id: "t-001", name: "شركة الشام التجارية", modules: 5, status: "نشط" },
  { id: "t-002", name: "مستودعات الهدى", modules: 2, status: "تجريبي" },
  { id: "t-003", name: "مركز النور المالي", modules: 3, status: "نشط" },
];

export default function PlatformTenantsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">الشركات</h1>
        <p className="mt-1 text-sm text-muted-foreground">إدارة الشركات وتفعيل المزايا (Mock Data)</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة الشركات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockTenants.map((tenant) => (
            <div
              key={tenant.id}
              className="flex items-center justify-between rounded-md border p-3 text-sm"
            >
              <div>
                <p className="font-medium">{tenant.name}</p>
                <p className="text-muted-foreground">
                  {tenant.status} · {tenant.modules} مزايا مفعلة
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href={`/platform/tenants/${tenant.id}`}>تفاصيل الاشتراك</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
