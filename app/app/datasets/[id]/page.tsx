"use client";
export const runtime = "edge";

import LoadingContainer from "@/components/LoadingContainer";
import { IDataset } from "@/interfaces/types";
import { ArrowDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Id({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [dataset, setDataset] = useState<IDataset | null>(null);
  useEffect(() => {
    const doWork = async () => {
      try {
        const res = await fetch("/api/datasets/search", {
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
        console.log(data);
        setDataset(data);
      } catch (err: any) {
        router.push("/login");
      }
    };
    doWork();
    console.log(params.id);
  }, []);

  if (!dataset) {
    return <LoadingContainer />;
  }
  async function handleDelete(e: any) {
    try {
      const res = await fetch("/api/datasets/delete", {
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
      console.log(data);
      alert("Dataset has been scheduled for deletion.");
      router.push("/app/datasets");
    } catch (err: any) {
      router.push("/login");
    }
  }

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-base tracking-tight text-gray-900">
        {dataset.displayName}
      </h1>
      <p className="mt-2">Created at: {dataset.createdAt}</p>
      <div className="flex flex-row space-x-2">
        <a
          href={`https://render.readable.workers.dev/${dataset.id}-${dataset.internalName}-${dataset.displayName}`}
          className="bg-blue-500 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 inline-flex items-center"
          target="_blank"
        >
          <ArrowDownIcon className="h-6 w-auto mr-2" />
          <span>Download Dataset</span>
        </a>
        <button
          className="bg-white rounded-md px-4 py-2 text-sm font-medium text-red-500 border border-red-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={handleDelete}
        >
          <span>Delete Dataset</span>
        </button>
      </div>
    </div>
  );
}
