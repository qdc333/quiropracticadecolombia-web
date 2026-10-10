import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { Suspense } from "react";

export default function AdminLoginPage() {
  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <h1>Acceso administrador</h1>
        <p>Solo personal autorizado. Este panel no aparece en el sitio público.</p>
        <Suspense fallback={<p>Cargando…</p>}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </main>
  );
}
