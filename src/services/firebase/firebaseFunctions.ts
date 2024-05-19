import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { firebaseAuth, firestore } from "./config";
import {
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { User } from "../../@types/schemaType";
import { LoginFormData, SignUpFormData } from "../../@types/formTypes";
import { ResponseData } from "../../@types/returnTypes";

//signup
export const signup = async (
  userData: SignUpFormData
): Promise<ResponseData<User>> => {
  try {
    const { email, password } = userData;

    const newUser: UserCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    const user: User = {
      uid: newUser.user.uid,
      firstname: "",
      lastname: "",
      email,
      username: "",
      bio: "",
      created_at: serverTimestamp(),
    };

    const result = await addDoc(collection(firestore, "users"), user);

    return {
      success: true,
      error: null,
      data: user,
    };
  } catch (error) {
    const errorMessage = (error as FirebaseError)?.message;
    return {
      success: false,
      error: errorMessage,
      data: null,
    };
  }
};

export const login = async (
  formData: LoginFormData
): Promise<ResponseData<User>> => {
  try {
    const { email, password } = formData;

    const getUser = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const userSnapshot = await getDocs(
      query(collection(firestore, "users"), where("email", "==", email))
    );

    const userData = userSnapshot.docs[0].data();
    console.log(userData);
    return {
      success: true,
      error: null,
      data: userData as User,
    };
  } catch (err) {
    const errorMessage = (err as FirebaseError).message;
    return {
      success: false,
      error: errorMessage,
      data: null,
    };
  }
};

export const logout = async (): Promise<ResponseData> => {
  try {
    const res = await signOut(firebaseAuth);
    return {
      success: true,
      error: null,
    };
  } catch (err) {
    const errorMessage = (err as FirebaseError).message;
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const getUserData = async (uid: string): Promise<ResponseData<User>> => {
  try {
    const userSnapshot = await getDocs(
      query(collection(firestore, "users"), where("uid", "==", uid))
    );
    if (userSnapshot.empty) {
      throw Error("User does not exist's !!");
    }
    return {
      success: true,
      data: userSnapshot.docs[0].data() as User,
    };
  } catch (err) {
    const errorMessage = (err as FirebaseError).message;
    return {
      success: false,
      error: errorMessage,
    };
  }
};
