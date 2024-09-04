import { mutation } from "@/convex/_generated/server";
import { query } from "@/convex/_generated/server";
import { v } from "convex/values";

export const addFavorite = mutation({
  args: { productId: v.string() },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) throw new Error("Usuário não autenticado");

    const userId = userIdentity.tokenIdentifier;
    await ctx.db.insert("favorites", {
      userId,
      productId: args.productId,
    });
  },
});



/*export const getFavorites = query(async (ctx) => {
  const userIdentity = await ctx.auth.getUserIdentity();
  if (!userIdentity) throw new Error("Usuário não autenticado");

  const userId = userIdentity.tokenIdentifier;

  return await ctx.db
    .query("favorites")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .collect();
});
*/