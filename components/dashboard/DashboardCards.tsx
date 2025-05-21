"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  School, 
  Book, 
  GraduationCap, 
  Users, 
  CalendarCheck, 
  CalendarClock, 
  CheckCircle 
} from "lucide-react";
import {
  getCollegeCount,
  getExamCount,
  getStudentCount,
  getMemberCount,
  getUpcomingExamsCount,
  getOngoingExamsCount,
  getCompletedExamsCount
} from "@/lib/utils/data-utils";

export function DashboardCards() {
  // Get statistics
  const collegeCount = getCollegeCount();
  const examCount = getExamCount();
  const studentCount = getStudentCount();
  const memberCount = getMemberCount();
  const upcomingExams = getUpcomingExamsCount();
  const ongoingExams = getOngoingExamsCount();
  const completedExams = getCompletedExamsCount();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Colleges</CardTitle>
          <School className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{collegeCount}</div>
          <p className="text-xs text-muted-foreground">
            Across multiple locations
          </p>
        </CardContent>
      </Card>
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
          <Book className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{examCount}</div>
          <p className="text-xs text-muted-foreground">
            Across all colleges
          </p>
        </CardContent>
      </Card>
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{studentCount}</div>
          <p className="text-xs text-muted-foreground">
            Enrolled across all colleges
          </p>
        </CardContent>
      </Card>
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">System Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{memberCount}</div>
          <p className="text-xs text-muted-foreground">
            Admins and Employees
          </p>
        </CardContent>
      </Card>
      {/* Second row */}
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
          <CalendarClock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingExams}</div>
          <div className="w-full h-1.5 bg-muted rounded-full mt-2">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${(upcomingExams / examCount) * 100}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Ongoing Exams</CardTitle>
          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ongoingExams}</div>
          <div className="w-full h-1.5 bg-muted rounded-full mt-2">
            <div 
              className="h-full bg-yellow-500 rounded-full" 
              style={{ width: `${(ongoingExams / examCount) * 100}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
      <Card className="transition-all hover:shadow-md md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Completed Exams</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedExams}</div>
          <div className="w-full h-1.5 bg-muted rounded-full mt-2">
            <div 
              className="h-full bg-green-500 rounded-full" 
              style={{ width: `${(completedExams / examCount) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {Math.round((completedExams / examCount) * 100)}% of all exams completed
          </p>
        </CardContent>
      </Card>
    </div>
  );
}