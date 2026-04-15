import { openDB, type DBSchema } from "idb";
import type { SyncItem } from "@/types";

interface AppDB extends DBSchema {
  syncQueue: {
    key: string;
    value: SyncItem;
  };
  cache: {
    key: string;
    value: { key: string; data: unknown; timestamp: number };
  };
}

const DB_NAME = "syria_erp_db";
const DB_VERSION = 1;

let dbPromise: ReturnType<typeof openDB<AppDB>> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<AppDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        db.createObjectStore("syncQueue", { keyPath: "id" });
        db.createObjectStore("cache", { keyPath: "key" });
      },
    });
  }
  return dbPromise;
}

// ─── Sync Queue ────────────────────────────────────────

export async function getSyncQueue(): Promise<SyncItem[]> {
  const db = await getDB();
  return db.getAll("syncQueue");
}

export async function addToSyncQueue(item: SyncItem): Promise<void> {
  const db = await getDB();
  await db.put("syncQueue", item);
}

export async function removeFromSyncQueue(id: string): Promise<void> {
  const db = await getDB();
  await db.delete("syncQueue", id);
}

export async function clearSyncQueue(): Promise<void> {
  const db = await getDB();
  const tx = db.transaction("syncQueue", "readwrite");
  await tx.objectStore("syncQueue").clear();
}

// ─── Cache ─────────────────────────────────────────────

export async function getCachedData<T>(key: string): Promise<T | null> {
  const db = await getDB();
  const entry = await db.get("cache", key);
  if (!entry) return null;
  // 5 min cache TTL
  if (Date.now() - entry.timestamp > 5 * 60 * 1000) {
    await db.delete("cache", key);
    return null;
  }
  return entry.data as T;
}

export async function setCachedData(key: string, data: unknown): Promise<void> {
  const db = await getDB();
  await db.put("cache", { key, data, timestamp: Date.now() });
}
