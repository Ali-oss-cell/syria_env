# Website & app surfaces — build spec

Companion to **`base_md.md`** (architecture and domain rules). This document describes **what to build in the Next.js web product**: areas, pages, flows, and UX expectations.

**Stack reminder:** Next.js (UI) talks to **Laravel** REST API; **PostgreSQL** is server-side only.

---

## Contents

- [1. What this website is](#1-what-this-website-is)
- [2. Who uses it](#2-who-uses-it)
- [3. Site map (high level)](#3-site-map-high-level)
- [4. Public & auth surfaces](#4-public--auth-surfaces)
- [5. Authenticated app shell](#5-authenticated-app-shell)
- [6. Module → pages & features](#6-module--pages--features)
- [7. POS (dedicated experience)](#7-pos-dedicated-experience)
- [8. Cross‑cutting UI](#8-cross-cutting-ui)
- [9. What to build by phase](#9-what-to-build-by-phase)
- [10. Out of scope (initial web)](#10-out-of-scope-initial-web)

---

## 1. What this website is

| Aspect | Description |
|:-------|:------------|
| **Primary job** | Day‑to‑day operations for a **company** on the SaaS: stock, sales, purchases, parties, later books and reports |
| **Form** | **Responsive web app** (desktop-first for back office; POS usable on tablet / large phone where needed) |
| **Locale** | **RTL** and **Arabic-first** on critical paths; numbers, dates, and currency formatted for the active locale |
| **Connectivity** | **Offline-capable** where the product promises it: cache + queue + clear **sync / connection** status |

---

## 2. Who uses it

| Role (example) | Typical surfaces |
|:----------------|:-----------------|
| **Owner / admin** | Company setup, users, roles, CoA (later), reports |
| **Cashier / seller** | **POS**, quick customer pick, invoices |
| **Warehouse** | Products, warehouses, movements, receiving |
| **Purchasing** | Suppliers, POs, receipts |
| **Accountant** (later) | Journals, ledger, reconciliation views |

Permissions come from **RBAC**; hide or disable routes the user cannot access.

---

## 3. Site map (high level)

```text
/                          → marketing home (optional v1) or redirect to /login
/login, /register          → auth
/forgot-password           → recovery (when implemented)

/app (or /dashboard)       → authenticated shell
  …/home                     → dashboard summary (KPIs / shortcuts)
  …/sync                     → sync queue / status (or global widget only)

  …/crm/customers          → list, detail, create/edit
  …/crm/suppliers          → list, detail, create/edit

  …/inventory/products     → list, detail, create/edit
  …/inventory/warehouses   → list, detail
  …/inventory/movements    → list, filters, new movement / transfer

  …/sales/orders           → list, detail, create/edit
  …/sales/invoices         → list, detail, print/PDF (when ready)

  …/purchases/orders       → PO list, detail, create/edit
  …/purchases/receipts     → receive goods, link to PO

  …/accounting/accounts    → chart of accounts (phase 3)
  …/accounting/journals    → list, entry (phase 3)
  …/accounting/ledger      → account ledger (phase 3)

  …/reports/*              → report hub + individual reports (phase 4)

  …/settings/company       → company profile, tax IDs, etc.
  …/settings/users         → users list, invite, roles
  …/settings/me            → profile, password, language

/pos                       → fullscreen POS (may live inside shell or separate layout)
```

Exact URL prefixes are a **project convention**; the important part is **which screens exist** and **how they group**.

---

## 4. Public & auth surfaces

| Page / flow | Purpose | Notes |
|:------------|:--------|:------|
| **Login** | Email/username + password; optional “remember” | Token storage aligned with Sanctum / your auth plan |
| **Register** | New tenant signup: company + first user | May be invite-only later; product decision |
| **Forgot password** | Reset email / SMS | Depends on what you enable in Laravel |
| **Marketing home** (optional) | Explain product, pricing, contact | Can be minimal or deferred until you need SEO |

After login, user picks or lands in **one active company** (if multi-company per user is supported).

---

## 5. Authenticated app shell

Build **once**, reuse everywhere (except POS if you choose fullscreen):

| Element | Behavior |
|:--------|:---------|
| **Main navigation** | Grouped: Dashboard, CRM, Inventory, Sales, Purchases, Accounting (later), Reports (later), Settings |
| **Company context** | Visible **active company**; switcher if user has multiple |
| **User menu** | Profile, logout, language (if multi-locale) |
| **Connection badge** | Online / offline / syncing; link to **sync queue** if you expose a full page |
| **Layout** | Sidebar or top nav; **RTL** mirror of LTR patterns |

**Dashboard (home):** shortcuts to common actions (new sale, receive stock), small widgets (today sales, low stock alerts — as APIs exist), and **pending sync** count when offline queue is non-empty.

---

## 6. Module → pages & features

### CRM

| Screen | Actions |
|:-------|:--------|
| **Customers list** | Search, filter, pagination, open detail |
| **Customer detail** | Contact, credit terms, link to sales history (when available) |
| **Customer create/edit** | Form validation; support creating quickly from POS |
| **Suppliers list / detail / form** | Same pattern as customers |

### Inventory

| Screen | Actions |
|:-------|:--------|
| **Products** | SKU, name, unit, barcode (optional), categories, active flag; show **computed qty** per warehouse (from movements) |
| **Warehouses** | Name, code, address notes |
| **Movements** | List with filters (date, warehouse, product); **new** adjustment / transfer / issue / receipt as your domain allows |
| **Stock view** | Per product: breakdown by warehouse (read-only derived) |

### Sales

| Screen | Actions |
|:-------|:--------|
| **Orders** | Create from cart-like flow or table; line items; customer; warehouse; status |
| **Order detail** | Lines, totals, link to invoice if generated |
| **Invoices** | List, detail, **print-friendly** / PDF when templates exist |

### Purchases

| Screen | Actions |
|:-------|:--------|
| **Purchase orders** | Supplier, lines, expected dates, status |
| **Receipt / goods in** | Receive against PO or ad-hoc; creates **inbound movements** |

### Accounting (later)

| Screen | Actions |
|:-------|:--------|
| **Chart of accounts** | Tree or table; account types |
| **Journal entries** | Balanced lines; optional link to source document |
| **Ledger** | Filter by account and period |

### Reports (later)

| Screen | Actions |
|:-------|:--------|
| **Hub** | Tiles or list for each report |
| **Each report** | Filters (date range, warehouse), export CSV/PDF when needed |

### Settings

| Screen | Actions |
|:-------|:--------|
| **Company** | Legal name, logo, tax IDs, default warehouse (optional) |
| **Users & roles** | List users, assign roles, invite |
| **My profile** | Name, password, preferences |

---

## 7. POS (dedicated experience)

POS is **speed-first** and may use a **separate layout** (minimal chrome, large touch targets).

| Area | Requirements |
|:-----|:-------------|
| **Product pick** | Search, barcode (if hardware), categories, **fast add to cart** |
| **Cart** | Qty, discount (if in scope), line totals, **keyboard shortcuts** where possible |
| **Customer** | Optional quick attach; **walk-in** default |
| **Payment** | Methods you support (cash, deferred, split — product decision) |
| **Checkout** | Creates order + stock movement + accounting hooks per `base_md.md` |
| **Offline** | Queue sales locally; show **clear state**: queued vs sent, errors on sync |

---

## 8. Cross‑cutting UI

| Concern | Implementation notes |
|:--------|:---------------------|
| **Forms** | Client validation + server errors surfaced inline |
| **Lists** | Consistent filters, empty states, loading skeletons |
| **Errors** | 401 → login; 403 → forbidden; network fail → offline messaging |
| **Printing** | Invoice / receipt layouts: start web print; PDF later |
| **Accessibility** | Focus order, labels; RTL must not break semantics |
| **Performance** | Virtualize long lists; lazy load heavy tabs |

---

## 9. What to build by phase

Aligned with **`base_md.md` §12 Roadmap**.

| Phase | Website deliverables |
|:------|:---------------------|
| **1** | Auth pages, app shell, **Settings** (company, users/roles MVP), **CRM** (customers + suppliers), **Inventory** (products, warehouses, movements + stock views) |
| **2** | **POS**, **Sales** (orders, invoices UI), **Purchases** (PO + receipt flows); sync/offline polish on sell and receive paths |
| **3** | **Accounting** surfaces (CoA, journals, ledger) wired to API |
| **4** | **Reports** hub and individual report pages |

---

## 10. Out of scope (initial web)

- Native **mobile app** (separate from this spec)
- **Marketing site** complexity (blog, CMS) unless you explicitly add it
- **Third-party integrations** UI until listed in roadmap

---

## Related document

- **`base_md.md`** — backend modules, offline model, API style, security, and roadmap context.
