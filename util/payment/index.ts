export const hasPaymentMethod = async () => {
  const response = await fetch("/api/payments/check-payment-method", {
    method: "POST",
    credentials: "include",
  });

  let data = await response.json();

  return data.status;
};
