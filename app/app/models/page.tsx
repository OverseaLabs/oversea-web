"use client";

import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import LoadingContainer from "@/components/LoadingContainer";
import { getBadgeColor } from "@/util/colors";

// const models: any[] = [
//   {
//     id: "iasdj",
//     name: "Albert Llama",
//     dataset: "Albert Einstein Quotes",
//     status: "Trained",
//     lastUpdate: "5th June 2022",
//   },
//   // More people...
// ];

export interface IModel {
  id: string;
  currentStatus: string;
  userId: string;
  modelName: string;
  modelStatus: string;
  trainStart: string;
  trainEnd: string;
  errorMessage: string;
}

export default function Models() {
  const [models, setModels] = useState<IModel[] | null>(null);

  useEffect(() => {
    const doWork = async () => {
      const res = await fetch("/api/models", {
        method: "GET",
        credentials: "include",
      });

      if (res.status !== 200) {
        return router.push("/login");
      }

      const data = await res.json();
      setModels(data);
    };

    doWork();
  }, []);

  useEffect(() => {
    if (!models) {
      return;
    }

    if (models.length === 0) {
      return router.push("/app/models/newprimary");
    }
  }, [models]);

  const router = useRouter();

  if (!models) {
    return <LoadingContainer />;
  }

  if (models.length === 0) {
    return (
      <>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          <div className="mt-4">
            <div
              className="col-span-1 bg-white rounded-lg relative cursor-pointer border border-gray-500 hover:border-black border-dashed h-36 flex items-center justify-center"
              onClick={() => router.push(`/app/models/newprimary`)}
            >
              <PlusIcon className="h-7 w-auto stroke-emerald-500 mr-1" />
              <p className="text-sm text-emerald-500">New Model</p>
            </div>
          </div>
        </div>
        <div className="mt-48">
          <p className="text-center text-gray-900">
            You have no models.{" "}
            <a
              href="/app/models/newprimary"
              className="text-emerald-500 underline"
            >
              Fine Tune a New One
            </a>
          </p>
        </div>
      </>
    );
  }
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
      {models.map((model) => (
        <li
          key={model.id}
          className="col-span-1 bg-white rounded-lg relative cursor-pointer border border-white hover:border-black"
          onClick={() => router.push(`/app/models/${model.id}`)}
        >
          <div className="w-full flex items-center justify-between p-6 space-x-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-gray-900 text-sm font-medium truncate">
                  {model.modelName}
                </h3>
                <span
                  className={`flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium ${getBadgeColor(
                    // JSON.parse(model.modelStatus).currentTask
                    model.currentStatus
                  )} rounded-full`}
                >
                  {/* {model.} */}
                  {/* {JSON.parse(model.modelStatus).currentTask} */}
                  {model.currentStatus}
                  {/* Ok!!! */}
                </span>
              </div>
              <p className="mt-1 text-gray-500 text-sm truncate">
                Dataset: hi!!
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-between mx-4 my-4">
            <p className="text-xs truncate self-center text-gray-500">
              {/* Last Modified: {model.lastUpdate} */}
              Last modified: iasdfji
            </p>

            <a
              className="bg-blue-500 rounded-md px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-blue-700"
              href="/"
            >
              Download
            </a>
          </div>
        </li>
      ))}
      <div
        className="col-span-1 bg-white rounded-lg relative cursor-pointer hover:border hover:border-black h-36 flex items-center justify-center h-full"
        onClick={() => router.push(`/app/models/newprimary`)}
      >
        <PlusIcon className="h-7 w-auto stroke-emerald-500 mr-1" />
        <p className="text-sm text-emerald-500">New Model</p>
      </div>
    </ul>
  );
}
