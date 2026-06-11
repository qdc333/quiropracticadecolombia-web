import Link from "next/link";
import CartPage from "@/components/cart/CartPage";

export const metadata = { title: "Carrito | Quiropráctica de Colombia" };

export default function CarritoRoute() {
  return (
    <main className="missions-page">
      <div className="container">
        <Link href="/misiones" className="missions-breadcrumb">
          ← Seguir comprando
        </Link>
        <CartPage />
      </div>
    </main>
  );
}
