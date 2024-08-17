import { firebaseAuth } from "@/app/utils/firebase";

export async function GET(request: Request) {
  try {
    const currentUser = firebaseAuth.currentUser;
    
    if (currentUser === null)
      return Response.json({body: currentUser}, {status: 200});
    else 
      return Response.json({body: currentUser.getIdToken()}, {status: 200});

  }
  catch (e) {
    return Response.json({}, {status: 404, statusText: "Error checking for current user."});
  }
  

}

export async function POST(request: Request) {

}