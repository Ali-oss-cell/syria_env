# Laravel Backend Architecture — Multi-Tenant SaaS ERP

## 1) Purpose of this document

This document defines the backend architecture for the ERP SaaS using Laravel.  
It focuses on:

- Multi-tenant isolation (company-level data boundaries)
- Authentication and authorization
- Tenant-level roles and permissions
- Subscription and feature access control
- API design, security, and operational standards

This is a backend blueprint intended to guide implementation and team alignment.

---

## 2) Product context (backend view)

The system serves multiple companies (tenants) on one SaaS platform.

Each tenant may enable different modules:

- CRM
- Inventory
- Sales
- Purchases
- Accounting
- Reports
- POS

A user can only access:

1. What their tenant subscribed to
2. What their role allows inside that tenant

Final access rule:

`allowed = tenant_subscription_entitlement AND role_permission`

---

## 3) Core architecture decisions

### 3.1 Laravel style

- Laravel API-only backend (no server-rendered blade UI for app logic)
- Modular monolith structure (domain modules separated in code, same deployment unit)
- Versioned REST API (`/api/v1/...`)

### 3.2 Multi-tenancy strategy

Use **single database, shared schema**, tenant isolation by `tenant_id` (company id) on all tenant-owned entities.

Why:

- Simpler operations at early stage
- Good balance for SME scale
- Easy to evolve into stronger isolation later (schema-per-tenant / db-per-tenant)

### 3.3 Auth strategy

- Laravel Sanctum for token-based auth
- Tenant context resolved per request
- Strict server-side authorization for every endpoint

---

## 4) Tenant model explained

### 4.1 Platform vs tenant scope

Two account scopes exist:

1. **Platform scope** (General Admin)
   - Internal team account
   - Can manage tenants, subscriptions, support actions
   - Not a normal tenant user

2. **Tenant scope** (customer company users)
   - Belongs to one or more tenants
   - Works within tenant boundaries only

### 4.2 Tenant boundaries

Every tenant-owned table includes `tenant_id`.

Examples:

- users_tenants (membership table)
- parties (customers/suppliers)
- products
- warehouses
- stock_movements
- sale_orders, invoices
- purchase_orders, receipts
- journal_entries, journal_lines

Query rule:

- Never query tenant data without `tenant_id` constraint
- Enforce in repository/model scope + policy checks

### 4.3 Optional multi-tenant membership per user

Support user membership in multiple tenants through pivot table:

- `tenant_user`
  - `tenant_id`
  - `user_id`
  - `role_id`
  - `status`

Request must always resolve one active tenant context.

---

## 5) Identity, auth, and session model

### 5.1 Authentication flow

1. User logs in with credentials
2. Backend validates credentials
3. Return Sanctum token + allowed tenant list + effective capabilities snapshot
4. Client selects active tenant (if >1)
5. All API calls include token; backend resolves token user + active tenant

### 5.2 Recommended token handling

- Sanctum personal access tokens
- Short token TTL policy (or revocation strategy)
- Revoke tokens on logout/password reset/security events

### 5.3 Context headers

Use header or body field for selected tenant when needed:

- `X-Tenant-Id: <uuid>`

Server validates user membership in that tenant before processing.

---

## 6) Authorization model (critical)

Authorization has 3 gates:

1. **Scope gate**: platform admin vs tenant user area
2. **Subscription gate**: tenant has feature enabled
3. **Permission gate**: role can perform action

If any gate fails -> deny.

### 6.1 Roles inside tenant

Suggested baseline roles:

- owner
- manager
- accountant
- cashier
- warehouse
- purchasing

### 6.2 Permission granularity

Use action-based permissions:

- `crm.read`, `crm.write`
- `inventory.read`, `inventory.adjust`
- `sales.read`, `sales.create`, `sales.cancel`
- `purchases.read`, `purchases.create`
- `accounting.read`, `accounting.post_journal`
- `reports.read`
- `settings.company.manage`
- `users.manage`

### 6.3 Owner-only controls

Tenant owner can manage:

- Company settings
- Tenant-level role assignment
- Optional permission overrides

Keep strict audit logs for these actions.

---

## 7) Subscription and entitlement model

### 7.1 Why separate subscription from role

Roles answer: "what can this user do?"  
Subscription answers: "what did this tenant pay for?"

Both must pass.

### 7.2 Suggested tables

- `plans`
  - id, code, name, base_price
- `features`
  - id, key, name
- `plan_features`
  - plan_id, feature_id, enabled
- `tenant_subscriptions`
  - tenant_id, plan_id, status, starts_at, ends_at
- `tenant_feature_overrides` (optional)
  - tenant_id, feature_id, enabled
- `subscription_limits`
  - tenant_id, key, value (e.g. max_users)

### 7.3 Effective entitlements calculation

`effective_features = plan_features + tenant_feature_overrides`

Cache this per tenant for performance and invalidate on billing/subscription changes.

---

## 8) Suggested data model (high-level)

### 8.1 Core entities

- `tenants`
- `users`
- `tenant_user`
- `roles`
- `permissions`
- `role_permissions`

### 8.2 Domain entities

- CRM: `parties`
- Inventory: `products`, `warehouses`, `stock_movements`
- Sales: `sale_orders`, `sale_order_lines`, `invoices`
- Purchases: `purchase_orders`, `purchase_order_lines`, `purchase_receipts`
- Accounting: `accounts`, `journal_entries`, `journal_lines`

All tenant-owned records include:

