import db from "@/app/utils/firestore";
import { doc, getDoc } from "firebase/firestore";


export async function GET(request: Request, {params}: {params: {userId: string}}) {
  const userId = params.userId;

  const docRef = doc(db, "userData", userId);

  const docSnap = await getDoc(docRef);
  
  if(docSnap.exists()) {
    const docData = docSnap.data()
    console.log(docData);
    
    return Response.json({body: docData}, {status: 200});
  } else {
    return Response.json({}, {status: 400, statusText: "Could Not Find Document"});
  }

}