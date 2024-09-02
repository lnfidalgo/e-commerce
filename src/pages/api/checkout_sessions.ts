import { NextApiRequest, NextApiResponse } from "next";
import stripe from "@/src/services/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { products } = req.body;
      console.log("produto:", products);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: products.map((product: any) => ({
          price_data: {
            currency: "brl",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price,
          },
          quantity: product.quantity,
        })),
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      res.status(200).json({ id: session.id });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Falha ao ir para o checkout, tente mais tarde." });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
