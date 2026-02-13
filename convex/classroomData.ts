import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const insertIfMissing = mutation({
  args: {
    user_id: v.string(),
    course_id: v.optional(v.string()),
    course_name: v.optional(v.string()),
    assignment_id: v.string(),
    assignment_title: v.optional(v.string()),
    due_date: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("classroom_data")
      .withIndex("by_user_assignment_id", (q) =>
        q.eq("user_id", args.user_id).eq("assignment_id", args.assignment_id)
      )
      .unique();

    if (existing) {
      return existing;
    }

    const now = new Date().toISOString();
    const id = await ctx.db.insert("classroom_data", {
      user_id: args.user_id,
      course_id: args.course_id,
      course_name: args.course_name,
      assignment_id: args.assignment_id,
      assignment_title: args.assignment_title,
      due_date: args.due_date,
      description: args.description,
      created_at: now,
      updated_at: now,
    });

    return await ctx.db.get(id);
  },
});

export const listUpcomingByUser = query({
  args: {
    user_id: v.string(),
    limit: v.optional(v.number()),
    from_date: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const fromDate = args.from_date ?? new Date().toISOString();
    const limit = args.limit ?? 1;

    const assignments = await ctx.db
      .query("classroom_data")
      .withIndex("by_user_id", (q) => q.eq("user_id", args.user_id))
      .collect();

    const upcoming = assignments
      .filter((assignment) => assignment.due_date && assignment.due_date >= fromDate)
      .sort((a, b) => (a.due_date || "").localeCompare(b.due_date || ""));

    return upcoming.slice(0, limit);
  },
});
