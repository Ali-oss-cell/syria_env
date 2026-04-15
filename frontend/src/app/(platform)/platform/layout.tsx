import { ScopeGuard } from "@/components/access/scope-guard";
import { PlatformSidebar } from "@/components/layout/platform-sidebar";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <ScopeGuard expectedScope="platform_admin">
      <div className="flex min-h-screen">
        <PlatformSidebar />
        <main className="flex-1 overflow-y-auto pr-64 max-md:pr-0">
          <div className="mx-auto max-w-7xl p-6">{children}</div>
        </main>
      </div>
    </ScopeGuard>
  );
}
