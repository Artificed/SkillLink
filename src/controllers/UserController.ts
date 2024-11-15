import { createUserInDB, updateUserInDB, deleteUserInDB, getUserFromDB, addCourseToStudent } from "../models/User";
import { User } from "../models/User";
import { DocumentData } from "firebase/firestore";
import { createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { getFirebaseErrorMessage } from "../utils/FirebaseError";

export const createUser = async (
  userData: { email: string; password: string },
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    onSuccess();
  } catch (error) {
    const errorCode = (error as any).code;
    const errorMessage = getFirebaseErrorMessage(errorCode);
    onError(errorMessage);
  }
};

export const signIn = async (
  email: string,
  password: string,
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    onSuccess();
  } catch (error) {
    const errorCode = (error as any).code;
    const errorMessage = getFirebaseErrorMessage(errorCode);
    onError(errorMessage);
  }
};
  

export const updateUser = async (
  userId: string,
  userData: Partial<Omit<User, "userId" | "createdAt">>,
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

