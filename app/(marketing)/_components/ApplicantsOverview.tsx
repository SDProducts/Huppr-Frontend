import { TrendingUp, Users, Award, Clock } from "lucide-react";

export default function ApplicantsOverview() {
  return (
    <section className="py-16 bg-gray-50/50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Applicants Overview */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-4">
              <Users className="w-3.5 h-3.5" />
              Talent Pipeline
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Applicants Overview
            </h2>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Get a real-time view of your talent pipeline with intelligent
              screening and match scoring. Focus on the candidates that matter
              most.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Award className="w-4 h-4 text-indigo-500" />
                  Match Score
                </div>
                <div className="text-2xl font-bold text-gray-900">90%</div>
                <div className="text-xs text-green-600">+2% this week</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  Avg. Response
                </div>
                <div className="text-2xl font-bold text-gray-900">4.2h</div>
                <div className="text-xs text-green-600">
                  -1.5h from last month
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">
                  Screening Progress
                </span>
                <span className="text-indigo-600 font-medium">78%</span>
              </div>
              <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  style={{ width: "78%" }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                <span>Applied</span>
                <span>Screened</span>
                <span>Interview</span>
                <span>Hired</span>
              </div>
            </div>
          </div>

          {/* Right: Recent Applicants List */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <span className="font-semibold text-gray-900">
                Recent Applicants
              </span>
              <span className="text-sm text-indigo-600 font-medium cursor-pointer hover:underline">
                View All →
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                {
                  name: "Emma Johnson",
                  role: "Senior Product Designer",
                  location: "New York, USA",
                  match: 92,
                  exp: "6+ years",
                },
                {
                  name: "Cook Fischer",
                  role: "Frontend Engineer",
                  location: "Austin, TX",
                  match: 88,
                  exp: "4+ years",
                },
                {
                  name: "Guy Hawkins",
                  role: "Marketing Manager",
                  location: "London, UK",
                  match: 76,
                  exp: "5+ years",
                },
                {
                  name: "Sarah Jenkins",
                  role: "HR Operations Lead",
                  location: "San Francisco, CA",
                  match: 94,
                  exp: "8+ years",
                },
              ].map((applicant, idx) => (
                <div
                  key={idx}
                  className="px-5 py-3 flex items-center justify-between hover:bg-gray-50/50 transition"
                >
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {applicant.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {applicant.role}
                    </div>
                    <div className="text-xs text-gray-400">
                      {applicant.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-indigo-600">
                      {applicant.match}%
                    </div>
                    <div className="text-xs text-gray-400">{applicant.exp}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>3,428 total applicants</span>
              <span className="text-indigo-600 font-medium">
                +12% this month
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
