import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import LoadingContainer from "./LoadingContainer";
import { loadStripe } from "@stripe/stripe-js";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        save_payment_method: true,
        // setup_future_usage: "off_session",
        // make this the fine tuning url with the model id in the url param
        return_url: "http://localhost:3000/app/payments/complete",
      },
    });

    if (error) {
      setErrorMessage(error.message ? error.message : null);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button className="bg-blue-500 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 mt-4">
          Submit Payment Details
        </button>
      </form>
      <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
    </>
  );
}
