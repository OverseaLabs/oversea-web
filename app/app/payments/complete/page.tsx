"use client";

import LoadingContainer from "@/components/LoadingContainer";
import PaymentIntentMessage from "@/components/PaymentIntentMessage";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51NzmxkLazelZRUiYyfwthrF10jlM4aMVAEhZWusjSE42k6LvQaoMYKr3bUnpUMc9RKpUD3yLNSuaVexaYxsvGATD00CxQHLLeb"
);

export default function PaymentComplete() {
  return (
    <>
      <Elements
        stripe={stripePromise}
        options={{
          //   clientSecret: id,
          // "pi_3NznIYLazelZRUiY2yBV5pAp_secret_XKBecWeUc9SlxbXfATc9x3mOd",
          appearance: {
            theme: "stripe",
          },
        }}
      >
        <PaymentIntentMessage />
        <h1>hi</h1>
      </Elements>
    </>
  );
}
