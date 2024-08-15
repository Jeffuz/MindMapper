import db from "@/app/utils/firestore";
import { collection, getDocs, query, doc, where, addDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  const body = await request.json()

  if(!("email" in body)) {
    return Response.json({}, {status: 404, statusText: "Body Missing Field"});
  }
  console.log(body)

  const waitlistRef = collection(db, 'waitlist');

  const q = query(waitlistRef, where("email", "==", body.email));

  const querySnapshot = await getDocs(q);

  // Waitlist user already exists
  if (!querySnapshot.empty)
    return Response.json({message: "Email is already waitlisted"}, {status: 200})

  const newUser = {
    email: body.email
  }

  try {
    const docRef = await addDoc(waitlistRef, newUser)    
    console.log(docRef.id);
  } 
  catch (e) {
    console.error(e);
    return Response.json({message: "Failed To Add to waitlist"}, {status: 200});
  }

  return Response.json({message: "Successfully added to waitlist"}, {status: 200});
}