import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const signIn = (email, password, callback) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            callback(null, userCredential);
        })
        .catch((err) => {
            callback(handleError(err.code), null);
        }
        );
};

const createUser = (email, password, callback) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            callback(null, userCredential);
        })
        .catch((err) => {
            callback(err, null);
        }
        );
}

const getUser = (callback) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        callback(null, user);
    })
}
const authStateChanged = (callback) => {
    const auth = getAuth();
    onAuthStateChanged(auth, callback);
}

const signOutUser = (callback) => {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            callback(null, null);
        })
        .catch((err) => {
            callback(err, null);
        }
        );
}
const handleError = (err) => {
    if(err== "auth/user-not-found")return "User not found";
    if(err== "auth/wrong-password")return "Wrong password";
    if(err== "auth/internal-error")return "Internal error";
    if(err== "auth/invalid-email")return "Invalid email";
    if(err== "auth/email-already-in-use")return "Email already in use";
    if(err== "auth/weak-password")return "Weak password";
    if(err== "auth/network-request-failed")return "Network request failed";
    if(err== "auth/too-many-requests")return "Too many requests";
    if(err== "auth/user-disabled")return "User disabled";
    if(err== "auth/operation-not-allowed")return "Operation not allowed";
    if(err== "auth/requires-recent-login")return "Requires recent login";
    if(err== "auth/user-token-expired")return "User token expired";
    if(err== "auth/web-storage-unsupported")return "Web storage unsupported";
    if(err== "auth/invalid-api-key")return "Invalid api key";
    if(err== "auth/app-deleted")return "App deleted";
    if(err== "auth/invalid-credential")return "Invalid credential";
    if(err== "auth/invalid-verification-code")return "Invalid verification code";
    else return "Unknown error";
}

export { signIn, createUser,getUser,signOutUser };