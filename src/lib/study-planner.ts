import { Configuration, OpenAIApi } from 'openai';
import { convexHttp, api } from '@/lib/convexHttp';
import { getUpcomingAssignments } from './google-classroom';
import type { Id } from '@convex/_generated/dataModel';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export type StudyPlan = {
  id?: string;
  user_id?: string;
  title: string;
  description?: string | null;
  start_date: string;
  end_date: string;
  priority?: 'low' | 'medium' | 'high' | null;
  status?: 'pending' | 'in_progress' | 'completed' | null;
  created_at?: string;
  updated_at?: string;
};

interface TimeSlot {
  start: Date;
  end: Date;
}

export async function generateStudyPlan(userId: string): Promise<StudyPlan[]> {
  try {
    // Get upcoming assignments
    const assignments = await getUpcomingAssignments(userId);
    
    // Generate study plan using OpenAI
    const prompt = `Create a personalized study plan for the following assignments:
${assignments.map(a => `- ${a.assignment_title} (Due: ${new Date(a.due_date!).toLocaleDateString()})`).join('\n')}

Please create a study plan that:
1. Breaks down each assignment into manageable tasks
2. Allocates appropriate time for each task
3. Takes into account the due dates
4. Includes breaks and buffer time
5. Prioritizes tasks based on urgency and complexity

Format the response as a JSON array of study sessions, each with:
- title: string
- description: string
- start_date: ISO date string
- end_date: ISO date string
- priority: "low" | "medium" | "high"
- status: "pending"`;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an AI study planner that creates personalized study schedules."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const studyPlan = JSON.parse(completion.data.choices[0].message?.content || '[]');

    await convexHttp.mutation(api.studyPlans.createMany, {
      user_id: userId,
      plans: studyPlan.map((plan: StudyPlan) => ({
        title: plan.title,
        description: plan.description ?? undefined,
        start_date: plan.start_date,
        end_date: plan.end_date,
        priority: plan.priority ?? undefined,
        status: plan.status ?? 'pending',
      })),
    });

    return studyPlan;
  } catch (error) {
    console.error('Error generating study plan:', error);
    return [];
  }
}

export async function updateStudyPlan(
  userId: string,
  planId: string,
  updates: Partial<StudyPlan>
) {
  try {
    await convexHttp.mutation(api.studyPlans.update, {
      id: planId as Id<'study_plans'>,
      user_id: userId,
      updates: {
        title: updates.title,
        description: updates.description ?? undefined,
        start_date: updates.start_date,
        end_date: updates.end_date,
        priority: updates.priority ?? undefined,
        status: updates.status ?? undefined,
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating study plan:', error);
    return { success: false, error };
  }
}

export async function getCurrentStudyPlan(userId: string) {
  try {
    return await convexHttp.query(api.studyPlans.listCurrentByUser, {
      user_id: userId,
    });
  } catch (error) {
    console.error('Error fetching current study plan:', error);
    return [];
  }
}
