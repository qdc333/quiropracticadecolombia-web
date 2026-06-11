"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/content";
import { getApiUrl } from "@/lib/api";

export default function CartPage() {
  const { items, setQuantity, removeItem, totalCents, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function checkout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);

    const res = await fetch(`${getApiUrl()}/api/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: fd.get("name"),
        customerEmail: fd.get("email"),
        customerPhone: fd.get("phone"),
        items: items.map((i) => ({
          missionId: i.missionId,
          title: i.title,
          priceCents: i.priceCents,
          quantity: i.quantity,
        })),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      setError(data.error || "Error al procesar el pedido");
      return;
    }

    if (data.paymentUrl) {
      clear();
      window.location.href = data.paymentUrl;
      return;
    }

    setLoading(false);
    setError("No se recibió la URL de pago.");
  }

  if (items.length === 0) {
    return (
      <div className="cart-page cart-page--empty">
        <h1>Tu carrito está vacío</h1>
        <Link href="/misiones" className="btn btn--primary">
          Ver misiones
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Carrito</h1>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.missionId} className="cart-item">
            {item.imageUrl && <img src={item.imageUrl} alt="" />}
            <div>
              <Link href={`/misiones/${item.slug}`}>{item.title}</Link>
              <p>{formatPrice(item.priceCents)}</p>
            </div>
            <div className="qty-control">
              <button type="button" onClick={() => setQuantity(item.missionId, item.quantity - 1)}>−</button>
              <span>{item.quantity}</span>
              <button type="button" onClick={() => setQuantity(item.missionId, item.quantity + 1)}>+</button>
            </div>
            <button type="button" className="cart-remove" onClick={() => removeItem(item.missionId)}>Quitar</button>
          </li>
        ))}
      </ul>
      <p className="cart-total">Total: <strong>{formatPrice(totalCents)}</strong></p>
      <form className="checkout-form" onSubmit={checkout}>
        <h2>Datos para el pago</h2>
        <p className="checkout-note">Serás redirigido a la pasarela segura de Wompi.</p>
        <label>Nombre completo *<input name="name" required /></label>
        <label>Correo *<input name="email" type="email" required /></label>
        <label>Teléfono / WhatsApp *<input name="phone" required /></label>
        {error && <p className="checkout-error">{error}</p>}
        <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
          {loading ? "Preparando pago…" : "Pagar con Wompi"}
        </button>
      </form>
    </div>
  );
}
