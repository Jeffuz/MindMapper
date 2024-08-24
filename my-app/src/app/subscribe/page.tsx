'use client'

import React, {useEffect, useState} from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from 'next/navigation';
import { firebaseAuth } from "../utils/firebase";
import CheckoutForm from "../components/subscription/checkoutForm";


export default function Page() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [user, setUser] = useState<any>(null)

  const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  const router =  useRouter();
  const search = useSearchParams();
  const subType = search.get("subType")
  const subPaymentCycle = search.get("subPaymentCycle")

  firebaseAuth.onAuthStateChanged(async (currentUser) => {
    if(user === null)
      setUser(currentUser)
    
    if (currentUser === null)
      router.push("/signin");
  });

  useEffect(() => {
    
    async function getPayment() {
      const id = await getStripeId();

      await createPayment(id);
      
    }
    if (user) {
      getPayment()
    }
  }, [user])
  
  // Returns user stripe id
  const getStripeId = async () => {
    const id = await fetch(`/api/stripeUser/${user.uid}`, { method: "GET", headers: {"Content-Type": "application/json"} })
    .then(response => response.json())
    .then(data => data.body)
    .then(body => body.stripeId)
    .catch(e => console.log(e));

    return id
  }

  // Generate Stripe Payment that user will go through
  const createPayment = async(id: string) => {
    fetch("/api/stripePay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stripeId: id,
        subType: subType,
        userId: user.uid,
        subPaymentCycle: subPaymentCycle
       }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      // Client Secrete used for payment
      setClientSecret(data.clientSecret)
      })
    .catch(e => {
      console.log(e)
    });

      
  }

  // Settings for stripe payment page
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };


  return (
    <div className="p-10 md:pl-[35%] md:pr-[35%]">
      {clientSecret && (
        <Elements options={options} stripe={stripe}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );    

}