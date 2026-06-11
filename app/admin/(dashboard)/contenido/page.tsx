import ContentForm from "@/components/admin/ContentForm";

export default function AdminContentPage() {
  return (
    <div className="admin-page">
      <h1>Contenido del sitio</h1>
      <p>Cambios que guardes aquí se verán en la página principal.</p>
      <ContentForm />
    </div>
  );
}
