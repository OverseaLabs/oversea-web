"use client";

import LoadingContainer from "@/components/LoadingContainer";
import PaymentForm from "@/components/PaymentForm";
import { hasPaymentMethod } from "@/util/payment";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51NzmxkLazelZRUiYyfwthrF10jlM4aMVAEhZWusjSE42k6LvQaoMYKr3bUnpUMc9RKpUD3yLNSuaVexaYxsvGATD00CxQHLLeb"
);

export default function Payments() {
  const [id, setId] = useState<string>("");
  useEffect(() => {
    // const hasPaymentMethod = async () => {
    //   const response = await fetch("/api/payments/check-payment-method", {
    //     method: "POST",
    //     credentials: "include",
    //   });

    //   let data = await response.json();

    //   return data.status;
    // };

    const doWork = async () => {
      const hasP = await hasPaymentMethod();

      if (hasP) {
        // redirect to continue to train
      }

      const response = await fetch("/api/payments/create", {
        body: JSON.stringify({ email: "nevinpuri1901@gmail.com" }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data: any = await response.json();
      console.log("data", data);
      setId(data.clientSecret);
    };
    doWork();
  }, []);

  if (id === "") {
    return <LoadingContainer />;
  }
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-base tracking-tight text-gray-900 mb-4">
        Enter Payment Details
      </h1>
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: id,
          // "pi_3NznIYLazelZRUiY2yBV5pAp_secret_XKBecWeUc9SlxbXfATc9x3mOd",
          appearance: {
            theme: "stripe",
          },
        }}
      >
        <PaymentForm />
      </Elements>
    </div>
  );
}
