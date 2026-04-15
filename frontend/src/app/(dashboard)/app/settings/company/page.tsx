"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { useAppStore } from "@/store/app";

export default function CompanySettingsPage() {
  const { company, setCompany } = useAppStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">إعدادات الشركة</h1>
        <p className="text-muted-foreground text-sm mt-1">بيانات الشركة الأساسية</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            بيانات الشركة
          </CardTitle>
          <CardDescription>أدخل معلومات شركتك الرسمية</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 max-w-lg">
          <div className="grid gap-2">
            <Label htmlFor="company-name">اسم الشركة</Label>
            <Input
              id="company-name"
              value={company?.name || ""}
              onChange={(e) => setCompany(company ? { ...company, name: e.target.value } : null)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tax-id">الرقم الضريبي</Label>
            <Input id="tax-id" dir="ltr" placeholder="اختياري" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="currency">العملة الافتراضية</Label>
            <Input id="currency" dir="ltr" value={company?.default_currency || "SYP"} readOnly />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">العنوان</Label>
            <Textarea id="address" placeholder="اختياري" />
          </div>
          <Button className="w-fit">حفظ التغييرات</Button>
        </CardContent>
      </Card>
    </div>
  );
}
