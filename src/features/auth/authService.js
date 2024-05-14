import {auth} from '../../firebase/config';
import { createUserWithEmailAndPassword,updateProfile , signInWithEmailAndPassword, signOut} from 'firebase/auth';

const register=async (email,parola,kullaniciAd)=>{

    const userResponse= await createUserWithEmailAndPassword(auth,email,parola);

     if (userResponse.user) {

        await updateProfile(userResponse.user,{
            displayName:kullaniciAd

        })

        localStorage.setItem('user',JSON.stringify(userResponse.user))
     }

     return userResponse.user
}

const login=async(email,parola)=>{

    const userResponse= await signInWithEmailAndPassword(auth,email,parola);

    if (userResponse.user) {
        
        localStorage.setItem('user',JSON.stringify(userResponse.user))
    }

    return userResponse.user
}

const logout=async()=>{

    await signOut(auth);
    localStorage.removeItem('user');
}


const authService={
    register,
    login,
    logout

}

export default authService