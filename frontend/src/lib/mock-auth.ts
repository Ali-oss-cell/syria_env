import type { AccountScope, FeatureKey, TenantRole } from "@/types";

export interface MockAuthAccount {
  email: string;
  password: string;
  name: string;
  accountScope: AccountScope;
  tenantRole: TenantRole;
  features: FeatureKey[];
  description: string;
}

export const MOCK_AUTH_ACCOUNTS: MockAuthAccount[] = [
  {
    email: "owner@test.local",
    password: "123456",
    name: "Owner User",
    accountScope: "tenant_user",
    tenantRole: "owner",
    features: ["crm", "inventory", "sales", "purchases", "accounting", "reports", "pos"],
    description: "صلاحيات كاملة داخل الشركة",
  },
  {
    email: "cashier@test.local",
    password: "123456",
    name: "Cashier User",
    accountScope: "tenant_user",
    tenantRole: "cashier",
    features: ["sales", "crm", "pos"],
    description: "مبيعات + نقطة البيع فقط",
  },
  {
    email: "warehouse@test.local",
    password: "123456",
    name: "Warehouse User",
    accountScope: "tenant_user",
    tenantRole: "warehouse",
    features: ["inventory"],
    description: "المخزون فقط",
  },
  {
    email: "accountant@test.local",
    password: "123456",
    name: "Accountant User",
    accountScope: "tenant_user",
    tenantRole: "accountant",
    features: ["accounting", "reports"],
    description: "المحاسبة والتقارير",
  },
  {
    email: "manager@test.local",
    password: "123456",
    name: "Manager User",
    accountScope: "tenant_user",
    tenantRole: "manager",
    features: ["crm", "inventory", "sales", "purchases", "reports"],
    description: "مدير تشغيلي بدون صلاحيات الإدارة العامة",
  },
  {
    email: "admin@platform.local",
    password: "123456",
    name: "Platform Admin",
    accountScope: "platform_admin",
    tenantRole: "owner",
    features: ["crm", "inventory", "sales", "purchases", "accounting", "reports", "pos"],
    description: "إدارة عامة للمنصة (General Admin)",
  },
];

export function findMockAccount(email: string, password: string): MockAuthAccount | null {
  return (
    MOCK_AUTH_ACCOUNTS.find(
      (account) =>
        account.email.toLowerCase() === email.toLowerCase().trim() && account.password === password
    ) ?? null
  );
}
