import { Outlet } from "react-router-dom";
import { AppNav } from "@/components/AppNav";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <AppNav />

      <main className="mx-auto max-w-6xl px-6 pb-8">
        <Outlet /> {/* Child pages render here */}
      </main>
    </div>
  );
}
