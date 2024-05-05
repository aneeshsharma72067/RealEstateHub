import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { firebaseAuth, firestore } from './config';
import { hashSync } from 'bcryptjs';
import { createUserWithEmailAndPassword } from 'firebase/auth';


//signup
const signup = async (formData: object) => {
    try {
        const { firstName, lastName, username, email, password } = formData;

        const existingEmail = await getDocs(
            query(collection(firestore, 'users'), where('email', '==', email))
        );
        if (!existingEmail.empty) {
            throw new Error('Email already exists');
        }

        const existingUsername = await getDocs(
            query(collection(firestore, "users"), where("username", "==", username))
        );
        if (!existingUsername.empty) {
            throw new Error('Username is already taken');
        }

        const hashPassowrd = hashSync(password, 10);
        const newUser = await createUserWithEmailAndPassword(firebaseAuth, email, hashPassowrd);

        if (!newUser) {
            throw Error("Failed to create user");
        }

        const result = await addDoc(collection(firestore, 'users'), {
            user_id: newUser.user.uid,
            username: username,
            description: '',
            firstName: firstName,
            lastName: lastName,
            email: email,
            type: 'Buyer' || 'Seller',
            created_at: serverTimestamp(),
            password: hashPassowrd,
        });


        if (!result) {
            throw Error("Failed to create user");
        }
        return result;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { signup };




