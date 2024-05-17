import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firebaseAuth, firestore } from "./config";
import { UserCredential } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { User } from "../../@types/schemaType";
import { SignUpFormData } from "../../@types/formTypes";
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

