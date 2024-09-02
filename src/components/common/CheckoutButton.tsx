import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export default function CheckoutButton({ product }: any) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const stripe = await stripePromise;
    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: [
          {
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ],
      }),
    });

    const session = await response.json();

    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (error) {
        console.error("Erro no checkout", error);
      }
    }

    setLoading(false);
  };
  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className="hidden lg:flex max-w-[560px] p-6 text-xl uppercase bg-orange-500 hover:bg-orange-500/90"
    >
      {loading ? "Carregando..." : "Pagar com Stripe"}
    </Button>
  );
}
