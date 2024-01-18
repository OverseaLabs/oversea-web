"use client";

import { Listbox, Transition } from "@headlessui/react";
import {
  ChevronUpDownIcon,
  CheckIcon,
  ForwardIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import axiosRetry from "axios-retry";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { classNames } from "@/util";
import PaymentDialog from "@/components/PaymentDialog";
import Input from "@/components/input/Input";
import Dropdown from "@/components/input/Dropdown";
import FileUpload from "@/components/input/Fileupload";
import {
  finishUpload,
  getUploadId,
  getUploadName,
  submitAndTrain,
  uploadPart,
} from "@/util/upload";

const models = [
  {
    id: 1,
    name: "Mistral 7B",
  },
  {
    id: 2,
    name: "Llama 2-7B",
  },
];

import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { hasPaymentMethod } from "@/util/payment";
import RangeSlider from "@/components/input/RangeSlider";

export default function Page() {
  const [selected, setSelected] = useState(models[0]);
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [formattedName, setFormattedName] = useState<string>("");

  const router = useRouter();
  const [finished, setFinished] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [tprogress, setProgress] = useState<number>(0);
  const [datasetName, setDatasetName] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [steps, setSteps] = useState<number>(100);
  const [modelStatus, setModelStatus] = useState<string>("");

  useEffect(() => {
    setProgress((finished / total) * 100);
  }, [finished, total]);

  async function submitFile(file: any) {
    //   console.log(file);
    if (!file) {
      return;
    }

    //   setIsUploading(true);
    const name = await getUploadName(file.name.replace(" ", "-"));
    const url = `https://billowing-shape-1cef.readable.workers.dev/${name}`;
    console.log(name);

    const partSize = 10 * 1024 * 1024;

    const uploadId = await getUploadId(url);
    const partCount = Math.ceil(file.size / partSize);
    setTotal(partCount);
    let threads = [];

    for (let i = 0; i < partCount; i++) {
      threads.push(
        new Promise<any>(async (resolve, reject) => {
          try {
            const d = await uploadPart(partSize, url, uploadId, i, file);
            // might cause a race so use a queue or whatever the fuck
            // incrememnt the state with the previous state
            setFinished((prev) => prev + 1);
            // onPercentageChange(29% just have this in a class)
            return resolve(d);
          } catch (err) {
            return reject(err);
          }
        })
      );
    }

    let f = await Promise.all(threads);

    let s = await finishUpload(url, uploadId, f);

    console.log("Finished uploading dataset");
    return name;
    //   await trainModel();
  }

  const handleSubmit = async (e: any) => {
    console.log("submitting");
    // await submitFile(file);
  };

  return (
    <div className="relative">
      <PaymentDialog open={open} setIsOpen={(e: any) => setOpen(e)} />
      {/* <PaymentDialog open={open} setIsOpen={setIsOpen} className="" /> */}
      {/* <h1 className="text-2xl font-base tracking-tight text-gray-900">
        Fine Tune a Model
      </h1> */}
      <Input
        text="Model Name"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <Dropdown selected={selected} setSelected={setSelected} data={models} />
      <div className="flex flex-col mt-4 max-w-sm">
        <label className="">Steps</label>
        <input
          type="range"
          min={50}
          max={500}
          onChange={(e) => setSteps(parseInt(e.target.value))}
          value={steps}
          className="bg-gray-300 appearance-none h-[4px] mt-2 accent-emerald-500"
        />
        <label className="text-sm mt-1.5">{steps}</label>
      </div>
      {/* <RangeSlider /> */}
      <FileUpload
        file={file}
        onFileChange={(e: any) => setFile(e)}
        tprogress={tprogress}
        disabled={isUploading}
      />
      <button
        className="bg-blue-500 rounded-md px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 inline-flex items-center mt-2"
        // onClick={() => submitAndTrain(file, name)}
        onClick={async () => {
          setIsUploading(true);
          setStatus("Uploading. Please do not close the page.");
          const dName = await submitFile(file);
          localStorage.setItem(
            "modelStatus",
            JSON.stringify({
              modelName: name,
              baseModel: selected.name,
              datasetUrl: `https://render.readable.workers.dev/${dName}`,
              totalSteps: steps,
            })
          );

          const status = await hasPaymentMethod();

          if (!status) {
            setOpen(true);
          } else {
            window.location.href = "/app/train";
            // just redirect to the fine tune page
          }

          // send api check
        }}
        disabled={isUploading}
      >
        <SparklesIcon className="h-6 w-auto mr-2" />
        <span>Fine Tune</span>
      </button>
      <h1 className="text-base mt-2">{status}</h1>
    </div>
  );
}