- `tenant_id`
- audit fields (`created_by`, `updated_by` where relevant)

---

## 9) API standards

### 9.1 Endpoint style

- RESTful conventions
- Prefix with `/api/v1`
- Consistent resource naming

Examples:

- `GET /api/v1/products`
- `POST /api/v1/sales/orders`
- `POST /api/v1/accounting/journals`

### 9.2 Response contract

Use consistent envelopes:

- success payload
- pagination meta for lists
- standardized error object

### 9.3 Error codes

- `401` unauthenticated
- `403` authenticated but forbidden (role/subscription/scope)
- `404` not found in tenant scope
- `422` validation
- `409` conflict (sync/idempotency/resource state)

---

## 10) Security controls

### 10.1 Data isolation

- Mandatory tenant scoping middleware
- Policy checks for model access
- Never trust client-sent role/feature flags

### 10.2 Input and domain validation

- Laravel Form Requests per endpoint
- Domain-level business validation in services/actions

### 10.3 Auditability

Track security-sensitive actions:

- role changes
- feature toggles
- subscription changes
- accounting postings

Audit fields:

- actor user id
- tenant id
- action key
- before/after snapshot (when needed)
- timestamp

### 10.4 Platform admin safeguards

- MFA required
- restricted account creation
- explicit impersonation flow with audit trail

---

## 11) Offline + sync backend contract

Frontend is offline-first, so backend must support safe sync.

### 11.1 Idempotency

For create operations from offline queue:

- Accept client-generated UUIDs or idempotency keys
- Repeated request with same key should not duplicate data

### 11.2 Ordering and conflicts

- Process dependent entities in correct order
- Use conflict responses (`409`) with enough metadata for client resolution

### 11.3 Sync endpoints (optional pattern)

- `POST /sync/push` for batched mutations
- `GET /sync/pull?since=<cursor>` for updates

Cursor must be tenant-scoped.

---

## 12) Module contracts (Laravel implementation guidance)

### 12.1 CRM

- CRUD for parties (customer/supplier type)
- Validation for required identifiers
- Soft delete where appropriate

### 12.2 Inventory

- Product and warehouse management
- Stock is **derived from movements**, not mutable stock value field
- Movement types and reference links required

### 12.3 Sales

- Order lifecycle state machine
- Invoice generation hook
- Accounting hook trigger (asynchronous if needed)

### 12.4 Purchases

- PO lifecycle
- Receipt updates stock via movements
- Supplier consistency checks

### 12.5 Accounting

- Chart of accounts hierarchy
- Journal entry posting with balanced lines required
- Reject unbalanced transactions

### 12.6 Reports

- Read-only aggregate endpoints
- Permission and feature checks per report family

---

## 13) Recommended Laravel code organization

Example structure:

- `app/Modules/Auth/...`
- `app/Modules/Tenants/...`
- `app/Modules/CRM/...`
- `app/Modules/Inventory/...`
- `app/Modules/Sales/...`
- `app/Modules/Purchases/...`
- `app/Modules/Accounting/...`
- `app/Modules/Reports/...`
- `app/Modules/Billing/...`

Cross-cutting:

- `app/Http/Middleware/TenantContextMiddleware.php`
- `app/Policies/...`
- `app/Support/Authorization/...`
- `app/Support/Entitlements/...`

---

## 14) Middleware and policy pipeline

Suggested request pipeline for tenant routes:

1. `auth:sanctum`
2. `resolve.tenant.context`
3. `verify.tenant.membership`
4. `check.subscription.feature:<feature>`
5. permission/policy check in controller/action

Platform routes:

1. `auth:sanctum`
2. `ensure.platform.admin`
3. action-specific policy

---

## 15) Performance strategy (backend)

- Index `tenant_id` + common filters
- Use eager loading to avoid N+1
- Cache stable reference data by tenant
- Queue heavy jobs (report generation, recalculations)
- Add DB constraints for data correctness

---

## 16) Testing strategy

### 16.1 Must-have tests

- Tenant isolation tests (cross-tenant access denied)
- Role permission tests
- Subscription entitlement tests
- Combined gate tests (role + feature)
- Owner-only settings tests

### 16.2 Accounting critical tests

- Balanced journal enforcement
- Stock movement to accounting linkage rules

### 16.3 Security tests

- token misuse
- tenant header tampering
- platform route access from tenant users

---

## 17) Operational considerations

- Environment-specific secrets management
- Queue worker monitoring
- structured logs with tenant/user correlation ids
- backup and restore procedure
- migration strategy with zero-downtime principles

---

## 18) Implementation phases (backend)

### Phase A — Foundation

- Tenant, user membership, roles/permissions, auth
- Entitlement tables and feature middleware

### Phase B — Core modules

- CRM + Inventory + Sales + Purchases
- Owner-only company settings and user management

### Phase C — Accounting

- Accounts, journals, posting rules
- Integration hooks from sales/purchases

### Phase D — Reports and hardening

- Report APIs
- performance and audit expansion

---

## 19) Open decisions to finalize

- Single currency vs multi-currency timeline
- Tax/VAT model specifics for Syrian market
- Exact plan catalog and billing cycle
- Whether manager can edit users in v1
- Impersonation rules for platform admin

---

## 20) Summary

This backend model ensures:

- Strong tenant isolation
- Clear separation between platform admin and tenant users
- Reliable auth and permission checks
- Subscription-aware access control
- Scalable modular Laravel implementation path

It is designed to match the frontend access model already implemented while keeping backend security as the source of truth.
