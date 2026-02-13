'use client';

import { useSession } from 'next-auth/react';
import { FiUsers, FiAward, FiCalendar } from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Dashboard() {
  const { data: session } = useSession();

  const stats = [
    { label: 'Total Students', value: '156', change: '+12%', icon: FiUsers, color: 'text-primary' },
    { label: 'Average Grade', value: '87%', change: '+2.4%', icon: FiAward, color: 'text-green-500' },
    { label: 'Upcoming Events', value: '8', change: 'Next: Math Final', icon: FiCalendar, color: 'text-blue-500' },
  ];

  const recentActivity = [
    { id: 1, user: 'Alex Morgan', action: 'submitted', target: 'Linear Algebra Assignment', time: '2 mins ago' },
    { id: 2, user: 'Sarah Lee', action: 'joined', target: 'Physics 101', time: '15 mins ago' },
    { id: 3, user: 'System', action: 'generated', target: 'Weekly Report', time: '1 hour ago' },
    { id: 4, user: 'James Chen', action: 'flagged', target: 'Attendance Issue', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Overview of student performance and system activities.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Download Report</Button>
          <Button>New Notification</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color} opacity-75`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Areas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Performance Chart Placeholder (60% width -> col-span-4 of 7) */}
        <Card className="col-span-4 md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>
              Average grade trends over the current semester.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             {/* Simple visual placeholder for chart */}
             <div className="h-[300px] flex items-end justify-between gap-2 px-4 pt-4 pb-2">
                {[45, 60, 75, 50, 80, 70, 85, 90, 65, 75, 85, 95].map((h, i) => (
                  <div key={i} className="w-full bg-primary/10 rounded-t-sm hover:bg-primary/20 transition-all relative group h-full flex flex-col justify-end">
                    <div 
                      style={{ height: `${h}%` }} 
                      className="bg-primary w-full rounded-t-sm transition-all duration-500 ease-spring-custom group-hover:bg-primary/90"
                    />
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>

        {/* Recent Activity (40% width -> col-span-3 of 7) */}
        <Card className="col-span-3 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions across the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center border border-border shrink-0">
                    <span className="text-xs font-medium text-foreground">
                      {activity.user.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground">
                      {activity.user}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action} <span className="text-foreground font-medium">{activity.target}</span>
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
