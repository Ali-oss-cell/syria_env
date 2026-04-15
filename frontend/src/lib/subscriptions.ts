import type {
  FeatureCatalogItem,
  FeatureEntitlements,
  FeatureKey,
  SubscriptionLimits,
  SubscriptionUsage,
} from "@/types";

export const FEATURE_CATALOG: FeatureCatalogItem[] = [
  {
    key: "crm",
    label: "العملاء والموردون",
    monthly_price: 10,
    description: "إدارة بيانات العملاء والموردين والبحث السريع.",
  },
  {
    key: "inventory",
    label: "المخزون",
    monthly_price: 20,
    description: "المنتجات، المستودعات، وحركات المخزون.",
  },
  {
    key: "sales",
    label: "المبيعات",
    monthly_price: 15,
    description: "الطلبات والفواتير وتتبع حالة البيع.",
  },
  {
    key: "purchases",
    label: "المشتريات",
    monthly_price: 15,
    description: "طلبات الشراء والاستلام من الموردين.",
  },
  {
    key: "accounting",
    label: "المحاسبة",
    monthly_price: 25,
    description: "دليل الحسابات والقيود وسجل الحسابات.",
  },
  {
    key: "reports",
    label: "التقارير",
    monthly_price: 10,
    description: "تقارير تحليلية للمبيعات والمخزون والذمم.",
  },
  {
    key: "pos",
    label: "نقطة البيع",
    monthly_price: 10,
    description: "واجهة بيع سريعة مخصصة للكاشير.",
  },
];

export const BASE_MONTHLY_PRICE = 15;

export function getAllFeaturesEnabled(): FeatureEntitlements {
  return {
    crm: true,
    inventory: true,
    sales: true,
    purchases: true,
    accounting: true,
    reports: true,
    pos: true,
  };
}

export function getDefaultSubscriptionLimits(): SubscriptionLimits {
  return {
    max_users: 10,
    max_warehouses: 5,
    monthly_orders: 1000,
  };
}

export function getDefaultSubscriptionUsage(): SubscriptionUsage {
  return {
    max_users: 1,
    max_warehouses: 1,
    monthly_orders: 0,
  };
}

export function computeMonthlyTotal(selectedFeatures: FeatureKey[]): number {
  const featuresCost = FEATURE_CATALOG.filter((f) => selectedFeatures.includes(f.key)).reduce(
    (sum, f) => sum + f.monthly_price,
    0
  );
  return BASE_MONTHLY_PRICE + featuresCost;
}
