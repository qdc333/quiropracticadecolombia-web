import Link from "next/link";
import { formatPrice } from "@/lib/content";
import { getOrder } from "@/lib/api";

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return (
      <main className="gracias-page">
        <div className="gracias-card">
          <h1>Pedido no encontrado</h1>
          <Link href="/misiones">Volver a misiones</Link>
        </div>
      </main>
    );
  }

  const paid = order.status === "paid" || order.status === "APPROVED";

  return (
    <main className="gracias-page">
      <div className="gracias-card">
        <h1>{paid ? "¡Pago confirmado!" : "Pedido registrado"}</h1>
        <p>
          Referencia: <strong>{order.id}</strong>
        </p>
        <p>
          Total: <strong>{formatPrice(order.totalCents)}</strong>
        </p>
        <p>
          Estado: <strong>{paid ? "Pagado" : "Pendiente de confirmación"}</strong>
        </p>
        <Link href="/">Volver al inicio</Link>
      </div>
    </main>
  );
}
