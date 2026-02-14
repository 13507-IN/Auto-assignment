import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const title = typeof body?.title === 'string' ? body.title.trim() : '';
    const description = typeof body?.description === 'string' ? body.description.trim() : '';
    const courseName = typeof body?.courseName === 'string' ? body.courseName.trim() : '';

    if (!title) {
      return NextResponse.json({ error: 'Assignment title is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
    }

    const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    const prompt = `You are a study assistant. Help the student understand the assignment.
Rules:
- Do NOT provide a complete or final solution.
- Provide guidance, concepts, and an outline they can follow.
- Encourage the student to write their own answer.
- Keep the response concise and practical.

Course: ${courseName || 'Unknown'}
Title: ${title}
Description: ${description || 'No description provided.'}

Return the response in markdown with these sections:
- Summary
- Key Concepts
- Suggested Approach
- Common Pitfalls
- Next Steps`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ help: text });
  } catch (error) {
    console.error('Error generating assignment help:', error);
    return NextResponse.json(
      { error: 'Failed to generate assignment help' },
      { status: 500 }
    );
  }
}
