"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/store/app";
import type { LoginCredentials } from "@/types";
import { MOCK_AUTH_ACCOUNTS, findMockAccount } from "@/lib/mock-auth";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAppStore((s) => s.setUser);
  const setCompany = useAppStore((s) => s.setCompany);
  const setAccountScope = useAppStore((s) => s.setAccountScope);
  const setTenantRole = useAppStore((s) => s.setTenantRole);
  const setSelectedFeatures = useAppStore((s) => s.setSelectedFeatures);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fillCredentials = (selectedEmail: string, selectedPassword: string) => {
    setEmail(selectedEmail);
    setPassword(selectedPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // TODO: replace with real API call to Laravel backend
      const credentials: LoginCredentials = { email, password };
      console.log("Login attempt:", credentials);

      const mockAccount = findMockAccount(email, password);
      if (!mockAccount) {
        setError("الحساب غير موجود ضمن الحسابات التجريبية. استخدم أحد الحسابات المعروضة أدناه.");
        return;
      }

      // Mock: set dummy user for now
      setUser({
        id: "1",
        name: mockAccount.name,
        email: mockAccount.email,
        role: mockAccount.accountScope === "platform_admin" ? "platform_admin" : mockAccount.tenantRole,
        company_id: "1",
      });
      setCompany({
        id: "1",
        name: "Demo Company",
        default_currency: "SYP",
      });
      setAccountScope(mockAccount.accountScope);
      setTenantRole(mockAccount.tenantRole);
      setSelectedFeatures(mockAccount.features);
      localStorage.setItem("auth_token", "mock_token");
      localStorage.setItem("mock_account_scope", mockAccount.accountScope);
      localStorage.setItem("mock_tenant_role", mockAccount.tenantRole);
      localStorage.setItem("mock_features", JSON.stringify(mockAccount.features));

      router.push(mockAccount.accountScope === "platform_admin" ? "/platform" : "/app/home");
    } catch {
      setError("فشل تسجيل الدخول. تحقق من البيانات.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
        <CardDescription>أدخل بريدك الإلكتروني وكلمة المرور</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="grid gap-4">
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              dir="ltr"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              dir="ltr"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "...جاري الدخول" : "تسجيل الدخول"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            ليس لديك حساب؟{" "}
            <Link href="/register" className="text-primary underline hover:text-primary/80">
              إنشاء حساب
            </Link>
          </p>
        </form>

        <div className="mt-6 rounded-md border bg-muted/30 p-3">
          <p className="mb-2 text-sm font-semibold">حسابات تجريبية (Testing)</p>
          <div className="space-y-2">
            {MOCK_AUTH_ACCOUNTS.map((account) => (
              <div
                key={account.email}
                className="flex flex-col gap-2 rounded-md border bg-background p-2 text-xs md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-medium">{account.name}</p>
                  <p className="text-muted-foreground" dir="ltr">
                    {account.email} / {account.password}
                  </p>
                  <p className="text-muted-foreground">{account.description}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillCredentials(account.email, account.password)}
                >
                  تعبئة تلقائية
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
