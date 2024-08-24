import db from "@/app/utils/firestore";
import stripe from "@/app/utils/stripe";
import { doc, setDoc } from "firebase/firestore";


// Create new stripe customer
export async function POST(req: Request) {
  const body = await req.json()
  

  if(!("email" in body) || !("name" in body) || !("userId" in body))
    return Response.json({}, {status: 404, statusText: "Body Missing Field"});

  const name = body.name
  const email = body.email
  const userId = body.userId

  try {
    const customer = await stripe.customers.create({
      name: name,
      email: email
    });

    const customerId = customer.id

    const docRef = doc(db, "userData", userId);

    await setDoc(docRef, {
      name: name,
      stripeId: customerId,
      tier: "free"
    });

  } catch (e) { 
    console.log("could not create new stripe customer");
    return Response.json({}, {status: 404, statusText: "Could Not Create New Stripe User"});
  }

  return Response.json({}, {status: 200});

}

