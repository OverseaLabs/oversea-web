"use client";

import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { IDataset } from "@/interfaces/types";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import LoadingContainer from "@/components/LoadingContainer";
import { classNames } from "@/util";

const models = [
  {
    id: 1,
    name: "Llama 2-7B",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

// const datasets: any[] = [
//   //   {
//   //     id: 1,
//   //     name: "Albert Einstein Quotes",
//   //     avatar:
//   //       "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   //   },
// ];

export default function New() {
  const router = useRouter();
  const [selected, setSelected] = useState(models[0]);
  const [datasets, setDatasets] = useState<IDataset[] | null>(null);
  const [cdataset, setDataset] = useState<IDataset | null>(null);
  const [name, setName] = useState<string>("");

  const handleChange = async (e: any) => {
    console.log(e);
    setDataset(e);
  };

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
    <div>
      <h1 className="text-2xl font-base tracking-tight text-gray-900">
        Fine Tune a Model
      </h1>
      <div className="max-w-sm mt-8">
        <label className="block text-sm font-normal leading-6 text-gray-900">
          Model Name
        </label>
        <input
          id="model-name"
          name="model-name"
          type="text"
          autoComplete="text"
          required
          value={name}
          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="max-w-sm">
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-normal leading-6 text-gray-900 mt-4">
                Base Model
              </Listbox.Label>
              <div className="relative mt-2">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm sm:leading-6 h-9">
                  <span className="ml-3 block truncate">{selected.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {models.map((person) => (
                      <Listbox.Option
                        key={person.id}
                        className={({ active }) =>
                          classNames(
                            active ? "bg-blue-600 text-white" : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {person.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-emerald-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      <div className="max-w-sm mt-4">
        <Listbox value={selected} onChange={handleChange}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-normal leading-6 text-gray-900">
                Dataset
              </Listbox.Label>
              <div className="relative mt-2">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm sm:leading-6 h-9">
                  <span className="ml-3 block truncate">
                    {cdataset?.displayName}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {!datasets || datasets.length === 0 ? (
                      <p className="text-center text-gray-600">
                        You currently don&apos;t have any datasets. Create a new
                        one!
                      </p>
                    ) : (
                      <></>
                    )}
                    {datasets.map((person) => (
                      <Listbox.Option
                        key={person.id}
                        className={({ active }) =>
                          classNames(
                            active ? "bg-blue-600 text-white" : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {person.displayName}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-emerald-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>

      <div className="max-w-sm mt-2">
        <Link
          href="/app/datasets/new"
          className="inline-flex justify-center items-center stroke-emerald-500 text-emerald-500"
        >
          <PlusCircleIcon className="h-5 w-auto mr-1.5" />
          <span>New Datset</span>
        </Link>
      </div>
      <button
        className="bg-blue-500 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 inline-flex items-center mt-2"
        onClick={(e) => {}}
      >
        <PlusIcon className="h-6 w-auto mr-1" />
        <span>Train</span>
      </button>
    </div>
  );
}
