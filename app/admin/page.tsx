import AdminPanel from "@/components/admin/AdminPanel";
import { isAdminAuthenticated } from "@/lib/auth/session";
import { getSiteContent } from "@/lib/cms/repository";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const content = await getSiteContent();
  return <AdminPanel initialContent={content} />;
}
