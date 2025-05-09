export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  grade: string;
  enrollmentDate: string;
  avatar?: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentFormData {
  name: string;
  email: string;
  course: string;
  grade: string;
  enrollmentDate: string;
  avatar?: string;
  userId: string;
}

export const courses = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Engineering",
  "Literature",
  "History",
  "Economics"
] as const;

// Mock data for all users
export const mockStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    course: "Computer Science",
    grade: "A",
    enrollmentDate: "2023-01-15",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=6366F1&color=fff",
    userId: "system"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    course: "Engineering",
    grade: "B+",
    enrollmentDate: "2023-02-20",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=6366F1&color=fff",
    userId: "system"
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex@example.com",
    course: "Business",
    grade: "A-",
    enrollmentDate: "2023-03-10",
    avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=6366F1&color=fff",
    userId: "system"
  },
  {
    id: "4",
    name: "Emily Wilson",
    email: "emily.w@example.com",
    course: "Chemistry",
    grade: "B",
    enrollmentDate: "2023-08-10",
    avatar: "https://ui-avatars.com/api/?name=Emily+Wilson&background=6366F1&color=fff",
    userId: "system"
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    course: "Biology",
    grade: "A+",
    enrollmentDate: "2023-09-10",
    avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=6366F1&color=fff",
    userId: "system"
  },
  {
    id: "6",
    name: "Sarah Davi",
    email: "sarah@example.com",
    course: "Engineering",
    grade: "A-",
    enrollmentDate: "2023-08-17",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Davi&background=6366F1&color=fff",
    userId: "system"
  },

];