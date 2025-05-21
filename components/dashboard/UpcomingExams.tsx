"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock } from "lucide-react";
import { getExams, getCollegeById } from "@/lib/utils/data-utils";

export function UpcomingExams() {
  const upcomingExams = getExams()
    .filter((exam) => exam.status === "upcoming")
    .slice(0, 4); // Limited to 4 for display
    
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Exams</CardTitle>
        <CardDescription>Scheduled exams in the near future</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingExams.length === 0 ? (
            <p className="text-sm text-muted-foreground">No upcoming exams scheduled</p>
          ) : (
            upcomingExams.map((exam) => {
              // Get the first college in the list to display (simplified for UI)
              const firstCollege = getCollegeById(exam.collegeIds[0]);
              const collegeCount = exam.collegeIds.length;
              
              // Format date for display
              const examDate = new Date(exam.date);
              const formattedDate = examDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short', 
                day: 'numeric'
              });
              
              return (
                <div 
                  key={exam.id} 
                  className="flex flex-col space-y-2 rounded-lg border p-3 transition-all hover:bg-accent"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{exam.name}</h3>
                    <Badge variant="outline" className="ml-2">
                      {exam.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {formattedDate}
                    <span className="mx-1">•</span>
                    <Clock className="mr-1 h-3 w-3" />
                    {exam.startTime} - {exam.endTime}
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium">{firstCollege?.name}</span>
                    {collegeCount > 1 && (
                      <span className="text-muted-foreground">
                        {" "}and {collegeCount - 1} other{collegeCount - 1 > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}