import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, School } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center">
          <School className="h-6 w-6" />
          <span className="ml-2 text-xl font-bold">ExamMaster</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link 
            href="#features" 
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Features
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Streamline College Exam Management
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Efficiently manage multiple colleges, exams, and student records with our comprehensive dashboard solution.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button className="inline-flex h-10 items-center justify-center gap-2">
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Key Features
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to manage college exams efficiently
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">College Management</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Add and manage multiple colleges with detailed information and contact details.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Exam Organization</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Create exams, assign them to specific colleges, and track their status and results.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Student Records</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Maintain comprehensive student profiles with enrollment details and exam performance.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">CSV Results Upload</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Easily upload exam results through CSV for quick and accurate data entry.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Role-Based Access</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Control system access with admin and employee roles with granular permissions.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Performance Analytics</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Visualize exam performance with powerful charts and analytics tools.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 ExamMaster. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}