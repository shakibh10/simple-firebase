import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useState } from "react";

const Login = () => {

    const[user,setUser]=useState(null);

    const auth=getAuth(app);
    console.log(app);

    const Googleprovider=new GoogleAuthProvider();

    const GitHubProvider=new GithubAuthProvider();

    const handleSignIn=()=>{
        signInWithPopup(auth,Googleprovider)
        .then(result=>{
            const loggedInUser=result.user;
            setUser(loggedInUser);
        })
        .catch(error=>{
            console.log('error',error.message);
        })
    }

    const GithubSignIn=()=>{
        signInWithPopup(auth,GitHubProvider)
        .then(result=>{
            const loggedUser=result.user;
            setUser(loggedUser);
        })
        .catch(error=>{
            console.log(error);
        })
    }


    const handleSignOut=()=>{
        signOut(auth)
        .then(result=>{
            console.log(result);
            setUser(null)
        })
        .catch(error=>{
            console.log(error);
        })
    }




    return (
        <div>
            {
                user?<button onClick={handleSignOut}>Sign Out</button>:
                <div className="">
                    <button onClick={handleSignIn}>Google Login</button>
                    <button onClick={GithubSignIn}>Github Login</button>
                </div>
            }

    { user && <div className="">
        <h2>User:{user.displayName}</h2>
        <h2>Email:{user.email}</h2>
        <img src={user.photoURL} alt="" />
    </div>}
        </div>
    );
};

export default Login;