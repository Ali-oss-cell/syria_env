import { useCallback, useEffect } from "react";
import { useAppStore } from "@/store/app";
import { useOnlineStatus } from "./use-online-status";
import { api } from "@/lib/api";
import { getSyncQueue, removeFromSyncQueue } from "@/db/indexeddb";
import type { SyncItem } from "@/types";

export function useSyncQueue() {
  const { syncQueue, removeFromQueue, clearQueue, updateQueueItem } = useAppStore();
  const isOnline = useOnlineStatus();
  const isSyncing = syncQueue.some((item) => item.status === "syncing");

  const sync = useCallback(async () => {
    if (!isOnline || isSyncing) return;

    const pending = syncQueue.filter((item) => item.status === "pending");
    if (pending.length === 0) return;

    // Process in dependency order: parties first, then orders, etc.
    const order = ["party", "product", "warehouse", "order", "invoice", "receipt", "movement"];

    const sorted = [...pending].sort((a, b) => {
      const aIdx = order.findIndex((t) => a.type.includes(t));
      const bIdx = order.findIndex((t) => b.type.includes(t));
      return (aIdx === -1 ? order.length : aIdx) - (bIdx === -1 ? order.length : bIdx);
    });

    for (const item of sorted) {
      updateQueueItem(item.id, { status: "syncing" });

      try {
        await api.request({
          method: item.method,
          url: item.endpoint,
          data: item.payload,
        });
        await removeFromSyncQueue(item.id);
        removeFromQueue(item.id);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Sync failed";
        updateQueueItem(item.id, { status: "error", error: message });
      }
    }
  }, [isOnline, isSyncing, syncQueue, updateQueueItem, removeFromQueue]);

  // Auto-sync when online
  useEffect(() => {
    if (isOnline) {
      sync();
    }
  }, [isOnline, sync]);

  return {
    sync,
    isSyncing,
    pendingCount: syncQueue.filter((i) => i.status === "pending").length,
    errorCount: syncQueue.filter((i) => i.status === "error").length,
    queue: syncQueue,
  };
}
