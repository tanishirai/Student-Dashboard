import { collection, query, where, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { Student, StudentFormData, mockStudents } from "@/types/student";

export const fetchStudents = async (): Promise<Student[]> => {
  const auth = getAuth();
  const user = auth.currentUser;

  try {
    // Always include mock data
    let students: Student[] = [...mockStudents];

    if (user) {
      // Fetch user-specific data from Firestore
      const q = query(
        collection(db, "students"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      
      const firestoreStudents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        course: doc.data().course,
        grade: doc.data().grade,
        enrollmentDate: doc.data().enrollmentDate,
        avatar: doc.data().avatar || '',
        userId: doc.data().userId
      }));

      // Combine mock data with user data
      students = [...students, ...firestoreStudents];
    }

    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
    return mockStudents; // Fallback to mock data
  }
};

export const fetchStudentById = async (id: string): Promise<Student> => {
  // First check mock data
  const mockStudent = mockStudents.find(student => student.id === id);
  if (mockStudent) return mockStudent;

  const auth = getAuth();
  const user = auth.currentUser;

  try {
    const docRef = doc(db, "students", id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error("Student not found");
    }
    
    const data = docSnap.data();
    
    if (user && data.userId !== user.uid) {
      throw new Error("Unauthorized access");
    }
    
    return {
      id: docSnap.id,
      name: data.name,
      email: data.email,
      course: data.course,
      grade: data.grade,
      enrollmentDate: data.enrollmentDate,
      avatar: data.avatar || '',
      userId: data.userId
    };
  } catch (error) {
    console.error("Error fetching student:", error);
    throw error;
  }
};

export const createStudent = async (studentData: StudentFormData): Promise<Student> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const newStudent = {
      ...studentData,
      createdAt: new Date().toISOString(),
      avatar: studentData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(studentData.name)}&background=6366F1&color=fff`
    };

    const docRef = await addDoc(collection(db, "students"), newStudent);
    
    return {
      id: docRef.id,
      ...newStudent
    };
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};