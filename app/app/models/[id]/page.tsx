"use client";

import { useEffect, useState } from "react";
// import { IModel } from "../../page";
import { IModel } from "../page";
import { useRouter } from "next/navigation";
import LoadingContainer from "@/components/LoadingContainer";
import { getTextColor } from "@/util/colors";
import { ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/solid";

export const runtime = "edge";

export interface IModelStatus {
  currentTask: string;
  percentage: number;
  step: number;
  total: number;
  timeElapsed: string;
  timeRemaining: string;
}

export default function Id({ params }: { params: { id: string } }) {
  const [model, setModel] = useState<IModel | null>(null);
  const [status, setStatus] = useState<IModelStatus | null>(null);
  const router = useRouter();

  useEffect(() => {
    const doWork = async () => {
      const res = await fetch("/api/models/search", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: params.id }),
      });

      if (res.status !== 200) {
        return router.push("/login");
      }

      const data = await res.json();
      setModel(data);
    };
    doWork();
  }, []);

  useEffect(() => {
    if (!model) {
      return;
    }

    let modelStatus = JSON.parse(model.modelStatus);
    setStatus(modelStatus);
  }, [model]);
  if (!model || !status) {
    return <LoadingContainer />;
  }

  return (
    <div className="">
      <h1 className="text-2xl font-base tracking-tight text-gray-900 mb-2">
        {model.modelName}
      </h1>
      <span
        className={`flex-shrink-0 inline-block px-2 py-0.5 text-md font-medium ${getTextColor(
          // status.currentTask
          model.currentStatus
        )} rounded-full mb-2 mt-2`}
      >
        {/* {model.} */}
        {model.currentStatus}
        {/* Ok!!! */}
      </span>
      <div className="grid grid-cols-5 space-x-2">
        <article className="rounded-lg border border-gray-100 bg-white p-6">
          <div>
            <p className="text-sm text-gray-700">Cost</p>

            <p className="text-2xl font-medium text-gray-900">$20.00</p>
          </div>
        </article>
        <article className="rounded-lg border border-gray-100 bg-white p-6">
          <div>
            <p className="text-sm text-gray-700">Current Step</p>

            <p className="text-2xl font-medium text-gray-900">{status.step}</p>
          </div>
        </article>
        <article className="rounded-lg border border-gray-100 bg-white p-6">
          <div>
            <p className="text-sm text-gray-700">Total Steps</p>

            <p className="text-2xl font-medium text-gray-900">{status.total}</p>
          </div>
        </article>
        <article className="rounded-lg border border-gray-100 bg-white p-6">
          <div>
            <p className="text-sm text-gray-700">Time Elapsed</p>

            <p className="text-2xl font-medium text-gray-900">
              {status.timeElapsed}
            </p>
          </div>
        </article>
        <article className="rounded-lg border border-gray-100 bg-white p-6">
          <div>
            <p className="text-sm text-gray-700">Time Remaining</p>

            <p className="text-2xl font-medium text-gray-900">
              {status.timeRemaining}
            </p>
          </div>
        </article>
      </div>

      <div className="flex items-center justify-between mt-2">
        <a
          className="bg-blue-500 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 inline-flex items-center"
          href="/app/datasets/new"
        >
          <ArrowDownTrayIcon className="h-6 w-auto mr-1" />
          <span>Download Model</span>
        </a>
        <button
          className="bg-white rounded-md px-4 py-2 text-sm font-medium text-red-500 border border-red-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          // onClick={handleDelete}
        >
          <span>Delete Model</span>
        </button>
      </div>
      {model.currentStatus === "Cancelled" ? (
        <div className="mt-1.5">
          <h1 className="text-red-500 text-base">
            Cancel Reason: {model.errorMessage}
          </h1>
        </div>
      ) : (
        <></>
      )}

      {/* <div className="grid mx-auto grid-cols-4 gap-1">
        <div className="flex flex-wrap align-baseline justify-between gap-4">
          <h1>Hello</h1>
        </div>
      </div> */}
      {/* <h2 className="text-xl font-base tracking-tight text-gray-900 mt-4">
        Stats
      </h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Current Step</th>
            <th>Total Steps</th>
            <th>Time Elapsed</th>
            <th>Time Remaining</th>
          </tr>
        </thead>
      </table> */}
      {/* <p>{JSON.stringify(status)}</p> */}
    </div>
  );
}
