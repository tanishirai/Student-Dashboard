import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Student } from "@/types/student";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Mail, BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchStudentById } from "@/services/studentService";

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStudent = async () => {
      if (!id) {
        setError("Student ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchStudentById(id);
        setStudent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load student");
        toast({
          title: "Error",
          description: "Could not load student data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, [id, toast]);

  const goBack = () => navigate(-1);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={goBack} className="mr-4">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Student Details</h1>
      </div>

      {error ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-10">
              <p className="text-xl font-medium text-red-500 mb-2">{error}</p>
              <Button onClick={goBack}>Go back to students</Button>
            </div>
          </CardContent>
        </Card>
      ) : loading ? (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-[200px]" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-24 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : student ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4 md:mb-0">
              <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback className="bg-student-primary text-xl text-white">
                  {student.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                <p className="text-gray-500">{student.email}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-student-accent/20 text-student-primary">
                Grade: {student.grade}
              </span>
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-student-secondary/20 text-student-secondary">
                {student.course}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Student Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-student-primary mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Course</p>
                    <p className="font-medium">{student.course}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-student-primary mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{student.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-student-primary mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Enrollment Date</p>
                    <p className="font-medium">
                      {new Date(student.enrollmentDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Academic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-36">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-student-primary mb-2">{student.grade}</div>
                    <p className="text-gray-500">Current Grade</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StudentDetail;