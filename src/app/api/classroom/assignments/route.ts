import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { google } from 'googleapis';
import { authOptions } from '@/lib/auth';

function toIsoDate(
  dueDate?: { year?: number | null; month?: number | null; day?: number | null },
  dueTime?: { hours?: number | null; minutes?: number | null; seconds?: number | null }
) {
  if (!dueDate?.year || !dueDate?.month || !dueDate?.day) {
    return null;
  }

  const hours = dueTime?.hours ?? 23;
  const minutes = dueTime?.minutes ?? 59;
  const seconds = dueTime?.seconds ?? 0;

  return new Date(Date.UTC(dueDate.year, dueDate.month - 1, dueDate.day, hours, minutes, seconds)).toISOString();
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const classCode = typeof body?.classCode === 'string' ? body.classCode.trim() : '';

    if (!classCode) {
      return NextResponse.json({ error: 'Class code is required' }, { status: 400 });
    }

    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    auth.setCredentials({
      access_token: session.accessToken,
    });

    const classroom = google.classroom({ version: 'v1', auth });

    const coursesResponse = await classroom.courses.list({
      studentId: 'me',
      courseStates: ['ACTIVE'],
    });
    const courses = coursesResponse.data.courses ?? [];
    const normalized = classCode.toLowerCase();

    const course = courses.find((item) => {
      if (item.enrollmentCode && item.enrollmentCode.toLowerCase() === normalized) {
        return true;
      }
      if (item.id && item.id === classCode) {
        return true;
      }
      return false;
    });

    if (!course?.id) {
      return NextResponse.json(
        {
          error:
            'Course not found. Make sure you are enrolled in the class or use the course ID.',
        },
        { status: 404 }
      );
    }

    const courseWorkResponse = await classroom.courses.courseWork.list({
      courseId: course.id,
      orderBy: 'dueDate desc',
      pageSize: 50,
      courseWorkStates: ['PUBLISHED'],
    });

    const assignments = (courseWorkResponse.data.courseWork ?? []).map((work) => {
      const dueDate = toIsoDate(work.dueDate ?? undefined, work.dueTime ?? undefined);

      return {
        id: work.id ?? '',
        assignment_title: work.title ?? 'Untitled assignment',
        description: work.description ?? '',
        due_date: dueDate ?? '',
        course_id: course.id ?? '',
        course_name: course.name ?? '',
        status: 'pending' as const,
        max_score: work.maxPoints ?? undefined,
        link: work.alternateLink ?? undefined,
        work_type: work.workType ?? undefined,
      };
    });

    return NextResponse.json({
      course: {
        id: course.id,
        name: course.name ?? '',
        section: course.section ?? '',
      },
      assignments,
    });
  } catch (error) {
    console.error('Error fetching classroom assignments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch classroom assignments' },
      { status: 500 }
    );
  }
}
