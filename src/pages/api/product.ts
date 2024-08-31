import type { NextApiRequest, NextApiResponse } from "next";
import stripe from "../../services/stripe";
import Stripe from "stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const products=await stripe.products.list({
      expand: ['data.default_price']
    })

    const formattedProducts=products.data.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: (product.default_price as Stripe.Price)
    }))
  } catch (e) {}
}
