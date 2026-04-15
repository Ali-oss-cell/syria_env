// ─── Auth ──────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company_id: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  tax_id?: string;
  default_currency: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterInput {
  company_name: string;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// ─── CRM ───────────────────────────────────────────────

export interface Party {
  id: string;
  type: "customer" | "supplier";
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  tax_number?: string;
  credit_limit?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// ─── Inventory ─────────────────────────────────────────

export interface Product {
  id: string;
  sku: string;
  name: string;
  unit: string;
  category?: string;
  barcode?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface StockMovement {
  id: string;
  product_id: string;
  warehouse_id: string;
  type: "in" | "out" | "transfer" | "adjustment";
  quantity: number;
  reference_type?: string;
  reference_id?: string;
  notes?: string;
  created_at: string;
}

export interface StockLevel {
  product_id: string;
  warehouse_id: string;
  quantity: number;
}

// ─── Sales ─────────────────────────────────────────────

export interface SaleOrder {
  id: string;
  order_number: string;
  customer_id: string;
  warehouse_id: string;
  status: "draft" | "confirmed" | "completed" | "cancelled";
  lines: SaleOrderLine[];
  total: number;
  created_at: string;
  updated_at: string;
}

export interface SaleOrderLine {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  discount?: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  order_id?: string;
  customer_id: string;
  total: number;
  paid: number;
  status: "unpaid" | "partial" | "paid";
  created_at: string;
}

// ─── Purchases ─────────────────────────────────────────

export interface PurchaseOrder {
  id: string;
  order_number: string;
  supplier_id: string;
  status: "draft" | "confirmed" | "received" | "cancelled";
  lines: PurchaseOrderLine[];
  total: number;
  expected_date?: string;
  created_at: string;
  updated_at: string;
}

export interface PurchaseOrderLine {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface PurchaseReceipt {
  id: string;
  po_id?: string;
  supplier_id: string;
  received_at: string;
  lines: PurchaseReceiptLine[];
  notes?: string;
}

export interface PurchaseReceiptLine {
  product_id: string;
  quantity: number;
}

// ─── Offline / Sync ────────────────────────────────────

export interface SyncItem {
  id: string; // client-generated UUID
  type: string; // "order", "movement", etc.
  method: "POST" | "PUT" | "DELETE";
  endpoint: string;
  payload: Record<string, unknown>;
  status: "pending" | "syncing" | "error";
  created_at: number;
  error?: string;
}

// ─── API Responses ─────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// ─── Access / Subscription ──────────────────────────────

export type AccountScope = "tenant_user" | "platform_admin";

export type TenantRole =
  | "owner"
  | "manager"
  | "accountant"
  | "cashier"
  | "warehouse"
  | "purchasing";

export type FeatureKey =
  | "crm"
  | "inventory"
  | "sales"
  | "purchases"
  | "accounting"
  | "reports"
  | "pos";

export type LimitKey = "max_users" | "max_warehouses" | "monthly_orders";

export interface FeatureCatalogItem {
  key: FeatureKey;
  label: string;
  monthly_price: number;
  description: string;
}

export type FeatureEntitlements = Record<FeatureKey, boolean>;
export type SubscriptionLimits = Record<LimitKey, number>;
export type SubscriptionUsage = Record<LimitKey, number>;

export interface TenantSubscription {
  plan_name: string;
  entitlements: FeatureEntitlements;
  limits: SubscriptionLimits;
  usage: SubscriptionUsage;
  monthly_total: number;
}
