import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    user_id: v.string(),
    type: v.optional(
      v.union(
        v.literal("reminder"),
        v.literal("study_plan"),
        v.literal("assignment"),
        v.literal("general")
      )
    ),
    message: v.string(),
    sent_at: v.optional(v.string()),
    status: v.optional(
      v.union(v.literal("pending"), v.literal("sent"), v.literal("failed"))
    ),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("notifications", {
      user_id: args.user_id,
      type: args.type,
      message: args.message,
      sent_at: args.sent_at,
      status: args.status ?? "pending",
      created_at: new Date().toISOString(),
    });

    return await ctx.db.get(id);
  },
});
