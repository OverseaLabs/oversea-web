"use client";

import LoadingContainer from "@/components/LoadingContainer";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Datasets() {
  const router = useRouter();
  const [datasets, setDatasets] = useState<any>(null);
  useEffect(() => {
    const doWork = async () => {
      try {
        const res = await fetch("/api/datasets", {
          method: "GET",
          credentials: "include",
        });

        if (res.status !== 200) {
          return router.push("/login");
        }

        const data = await res.json();
        console.log(data);
        setDatasets(data);
      } catch (err: any) {
        router.push("/login");
      }
    };

    doWork();
  }, []);

  if (!datasets) {
    return <LoadingContainer />;
  }
  return (
    <div className="max-w-xs w-auto space-y-1.5 mt-4">
      {datasets.map((d: any) => (
        <Link
          className="border border-slate-900/60 hover:border-emerald-500 rounded-sm text-slate-900 h-8 flex items-center pl-2 cursor-pointer bg-white hover:text-emerald-500 hover:stroke-emerald-500"
          href={`/app/datasets/${d.id}`}
          key={d.id}
        >
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 mr-1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
              />
            </svg>
            <span className="font-normal text-base">{d.displayName}</span>
          </span>
        </Link>
      ))}
      <a
        className="bg-blue-500 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 inline-flex items-center"
        href="/app/datasets/new"
      >
        <PlusIcon className="h-6 w-auto mr-1" />
        <span>New Dataset</span>
      </a>
    </div>
  );
}
