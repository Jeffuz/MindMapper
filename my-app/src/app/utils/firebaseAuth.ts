import { getAuth } from "firebase/auth";
import firebaseApp from "./firebase";


// Initialize Firebase Authentication and get a reference to the service
const firebaseAuth = getAuth(firebaseApp);
export default firebaseAuth;