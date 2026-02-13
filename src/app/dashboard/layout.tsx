import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppSidebar />
      <div className="lg:pl-64">
        <AppHeader />
        <main className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
