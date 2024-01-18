import { kebabCase } from "@/util";
import { PhotoIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

export default function FileUpload({
  file,
  onFileChange,
  tprogress,
  disabled,
}: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const iref = useRef(null);

  function handleDrop(e: React.DragEvent<HTMLFormElement>): void {
    e.stopPropagation();
    e.preventDefault();

    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange(e.dataTransfer.files[0]);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.files) {
      onFileChange(e.target.files[0]);
    }
  }

  return (
    <>
      <div className="max-w-2xl mt-8">
        <h1 className="text-base font-base tracking-tight text-gray-900">
          Upload Your Dataset
        </h1>
        <form
          ref={formRef}
          className={`flex justify-center rounded-lg border border-dashed mt-2 max-w-xl relative bg-white ${
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
            aria-disabled={disabled}
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
              disabled={disabled}
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
        {/* 
        {formattedName ? (
          <p className="text-sm text-gray-600">
            Will be saved as: {formattedName}
          </p>
        ) : (
          <></>
        )} */}
      </div>
    </>
  );
}
