import { signInUser } from "@/app/utils/firebaseAuthUtil";
import { firebaseAuth } from '../../utils/firebase';

export async function POST(request: Request) {

  const body = await request.json();

  if(!("email" in body) || !("password" in body))
    return Response.json({}, {status: 404, statusText: "Body Missing Field"});


  const email = String(body.email);
  const password = String(body.password);

  const response = await signInUser(firebaseAuth, email, password);
  
  if ("errorCode" in response) {
    return Response.json({message: "Incorrect Email or Password"}, {status: 200});
  }

  return Response.json({}, {status: 200});
}