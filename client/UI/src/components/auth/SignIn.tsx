// @ts-ignore
import { sign } from "crypto";
// @ts-ignore
import {auth, provider, signInWithPopup} from "../../../../../database/schemas/firebase";

function SignIn() {
  return (
    <SignUp />
  )
}

function SignUp() {
    const signInWIthGoogle = () => {
        signInWithPopup(auth, provider);
    }
    
  return (
    <button onClick={signInWIthGoogle} className="btn btn-primary">Sign In</button>
    )
}

function UserProfile() {
    return (
        <>
        <UseInfo />
        <SignOutButton />
        </>
    )
}
function UseInfo() {
    return (
        <div className="user-info d-flex align-items-center me-2">
            <img style={{width: "50px", height: "50px"}} className="rounded-circle" src={auth.currentUser?.photoURL} alt="" />
        </div>
    )
}

function SignOutButton() {
    return (
        <div className="d-flex align-items-center"><button className="btn btn-primary me-2 d-flex align-items-center" onClick={() => auth.signOut()} style={{width: "100px", height: "50px"}}>Sign Out</button></div>
        
    )
}

export { UserProfile, SignIn} 