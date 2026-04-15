import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function AccountingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">المحاسبة</h1>
        <p className="text-muted-foreground text-sm mt-1">دليل الحسابات والقيود اليومية</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            دليل الحسابات
          </CardTitle>
          <CardDescription>قيد التطوير — سيتم الربط مع API في المرحلة الثالثة</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">سيظهر هنا دليل الحسابات والقيود اليومية وسجل الحسابات.</p>
        </CardContent>
      </Card>
    </div>
  );
}
