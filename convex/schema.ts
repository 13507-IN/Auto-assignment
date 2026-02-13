import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profiles: defineTable({
    user_id: v.string(),
    email: v.string(),
    full_name: v.optional(v.string()),
    role: v.optional(
      v.union(v.literal("student"), v.literal("teacher"), v.literal("admin"))
    ),
    created_at: v.string(),
    updated_at: v.string(),
  })
    .index("by_user_id", ["user_id"])
    .index("by_email", ["email"]),

  classroom_data: defineTable({
    user_id: v.string(),
    course_id: v.optional(v.string()),
    course_name: v.optional(v.string()),
    assignment_id: v.optional(v.string()),
    assignment_title: v.optional(v.string()),
    due_date: v.optional(v.string()),
    description: v.optional(v.string()),
    created_at: v.string(),
    updated_at: v.string(),
  })
    .index("by_user_id", ["user_id"])
    .index("by_user_assignment_id", ["user_id", "assignment_id"]),

  study_plans: defineTable({
    user_id: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    start_date: v.string(),
    end_date: v.string(),
    priority: v.optional(
      v.union(v.literal("low"), v.literal("medium"), v.literal("high"))
    ),
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("in_progress"),
        v.literal("completed")
      )
    ),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_user_id", ["user_id"]),

  chat_history: defineTable({
    user_id: v.string(),
    message: v.string(),
    response: v.string(),
    context: v.optional(v.any()),
    created_at: v.string(),
  }).index("by_user_id", ["user_id"]),

  notifications: defineTable({
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
    created_at: v.string(),
  }).index("by_user_id", ["user_id"]),

  colleges: defineTable({
    name: v.string(),
    name_lower: v.string(),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_name_lower", ["name_lower"]),

  branches: defineTable({
    college_id: v.id("colleges"),
    name: v.string(),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_college_id", ["college_id"]),

  subjects: defineTable({
    branch_id: v.id("branches"),
    name: v.string(),
    google_classroom_id: v.optional(v.string()),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_branch_id", ["branch_id"]),

  channel_members: defineTable({
    user_id: v.string(),
    subject_id: v.id("subjects"),
    created_at: v.string(),
  })
    .index("by_user_id", ["user_id"])
    .index("by_subject_id", ["subject_id"])
    .index("by_user_subject_id", ["user_id", "subject_id"]),

  student_id_cards: defineTable({
    user_id: v.string(),
    student_id: v.string(),
    college_id: v.id("colleges"),
    full_name: v.string(),
    image_url: v.string(),
    verification_status: v.boolean(),
    created_at: v.string(),
    updated_at: v.string(),
  })
    .index("by_student_id", ["student_id"])
    .index("by_user_id", ["user_id"])
    .index("by_college_id", ["college_id"]),

  id_verification_logs: defineTable({
    user_id: v.string(),
    student_id_card_id: v.optional(v.id("student_id_cards")),
    verification_status: v.boolean(),
    confidence_score: v.number(),
    extracted_data: v.any(),
    created_at: v.string(),
  })
    .index("by_user_id", ["user_id"])
    .index("by_student_id_card_id", ["student_id_card_id"]),
});
