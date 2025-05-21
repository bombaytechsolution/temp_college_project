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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  getMembers, 
  addMember, 
  getColleges
} from '@/lib/utils/data-utils';
import { Member, Permission } from '@/lib/types';
import { 
  PlusCircle, 
  Search, 
  MoreHorizontal,
  Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(getMembers());
  const colleges = getColleges();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const permissions: { value: Permission; label: string }[] = [
    { value: 'manage_colleges', label: 'Manage Colleges' },
    { value: 'manage_exams', label: 'Manage Exams' },
    { value: 'manage_students', label: 'Manage Students' },
    { value: 'manage_members', label: 'Manage Members' },
    { value: 'view_reports', label: 'View Reports' },
    { value: 'upload_results', label: 'Upload Results' },
  ];
  
  const [newMember, setNewMember] = useState<Partial<Member>>({
    name: '',
    email: '',
    phone: '',
    role: 'employee',
    permissions: [],
    collegeIds: [],
  });

  // Filter members based on search query
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle permission selection
  const handlePermissionChange = (permission: Permission, isChecked: boolean) => {
    setNewMember(prev => {
      const currentPermissions = prev.permissions || [];
      return {
        ...prev,
        permissions: isChecked
          ? [...currentPermissions, permission]
          : currentPermissions.filter(p => p !== permission)
      };
    });
  };

  // Handle college selection
  const handleCollegeChange = (collegeId: string, isChecked: boolean) => {
    setNewMember(prev => {
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
    const createdMember = addMember(newMember as Omit<Member, 'id'>);
    setMembers(prev => [...prev, createdMember]);
    setNewMember({
      name: '',
      email: '',
      phone: '',
      role: 'employee',
      permissions: [],
      collegeIds: [],
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Members</h2>
          <p className="text-muted-foreground">
            Manage system users and their permissions
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription>
                Enter the member's details and set their permissions.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., John Smith"
                    value={newMember.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role
                  </label>
                  <Select
                    value={newMember.role}
                    onValueChange={(value) => setNewMember(prev => ({ ...prev, role: value as 'admin' | 'employee' }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g., john@example.com"
                    value={newMember.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="e.g., (123) 456-7890"
                    value={newMember.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Permissions</Label>
                <div className="border rounded-md p-4 grid grid-cols-2 gap-2">
                  {permissions.map((permission) => (
                    <div key={permission.value} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`permission-${permission.value}`}
                        checked={newMember.permissions?.includes(permission.value)}
                        onCheckedChange={(checked) => 
                          handlePermissionChange(permission.value, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`permission-${permission.value}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permission.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  College Access
                  <span className="text-xs text-muted-foreground ml-2">
                    (Leave empty for access to all colleges)
                  </span>
                </Label>
                <div className="border rounded-md p-4 grid grid-cols-2 gap-2 max-h-36 overflow-y-auto">
                  {colleges.map((college) => (
                    <div key={college.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`college-${college.id}`}
                        checked={newMember.collegeIds?.includes(college.id)}
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
              
              <DialogFooter>
                <Button type="submit">Save Member</Button>
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
            placeholder="Search members..."
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
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>
                  <Badge variant={member.role === 'admin' ? 'default' : 'outline'}>
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {member.permissions.length > 2 ? (
                      <>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          {member.permissions.length} permissions
                        </Badge>
                      </>
                    ) : (
                      member.permissions.map((permission) => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                          {permission.replace('_', ' ')}
                        </Badge>
                      ))
                    )}
                  </div>
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
                      <DropdownMenuItem>Edit Member</DropdownMenuItem>
                      <DropdownMenuItem>Manage Permissions</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredMembers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No members found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}