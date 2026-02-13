import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getHierarchy = query({
  args: { collegeId: v.id("colleges") },
  handler: async (ctx, args) => {
    const college = await ctx.db.get(args.collegeId);
    if (!college) {
      return null;
    }

    const branches = await ctx.db
      .query("branches")
      .withIndex("by_college_id", (q) => q.eq("college_id", args.collegeId))
      .collect();

    const branchesWithSubjects = await Promise.all(
      branches.map(async (branch) => {
        const subjects = await ctx.db
          .query("subjects")
          .withIndex("by_branch_id", (q) => q.eq("branch_id", branch._id))
          .collect();

        return {
          branch: {
            id: branch._id,
            name: branch.name,
            college_id: branch.college_id,
            created_at: branch.created_at,
            updated_at: branch.updated_at,
          },
          subjects: subjects.map((subject) => ({
            id: subject._id,
            branch_id: subject.branch_id,
            name: subject.name,
            google_classroom_id: subject.google_classroom_id,
            created_at: subject.created_at,
            updated_at: subject.updated_at,
          })),
        };
      })
    );

    return {
      college: {
        id: college._id,
        name: college.name,
        created_at: college.created_at,
        updated_at: college.updated_at,
      },
      branches: branchesWithSubjects,
    };
  },
});

export const createChannel = mutation({
  args: {
    type: v.union(v.literal("college"), v.literal("branch"), v.literal("subject")),
    data: v.object({
      name: v.string(),
      college_id: v.optional(v.id("colleges")),
      branch_id: v.optional(v.id("branches")),
      google_classroom_id: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();

    if (args.type === "college") {
      const id = await ctx.db.insert("colleges", {
        name: args.data.name,
        name_lower: args.data.name.toLowerCase(),
        created_at: now,
        updated_at: now,
      });
      return await ctx.db.get(id);
    }

    if (args.type === "branch") {
      if (!args.data.college_id) {
        throw new Error("college_id is required for branch creation");
      }
      const id = await ctx.db.insert("branches", {
        name: args.data.name,
        college_id: args.data.college_id,
        created_at: now,
        updated_at: now,
      });
      return await ctx.db.get(id);
    }

    if (args.type === "subject") {
      if (!args.data.branch_id) {
        throw new Error("branch_id is required for subject creation");
      }
      const id = await ctx.db.insert("subjects", {
        name: args.data.name,
        branch_id: args.data.branch_id,
        google_classroom_id: args.data.google_classroom_id,
        created_at: now,
        updated_at: now,
      });
      return await ctx.db.get(id);
    }

    throw new Error("Unsupported channel type");
  },
});

export const addChannelMember = mutation({
  args: { user_id: v.string(), subject_id: v.id("subjects") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("channel_members")
      .withIndex("by_user_subject_id", (q) =>
        q.eq("user_id", args.user_id).eq("subject_id", args.subject_id)
      )
      .unique();

    if (existing) {
      return existing;
    }

    const id = await ctx.db.insert("channel_members", {
      user_id: args.user_id,
      subject_id: args.subject_id,
      created_at: new Date().toISOString(),
    });

    return await ctx.db.get(id);
  },
});

export const removeChannelMember = mutation({
  args: { user_id: v.string(), subject_id: v.id("subjects") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("channel_members")
      .withIndex("by_user_subject_id", (q) =>
        q.eq("user_id", args.user_id).eq("subject_id", args.subject_id)
      )
      .unique();

    if (!existing) {
      return { removed: false };
    }

    await ctx.db.delete(existing._id);
    return { removed: true };
  },
});
