"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FEATURE_CATALOG, BASE_MONTHLY_PRICE, computeMonthlyTotal } from "@/lib/subscriptions";
import type { FeatureKey } from "@/types";

export default function RegisterPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<FeatureKey[]>([
    "crm",
    "inventory",
    "sales",
  ]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const monthlyTotal = computeMonthlyTotal(selectedFeatures);

  const toggleFeature = (feature: FeatureKey) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirm) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }

    setLoading(true);

    try {
      // TODO: replace with real API call
      console.log("Register:", { companyName, name, email, password, selectedFeatures, monthlyTotal });
      localStorage.setItem("pending_subscription_features", JSON.stringify(selectedFeatures));
      router.push("/login");
    } catch {
      setError("فشل إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">إنشاء حساب</CardTitle>
        <CardDescription>أدخل بيانات شركتك ومعلوماتك</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="grid gap-4">
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="company">اسم الشركة</Label>
            <Input
              id="company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">الاسم</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm">تأكيد كلمة المرور</Label>
            <Input
              id="confirm"
              type="password"
              dir="ltr"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3 rounded-md border p-3">
            <p className="text-sm font-medium">اختر المزايا المطلوبة</p>
            <div className="grid gap-2">
              {FEATURE_CATALOG.map((feature) => (
                <label
                  key={feature.key}
                  className="flex items-center justify-between rounded-md border p-2 text-sm"
                >
                  <div>
                    <p className="font-medium">{feature.label}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">${feature.monthly_price}</span>
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature.key)}
                      onChange={() => toggleFeature(feature.key)}
                      className="h-4 w-4"
                    />
                  </div>
                </label>
              ))}
            </div>
            <div className="rounded-md bg-muted p-2 text-sm">
              <p>رسوم أساسية: ${BASE_MONTHLY_PRICE}</p>
              <p className="font-semibold">الإجمالي الشهري: ${monthlyTotal}</p>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "...جاري الإنشاء" : "إنشاء حساب"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="text-primary underline hover:text-primary/80">
              تسجيل الدخول
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
