import { db } from "../config/firebase";
import { doc, setDoc, updateDoc, deleteDoc, getDoc, collection, addDoc, DocumentData } from "firebase/firestore";


export interface User {
    userId: string;
    email: string;
    password: string;
    phoneNumber: string;
    fullName: string;
    role: 'student' | 'teacher' | 'admin';
    courses?: Array<{
      title: string;
      description: string;
      progress: number;
    }>;
    createdAt: Date;
  }


export const createUserInDB = async (userId: string, userData: Omit<User, "userId" | "createdAt">) => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, {
    ...userData,
    createdAt: new Date().toISOString(),
  });
};

// Fungsi untuk memperbarui user
export const updateUserInDB = async (userId: string, userData: Partial<Omit<User, "userId" | "createdAt">>) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, userData);
};

// Fungsi untuk menghapus user
export const deleteUserInDB = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  await deleteDoc(userRef);
};

// Fungsi untuk mengambil data user dari Firestore
export const getUserFromDB = async (userId: string): Promise<User | undefined> => {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return { userId, ...docSnap.data() } as User;
  }
  return undefined;
};

// Fungsi untuk menambahkan course yang diikuti student
export const addCourseToStudent = async (userId: string, courseData: { title: string; description: string; progress: number }) => {
  const enrolledCoursesCollection = collection(db, `users/${userId}/enrolledCourses`);
  await addDoc(enrolledCoursesCollection, {
    ...courseData,
    enrolledAt: new Date().toISOString(),
  });
};
