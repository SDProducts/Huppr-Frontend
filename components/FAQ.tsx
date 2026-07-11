'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: 'How does the AI screening work?',
        answer: 'Our AI screening uses proprietary algorithms to analyze resumes and candidate responses against your job requirements. It evaluates skills, experience, and cultural fit to provide a match score, helping you identify the best candidates quickly.',
    },
    {
        question: 'Can I switch plans later?',
        answer: 'Absolutely! You can upgrade or downgrade your plan at any time as your business needs evolve. Changes take effect immediately, and we prorate any adjustments.',
    },
    {
        question: 'Is my data secure?',
        answer: 'Security is our top priority. We use enterprise-grade encryption, regular security audits, and comply with GDPR and CCPA standards. Your data is never shared with third parties without your explicit consent.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-4">
                        <HelpCircle className="w-3.5 h-3.5" />
                        FAQ
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                        Common Questions
                    </h2>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition"
                        >
                            <button
                                onClick={() => toggle(idx)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50/50 transition"
                            >
                                <span className="font-medium text-gray-900">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                                        openIndex === idx ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                                    openIndex === idx ? 'max-h-48 pb-4' : 'max-h-0'
                                }`}
                            >
                                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
