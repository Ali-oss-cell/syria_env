"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { canAccessPath, canAccessFeature } from "@/lib/access";
import { useAppStore } from "@/store/app";
import type { FeatureKey } from "@/types";

interface RouteAccessGuardProps {
  children: React.ReactNode;
  requiredFeature?: FeatureKey;
}

export function RouteAccessGuard({ children, requiredFeature }: RouteAccessGuardProps) {
  const pathname = usePathname();
  const { accountScope, tenantRole, subscription } = useAppStore();

  const allowed = requiredFeature
    ? canAccessFeature(accountScope, tenantRole, subscription.entitlements, requiredFeature)
    : canAccessPath(accountScope, tenantRole, subscription.entitlements, pathname);

  if (allowed) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto mt-16 max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>الميزة غير متاحة في اشتراكك الحالي</CardTitle>
          <CardDescription>
            تم إخفاء هذه الوحدة من القائمة، والوصول المباشر يتطلب تفعيلها من خطة الاشتراك.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button asChild>
            <Link href="/register">ترقية الاشتراك</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/app/home">العودة للرئيسية</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
