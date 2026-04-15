"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useOnlineStatus } from "@/hooks/use-online-status";
import { useSyncQueue } from "@/hooks/use-sync-queue";
import {
  LayoutDashboard,
  Users,
  Truck,
  Package,
  Warehouse,
  ArrowLeftRight,
  ShoppingCart,
  FileText,
  ClipboardList,
  PackageCheck,
  BookOpen,
  BarChart3,
  Settings,
  Building2,
  UserCog,
  User,
  LogOut,
  WifiOff,
  Wifi,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { useAppStore } from "@/store/app";

interface NavGroup {
  label: string;
  items: {
    label: string;
    href: string;
    icon: React.ElementType;
  }[];
}

const navGroups: NavGroup[] = [
  {
    label: "الرئيسية",
    items: [
      { label: "لوحة التحكم", href: "/app/home", icon: LayoutDashboard },
    ],
  },
  {
    label: "إدارة العلاقات",
    items: [
      { label: "العملاء", href: "/app/crm/customers", icon: Users },
      { label: "الموردون", href: "/app/crm/suppliers", icon: Truck },
    ],
  },
  {
    label: "المخزون",
    items: [
      { label: "المنتجات", href: "/app/inventory/products", icon: Package },
      { label: "المستودعات", href: "/app/inventory/warehouses", icon: Warehouse },
      { label: "الحركات", href: "/app/inventory/movements", icon: ArrowLeftRight },
    ],
  },
  {
    label: "المبيعات",
    items: [
      { label: "الطلبات", href: "/app/sales/orders", icon: ShoppingCart },
      { label: "الفواتير", href: "/app/sales/invoices", icon: FileText },
    ],
  },
  {
    label: "المشتريات",
    items: [
      { label: "طلبات الشراء", href: "/app/purchases/orders", icon: ClipboardList },
      { label: "الاستلام", href: "/app/purchases/receipts", icon: PackageCheck },
    ],
  },
  {
    label: "المحاسبة",
    items: [
      { label: "دليل الحسابات", href: "/app/accounting/accounts", icon: BookOpen },
    ],
  },
  {
    label: "التقارير",
    items: [
      { label: "التقارير", href: "/app/reports", icon: BarChart3 },
    ],
  },
  {
    label: "الإعدادات",
    items: [
      { label: "الشركة", href: "/app/settings/company", icon: Building2 },
      { label: "المستخدمون", href: "/app/settings/users", icon: UserCog },
      { label: "حسابي", href: "/app/settings/me", icon: User },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const isOnline = useOnlineStatus();
  const { sync, isSyncing, pendingCount } = useSyncQueue();
  const { user, company } = useAppStore();

  return (
    <aside className="sidebar fixed inset-y-0 right-0 z-50 w-64 flex-col border-r bg-sidebar text-sidebar-foreground max-md:hidden">
      {/* Company header */}
      <div className="flex h-14 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground font-bold">
          {company?.name?.charAt(0) || "S"}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{company?.name || "الشركة"}</span>
          <span className="text-xs text-sidebar-foreground/60">{user?.role || ""}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <h3 className="mb-2 px-2 text-xs font-medium text-sidebar-foreground/50">
              {group.label}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname?.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom bar */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        {/* Online status */}
        <div className="flex items-center gap-2 px-2 text-xs">
          {isOnline ? (
            <>
              <Wifi className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-500">متصل</span>
            </>
          ) : (
            <>
              <WifiOff className="h-3.5 w-3.5 text-red-500" />
              <span className="text-red-500">غير متصل</span>
            </>
          )}
          {pendingCount > 0 && (
            <button
              onClick={sync}
              disabled={isSyncing}
              className="mr-auto flex items-center gap-1 rounded px-1.5 py-0.5 text-xs bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors"
            >
              <RefreshCw className={cn("h-3 w-3", isSyncing && "animate-spin")} />
              {pendingCount}
            </button>
          )}
        </div>

        {/* POS link */}
        <Link
          href="/pos"
          className="flex items-center gap-2 rounded-md bg-sidebar-primary px-3 py-2 text-sm text-sidebar-primary-foreground hover:bg-sidebar-primary/90 transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
          نقطة البيع
        </Link>

        {/* Logout */}
        <button
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          onClick={() => {
            localStorage.removeItem("auth_token");
            window.location.href = "/login";
          }}
        >
          <LogOut className="h-4 w-4" />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
