"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/content";

type Props = {
  mission: {
    id: string;
    slug: string;
    title: string;
    priceCents: number;
    currency: string;
    imageUrl: string | null;
  };
};

export default function MissionPurchase({ mission }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function addToCart() {
    addItem(
      {
        missionId: mission.id,
        slug: mission.slug,
        title: mission.title,
        priceCents: mission.priceCents,
        imageUrl: mission.imageUrl,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="mission-buy">
      <p className="mission-buy__price">{formatPrice(mission.priceCents, mission.currency)}</p>

      <div className="mission-buy__qty">
        <span>Cantidad</span>
        <div className="qty-control">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Menos">
            −
          </button>
          <span>{qty}</span>
          <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Más">
            +
          </button>
        </div>
      </div>

      <button type="button" className="btn btn--primary btn--block" onClick={addToCart}>
        Agregar al carrito
      </button>

      {added && <p className="mission-buy__ok">Agregado. <Link href="/carrito">Ir al carrito</Link></p>}
    </div>
  );
}
