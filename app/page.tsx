"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.svg";
import { FormEvent, Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { IDataset } from "@/interfaces/types";
import { classNames } from "@/util";
import FAQSection from "@/components/FAQSection";
import PaymentDialog from "@/components/PaymentDialog";
import StartedDialog from "@/components/StartedDialog";

const models = [
  {
    id: 1,
    name: "Llama 2-7B",
  },
  {
    id: 2,
    name: "Mistral 7B",
  },
  {
    id: 3,
    name: "Any other model on huggingface...",
  },
];

const dlist = [
  {
    id: "asdf",
    userId: "asdf",
    internalName: "asdf",
    displayName: "your-dataset.json",
    uploadStatus: "uploaded",
    createdAt: "asdf",
  },
  {
    id: "asdf",
    userId: "asdf",
    internalName: "asdf",
    displayName: "alpaca.jsonl",
    uploadStatus: "uploaded",
    createdAt: "asdf",
  },
  {
    id: "asdf",
    userId: "asdf",
    internalName: "asdf",
    displayName: "starcoder-rs.jsonl",
    uploadStatus: "uploaded",
    createdAt: "asdf",
  },
];

export default function Home() {
  const [selected, setSelected] = useState(models[0]);
  const [status, setStatus] = useState<string>("Idle");
  const [email, setEmail] = useState<string>("");
  const [datasets, setDatasets] = useState<IDataset[]>(dlist);
  const [cdataset, setDataset] = useState<IDataset>(dlist[0]);

  function changeStatus(event: any): void {
    setStatus("Training");
    setTimeout(() => {
      setStatus("Done!");
    }, 1700);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const response = await fetch("/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    const data = await response.json();
    alert(data.message);
  }

  const handleChange = async (e: any) => {
    console.log(e);
    setDataset(e);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="relative">
        {/* <PaymentDialog open={isOpen} setIsOpen={(e: any) => setIsOpen(e)} /> */}
        <div className="mx-auto max-w-7xl px-4 py-4 flex justify-between bg-white">
          <div className="flex items-center sm:gap-16 gap-0">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src={logo}
                  alt="logo"
                  className="w-auto h-12"
                  priority={true}
                />
              </Link>
            </div>
            <div className="flex items-center sm:gap-8 gap-4 text-sm text-gray-700">
              <Link href="#features">Features</Link>
              <Link href="#pricing">Pricing</Link>
              <a href="https://discord.gg/S2y2deb3Ga" target="_blank">
                Discord
              </a>
            </div>
          </div>
          <div></div>
          <div className="flex items-center">
            <Link
              href="/login"
              className="bg-blue-500 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Log in
            </Link>
          </div>
        </div>
        <div className="">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-6xl h-full grid grid-cols-12 sm:gap-x-8 mx-auto my-48">
              <div className="col-span-7 ">
                <div>
                  <h1 className="text-6xl font-semibold tracking-tight text-gray-900">
                    Next Gen
                  </h1>
                  <h1 className="text-6xl font-semibold tracking-tight text-gray-900">
                    Personalized Emails
                  </h1>
                  <p className="mt-6 text-lg text-gray-700 max-w-xl">
                    Increase conversion rates with automatically generated
                    emails designed for the individual.
                  </p>
                  <form
                    className="mt-6 flex max-w-md gap-x-4"
                    onSubmit={handleSubmit}
                  >
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="min-w-0 flex-auto rounded-md focus:ring-2 focus:ring-transparent  focus:outline-none"
                      placeholder="Enter your email"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 rounded-md px-4 py-2 font-medium text-white shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2"
                    >
                      Join Waitlist
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-span-5">
                <h1>Hello</h1>
              </div>
            </div>
            <div
              className="sm:flex sm:flex-row flex-col sm:justify-between sm:space-x-24"
              id="features"
            >
              <div className="sm:flex-1">
                <span className="inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    // stroke="currentColor"
                    className="w-6 h-6 mr-2 stroke-blue-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  <h1 className="text-xl tracking-tight">
                    Streamlined Data Format
                  </h1>
                </span>
                <p className="mt-2 text-gray-700">
                  JSON and JSONL formats are supported accross all models.
                </p>
              </div>
              <div className="sm:flex-1">
                <span className="inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    // stroke="currentColor"
                    className="w-6 h-6 mr-2 stroke-blue-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                  <h1 className="text-xl tracking-tight">
                    No Fine Tuning Errors
                  </h1>
                </span>
                <p className="mt-2 text-gray-700">
                  You don&apos;t have to worry about training failing because of
                  a library error, or burn money trying to get scripts to work.
                </p>
              </div>

              <div className="flex-1">
                <span className="inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    // stroke="currentColor"
                    className="w-6 h-6 mr-2 stroke-blue-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                  <h1 className="text-xl tracking-tight">
                    Your Data Stays Private
                  </h1>
                </span>
                <p className="mt-2 text-gray-700">
                  The datasets you upload are only used to train your model. You
                  also have full <strong>local</strong> access to your model
                  after fine tuning is complete.
                </p>
              </div>
            </div>
            <div
              className="mt-24 md:items-start mx-auto flex flex-col md:flex-row justify-center max-w-5xl items-center md:space-y-0 space-y-4"
              id="pricing"
            >
              <div className="flex flex-col overflow-hidden rounded-lg p-6 shadow-md border border-black max-w-md md:mr-2">
                <h3 className="text-sm font-semibold text-gray-900">
                  Llama 2 / Mistral-7B
                </h3>
                <p className="mt-5 tracking-tight text-gray-900">
                  Fine tune Llama-2, Mistral 7B, or any similar model on
                  huggingface.
                </p>
                <p className="mt-5 text-3xl tracking-tight text-gray-900">
                  $2.4<span className="text-xl">/mb (dataset filesize)</span>
                </p>
                <button
                  onClick={() => {
                    document.body.scrollTop =
                      document.documentElement.scrollTop = 0;
                    document.getElementById("email-address")?.focus();
                  }}
                  className="text-center mt-6 bg-blue-500 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Start Fine Tuning
                </button>
                <ul className="mt-6 flex flex-col divide-y text-sm divide-gray-200 text-gray-700">
                  <li className="inline-flex py-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 stroke-emerald-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <a className="ml-4">No server/training script management</a>
                  </li>
                  {/* <li className="inline-flex py-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 stroke-emerald-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <a className="ml-4">Live progress</a>
                  </li> */}
                  <li className="inline-flex py-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 stroke-emerald-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <a className="ml-4">Simple Dataset Format</a>
                  </li>
                  <li className="inline-flex py-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 stroke-emerald-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <a className="ml-4">Personal Support</a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col overflow-hidden rounded-lg p-6 shadow-md border border-black max-w-md md:ml-2">
                <h3 className="text-sm font-semibold text-gray-900">
                  Llama 2-70B
                </h3>
                <p className="mt-5 tracking-tight text-gray-900">
                  Fine tune larger models such as Llama 2-70B or Mistral 13-B.
                </p>
                {/* <p className="mt-5 text-3xl tracking-tight text-gray-900">
                  $1.20<span className="text-xl">/hr</span>
                </p> */}
                <a
                  href="mailto:me@nevin.cc"
                  className="text-center mt-6 bg-blue-500 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Contact Us
                </a>
                <ul className="mt-6 flex flex-col divide-y text-sm divide-gray-200 text-gray-700">
                  <li className="inline-flex py-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 stroke-emerald-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <a className="ml-4">Same Features as Llama 2-7B</a>
                  </li>
                  <li className="inline-flex py-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 stroke-emerald-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <a className="ml-4">No need to rent multiple GPUs</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <FAQSection />
        </div>
      </div>
    </>
  );
}
