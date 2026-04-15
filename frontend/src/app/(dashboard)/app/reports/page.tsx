import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">التقارير</h1>
        <p className="text-muted-foreground text-sm mt-1">مركز التقارير والتحليلات</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          "تقرير المبيعات",
          "تقرير الأرباح",
          "تقرير المخزون",
          "تقرير الذمم المدينة",
          "تقرير الذمم الدائنة",
          "تقرير حركة المخزون",
        ].map((report) => (
          <Card key={report} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {report}
              </CardTitle>
              <CardDescription>قيد التطوير</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
