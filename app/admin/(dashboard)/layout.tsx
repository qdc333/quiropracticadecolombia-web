import AdminGuard from "@/components/admin/AdminGuard";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="admin-shell">
        <AdminNav />
        <main className="admin-main">{children}</main>
      </div>
    </AdminGuard>
  );
}
