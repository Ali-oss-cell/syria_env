"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Minus, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export default function PosPage() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState("زبون عادي");

  const addToCart = (name: string, price: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (existing) {
        return prev.map((i) => (i.name === name ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: Date.now().toString(), name, price, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // Mock products for POS
  const mockProducts = [
    { name: "منتج أ", price: 1000 },
    { name: "منتج ب", price: 2500 },
    { name: "منتج ج", price: 500 },
    { name: "منتج د", price: 7500 },
  ];

  const filtered = mockProducts.filter((p) => p.name.includes(search));

  return (
    <div className="flex h-full">
      {/* Products grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="بحث عن منتج..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9"
            />
          </div>
          <Input
            placeholder="العميل"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="max-w-xs"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <button
              key={p.name}
              onClick={() => addToCart(p.name, p.price)}
              className="flex flex-col items-center justify-center rounded-lg border bg-card p-6 text-center transition-colors hover:bg-muted active:scale-95"
            >
              <span className="font-medium">{p.name}</span>
              <span className="mt-2 text-sm text-muted-foreground">{p.price.toLocaleString()} ل.س</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-96 border-l bg-card flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center justify-between">
            <span>السلة</span>
            <Badge variant="secondary">{cart.reduce((s, i) => s + i.qty, 0)} عناصر</Badge>
          </CardTitle>
        </CardHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {cart.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground text-sm">السلة فارغة</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.price.toLocaleString()} ل.س</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQty(item.id, -1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQty(item.id, 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-4 space-y-3">
          <div className="flex items-center justify-between text-lg font-bold">
            <span>الإجمالي</span>
            <span>{total.toLocaleString()} ل.س</span>
          </div>
          <Button className="w-full" size="lg" disabled={cart.length === 0}>
            إتمام البيع
          </Button>
        </div>
      </div>
    </div>
  );
}
