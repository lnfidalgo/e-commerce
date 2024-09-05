import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

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

export const getFavorites = query(async (ctx) => {
  const userIdentity = await ctx.auth.getUserIdentity();
  if (!userIdentity) throw new Error("Usuário não autenticado");

  const userId = userIdentity.tokenIdentifier;

  return await ctx.db
    .query("favorites")
    .filter((q) => q.and(q.eq(q.field("userId"), userId)))
    .collect();
});

export const removeFavorite = mutation({
  args: { productId: v.id("favorites") },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) throw new Error("Usuário não autenticado");

    await ctx.db.delete(args.productId);
  },
});
