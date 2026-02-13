import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const priority = v.union(v.literal("low"), v.literal("medium"), v.literal("high"));
const status = v.union(
  v.literal("pending"),
  v.literal("in_progress"),
  v.literal("completed")
);

export const createMany = mutation({
  args: {
    user_id: v.string(),
    plans: v.array(
      v.object({
        title: v.string(),
        description: v.optional(v.string()),
        start_date: v.string(),
        end_date: v.string(),
        priority: v.optional(priority),
        status: v.optional(status),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    const ids = await Promise.all(
      args.plans.map((plan) =>
        ctx.db.insert("study_plans", {
          user_id: args.user_id,
          title: plan.title,
          description: plan.description,
          start_date: plan.start_date,
          end_date: plan.end_date,
          priority: plan.priority,
          status: plan.status ?? "pending",
          created_at: now,
          updated_at: now,
        })
      )
    );

    return await Promise.all(ids.map((id) => ctx.db.get(id)));
  },
});

export const update = mutation({
  args: {
    id: v.id("study_plans"),
    user_id: v.string(),
    updates: v.object({
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      start_date: v.optional(v.string()),
      end_date: v.optional(v.string()),
      priority: v.optional(priority),
      status: v.optional(status),
    }),
  },
  handler: async (ctx, args) => {
    const plan = await ctx.db.get(args.id);
    if (!plan) {
      throw new Error("Study plan not found");
    }
    if (plan.user_id !== args.user_id) {
      throw new Error("Not authorized to update this study plan");
    }

    await ctx.db.patch(args.id, {
      ...args.updates,
      updated_at: new Date().toISOString(),
    });

    return await ctx.db.get(args.id);
  },
});

export const listCurrentByUser = query({
  args: { user_id: v.string() },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    const plans = await ctx.db
      .query("study_plans")
      .withIndex("by_user_id", (q) => q.eq("user_id", args.user_id))
      .collect();

    return plans
      .filter((plan) => plan.end_date >= now)
      .sort((a, b) => a.start_date.localeCompare(b.start_date));
  },
});
