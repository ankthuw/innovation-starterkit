import Link from "next/link";
import { I3Header } from "@/components/i3-prototype/i3-header";
import { ChevronRight, Target, TrendingUp, Users } from "lucide-react";

export default function I3StartPage() {
  const campaigns = [
    {
      id: 1,
      title: "THINK. PITCH. WIN.",
      description:
        "Share your innovative ideas and compete for recognition. Submit your proposals and win exciting rewards.",
      status: "Active",
      deadline: "2025-03-31",
      participants: 245,
      icon: Target,
    },
    {
      id: 2,
      title: "Sustainable Solutions 2025",
      description:
        "Driving environmental innovation through creative solutions for a greener future.",
      status: "Active",
      deadline: "2025-04-15",
      participants: 189,
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "Digital Transformation Challenge",
      description:
        "Leverage cutting-edge technologies to transform business processes and customer experiences.",
      status: "Coming Soon",
      deadline: "2025-05-01",
      participants: 0,
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <I3Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Innovation Platform i³
          </h1>
          <p className="text-gray-600 text-lg">
            Discover campaigns, submit your ideas, and drive innovation forward
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">1,247</div>
            <div className="text-sm text-gray-600">Active Innovators</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">3,892</div>
            <div className="text-sm text-gray-600">Ideas Submitted</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">156</div>
            <div className="text-sm text-gray-600">Implemented Projects</div>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Active Campaigns</h2>
            <Link
              href="/i3-prototype/campaign"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
            >
              View all campaigns
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns.map((campaign) => {
              const Icon = campaign.icon;
              return (
                <Link
                  key={campaign.id}
                  href={`/i3-prototype/campaign/${campaign.id}`}
                  className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        campaign.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                    {campaign.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {campaign.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <span>{campaign.participants} participants</span>
                    <span>
                      {new Date(campaign.deadline).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/i3-prototype/idea"
              className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Create New Idea</h3>
              </div>
              <p className="text-sm text-gray-600">
                Start with a fresh idea using our guided innovation process
              </p>
            </Link>

            <Link
              href="/i3-prototype/campaign"
              className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Browse Campaigns</h3>
              </div>
              <p className="text-sm text-gray-600">
                Explore active challenges and innovation opportunities
              </p>
            </Link>

            <Link
              href="/i3-prototype/idea"
              className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100">
                  <Users className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-900">My Ideas</h3>
              </div>
              <p className="text-sm text-gray-600">
                View and manage your submitted ideas
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
