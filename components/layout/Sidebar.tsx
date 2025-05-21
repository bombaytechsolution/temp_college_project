"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Book,
  GraduationCap,
  LayoutDashboard,
  School,
  Users,
} from "lucide-react";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Colleges",
    href: "/dashboard/colleges",
    icon: School,
  },
  {
    name: "Exams",
    href: "/dashboard/exams",
    icon: Book,
  },
  {
    name: "Students",
    href: "/dashboard/students",
    icon: GraduationCap,
  },
  {
    name: "Members",
    href: "/dashboard/members",
    icon: Users,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-2 p-2">
      <Link
        href="/dashboard"
        className="flex h-16 items-center gap-2 px-4 md:px-6"
      >
        <School className="h-6 w-6" />
        <span className="font-semibold text-lg">ExamMaster</span>
      </Link>
      <div className="grid gap-1 px-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}