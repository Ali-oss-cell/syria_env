"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Layers, ArrowRightLeft, ShieldCheck, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app";

const items = [
  { href: "/platform", label: "نظرة عامة", icon: ShieldCheck },
  { href: "/platform/tenants", label: "الشركات", icon: Building2 },
  { href: "/platform/subscriptions", label: "الاشتراكات", icon: Layers },
];

export function PlatformSidebar() {
  const pathname = usePathname();
  const setUser = useAppStore((s) => s.setUser);
  const setCompany = useAppStore((s) => s.setCompany);
  const setAccountScope = useAppStore((s) => s.setAccountScope);
  const setTenantRole = useAppStore((s) => s.setTenantRole);
  const resetSubscriptionDefaults = useAppStore((s) => s.resetSubscriptionDefaults);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("mock_account_scope");
    localStorage.removeItem("mock_tenant_role");
    localStorage.removeItem("mock_features");
    setUser(null);
    setCompany(null);
    setAccountScope("tenant_user");
    setTenantRole("owner");
    resetSubscriptionDefaults();
    window.location.href = "/login";
  };

  return (
    <aside className="fixed inset-y-0 right-0 z-40 flex w-64 flex-col border-r bg-sidebar text-sidebar-foreground max-md:hidden">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <ArrowRightLeft className="h-4 w-4" />
        <span className="text-sm font-semibold">لوحة الإدارة العامة</span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-4 w-4" />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
