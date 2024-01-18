"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import axiosRetry from "axios-retry";
import { useRouter } from "next/navigation";

const logs = [
  { input: "jasdjfoijsadf", output: "ijfads" },
  { input: "fijsadjoifsajdoi", output: "fasdfuh" },
];

export default function New() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [finished, setFinished] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [tprogress, setProgress] = useState<number>(0);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [datasetName, setDatasetName] = useState<string>("");
  const [formattedName, setFormattedName] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  // useEffect(() => {
  //   let p = new Parser(
  //     `[   {   "jiafsdjif": "jfaisdjiofasdf"}, {"fjiadsf": "jifasdiofj"}]`
  //   );
  //   p.getPreview();
  // }, []);

  useEffect(() => {
    setProgress((finished / total) * 100);
  }, [finished, total]);

  const kebabCase = (str: string) =>
    str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();

  useEffect(() => {
    if (!file) {
      return;
    }

    let s = file.name.split(".");

    let ext = s.pop();
    let dName = `${kebabCase(s.join())}.${ext}`;

    if (datasetName === "") {
      setDatasetName(file.name);
      return;
    }

    if (datasetName.split(".").pop() === ext) {
      return;
    }

    // setDatasetName(`${dName.replace(".", "")}.${ext}`);
    setDatasetName(`${datasetName.replace(".", "")}.${ext}`);
    // setFormattedName(dName);
  }, [file]);

  useEffect(() => {
    console.log(datasetName);
    if (!file) {
      return;
    }

    let fs = file.name.split(".");
    let ds = datasetName.split(".");

    let ext = fs.pop();

    if (ext === datasetName) {
      setFormattedName(`${ds.join()}.${ext}`);
      return;
    }

    let dExt = ds.pop();

    console.log(ext, ds);

    if (!datasetName) {
      setFormattedName(kebabCase(file.name));
      return;
    }

    if (dExt === ext) {
      setFormattedName(kebabCase(datasetName));
      return;
    }

    setFormattedName(`${kebabCase(datasetName.replace(".", ""))}.${ext}`);
    // setFormattedName(kebabCase(datasetName));
  }, [datasetName]);

  const iref = useRef(null);
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    console.log(e.target.files);

    if (e.target.files) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  }

  async function getUploadId(url: string): Promise<string> {
    const { data } = await axios.post(url, null, {
      params: {
        action: "mpu-create",
      },
    });

    console.log(`upload id ${data.uploadId}`);
    return data.uploadId;
  }

  function uploadPart(
    partsize: number,
    url: string,
    uploadId: string,
    index: number
  ) {
    return new Promise<any>((resolve, reject) => {
      if (!file) {
        return reject("No file");
      }

      let start = partsize * index;

      let end;

      if (start + partsize > file.length) {
        end = file.length;
      } else {
        end = start + partsize;
      }

      let part = file.slice(start, end);
      let reader = new FileReader();
      reader.readAsArrayBuffer(part);

      reader.onload = async (e) => {
        try {
          axiosRetry(axios, { retries: 3 });
          if (!reader.result) {
            return;
          }

          let p = reader.result;
          const { data } = await axios.put(url, p, {
            params: {
              action: "mpu-uploadpart",
              uploadId: uploadId,
              partNumber: index + 1,
            },
          });

          return resolve(data);
        } catch (err) {
          return reject(err);
        }
      };
    });
  }

  async function finishUpload(
    url: string,
    uploadId: string,
    uploadedParts: any[]
  ): Promise<boolean> {
    const { data, status } = await axios.post(
      url,
      { parts: uploadedParts },
      {
        params: {
          action: "mpu-complete",
          uploadId: uploadId,
        },
      }
    );

    if (status === 200) {
      return true;
    }

    return false;
  }

  async function getUploadName() {
    try {
      const { data } = await axios.post(
        "/api/datasets/new",
        { name: formattedName },
        { withCredentials: true }
      );

      console.log(data);
      return data.uploadName;
    } catch (err) {
      router.push("/login");
    }
  }

  async function submitFile() {
    if (!file) {
      alert("Please select a file");
      return;
    }

    setUploading(true);
    const name = await getUploadName();
    const url = `https://billowing-shape-1cef.readable.workers.dev/${name}`;

    const partSize = 10 * 1024 * 1024;

    const uploadId = await getUploadId(url);
    const partCount = Math.ceil(file.size / partSize);
    setTotal(partCount);
    let threads = [];

    for (let i = 0; i < partCount; i++) {
      threads.push(
        new Promise<any>(async (resolve, reject) => {
          try {
            const d = await uploadPart(partSize, url, uploadId, i);
            // might cause a race so use a queue or whatever the fuck
            // incrememnt the state with the previous state
            setFinished((prev) => prev + 1);
            return resolve(d);
          } catch (err) {
            return reject(err);
          }
        })
      );
    }

    let f = await Promise.all(threads);

    let s = await finishUpload(url, uploadId, f);

    setUploading(false);
    alert("Finished uploading dataset");
    router.push("/app/datasets");
  }

  function handleDrop(e: React.DragEvent<HTMLFormElement>): void {
    e.stopPropagation();
    e.preventDefault();

    console.log("drop");

    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }

  return (
    <>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-base tracking-tight text-gray-900">
          Create a new Dataset
        </h1>
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            console.log("jadsjfoisadjoi");
            submitFile();
          }}
          className={`flex justify-center rounded-lg border border-dashed mt-6 max-w-xl relative bg-white ${
            dragOver ? "border-emerald-500" : "border-gray-900/25"
          }`}
          onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setDragOver(false);
          }}
          onDrop={handleDrop}
        >
          <label
            htmlFor="file-upload"
            aria-disabled={uploading}
            className={`h-full w-full text-gray-300 py-20 flex flex-col items-center justify-center aria-disabled:bg-gray-200 ${
              file ? "invisible" : "visible"
            }`}
            aria-hidden="true"
          >
            <input
              ref={iref}
              type="file"
              id="file-upload"
              multiple={false}
              onChange={handleChange}
              className="w-full h-full hidden"
              disabled={uploading}
            />
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="flex">
              <span className="cursor-pointer rounded-md font-semibold text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 hover:text-emerald-500">
                Upload a file
              </span>
              <p className="pl-1 text-sm leading-6 text-gray-600">
                or drag and drop
              </p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              Supported Filetypes: JSON, JSONL
            </p>
          </label>
          {file ? (
            <div className="absolute z-10 w-full h-full flex items-center justify-center flex-col">
              <h1 className="text-base text-gray-500">Selected File</h1>
              <h1 className="text-sm text-gray-400">{file.name}</h1>

              <label htmlFor="file-upload" aria-hidden="true">
                <p className="cursor-pointer rounded-md font-semibold text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 hover:text-emerald-500">
                  Select a different file
                </p>
              </label>
            </div>
          ) : (
            <></>
          )}
        </form>
        <div
          style={{ width: `${tprogress}%` }}
          className="max-w-xl w-full border-none bg-blue-500 h-2 transition-all"
        ></div>

        <div className="flex flex-row max-w-md mt-2">
          <input
            placeholder="Dataset Name"
            className="mr-2 min-w-0 flex-auto rounded-md focus:ring-2 focus:ring-transparent focus:border-emerald-500 focus:outline-none h-9 disabled:bg-gray-200"
            value={datasetName}
            onChange={(e) => setDatasetName(e.target.value)}
            disabled={uploading}
          />

          <button
            onClick={() => {
              if (!formRef.current) {
                return;
              }

              formRef.current.requestSubmit();
            }}
            disabled={uploading}
            className="bg-blue-500 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <div className="w-28">
              {uploading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <span>Upload Dataset</span>
              )}
            </div>
          </button>
        </div>

        {formattedName ? (
          <p className="mt-2 text-sm text-gray-600">
            Will be saved as: {formattedName}
          </p>
        ) : (
          <></>
        )}
      </div>
      {/* <h1 className="text-2xl font-base tracking-tight text-gray-900 mt-6 mb-2">
        Preview
      </h1>
      <Preview items={logs} /> */}
    </>
  );
}
