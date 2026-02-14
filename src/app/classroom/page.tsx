'use client';

import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ClassroomCourse {
  id: string;
  name: string;
  section?: string;
}

interface ClassroomAssignment {
  id: string;
  assignment_title: string;
  description: string;
  due_date: string;
  course_id: string;
  course_name: string;
  status: 'pending' | 'submitted' | 'graded';
  max_score?: number;
  link?: string;
  work_type?: string;
}

export default function ClassroomWorkflowPage() {
  const { data: session, status } = useSession();
  const [classCode, setClassCode] = useState('');
  const [course, setCourse] = useState<ClassroomCourse | null>(null);
  const [assignments, setAssignments] = useState<ClassroomAssignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [helpById, setHelpById] = useState<Record<string, string>>({});
  const [helpLoadingId, setHelpLoadingId] = useState<string | null>(null);

  const handleFetchAssignments = async () => {
    if (!classCode.trim()) {
      setError('Enter a valid class code.');
      return;
    }

    setLoading(true);
    setError(null);
    setCourse(null);
    setAssignments([]);

    try {
      const response = await fetch('/api/classroom/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classCode }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || 'Failed to fetch assignments.');
        setLoading(false);
        return;
      }

      setCourse(data.course ?? null);
      setAssignments(data.assignments ?? []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch assignments.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateHelp = async (assignment: ClassroomAssignment) => {
    setHelpLoadingId(assignment.id);
    setError(null);

    try {
      const response = await fetch('/api/ai/assignment-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: assignment.assignment_title,
          description: assignment.description,
          courseName: assignment.course_name,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || 'Failed to generate help.');
        return;
      }

      setHelpById((prev) => ({
        ...prev,
        [assignment.id]: data.help ?? 'No guidance returned.',
      }));
    } catch (err) {
      console.error(err);
      setError('Failed to generate help.');
    } finally {
      setHelpLoadingId(null);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-lg w-full">
          <CardHeader>
            <CardTitle>Connect Google Classroom</CardTitle>
            <CardDescription>
              Sign in with Google to sync your classes and assignments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => signIn('google', { callbackUrl: '/classroom' })}>
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Classroom Automation</CardTitle>
            <CardDescription>
              Enter your class code to fetch assignments and get guided study help.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={classCode}
                onChange={(event) => setClassCode(event.target.value)}
                placeholder="Enter class code"
                className="flex-1 rounded-md border border-border bg-background px-4 py-2 text-sm"
              />
              <Button onClick={handleFetchAssignments} disabled={loading}>
                {loading ? 'Fetching...' : 'Fetch Assignments'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              This workflow provides study guidance only. You remain responsible for writing and submitting your work.
            </p>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
        </Card>

        {course && (
          <Card>
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
              {course.section && <CardDescription>Section: {course.section}</CardDescription>}
            </CardHeader>
            <CardContent>
              {assignments.length === 0 ? (
                <p className="text-sm text-muted-foreground">No assignments found for this class.</p>
              ) : (
                <div className="space-y-4">
                  {assignments.map((assignment) => {
                    const dueLabel = assignment.due_date
                      ? new Date(assignment.due_date).toLocaleString()
                      : 'No due date';

                    return (
                      <div
                        key={assignment.id}
                        className="rounded-lg border border-border bg-background p-4 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">
                              {assignment.assignment_title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Due: {dueLabel}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {assignment.link && (
                              <a
                                href={assignment.link}
                                className="text-sm text-primary underline"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Open in Classroom
                              </a>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleGenerateHelp(assignment)}
                              disabled={helpLoadingId === assignment.id}
                            >
                              {helpLoadingId === assignment.id ? 'Generating...' : 'Generate Study Help'}
                            </Button>
                          </div>
                        </div>
                        {assignment.description && (
                          <p className="text-sm text-muted-foreground">{assignment.description}</p>
                        )}
                        {helpById[assignment.id] && (
                          <div className="rounded-md bg-muted/40 p-3 text-sm whitespace-pre-wrap">
                            {helpById[assignment.id]}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
