"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getExams, getExamPassRate } from "@/lib/utils/data-utils";

export function ExamPerformanceChart() {
  const exams = getExams().slice(0, 4); // Only show first 4 exams

  const data = exams.map((exam) => {
    const passRate = getExamPassRate(exam.id);
    return {
      name: exam.name.substring(0, 15) + (exam.name.length > 15 ? "..." : ""),
      passRate: Math.round(passRate),
      failRate: Math.round(100 - passRate),
    };
  });

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Exam Performance</CardTitle>
        <CardDescription>
          Pass rates for recent exams across all colleges
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              fontSize={12}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={12}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, ""]}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Legend />
            <Bar
              dataKey="passRate"
              name="Pass Rate"
              fill="hsl(var(--chart-2))"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
            <Bar
              dataKey="failRate"
              name="Fail Rate"
              fill="hsl(var(--chart-5))"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}