"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useAppStore } from "@/store/app";

export default function ProfileSettingsPage() {
  const { user, setUser } = useAppStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">حسابي</h1>
        <p className="text-muted-foreground text-sm mt-1">إعدادات حسابك الشخصي</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              المعلومات الشخصية
            </CardTitle>
            <CardDescription>تحديث بياناتك الشخصية</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">الاسم</Label>
              <Input
                id="name"
                value={user?.name || ""}
                onChange={(e) => setUser(user ? { ...user, name: e.target.value } : null)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input id="email" type="email" dir="ltr" value={user?.email || ""} readOnly />
            </div>
            <Button className="w-fit">حفظ</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تغيير كلمة المرور</CardTitle>
            <CardDescription>أدخل كلمة المرور الحالية والجديدة</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current">كلمة المرور الحالية</Label>
              <Input id="current" type="password" dir="ltr" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new">كلمة المرور الجديدة</Label>
              <Input id="new" type="password" dir="ltr" />
            </div>
            <Button className="w-fit">تغيير كلمة المرور</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
