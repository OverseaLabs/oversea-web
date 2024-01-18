"use client";

import { Dialog } from "@headlessui/react";
import Link from "next/link";

export default function PaymentDialog({
  open,
  setIsOpen,
  className,
  modelConfig,
}: any) {
  // model config is literally just a json
  return (
    <Dialog
      open={open}
      onClose={() => setIsOpen(true)}
      className="fixed left-0 top-0 z-10 flex items-center justify-center h-screen w-full bg-gray-500/70"
    >
      <Dialog.Panel className="bg-white max-w-2xl mb-48 space-y-4 px-2 py-2 rounded-md border-black border shadow-md">
        <Dialog.Title className="text-xl font-semibold">
          Enter Payment Details
        </Dialog.Title>
        <Dialog.Description>
          You will be redirected to our payment page to enter payment details
          before fine tuning begins. A $10 hold might be placed on your card.
          This hold will dissapear within 7 days.
          {/* <br />
          <br />
          After training has completed, you will recieve a zip file with your
          model files, as well as instructions on how to use the model with
          huggingface transformers and llama.cpp.
          <br />
          <br />
          Your model will be fine tuned using the QLORA Method using an Nvidia
          A10. It shouldn't take more than 2 hours depending on your dataset,
          and you can cancel training at any point. */}
        </Dialog.Description>
        <div className="flex justify-end items-center">
          <Link
            href="/app/payments"
            className="bg-blue-500 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Continue To Payment
          </Link>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
