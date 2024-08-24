import db from "@/app/utils/firestore";
import stripe from "@/app/utils/stripe";
import { subscriptionType, productId } from "@/app/utils/subscriptionType";
import { doc, updateDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  const body = await req.json();

  if(!("stripeId" in body) || !("subType" in body) || !("userId" in body))
    return Response.json({}, {status: 404, statusText: "Body Missing Field"});

  const stripeId = body.stripeId // Stripe Customer id
  const subType = body.subType 
  const userId = body.userId // User Id
  
  let prodId = ""
  let tier = "";

  if(subType == "Basic") { //subscriptionType.monthly
    prodId = productId.basic_monthly
    tier = "Basic"
  }
    
  else {
    prodId = productId.pro_monthly
    tier = "Pro"
  }
    
   
  // Todo Test if new subscription will override old one or we must cancel old one first.
  // Generate Subscription for user
  
  try {
    const subscription = await stripe.subscriptions.create({
      customer: stripeId,
      items: [{
        price: prodId
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],

    });

    // Add Subscription id to user document
    const docRef = doc(db, "userData", userId)
    const subId = subscription.id

    updateDoc(docRef, {
      subscription: subId,
      tier: tier
    })

    return Response.json({
      subscriptionId: subId,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
    


  } catch (e) {
    return Response.json({}, {status: 400, statusText: e.message})
  }
}

//Todo Finish Delete
// Cancel Subscription
export async function DELETE(res: Response) {
  const body = await res.json();

  if(!("stripeId" in body) || !("userId" in body) || !("subId" in body))
  return Response.json({}, {status: 404, statusText: "Body Missing Field"});
  
  const subscription = await stripe.subscriptions.cancel(body.subId);
}