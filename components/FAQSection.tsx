import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "Is my data used to train other models?",
    answer:
      "No! The data you upload is only used to train your own model, with your permission. We never look at or download your datasets.",
  },
  {
    question: "How long does training take?",
    answer:
      "It varies by dataset. In general, it shouldn't take more than a few hours for most datasets. I personally fine tuned llama on a 42mb json file in about an hour.",
  },
  {
    question: "What model format will I receive my model in?",
    answer:
      'Your model will be trained using the QLora method, but you will receive a merged model <a href="./output.png">',
  },
  // More questions...
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function FAQSection() {
  return (
    <div className="my-20">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="max-w-4xl mx-auto divide-y-2 divide-gray-300   bg-white p-8 border border-black rounded-lg shadow-md">
          <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900 sm:text-xl">
            Frequently Asked Questions
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg  ">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-500">
                        <span className="text-black">{faq.question}</span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? "-rotate-180" : "rotate-0",
                              "h-6 w-6 transform"
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      {faq.answer.includes("receive") ? (
                        <>
                          <span className="text-gray-500">
                            Your model will be trained using the QLora method,
                            but you will receive a merged model{" "}
                            <a
                              className="underline text-emerald-500 hover:text-emerald-600"
                              href="./output.png"
                              target="_blank"
                            >
                              with the following files
                            </a>
                            , as well as instructions on how to use them with
                            popular libraries such as huggingface transformers
                            and ggml.
                          </span>
                        </>
                      ) : (
                        <p className="text-gray-500">{faq.answer}</p>
                      )}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
