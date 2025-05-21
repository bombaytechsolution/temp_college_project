import React from 'react';
import { DashboardCards } from '@/components/dashboard/DashboardCards';
import { ExamPerformanceChart } from '@/components/dashboard/ExamPerformanceChart';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import { UpcomingExams } from '@/components/dashboard/UpcomingExams';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of colleges, exams, and performance
        </p>
      </div>
      
      <DashboardCards />
      
      <div className="grid gap-6 md:grid-cols-4">
        <ExamPerformanceChart />
        <div className="space-y-6">
          <UpcomingExams />
          <RecentActivities />
        </div>
      </div>
    </div>
  );
}