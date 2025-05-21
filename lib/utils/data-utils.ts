import colleges from '../data/colleges.json';
import exams from '../data/exams.json';
import students from '../data/students.json';
import members from '../data/members.json';
import fs from 'fs';
import path from 'path';
import { College, Exam, Student, Member, ExamResult } from '../types';

// Get data functions
export const getColleges = (): College[] => {
  return colleges as College[];
};

export const getExams = (): Exam[] => {
  return exams as Exam[];
};

export const getStudents = (): Student[] => {
  return students as Student[];
};

export const getMembers = (): Member[] => {
  return members as Member[];
};

// Get entity by ID
export const getCollegeById = (id: string): College | undefined => {
  return colleges.find(college => college.id === id) as College | undefined;
};

export const getExamById = (id: string): Exam | undefined => {
  return exams.find(exam => exam.id === id) as Exam | undefined;
};

export const getStudentById = (id: string): Student | undefined => {
  return students.find(student => student.id === id) as Student | undefined;
};

export const getMemberById = (id: string): Member | undefined => {
  return members.find(member => member.id === id) as Member | undefined;
};

// Add new entity (client-side mock functions)
export const addCollege = (college: Omit<College, 'id'>): College => {
  const newCollege = {
    ...college,
    id: `c${colleges.length + 1}`
  };
  
  return newCollege;
};

export const addExam = (exam: Omit<Exam, 'id'>): Exam => {
  const newExam = {
    ...exam,
    id: `e${exams.length + 1}`
  };
  
  return newExam;
};

export const addStudent = (student: Omit<Student, 'id' | 'examResults'>): Student => {
  const newStudent = {
    ...student,
    id: `s${students.length + 1}`,
    examResults: []
  };
  
  return newStudent;
};

export const addMember = (member: Omit<Member, 'id'>): Member => {
  const newMember = {
    ...member,
    id: `m${members.length + 1}`
  };
  
  return newMember;
};

// Add exam result to student
export const addExamResult = (studentId: string, result: ExamResult): Student | undefined => {
  const student = getStudentById(studentId);
  if (!student) return undefined;
  
  const updatedStudent = {
    ...student,
    examResults: [...student.examResults, result]
  };
  
  return updatedStudent;
};

// Get students by college
export const getStudentsByCollege = (collegeId: string): Student[] => {
  return students.filter(student => student.collegeId === collegeId) as Student[];
};

// Get exams by college
export const getExamsByCollege = (collegeId: string): Exam[] => {
  return exams.filter(exam => exam.collegeIds.includes(collegeId)) as Exam[];
};

// Get members by college
export const getMembersByCollege = (collegeId: string): Member[] => {
  return members.filter(
    member => member.collegeIds.length === 0 || member.collegeIds.includes(collegeId)
  ) as Member[];
};

// Parse CSV data for exam results
export const parseExamResultsCSV = (csvText: string, examId: string): ExamResult[] => {
  // Simple CSV parser implementation
  const lines = csvText.trim().split('\n');
  const results: ExamResult[] = [];
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const [studentId, marks] = lines[i].split(',');
    const marksValue = parseInt(marks, 10);
    const exam = getExamById(examId);
    
    if (exam) {
      results.push({
        examId,
        marks: marksValue,
        passed: marksValue >= exam.passingMarks
      });
    }
  }
  
  return results;
};

// Get statistics
export const getCollegeCount = (): number => colleges.length;
export const getExamCount = (): number => exams.length;
export const getStudentCount = (): number => students.length;
export const getMemberCount = (): number => members.length;

export const getUpcomingExamsCount = (): number => {
  return exams.filter(exam => exam.status === 'upcoming').length;
};

export const getOngoingExamsCount = (): number => {
  return exams.filter(exam => exam.status === 'ongoing').length;
};

export const getCompletedExamsCount = (): number => {
  return exams.filter(exam => exam.status === 'completed').length;
};

export const getExamPassRate = (examId: string): number => {
  const passedStudents = students.filter(student => 
    student.examResults.some(result => 
      result.examId === examId && result.passed
    )
  ).length;
  
  const totalStudentsTakingExam = students.filter(student => 
    student.examResults.some(result => result.examId === examId)
  ).length;
  
  return totalStudentsTakingExam ? (passedStudents / totalStudentsTakingExam) * 100 : 0;
};