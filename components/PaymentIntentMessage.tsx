import { useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import LoadingContainer from "./LoadingContainer";

export default function PaymentIntentMessage() {
  const stripe = useStripe();
  const [id, setId] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const doWork = async () => {
      const response = await fetch("/api/payments/check-payment-method", {
        method: "POST",
        credentials: "include",
      });

      let data = await response.text();
      console.log(data);
    };

    doWork().then(() => {
      if (!stripe) {
        return;
      }

      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );

      if (!clientSecret) {
        return;
      }

      setId(clientSecret);

      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        if (!paymentIntent) {
          return;
        }

        console.log(paymentIntent);

        if (
          paymentIntent.status === "requires_capture" &&
          paymentIntent.payment_method !== null
        ) {
          window.location.href = "/app/train";
          // redirect the shit to the train page
          setMessage("Starting Training, Please do not close your browser");
          return;
          // then the hold worked, so send the
          // basically send an api request to start the training, aslo if the if
        }
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Success! Payment received.");
            break;

          case "processing":
            setMessage(
              "Payment processing. We'll update you when payment is received."
            );
            break;

          case "requires_payment_method":
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage("Payment failed. Please try another payment method.");
            break;

          default:
            setMessage("Something went wrong.");
            break;
        }
      });
    });
  }, [stripe]);

  if (!message) {
    return <LoadingContainer />;
  }

  return message;
}
