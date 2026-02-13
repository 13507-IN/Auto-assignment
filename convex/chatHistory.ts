import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const insert = mutation({
  args: {
    user_id: v.string(),
    message: v.string(),
    response: v.string(),
    context: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("chat_history", {
      user_id: args.user_id,
      message: args.message,
      response: args.response,
      context: args.context,
      created_at: new Date().toISOString(),
    });

    return await ctx.db.get(id);
  },
});

export const updateResponse = mutation({
  args: {
    user_id: v.string(),
    message: v.string(),
    response: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("chat_history")
      .withIndex("by_user_id", (q) => q.eq("user_id", args.user_id))
      .collect();

    const match = existing.find((entry) => entry.message === args.message);
    if (!match) {
      return { updated: false };
    }

    await ctx.db.patch(match._id, { response: args.response });
    return { updated: true };
  },
});
