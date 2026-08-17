"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI screening work?",
    answer:
      "Our AI screening uses proprietary algorithms to analyze resumes and candidate responses against your job requirements. It evaluates skills, experience, and cultural fit to provide a match score, helping you identify the best candidates quickly.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Absolutely! You can upgrade or downgrade your plan at any time as your business needs evolve. Changes take effect immediately, and we prorate any adjustments.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Security is our top priority. We use enterprise-grade encryption, regular security audits, and comply with GDPR and CCPA standards. Your data is never shared with third parties without your explicit consent.",
  },
];

export default function FAQ() {
  // const [openIndex, setOpenIndex] = useState(null);

  // const toggle = (index:unknown) => {
  //   setOpenIndex(openIndex === index ? null : index);
  // };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-accent-light">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Common Questions
          </h2>
        </div>

        <Accordion defaultValue={["shipping"]} className="gap-3">
          {faqs.map((faq, idx) => (
            <AccordionItem
              value={faq.question}
              key={idx}
              className="border border-gray-100 rounded-2xl overflow-hidden bg-white w-full shadow-sm hover:shadow-md transition px-6"
            >
              <AccordionTrigger
                className="font-medium text-gray-900"
                // onClick={toggle}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
