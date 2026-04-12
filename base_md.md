# ERP SaaS (Accounting + Inventory)

**Master project document** — scope, architecture, modules, offline design, and delivery phases.

**Stack:** **Laravel** (REST API) · **Next.js** (web app) · **PostgreSQL** (database).

**Website (pages, POS, flows):** see **`website.md`**.

---

## Contents

- [1. Vision](#1-vision) — product intent and market  
- [2. Core principles](#2-core-principles) — non‑negotiables  
- [3. System architecture](#3-system-architecture) — stack and shape  
- [4. Module breakdown](#4-module-breakdown) — backend domains  
- [5. Offline system design](#5-offline-system-design) — local data and sync  
- [6. Data flow](#6-data-flow) — sales and sync paths  
- [7. API design principles](#7-api-design-principles) — REST conventions  
- [8. Security](#8-security) — auth and access  
- [9. Performance strategy](#9-performance-strategy) — speed and scale  
- [10. UI and UX guidelines](#10-ui-and-ux-guidelines) — product feel  
- [11. Deployment](#11-deployment) — hosting  
- [12. Roadmap](#12-roadmap) — phased delivery  
- [13. Future enhancements](#13-future-enhancements) — later bets  
- [14. Team workflow](#14-team-workflow) — how we build  
- [15. Notes](#15-notes) — reminders  

---

## 1. Vision

Build an ERP for **SMEs** that covers accounting (double‑entry), **multi‑warehouse** inventory, **sales** (POS + invoices), **purchases**, **CRM** (customers and suppliers), and **offline‑first** operation.

> **Market:** Syria — expect **low bandwidth** and **unstable connectivity**; the product must stay usable when the network drops.

**Localization** (decide early with stakeholders):

| Topic | Direction |
|:------|:----------|
| UI | RTL where needed; Arabic‑first wording on critical screens |
| Numbers & dates | Locale‑aware formats |
| Money & tax | Default currency, VAT / legal invoice fields — confirm with real businesses |

---

## 2. Core Principles

| Principle | What it means |
|:----------|:----------------|
| **Offline first** | App works without internet; data in **IndexedDB** (web) / **SQLite** (mobile later); sync when back online |
| **Multi‑tenant SaaS** | Every row scoped by **`company_id`**; no cross‑tenant leakage |
| **Accuracy first** | Stock from **movements** only; books via **double‑entry** |
| **Performance** | POS feels instant; batch and cache to **minimize API calls** |

---

## 3. System Architecture

The product is a **Laravel** backend consumed by a **Next.js** frontend.

| Layer | Choice | Notes |
|:------|:-------|:------|
| **API** | Laravel | REST only; **modular monolith** |
| **Web app** | Next.js | App Router or Pages as you prefer; dashboard UI; **RTL**; offline cache |
| **Database** | PostgreSQL | Single source of truth on server |

**Backend modules (logical boundaries):**

`Auth` → `Users & Roles` → `CRM` → `Inventory` → `Sales` · `Purchases` → `Accounting` → `Reports`

---

## 4. Module Breakdown

| # | Module | One‑line purpose |
|:--|:-------|:-----------------|
| 4.1 | **Auth** | Identity, tokens, company membership |
| 4.2 | **Users & Roles** | RBAC and permissions |
| 4.3 | **CRM** | Customer & supplier master data for sales/purchases |
| 4.4 | **Inventory** | Products, warehouses, movements (no “stored qty” shortcut) |
| 4.5 | **Sales** | Orders, POS, invoices |
| 4.6 | **Purchases** | POs, receipt, stock‑in |
| 4.7 | **Accounting** | CoA, journals, ledger |
| 4.8 | **Reports** | Sales, P&L, stock, receivables/payables |

### 4.1 Auth

- Login / register  
- Token management (**Sanctum**)  
- **Company** assignment  

### 4.2 Users & Roles

- Role‑based access control (**RBAC**)  
- Fine‑grained **permissions**  

### 4.3 CRM

- **Party** master data: customers and suppliers (contacts, credit terms where needed)  
- **Single reference** for Sales and Purchases — avoid duplicate one‑off parties per module  

### 4.4 Inventory

- Products, **warehouses**, **stock movements**  
- **Rules:** never persist “on hand” as the source of truth; **derive** from movements  

### 4.5 Sales

- Orders, **POS**, **invoices**  
- **Flow:** create order (customer from CRM) → **movement** out → **journal** (revenue; add **COGS / inventory** when costing is on)  

### 4.6 Purchases

- **Purchase orders**, goods **receipt**, stock **in** via movements  
- Suppliers linked to **CRM**  

### 4.7 Accounting

- Chart of accounts, **journal entries**, **ledger**  
- **Rules:** every entry balances (**debit = credit**); operational events map to balanced lines, including **inventory valuation** when implemented  

### 4.8 Reports

- Daily sales, profit, stock, and **debt** (AR/AP) views  

---

## 5. Offline System Design

### 5.1 Local storage

| | |
|:--|:--|
| **Web** | IndexedDB |
| **Mobile (later)** | SQLite |
| **Typical payloads** | Products, customers/parties, **pending** orders and mutations |

### 5.2 Sync strategy

| State | Behavior |
|:------|:---------|
| **Offline** | Persist actions locally; mark `pending_sync` |
| **Online** | Push queue; pull server changes; **resolve conflicts** |

### 5.3 Conflict handling

- Start with **last write wins**  
- Evolve toward **versioning** / vector clocks if needed  

### 5.4 Multi‑tenant & reliable sync

- Scope caches and queues by **`company_id`** (and session where relevant)  
- Prefer **idempotent** APIs (e.g. client **UUID** for entities born offline) so retries do not duplicate rows  
- Define **ordering** for merges: server timestamps or per‑company monotonic sequence  

---

## 6. Data Flow

**Sales**

1. User creates an order (offline OK → stored locally).  
2. On sync, server validates, moves stock, posts accounting.  

**Sync**

1. Detect connectivity.  
2. **Push** local changes in **dependency order** (e.g. party before order).  
3. **Pull** updates for the **active company**.  

---

## 7. API Design Principles

| Topic | Convention |
|:------|:-----------|
| Style | **REST**, JSON bodies and responses |
| Version | Prefix **`/api/v1/`** |
| Examples | `GET /products` · `POST /orders` |

---

## 8. Security

- **Auth tokens** (short‑lived where possible)  
- **Validate** all inputs server‑side  
- Enforce **RBAC** on every sensitive route  

---

## 9. Performance Strategy

- **Cache** hot reads (e.g. product catalog)  
- **Queues** for heavy or async work  
- **Indexes** on foreign keys and common filters  

---

## 10. UI and UX Guidelines

- **Fast** navigation; shallow paths for POS  
- **Keyboard** shortcuts on POS  
- Clear, **simple Arabic** UI alongside RTL layout  

---

## 11. Deployment

| Piece | Target |
|:------|:-------|
| API | VPS (e.g. **DigitalOcean**) |
| Database | **PostgreSQL** (managed or co‑located) |

---

## 12. Roadmap

Phases are ordered so **catalog + stock movements** exist before **POS and purchase receipt** depend on them.

| Phase | Scope |
|:------|:------|
| **1** | Auth, users & roles · **CRM** MVP · products, warehouses, **movements** |
| **2** | **Sales** (POS + invoices) and **purchases** (PO + receipt) on top of CRM + inventory |
| **3** | **Accounting** — CoA, journals, links from operations |
| **4** | **Reports** |

---

## 13. Future Enhancements

- Native **mobile** app  
- **AI**‑assisted analytics (forecasting, anomalies)  
- **Integrations** (payments, e‑invoicing, carriers)  

---

## 14. Team Workflow

- **Backend:** API contracts, domain logic, database  
- **Frontend (Next.js):** UI, client state, offline layer  
- **Cadence:** weekly milestones and demos  

---

## 15. Notes

- Ship a **simple** vertical slice first; validate with **real users**  
- **Scale** features and tenancy gradually  
- Capture **Syrian fiscal and invoice rules** before freezing accounting and PDF invoice templates  
