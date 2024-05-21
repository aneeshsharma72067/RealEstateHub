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
import { House, Owner, PG, Plot, Rental, User } from "../../@types/schemaType";
import {
  HouseFormData,
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

export const fetchAllHouses = async (): Promise<ResponseData<House[]>> => {
  try {
    const response = await getDocs(
      collection(firestore, firestoreCollections.HOUSES)
    );
    const houses: House[] = response.docs.map((doc) => doc.data()) as House[];
    return {
      success: true,
      data: houses,
    };
  } catch (err) {
    const errorMessage = (err as FirebaseError).message;
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const fetchAllPG = async (): Promise<ResponseData<PG[]>> => {
  try {
    const response = await getDocs(
      collection(firestore, firestoreCollections.PG)
    );
    const pgs: PG[] = response.docs.map((doc) => doc.data()) as PG[];
    return {
      success: true,
      data: pgs,
    };
  } catch (err) {
    const errorMessage = (err as FirebaseError).message;
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const fetchAllRentals = async (): Promise<ResponseData<Rental[]>> => {
  try {
    const response = await getDocs(
      collection(firestore, firestoreCollections.RENTALS)
    );
    const rentals: Rental[] = response.docs.map((doc) =>
      doc.data()
    ) as Rental[];
    return {
      success: true,
      data: rentals,
    };
  } catch (err) {
    const errorMessage = (err as FirebaseError).message;
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const fetchAllPlots = async (): Promise<ResponseData<Plot[]>> => {
  try {
    const response = await getDocs(
      collection(firestore, firestoreCollections.PLOTS)
    );
    const plots: Plot[] = response.docs.map((doc) => doc.data()) as Plot[];
    return {
      success: true,
      data: plots,
    };
  } catch (err) {
    const errorMessage = (err as FirebaseError).message;
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const fetchHousesByOwnerId = async (
  ownerid: string
): Promise<ResponseData<House[]>> => {
  try {
    const response = await getDocs(
      query(
        collection(firestore, firestoreCollections.HOUSES),
        where("ownerid", "==", ownerid)
      )
    );
    const houses: House[] = response.docs.map((doc) => doc.data()) as House[];
    return {
      success: true,
      data: houses,
    };
  } catch (err) {
    const errorMessage = (err as FirebaseError).message;
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const fetchPGByOwnerId = async (
  ownerid: string
): Promise<ResponseData<PG[]>> => {
  try {
    const response = await getDocs(
      query(
        collection(firestore, firestoreCollections.PG),
        where("ownerid", "==", ownerid)
      )
    );
    const pgs: PG[] = response.docs.map((doc) => doc.data()) as PG[];
    return {
      success: true,
      data: pgs,
    };
  } catch (err) {
    const errorMessage = (err as FirebaseError).message;
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const fetchRentalsByOwnerId = async (
  ownerid: string
): Promise<ResponseData<Rental[]>> => {
  try {
    const response = await getDocs(
      query(
        collection(firestore, firestoreCollections.RENTALS),
        where("ownerid", "==", ownerid)
      )
    );
    const rentals: Rental[] = response.docs.map((doc) =>
      doc.data()
    ) as Rental[];
    return {
      success: true,
      data: rentals,
    };
  } catch (err) {
    const errorMessage = (err as FirebaseError).message;
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const fetchPlotsByOwnerId = async (
  ownerid: string
): Promise<ResponseData<Plot[]>> => {
  try {
    const response = await getDocs(
      query(
        collection(firestore, firestoreCollections.PLOTS),
        where("ownerid", "==", ownerid)
      )
    );
    const plots: Plot[] = response.docs.map((doc) => doc.data()) as Plot[];
    return {
      success: true,
      data: plots,
    };
  } catch (err) {
    const errorMessage = (err as FirebaseError).message;
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const addHouse = async (houseData: HouseFormData) => {
  let imageURL: string = "";
  try {
    if (houseData.image) {
      const storageRef = ref(
        storage,
        firebaseStorage.HOUSE(houseData.image.name)
      );
      const imageSnapshot = await uploadBytes(
        storageRef,
        houseData.image as Blob
      );
      imageURL = await getDownloadURL(imageSnapshot.ref);
    }

    const newHouseId = uuid4();
    const house: House = {
      house_id: newHouseId,
      title: houseData.title,
      address: {
        city: houseData.city,
        landmark: houseData.landmark,
        postalCode: Number(houseData.zipcode),
        latitude: 0,
        longitude: 0,
        state: houseData.state,
        address1: houseData.address1,
      },
      amenities: [],
      bhk: {
        bathrooms: houseData.bathroom,
        bedroom: houseData.bedroom,
        hall: houseData.hall,
        kitchen: houseData.kitchen,
      },
      description: houseData.description,
      floors: houseData.floors,
      has_garage: houseData.has_garage,
      is_furnished: houseData.is_furnished,
      has_pool: houseData.has_pool,
      distance_to_market: 0,
      ownerid: houseData.ownerid,
      parking_spaces: houseData.parking_spaces,
      price: houseData.price,
      imageUrl: imageURL,
      square_footage: houseData.square_footage,
      created_at: serverTimestamp(),
    };
    const newHouse = await addDoc(
      collection(firestore, firestoreCollections.HOUSES),
      house
    );
    return {
      success: true,
      data: newHouse,
    };
  } catch (err) {
    const errorMessage = (err as FirebaseError).message;
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const getHouseData = async (houseid: string) => {
  try {
    const houseSnapShot = await getDocs(
      query(
        collection(firestore, firestoreCollections.HOUSES),
        where("house_id", "==", houseid)
      )
    );
    return {
      success: true,
      data: houseSnapShot.docs[0].data(),
    };
  } catch (err) {
    const errorMessage = (err as FirebaseError).message;
    return {
      success: false,
      error: errorMessage,
    };
  }
};
