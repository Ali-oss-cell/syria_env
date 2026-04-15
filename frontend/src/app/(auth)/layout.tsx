import { redirect } from "next/navigation";

export default function AuthPage({ children }: { children: React.ReactNode }) {
  // TODO: check if already authenticated, redirect to /app
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <div className="w-full max-w-md px-4">{children}</div>
    </div>
  );
}
