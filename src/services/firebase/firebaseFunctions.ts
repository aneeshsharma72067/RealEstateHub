import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  firebaseAuth,
  firebaseStorage,
  firestore,
  firestoreCollections,
  storage,
} from "./config";
import {
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { Owner, User } from "../../@types/schemaType";
import {
  LoginFormData,
  OwnerFormData,
  SignUpFormData,
} from "../../@types/formTypes";
import { ResponseData } from "../../@types/returnTypes";
import { v4 as uuid4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

    const result = await addDoc(
      collection(firestore, firestoreCollections.USERS),
      user
    );

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
      query(
        collection(firestore, firestoreCollections.USERS),
        where("email", "==", email)
      )
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
      query(
        collection(firestore, firestoreCollections.USERS),
        where("uid", "==", uid)
      )
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

export const createOwner = async (
  uid: string,
  ownerData: OwnerFormData
): Promise<ResponseData<Owner>> => {
  try {
    let imageUrl: string = "";
    if (ownerData.avatar) {
      const storageRef = ref(
        storage,
        firebaseStorage.AVATAR(ownerData.avatar.name)
      );
      const imageSnapshot = await uploadBytes(
        storageRef,
        ownerData.avatar as Blob
      );
      imageUrl = await getDownloadURL(imageSnapshot.ref);
    }

    const newOwnerId: string = uuid4();

    const owner: Owner = {
      uid: uid,
      ownerid: newOwnerId,
      phoneNumber: ownerData.phone,
      properties: {
        houses: [],
        pg: [],
        plots: [],
        rental: [],
      },
      avatarUrl: imageUrl,
      company: ownerData.company,
    };

    const newOwner = await addDoc(
      collection(firestore, firestoreCollections.OWNERS),
      owner
    );

    const querySnapshot = await getDocs(
      query(
        collection(firestore, firestoreCollections.USERS),
        where("uid", "==", uid)
      )
    );
    querySnapshot.forEach(async (item) => {
      const userRef = doc(firestore, firestoreCollections.USERS, item.id);
      await updateDoc(userRef, {
        ownerid: newOwnerId,
      });
    });
    return {
      success: true,
      data: owner,
    };
  } catch (err) {
    const errorMessage = (err as FirebaseError).message;
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const getOwnerData = async (
  ownerid: string
): Promise<ResponseData<Owner>> => {
  try {
    const userSnapshot = await getDocs(
      query(
        collection(firestore, firestoreCollections.OWNERS),
        where("ownerid", "==", ownerid)
      )
    );
    if (userSnapshot.empty) {
      throw Error("You are not an owner !!");
    }
    return {
      success: true,
      data: userSnapshot.docs[0].data() as Owner,
    };
  } catch (err) {
    const errorMessage = (err as FirebaseError).message;
    return {
      success: false,
      error: errorMessage,
    };
  }
};
