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
import { getColleges, addCollege } from '@/lib/utils/data-utils';
import { College } from '@/lib/types';
import { PlusCircle, Search } from 'lucide-react';

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>(getColleges());
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCollege, setNewCollege] = useState<Partial<College>>({
    name: '',
    location: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    establishedYear: new Date().getFullYear(),
  });

  // Filter colleges based on search query
  const filteredColleges = colleges.filter(college => 
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCollege(prev => ({
      ...prev,
      [name]: name === 'establishedYear' ? parseInt(value) : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const createdCollege = addCollege(newCollege as Omit<College, 'id'>);
    setColleges(prev => [...prev, createdCollege]);
    setNewCollege({
      name: '',
      location: '',
      contactEmail: '',
      contactPhone: '',
      address: '',
      establishedYear: new Date().getFullYear(),
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Colleges</h2>
          <p className="text-muted-foreground">
            Manage colleges and institutions
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add College
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New College</DialogTitle>
              <DialogDescription>
                Enter the details of the new college. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    College Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Westlake University"
                    value={newCollege.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location
                  </label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., San Francisco, CA"
                    value={newCollege.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="contactEmail" className="text-sm font-medium">
                    Contact Email
                  </label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    placeholder="e.g., info@college.edu"
                    value={newCollege.contactEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contactPhone" className="text-sm font-medium">
                    Contact Phone
                  </label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    placeholder="e.g., (123) 456-7890"
                    value={newCollege.contactPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Address
                </label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Full address"
                  value={newCollege.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="establishedYear" className="text-sm font-medium">
                  Established Year
                </label>
                <Input
                  id="establishedYear"
                  name="establishedYear"
                  type="number"
                  min="1800"
                  max={new Date().getFullYear()}
                  value={newCollege.establishedYear}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save College</Button>
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
            placeholder="Search colleges..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Contact Email</TableHead>
              <TableHead>Contact Phone</TableHead>
              <TableHead>Established</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredColleges.map((college) => (
              <TableRow key={college.id}>
                <TableCell className="font-medium">{college.name}</TableCell>
                <TableCell>{college.location}</TableCell>
                <TableCell>{college.contactEmail}</TableCell>
                <TableCell>{college.contactPhone}</TableCell>
                <TableCell>{college.establishedYear}</TableCell>
              </TableRow>
            ))}
            {filteredColleges.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No colleges found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}