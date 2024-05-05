import { collection, getDocs, query, where } from 'firebase/firestore';
import { firebaseAuth, firestore } from './config';
import { hashSync } from 'bcryptjs';
import { createUserWithEmailAndPassword } from 'firebase/auth';

//signup
const signup = async (formData: object) => {
    const { firstName, lastName, username, email, password } = formData;

    const existingEmail = await getDocs(
        query(collection(firestore, 'users'), where('email', '==', email))
    );
    if (!existingEmail.empty) {
        return { error: 'Email already exists' };
    }

    const existingUsername = await getDocs(
        query(collection(firestore, "users"), where("username", "==", username))
    );

    if (!existingUsername.empty) {
        throw Error("Username is already taken");
    } 

    const hashPassowrd = hashSync(password, 10);
    const newUser = await createUserWithEmailAndPassword(firebaseAuth, email, hashPassowrd);
}




