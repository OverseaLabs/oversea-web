import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "How do we access your realtime data?",
    answer:
      "We provide integrations directly to you to extract meaningful data, which can be used as context for our models. You choose which data gets sent to our platform.",
  },
  {
    question: "Do you integrate with my email provider?",
    answer:
      "We currently support Gmail, Outlook, and Yahoo. We are working on integrations for other email providers. If you have a specific request, please contact us.",
  },
  {
    question: "Is the process completely automated, or do I have some control over emails being sent??",
    answer:
      'You have complete control over the email sending schedule and budget. You can also choose to send emails manually. We provide a dashboard to manage your emails and view communication hisotry with users.',
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
