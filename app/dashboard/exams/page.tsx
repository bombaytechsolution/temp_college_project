"use client";

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  getExams, 
  addExam, 
  getColleges 
} from '@/lib/utils/data-utils';
import { Exam, College } from '@/lib/types';
import { 
  PlusCircle, 
  Search, 
  MoreHorizontal, 
  Upload,
  CalendarIcon 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>(getExams());
  const colleges = getColleges();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [csvContent, setCsvContent] = useState('');
  
  const [newExam, setNewExam] = useState<Partial<Exam>>({
    name: '',
    description: '',
    collegeIds: [],
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    totalMarks: 100,
    passingMarks: 40,
    status: 'upcoming',
  });

  // Filter exams based on search query
  const filteredExams = exams.filter(exam => 
    exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExam(prev => ({
      ...prev,
      [name]: name === 'totalMarks' || name === 'passingMarks' ? parseInt(value) : value
    }));
  };

  // Handle college selection
  const handleCollegeChange = (collegeId: string, isChecked: boolean) => {
    setNewExam(prev => {
      const currentColleges = prev.collegeIds || [];
      return {
        ...prev,
        collegeIds: isChecked
          ? [...currentColleges, collegeId]
          : currentColleges.filter(id => id !== collegeId)
      };
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const createdExam = addExam(newExam as Omit<Exam, 'id'>);
    setExams(prev => [...prev, createdExam]);
    setNewExam({
      name: '',
      description: '',
      collegeIds: [],
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      totalMarks: 100,
      passingMarks: 40,
      status: 'upcoming',
    });
    setIsDialogOpen(false);
  };

  // Handle CSV upload
  const handleCsvUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the CSV and update the database
    alert('CSV uploaded successfully! (Simulated)');
    setCsvContent('');
    setIsUploadDialogOpen(false);
  };

  // Get college names for display
  const getCollegeNames = (collegeIds: string[]) => {
    const collegeNames = collegeIds.map(id => {
      const college = colleges.find(c => c.id === id);
      return college ? college.name : 'Unknown';
    });
    
    if (collegeNames.length === 0) return 'None';
    if (collegeNames.length === 1) return collegeNames[0];
    return `${collegeNames[0]} +${collegeNames.length - 1} more`;
  };

  // Get badge color based on exam status
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'outline';
      case 'ongoing':
        return 'default';
      case 'completed':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Exams</h2>
          <p className="text-muted-foreground">
            Manage exams and assessments
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Exam
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Exam</DialogTitle>
              <DialogDescription>
                Enter the exam details and assign it to colleges.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Exam Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Advanced Mathematics"
                    value={newExam.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the exam content and objectives"
                    value={newExam.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Assigned Colleges</Label>
                <div className="border rounded-md p-4 space-y-2 max-h-36 overflow-y-auto">
                  {colleges.map((college) => (
                    <div key={college.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`college-${college.id}`}
                        checked={newExam.collegeIds?.includes(college.id)}
                        onCheckedChange={(checked) => 
                          handleCollegeChange(college.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`college-${college.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {college.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    Exam Date
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      className="pl-8"
                      value={newExam.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Exam Location
                  </label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Main Hall"
                    value={newExam.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="startTime" className="text-sm font-medium">
                    Start Time
                  </label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={newExam.startTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="endTime" className="text-sm font-medium">
                    End Time
                  </label>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={newExam.endTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="totalMarks" className="text-sm font-medium">
                    Total Marks
                  </label>
                  <Input
                    id="totalMarks"
                    name="totalMarks"
                    type="number"
                    value={newExam.totalMarks}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="passingMarks" className="text-sm font-medium">
                    Passing Marks
                  </label>
                  <Input
                    id="passingMarks"
                    name="passingMarks"
                    type="number"
                    value={newExam.passingMarks}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Exam Status
                </label>
                <Select
                  value={newExam.status}
                  onValueChange={(value) => setNewExam(prev => ({ ...prev, status: value as 'upcoming' | 'ongoing' | 'completed' }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <DialogFooter>
                <Button type="submit">Save Exam</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search exams..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Results
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Upload Exam Results</DialogTitle>
              <DialogDescription>
                Upload a CSV file with exam results. The CSV should have student ID and marks columns.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCsvUpload} className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="examId" className="text-sm font-medium">
                  Select Exam
                </label>
                <Select
                  value={selectedExamId}
                  onValueChange={setSelectedExamId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {exams.map(exam => (
                      <SelectItem key={exam.id} value={exam.id}>
                        {exam.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="csv" className="text-sm font-medium">
                  CSV Content
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  Format: student_id,marks
                </p>
                <Textarea
                  id="csv"
                  placeholder="student_id,marks
s1,85
s2,92"
                  className="font-mono text-sm"
                  rows={6}
                  value={csvContent}
                  onChange={(e) => setCsvContent(e.target.value)}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={!selectedExamId || !csvContent}>
                  Upload Results
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Colleges</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Total Marks</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell className="font-medium">
                  {exam.name}
                  <div className="text-xs text-muted-foreground mt-1">{exam.description}</div>
                </TableCell>
                <TableCell>{getCollegeNames(exam.collegeIds)}</TableCell>
                <TableCell>{new Date(exam.date).toLocaleDateString()}</TableCell>
                <TableCell>{`${exam.startTime} - ${exam.endTime}`}</TableCell>
                <TableCell>{exam.totalMarks}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(exam.status)}>
                    {exam.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Exam</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedExamId(exam.id);
                          setIsUploadDialogOpen(true);
                        }}
                      >
                        Upload Results
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredExams.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No exams found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}