import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { google } from 'googleapis';
import { authOptions } from '@/lib/auth';

const SUPPORTED_WORK_TYPES = new Set(['SHORT_ANSWER_QUESTION']);

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const courseId = typeof body?.courseId === 'string' ? body.courseId.trim() : '';
    const courseWorkId = typeof body?.courseWorkId === 'string' ? body.courseWorkId.trim() : '';
    const submissionText = typeof body?.submissionText === 'string' ? body.submissionText.trim() : '';

    if (!courseId || !courseWorkId) {
      return NextResponse.json({ error: 'Course and assignment are required.' }, { status: 400 });
    }

    if (!submissionText) {
      return NextResponse.json({ error: 'Submission text is required.' }, { status: 400 });
    }

    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    auth.setCredentials({ access_token: session.accessToken });

    const classroom = google.classroom({ version: 'v1', auth });

    const courseWorkResponse = await classroom.courses.courseWork.get({
      courseId,
      id: courseWorkId,
    });

    const workType = courseWorkResponse.data.workType ?? '';
    if (!SUPPORTED_WORK_TYPES.has(workType)) {
      return NextResponse.json(
        { error: 'This assignment does not accept text submissions via the API.' },
        { status: 400 }
      );
    }

    const submissionsResponse = await classroom.courses.courseWork.studentSubmissions.list({
      courseId,
      courseWorkId,
      userId: 'me',
    });

    const submission = submissionsResponse.data.studentSubmissions?.[0];
    if (!submission?.id) {
      return NextResponse.json({ error: 'No submission found for this assignment.' }, { status: 404 });
    }

    if (submission.state === 'TURNED_IN') {
      return NextResponse.json({ error: 'This assignment is already turned in.' }, { status: 409 });
    }

    await classroom.courses.courseWork.studentSubmissions.patch({
      courseId,
      courseWorkId,
      id: submission.id,
      updateMask: 'shortAnswerSubmission.answer',
      requestBody: {
        shortAnswerSubmission: {
          answer: submissionText,
        },
      },
    });

    await classroom.courses.courseWork.studentSubmissions.turnIn({
      courseId,
      courseWorkId,
      id: submission.id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting assignment:', error);
    return NextResponse.json(
      { error: 'Failed to submit assignment.' },
      { status: 500 }
    );
  }
}
