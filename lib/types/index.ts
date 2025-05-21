// Type definitions for the college management system

export interface College {
  id: string;
  name: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  establishedYear: number;
}

export interface Exam {
  id: string;
  name: string;
  description: string;
  collegeIds: string[]; // Colleges where this exam is conducted
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  totalMarks: number;
  passingMarks: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  collegeId: string;
  enrollmentNumber: string;
  program: string;
  year: number;
  examResults: ExamResult[];
}

export interface ExamResult {
  examId: string;
  marks: number;
  passed: boolean;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'employee';
  permissions: Permission[];
  collegeIds: string[]; // Empty array means access to all colleges
}

export type Permission = 
  | 'manage_colleges' 
  | 'manage_exams' 
  | 'manage_students' 
  | 'manage_members' 
  | 'view_reports' 
  | 'upload_results';