import SidebarAdmin from "@/components/SidebarAdmin";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      
      <SidebarAdmin />

      
      <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
    </div>
  );
}
