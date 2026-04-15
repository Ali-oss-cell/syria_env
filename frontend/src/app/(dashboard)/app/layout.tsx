import { RouteAccessGuard } from "@/components/access/route-access-guard";

export default function TenantAppLayout({ children }: { children: React.ReactNode }) {
  return <RouteAccessGuard>{children}</RouteAccessGuard>;
}
