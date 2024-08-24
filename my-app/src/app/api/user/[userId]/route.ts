import db from "@/app/utils/firestore";
import { doc, getDoc } from "firebase/firestore";

export async function GET(request: Request, { params } : {params: {userId:string} }) {
  const userId = params.userId;

  const docRef = doc(db, "userData", userId);

  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return Response.json({body: docSnapshot.data()}, {status: 200});
  }

  return Response.json({}, {status: 400, statusText: "Could Not get User Data"}); 
}