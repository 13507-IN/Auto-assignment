import { google } from 'googleapis';
import { convexHttp, api } from '@/lib/convexHttp';
import { Assignment } from '@/types/assignment';

const classroom = google.classroom('v1');
const calendar = google.calendar('v3');

export async function syncClassroomData(userId: string, accessToken: string) {
  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    // Fetch courses
    const coursesResponse = await classroom.courses.list({
      auth,
      pageSize: 10,
    });

    if (!coursesResponse.data.courses) {
      throw new Error('No courses found');
    }

    // Process each course
    for (const course of coursesResponse.data.courses) {
      // Fetch course work
      const courseWorkResponse = await classroom.courses.courseWork.list({
        auth,
        courseId: course.id!,
      });

      if (!courseWorkResponse.data.courseWork) {
        continue;
      }

      // Process each assignment
      for (const assignment of courseWorkResponse.data.courseWork) {
        const dueDate = assignment.dueDate
          ? new Date(
              assignment.dueDate.year!,
              assignment.dueDate.month! - 1,
              assignment.dueDate.day!
            ).toISOString()
          : undefined;

        await convexHttp.mutation(api.classroomData.insertIfMissing, {
          user_id: userId,
          course_id: course.id!,
          course_name: course.name!,
          assignment_id: assignment.id!,
          assignment_title: assignment.title!,
          due_date: dueDate,
          description: assignment.description || undefined,
        });

        // Create calendar event for assignment
        if (assignment.dueDate) {
          const event = {
            summary: `${course.name} - ${assignment.title}`,
            description: assignment.description || '',
            start: {
              dateTime: dueDate!,
              timeZone: 'UTC',
            },
            end: {
              dateTime: dueDate!,
              timeZone: 'UTC',
            },
          };

          await calendar.events.insert({
            auth,
            calendarId: 'primary',
            requestBody: event,
          });
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error syncing classroom data:', error);
    return { success: false, error };
  }
}

export async function getUpcomingAssignments(userId: string): Promise<Assignment[]> {
    try {
        const response = await fetch('/api/google-cloud/assignments');
        if (!response.ok) {
            throw new Error('Failed to fetch assignments');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching assignments:', error);
        return [];
    }
}

export async function getCourses(userId: string) {
    try {
        const response = await fetch('/api/google-cloud');
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
} 
