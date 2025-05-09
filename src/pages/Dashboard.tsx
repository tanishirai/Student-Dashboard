import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Student, courses } from "@/types/student";
import { Users, BookOpen, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { fetchStudents } from "@/services/studentService";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        const data = await fetchStudents();
        setStudents(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load student data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, [toast]);

  const { totalStudents, courseDistribution } = useMemo(() => {
    const total = students.length;
    const distribution = courses.map(course => ({
      course,
      count: students.filter(student => student.course === course).length
    })).sort((a, b) => b.count - a.count).slice(0, 5);

    return { totalStudents: total, courseDistribution: distribution };
  }, [students]);

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {currentUser ? "Dashboard" : "Student Information"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {currentUser 
              ? `Welcome, ${currentUser.email?.split('@')[0][0].toUpperCase()}${currentUser.email?.split('@')[0].slice(1)} to StudentOps`
              : "Public student data"}
          </p>
        </div>

        {currentUser && (
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button asChild className="bg-student-primary hover:bg-student-secondary">
              <Link to="/add-student">
                <Plus className="mr-2 h-4 w-4" />
                Add New Student
              </Link>
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Students</CardTitle>
            <CardDescription>All registered students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 bg-student-primary/10 p-3 rounded-full">
                <Users className="h-8 w-8 text-student-primary" />
              </div>
              {loading ? (
                <Skeleton className="h-12 w-20" />
              ) : (
                <div>
                  <p className="text-3xl font-bold">{totalStudents}</p>
                  <p className="text-sm text-gray-500">Enrolled</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Courses</CardTitle>
            <CardDescription>Available courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 bg-student-secondary/10 p-3 rounded-full">
                <BookOpen className="h-8 w-8 text-student-secondary" />
              </div>
              {loading ? (
                <Skeleton className="h-12 w-20" />
              ) : (
                <div>
                  <p className="text-3xl font-bold">{courses.length}</p>
                  <p className="text-sm text-gray-500">Total Courses</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Quick Access</CardTitle>
            <CardDescription>Common actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="outline" className="w-full justify-between">
              <Link to="/students">
                View All Students
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            {currentUser && (
              <Button asChild variant="outline" className="w-full justify-between">
                <Link to="/add-student">
                  Add New Student
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Course Distribution</CardTitle>
          <CardDescription>Students enrolled per course (Top 5)</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-6 w-12" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {courseDistribution.length > 0 ? (
                courseDistribution.map((item) => (
                  <div key={item.course} className="flex flex-col">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.course}</span>
                      <span className="text-gray-500">{item.count} students</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-student-primary h-2 rounded-full"
                        style={{
                          width: `${totalStudents > 0 ? (item.count / totalStudents) * 100 : 0}%`
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No course distribution data available
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;