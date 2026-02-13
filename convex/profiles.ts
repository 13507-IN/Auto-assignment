import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getByUserId = query({
  args: { user_id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("user_id", args.user_id))
      .unique();
  },
});

export const createIfMissing = mutation({
  args: {
    user_id: v.string(),
    email: v.string(),
    full_name: v.optional(v.string()),
    role: v.optional(
      v.union(v.literal("student"), v.literal("teacher"), v.literal("admin"))
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("user_id", args.user_id))
      .unique();

    if (existing) {
      return existing;
    }

    const now = new Date().toISOString();
    const id = await ctx.db.insert("profiles", {
      user_id: args.user_id,
      email: args.email,
      full_name: args.full_name,
      role: args.role ?? "student",
      created_at: now,
      updated_at: now,
    });

    return await ctx.db.get(id);
  },
});

export const updateRole = mutation({
  args: {
    user_id: v.string(),
    role: v.union(v.literal("student"), v.literal("teacher"), v.literal("admin")),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("user_id", args.user_id))
      .unique();

    if (!profile) {
      throw new Error("Profile not found");
    }

    await ctx.db.patch(profile._id, {
      role: args.role,
      updated_at: new Date().toISOString(),
    });

    return await ctx.db.get(profile._id);
  },
});
