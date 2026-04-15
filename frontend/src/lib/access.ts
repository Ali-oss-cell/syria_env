import type {
  AccountScope,
  FeatureEntitlements,
  FeatureKey,
  TenantRole,
} from "@/types";

const ROLE_PERMISSIONS: Record<TenantRole, FeatureKey[]> = {
  owner: ["crm", "inventory", "sales", "purchases", "accounting", "reports", "pos"],
  manager: ["crm", "inventory", "sales", "purchases", "reports"],
  accountant: ["accounting", "reports", "sales", "purchases"],
  cashier: ["sales", "pos", "crm"],
  warehouse: ["inventory"],
  purchasing: ["purchases", "inventory", "crm"],
};

const ROUTE_FEATURE_MAP: Array<{ prefix: string; feature: FeatureKey }> = [
  { prefix: "/app/crm", feature: "crm" },
  { prefix: "/app/inventory", feature: "inventory" },
  { prefix: "/app/sales", feature: "sales" },
  { prefix: "/app/purchases", feature: "purchases" },
  { prefix: "/app/accounting", feature: "accounting" },
  { prefix: "/app/reports", feature: "reports" },
  { prefix: "/pos", feature: "pos" },
];

const ROUTE_ROLE_RESTRICTIONS: Array<{ prefix: string; allowedRoles: TenantRole[] }> = [
  { prefix: "/app/settings/company", allowedRoles: ["owner"] },
];

export function canAccessFeature(
  scope: AccountScope,
  role: TenantRole,
  entitlements: FeatureEntitlements,
  feature: FeatureKey
): boolean {
  if (scope === "platform_admin") {
    return true;
  }
  const roleAllows = ROLE_PERMISSIONS[role].includes(feature);
  const subscriptionAllows = Boolean(entitlements[feature]);
  return roleAllows && subscriptionAllows;
}

export function getAccessibleFeatures(
  scope: AccountScope,
  role: TenantRole,
  entitlements: FeatureEntitlements
): FeatureKey[] {
  return (Object.keys(entitlements) as FeatureKey[]).filter((feature) =>
    canAccessFeature(scope, role, entitlements, feature)
  );
}

export function getRequiredFeatureForPath(pathname: string): FeatureKey | null {
  const match = ROUTE_FEATURE_MAP.find((route) => pathname.startsWith(route.prefix));
  return match?.feature ?? null;
}

export function canAccessPath(
  scope: AccountScope,
  role: TenantRole,
  entitlements: FeatureEntitlements,
  pathname: string
): boolean {
  const roleRestriction = ROUTE_ROLE_RESTRICTIONS.find((route) => pathname.startsWith(route.prefix));
  if (roleRestriction && !roleRestriction.allowedRoles.includes(role)) {
    return false;
  }

  const requiredFeature = getRequiredFeatureForPath(pathname);
  if (!requiredFeature) {
    return true;
  }
  return canAccessFeature(scope, role, entitlements, requiredFeature);
}
