import { createUserInDB, updateUserInDB, deleteUserInDB, getUserFromDB, addCourseToStudent } from "../models/user";
import { User } from "../models/user";
import { DocumentData } from "firebase/firestore";

// Fungsi untuk membuat user baru
export const createUser = async (
  userId: string,
  userData: Omit<User, "userId" | "createdAt">, // Menghilangkan userId dan createdAt dari parameter
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  try {
    await createUserInDB(userId, userData);
    onSuccess();
  } catch (error) {
    onError("Failed to create user");
  }
};

// Fungsi untuk memperbarui data user
export const updateUser = async (
  userId: string,
  userData: Partial<Omit<User, "userId" | "createdAt">>, // Partial memungkinkan beberapa field kosong
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  try {
    await updateUserInDB(userId, userData);
    onSuccess();
  } catch (error) {
    onError("Failed to update user");
  }
};

// Fungsi untuk menghapus user
export const deleteUser = async (
  userId: string,
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  try {
    await deleteUserInDB(userId);
    onSuccess();
  } catch (error) {
    onError("Failed to delete user");
  }
};

// Fungsi untuk mengambil data user
export const getUser = async (
  userId: string,
  onSuccess: (data: DocumentData | undefined) => void,
  onError: (error: string) => void
) => {
  try {
    const data = await getUserFromDB(userId);
    if (data) {
      onSuccess(data);
    } else {
      onError("No user found");
    }
  } catch (error) {
    onError("Failed to fetch user data");
  }
};

// Fungsi untuk mendaftarkan student ke course (enroll)
export const enrollCourse = async (
  userId: string,
  courseData: { title: string; description: string; progress: number },
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  try {
    await addCourseToStudent(userId, courseData);
    onSuccess();
  } catch (error) {
    onError("Failed to enroll in course");
  }
};
