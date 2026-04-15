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

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAppStore((s) => s.setUser);
  const setCompany = useAppStore((s) => s.setCompany);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // TODO: replace with real API call to Laravel backend
      const credentials: LoginCredentials = { email, password };
      console.log("Login attempt:", credentials);

      // Mock: set dummy user for now
      setUser({
        id: "1",
        name: "Demo User",
        email,
        role: "admin",
        company_id: "1",
      });
      setCompany({
        id: "1",
        name: "Demo Company",
        default_currency: "SYP",
      });
      localStorage.setItem("auth_token", "mock_token");

      router.push("/app/home");
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
      </CardContent>
    </Card>
  );
}
