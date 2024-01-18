"use client";

import { Dialog } from "@headlessui/react";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function StartedDialog({
  open,
  setIsOpen,
  className,
  modelConfig,
}: any) {
  const [email, setEmail] = useState<string>("");
  const [modelName, setModelName] = useState<string>("");
  const [dText, setdText] = useState<string>("");
  // model config is literally just a json
  return (
    <Dialog
      open={open}
      onClose={() => setIsOpen(false)}
      className="fixed left-0 top-0 z-10 flex items-center justify-center h-screen w-full bg-gray-500/70"
    >
      <Dialog.Panel className="bg-white max-w-2xl mb-48 space-y-4 px-2 py-2 rounded-md border-black border shadow-md">
        <Dialog.Title className="text-xl font-semibold">
          Get Started
        </Dialog.Title>
        <div className="w-screen max-w-xl">
          {/* Please enter in your details. */}
          <form className="flex flex-col space-y-4 mt-4">
            <div className="flex flex-col space-y-2">
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                required
                className="min-w-0 flex-auto rounded-md focus:ring-2 focus:ring-transparent focus:border-emerald-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>
                Which model would you like to fine tune? (We support any model
                from huggingface)
              </label>
              <input
                name="model"
                type="text"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                required
                onChange={(e) => setModelName(e.target.value)}
                className="min-w-0 flex-auto rounded-md focus:ring-2 focus:ring-transparent focus:border-emerald-500 focus:outline-none"
                placeholder="Enter model name"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>
                Do you already have a dataset? (
                <a
                  href="https://dramatic-allium-34a.notion.site/Dataset-Format-0dfc22bca61e4a65916d9d9cef433868?pvs=4"
                  className="underline text-emerald-500"
                  target="_blank"
                >
                  see dataset format
                </a>
                )
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    required
                    value="yes"
                    name="Yes"
                    checked={dText === "yes"}
                    onChange={(e) => setdText("yes")}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    required
                    value="no"
                    name="No"
                    checked={dText === "no"}
                    onChange={(e) => setdText("no")}
                  />{" "}
                  No
                </label>
              </div>
            </div>
          </form>
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
        </div>
        <div className="flex justify-end items-center">
          {/* <Link */}
          <button
            onClick={async () => {
              if (email === "" || modelName === "" || dText === "") {
                return;
              }

              const response = await fetch("/api/getstarted", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: email,
                  model: modelName,
                  dataset: dText,
                }),
              });

              const data = await response.json();
              alert(data.message);
            }}
            className="bg-blue-500 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Submit
          </button>
          {/* </Link> */}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
