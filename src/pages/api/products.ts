import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import stripe from "../../services/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });

    const formattedProducts = products.data.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: (product.default_price as Stripe.Price).unit_amount,
      currency: (product.default_price as Stripe.Price).currency,
      images: product.images,
    }));
    res.status(200).json({ products: formattedProducts });
  } catch (error) {
    res.status(500).json({ error: "Não foi possível receber produtos." });
  }
}
