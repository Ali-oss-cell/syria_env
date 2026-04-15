"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app";
import type { AccountScope, FeatureKey, TenantRole } from "@/types";

interface ScopeGuardProps {
  expectedScope: AccountScope;
  children: React.ReactNode;
}

export function ScopeGuard({ expectedScope, children }: ScopeGuardProps) {
  const accountScope = useAppStore((s) => s.accountScope);
  const setAccountScope = useAppStore((s) => s.setAccountScope);
  const setTenantRole = useAppStore((s) => s.setTenantRole);
  const setSelectedFeatures = useAppStore((s) => s.setSelectedFeatures);
  const persistedScope = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") {
        return () => {};
      }
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => {
      if (typeof window === "undefined") {
        return null;
      }
      const value = localStorage.getItem("mock_account_scope");
      return value === "tenant_user" || value === "platform_admin"
        ? (value as AccountScope)
        : null;
    },
    () => null
  );

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const storedScope = localStorage.getItem("mock_account_scope");
    const storedRole = localStorage.getItem("mock_tenant_role");
    const storedFeatures = localStorage.getItem("mock_features");

    if (token && (storedScope === "tenant_user" || storedScope === "platform_admin")) {
      setAccountScope(storedScope as AccountScope);
    }
    if (token && storedRole) {
      setTenantRole(storedRole as TenantRole);
    }
    if (token && storedFeatures) {
      try {
        const parsed = JSON.parse(storedFeatures) as FeatureKey[];
        setSelectedFeatures(parsed);
      } catch {
        // Keep existing store defaults if local storage payload is invalid.
      }
    }

  }, [setAccountScope, setSelectedFeatures, setTenantRole]);

  const effectiveScope: AccountScope =
    accountScope === "platform_admin" ? accountScope : persistedScope ?? accountScope;

  if (effectiveScope === expectedScope) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto mt-16 max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>غير مصرح بالدخول لهذه المنطقة</CardTitle>
          <CardDescription>
            هذه الصفحة مخصصة للإدارة العامة فقط. يمكنك العودة إلى لوحة شركتك.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/app/home">العودة للوحة الشركة</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
