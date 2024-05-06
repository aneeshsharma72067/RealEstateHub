import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { firebaseAuth, firestore } from './config';
import { UserCredential } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';


//signup
const signup = async (userData: object) => {
    try {
        const { firstName, lastName, username, email, password } = userData;

        const newUser: UserCredential = await createUserWithEmailAndPassword(
            firebaseAuth,
            email,
            password
        );

        const user: object = {
           uid: newUser.user.uid,
           username,
           firstName,
           lastName,
           email,
           type: 'Buyer' || 'Seller',
           bio: '',
           created_at: serverTimestamp(),
        };

        const result = await addDoc(collection(firestore, "users"), user);

        return {
            success: true,
            error: null,
            userData: user,
        };
    } catch (error) {
        const errorMessage = (error as FirebaseError)?.message;
        return {
            success: false,
            error: errorMessage,
        };
    }
};

export { signup };





