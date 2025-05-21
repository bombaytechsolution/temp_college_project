"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Book, GraduationCap, School, Upload, User } from "lucide-react";

// Simulated recent activities for the dashboard
const recentActivities = [
  {
    id: 1,
    type: "exam",
    title: "Computer Science Fundamentals",
    description: "Exam scheduled for June 15, 2025",
    timestamp: "1 hour ago",
    icon: Book,
  },
  {
    id: 2,
    type: "student",
    title: "6 new students",
    description: "Added to Westlake University",
    timestamp: "3 hours ago",
    icon: GraduationCap,
  },
  {
    id: 3,
    type: "result",
    title: "Engineering Mechanics",
    description: "Results uploaded for Midvale Technical Institute",
    timestamp: "6 hours ago",
    icon: Upload,
  },
  {
    id: 4,
    type: "college",
    title: "Eastridge College",
    description: "Updated contact information",
    timestamp: "Yesterday",
    icon: School,
  },
  {
    id: 5,
    type: "member",
    title: "Sarah Mitchell",
    description: "New employee account created",
    timestamp: "2 days ago",
    icon: User,
  },
];

export function RecentActivities() {
  // Icon and background color based on activity type
  const getIconClass = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "student":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "result":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
      case "college":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300";
      case "member":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest updates from the system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 rounded-lg border p-3 transition-all hover:bg-accent"
            >
              <div
                className={`rounded-full p-2 ${getIconClass(activity.type)}`}
              >
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                {activity.timestamp}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}