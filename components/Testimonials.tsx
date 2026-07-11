import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        quote: 'HeyHR changed our trajectory. We filled 10 critical roles in half the time it used to take, and now the management tools are keeping our culture strong as we scale.',
        author: 'Sarah Jenkins',
        role: 'CEO, FlowStream AI',
        rating: 5,
        featured: true,
    },
    {
        quote: 'The AI screening has been a game-changer for our hiring process. We\'re seeing better quality candidates and significantly less time spent on manual review.',
        author: 'Michael Chen',
        role: 'VP of People, CloudNova',
        rating: 5,
        featured: false,
    },
    {
        quote: 'From job posting to onboarding, HeyHR has streamlined everything. Our HR team is now 3x more efficient.',
        author: 'Jessica Park',
        role: 'HR Director, Lumina Creative',
        rating: 5,
        featured: false,
    },
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-indigo-900/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-4">
                        <Quote className="w-3.5 h-3.5" />
                        Testimonials
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                        Loved by HR teams around the world
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, idx) => (
                        <div
                            key={idx}
                            className={`bg-white rounded-2xl border p-6 ${
                                testimonial.featured
                                    ? 'border-indigo-200 shadow-xl shadow-indigo-100/50'
                                    : 'border-gray-100 shadow-sm'
                            }`}
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed italic">
                                "{testimonial.quote}"
                            </p>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="font-semibold text-gray-900 text-sm">{testimonial.author}</div>
                                <div className="text-xs text-gray-500">{testimonial.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
