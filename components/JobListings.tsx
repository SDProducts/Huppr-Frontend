import { MapPin, Briefcase, DollarSign, ExternalLink } from 'lucide-react';

const jobs = [
    {
        title: 'Senior Product Designer',
        company: 'Lumina Creative',
        location: 'New York, NY',
        type: 'Remote',
        category: 'DESIGN',
        salary: '$120k - $160k',
        featured: true,
    },
    {
        title: 'Frontend Engineer',
        company: 'Nebula Systems',
        location: 'Austin, TX',
        type: 'Hybrid',
        category: 'ENGINEERING',
        salary: '$140k - $190k',
        featured: true,
    },
    {
        title: 'Marketing Manager',
        company: 'ScaleUp Co.',
        location: 'London, UK',
        type: 'Remote',
        category: 'MARKETING',
        salary: '$80k - $110k',
        featured: true,
    },
    {
        title: 'HR Operations Lead',
        company: 'FlowStream AI',
        location: 'San Francisco, CA',
        type: 'Hybrid',
        category: 'HR',
        salary: '$110k - $150k',
        featured: false,
    },
    {
        title: 'Backend Engineer',
        company: 'CloudNova',
        location: 'Remote',
        type: 'Remote',
        category: 'ENGINEERING',
        salary: '$150k - $200k',
        featured: false,
    },
    {
        title: 'Product Marketing Manager',
        company: 'GrowthLabs',
        location: 'Chicago, IL',
        type: 'On-site',
        category: 'MARKETING',
        salary: '$90k - $130k',
        featured: false,
    },
];

export default function JobListings() {
    return (
        <section className="py-20 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-4">
                        <Briefcase className="w-3.5 h-3.5" />
                        Discover Opportunities
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                        Discover Great Opportunities
                    </h2>
                    <p className="text-gray-600 mt-3 leading-relaxed">
                        Browse the latest openings from top companies using HeyHR to grow their teams.
                    </p>
                </div>

                {/* Jobs Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job, idx) => (
                        <div
                            key={idx}
                            className={`group bg-white rounded-2xl border p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                                job.featured ? 'border-indigo-200 shadow-md' : 'border-gray-100'
                            }`}
                        >
                            {job.featured && (
                                <div className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
                                    Featured
                                </div>
                            )}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-base group-hover:text-indigo-600 transition">
                                        {job.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>
                                </div>
                                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                                    {job.category}
                                </span>
                            </div>

                            <div className="mt-4 space-y-1.5 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-3.5 h-3.5" />
                                    <span>{job.salary}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                    <span>{job.type}</span>
                                </div>
                            </div>

                            <button className="mt-4 w-full py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition flex items-center justify-center gap-2">
                                Apply Now
                                <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <button className="px-6 py-3 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition border border-indigo-200">
                        View All Jobs →
                    </button>
                </div>
            </div>
        </section>
    );
}
