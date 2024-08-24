import db from "@/app/utils/firestore";
import { collection, addDoc } from "firebase/firestore";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY);

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

    const collectionRef = collection(db, "userData");
    await addDoc(collectionRef, {
      id: userId,
      name: name,
      stripeId: customerId
    });
  } catch (e) { 
    console.log("could not create new stripe customer");
    return Response.json({}, {status: 404, statusText: "Could Not Create New Stripe User"});
  }

  return Response.json({}, {status: 200});

}