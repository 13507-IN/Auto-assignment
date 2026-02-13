import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";

export const findCollegeByName = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const normalized = args.name.trim().toLowerCase();
    if (!normalized) {
      return null;
    }
    return await ctx.db
      .query("colleges")
      .withIndex("by_name_lower", (q) => q.eq("name_lower", normalized))
      .unique();
  },
});

export const getStudentIdCardByStudentId = query({
  args: { student_id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("student_id_cards")
      .withIndex("by_student_id", (q) => q.eq("student_id", args.student_id))
      .unique();
  },
});

export const createStudentIdCard = mutation({
  args: {
    user_id: v.string(),
    student_id: v.string(),
    college_id: v.id("colleges"),
    full_name: v.string(),
    image_url: v.string(),
    verification_status: v.boolean(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    const id = await ctx.db.insert("student_id_cards", {
      user_id: args.user_id,
      student_id: args.student_id,
      college_id: args.college_id,
      full_name: args.full_name,
      image_url: args.image_url,
      verification_status: args.verification_status,
      created_at: now,
      updated_at: now,
    });
    return await ctx.db.get(id);
  },
});

export const updateStudentIdCard = mutation({
  args: {
    id: v.id("student_id_cards"),
    user_id: v.optional(v.string()),
    verification_status: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const updates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    if (args.user_id !== undefined) updates.user_id = args.user_id;
    if (args.verification_status !== undefined) {
      updates.verification_status = args.verification_status;
    }

    await ctx.db.patch(args.id, updates);
    return await ctx.db.get(args.id);
  },
});

export const createVerificationLog = mutation({
  args: {
    user_id: v.string(),
    student_id_card_id: v.optional(v.id("student_id_cards")),
    verification_status: v.boolean(),
    confidence_score: v.number(),
    extracted_data: v.any(),
  },
  handler: async (ctx, args) => {
    const log: {
      user_id: string;
      student_id_card_id?: Id<"student_id_cards">;
      verification_status: boolean;
      confidence_score: number;
      extracted_data: unknown;
      created_at: string;
    } = {
      user_id: args.user_id,
      verification_status: args.verification_status,
      confidence_score: args.confidence_score,
      extracted_data: args.extracted_data,
      created_at: new Date().toISOString(),
    };

    if (args.student_id_card_id) {
      log.student_id_card_id = args.student_id_card_id;
    }

    const id = await ctx.db.insert("id_verification_logs", log);
    return await ctx.db.get(id);
  },
});
