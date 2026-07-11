// components/Features.js
import { Brain, Users, FileText, Filter, Calendar, Shield, Sparkles, Heart, BarChart3 } from 'lucide-react';

const recruitFeatures = [
    {
        icon: Brain,
        title: 'Recruit Smarter',
        description: 'Leverage AI to streamline your hiring process from description to screening.',
    },
    {
        icon: LayoutDashboardIcon,
        title: 'Recruitment Dashboard',
        description: 'No more manual sorting—find the right fit in seconds with our intelligent ranking engine.',
    },
    {
        icon: FileText,
        title: 'AI Job Descriptions',
        description: 'Generate high-converting job posts in seconds based on your specific needs.',
    },
    {
        icon: Filter,
        title: 'Automated Screening',
        description: 'Rank candidates based on skills and cultural fit instantly with proprietary scoring.',
    },
];

const hrFeatures = [
    {
        icon: Users,
        title: 'Employee Directory',
        description: 'A centralized hub for all team member information and documentation.',
    },
    {
        icon: Calendar,
        title: 'Leave Management',
        description: 'Streamline time-off requests, approvals, and balance tracking in one place.',
    },
    {
        icon: Sparkles,
        title: 'Smart Summarization',
        description: 'Get instant highlights from resumes and interviews, focusing on the experience that matters most.',
    },
    {
        icon: Heart,
        title: 'Cultural Fit Analysis',
        description: 'Assess alignment with your core company values through automated sentiment analysis.',
    },
    {
        icon: Shield,
        title: 'Bias Mitigation',
        description: 'Advanced algorithms help identify and filter out unconscious bias, ensuring you hire purely based on potential and skill.',
    },
];

export default function Features() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-4">
                        <Brain className="w-3.5 h-3.5" />
                        Intelligent Platform
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                        Recruit Smarter
                    </h2>
                    <p className="text-gray-600 mt-3 leading-relaxed">
                        Leverage AI to streamline your hiring process from description to screening.
                    </p>
                </div>

                {/* Recruit Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {recruitFeatures.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:border-indigo-100 transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition flex items-center justify-center mb-4">
                                <feature.icon className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 text-base">{feature.title}</h3>
                            <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* HR Management Section */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-4">
                        <Users className="w-3.5 h-3.5" />
                        HR Management
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                        Built for Growing Teams
                    </h2>
                    <p className="text-gray-600 mt-3 leading-relaxed">
                        Transition seamlessly from hiring to managing. Our Pro tools provide everything needed to support your workforce as it expands.
                    </p>
                </div>

                {/* HR Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hrFeatures.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:border-indigo-100 transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition flex items-center justify-center mb-4">
                                <feature.icon className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 text-base">{feature.title}</h3>
                            <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom note */}
                <div className="mt-12 text-center text-sm text-gray-500 bg-gray-50/50 rounded-2xl py-4 px-6 max-w-2xl mx-auto border border-gray-100">
                    <span className="font-medium text-gray-700">Our intelligence doesn't replace humans; it empowers them.</span>
                    <span className="block text-gray-500 mt-1">Making every hire a step toward a stronger, more inclusive culture.</span>
                </div>
            </div>
        </section>
    );
}

// Helper icon component
function LayoutDashboardIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
    );
}
