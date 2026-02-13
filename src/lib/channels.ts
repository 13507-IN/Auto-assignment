import { convexHttp, api } from "@/lib/convexHttp";
import type { ChannelHierarchy } from "@/types/channel";
import type { Id } from "@convex/_generated/dataModel";

export async function getChannelHierarchy(
  collegeId: string
): Promise<ChannelHierarchy | null> {
  return convexHttp.query(api.channels.getHierarchy, {
    collegeId: collegeId as Id<"colleges">,
  });
}

export async function createChannel(
  type: "college" | "branch" | "subject",
  data: {
    name: string;
    college_id?: string;
    branch_id?: string;
    google_classroom_id?: string;
  }
) {
  return convexHttp.mutation(api.channels.createChannel, {
    type,
    data: {
      name: data.name,
      college_id: data.college_id as Id<"colleges"> | undefined,
      branch_id: data.branch_id as Id<"branches"> | undefined,
      google_classroom_id: data.google_classroom_id,
    },
  });
}

export async function addChannelMember(userId: string, subjectId: string) {
  return convexHttp.mutation(api.channels.addChannelMember, {
    user_id: userId,
    subject_id: subjectId as Id<"subjects">,
  });
}

export async function removeChannelMember(userId: string, subjectId: string) {
  return convexHttp.mutation(api.channels.removeChannelMember, {
    user_id: userId,
    subject_id: subjectId as Id<"subjects">,
  });
}
