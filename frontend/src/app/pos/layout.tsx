import { redirect } from "next/navigation";

export default function PosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col" dir="rtl">
      {/* Minimal top bar */}
      <header className="flex h-12 items-center justify-between border-b bg-card px-4">
        <a href="/app/home" className="text-sm font-medium hover:underline">
          ← العودة للوحة التحكم
        </a>
        <h1 className="text-base font-semibold">نقطة البيع</h1>
        <div className="w-32" /> {/* spacer */}
      </header>
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
