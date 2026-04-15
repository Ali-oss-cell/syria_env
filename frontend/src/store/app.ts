import { create } from "zustand";
import type {
  User,
  Company,
  SyncItem,
  AccountScope,
  FeatureKey,
  TenantRole,
  TenantSubscription,
} from "@/types";
import {
  computeMonthlyTotal,
  getAllFeaturesEnabled,
  getDefaultSubscriptionLimits,
  getDefaultSubscriptionUsage,
} from "@/lib/subscriptions";

interface AppState {
  // Auth
  user: User | null;
  company: Company | null;
  accountScope: AccountScope;
  tenantRole: TenantRole;
  subscription: TenantSubscription;
  setUser: (user: User | null) => void;
  setCompany: (company: Company | null) => void;
  setAccountScope: (scope: AccountScope) => void;
  setTenantRole: (role: TenantRole) => void;
  setFeatureEnabled: (feature: FeatureKey, enabled: boolean) => void;
  setSelectedFeatures: (features: FeatureKey[]) => void;
  resetSubscriptionDefaults: () => void;

  // Sync queue
  syncQueue: SyncItem[];
  addToQueue: (item: SyncItem) => void;
  removeFromQueue: (id: string) => void;
  updateQueueItem: (id: string, updates: Partial<SyncItem>) => void;
  clearQueue: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  company: null,
  accountScope: "tenant_user",
  tenantRole: "owner",
  subscription: {
    plan_name: "compatibility",
    entitlements: getAllFeaturesEnabled(),
    limits: getDefaultSubscriptionLimits(),
    usage: getDefaultSubscriptionUsage(),
    monthly_total: computeMonthlyTotal([
      "crm",
      "inventory",
      "sales",
      "purchases",
      "accounting",
      "reports",
      "pos",
    ]),
  },
  setUser: (user) => set({ user }),
  setCompany: (company) => set({ company }),
  setAccountScope: (accountScope) => set({ accountScope }),
  setTenantRole: (tenantRole) => set({ tenantRole }),
  setFeatureEnabled: (feature, enabled) =>
    set((state) => {
      const nextEntitlements = {
        ...state.subscription.entitlements,
        [feature]: enabled,
      };
      const selectedFeatures = (Object.keys(nextEntitlements) as FeatureKey[]).filter(
        (key) => nextEntitlements[key]
      );
      return {
        subscription: {
          ...state.subscription,
          entitlements: nextEntitlements,
          monthly_total: computeMonthlyTotal(selectedFeatures),
        },
      };
    }),
  setSelectedFeatures: (features) =>
    set((state) => {
      const featureSet = new Set(features);
      const nextEntitlements = (Object.keys(state.subscription.entitlements) as FeatureKey[]).reduce(
        (acc, key) => {
          acc[key] = featureSet.has(key);
          return acc;
        },
        {} as Record<FeatureKey, boolean>
      );
      return {
        subscription: {
          ...state.subscription,
          entitlements: nextEntitlements,
          monthly_total: computeMonthlyTotal(features),
        },
      };
    }),
  resetSubscriptionDefaults: () =>
    set({
      subscription: {
        plan_name: "compatibility",
        entitlements: getAllFeaturesEnabled(),
        limits: getDefaultSubscriptionLimits(),
        usage: getDefaultSubscriptionUsage(),
        monthly_total: computeMonthlyTotal([
          "crm",
          "inventory",
          "sales",
          "purchases",
          "accounting",
          "reports",
          "pos",
        ]),
      },
    }),

  syncQueue: [],
  addToQueue: (item) => set((state) => ({ syncQueue: [...state.syncQueue, item] })),
  removeFromQueue: (id) => set((state) => ({ syncQueue: state.syncQueue.filter((i) => i.id !== id) })),
  updateQueueItem: (id, updates) =>
    set((state) => ({
      syncQueue: state.syncQueue.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    })),
  clearQueue: () => set({ syncQueue: [] }),
}));
