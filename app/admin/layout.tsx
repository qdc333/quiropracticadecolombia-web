import type { Metadata } from "next";
import "../styles/shared.css";
import "./admin.css";

export const metadata: Metadata = {
  title: "Administrador · Quiropráctica de Colombia",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-root">{children}</div>;
}
