import Link from "next/link";
import { I3Header } from "@/components/i3-prototype/i3-header";
import { ArrowRight, TrendingUp, Users, Target } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50">
      <I3Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Innovation Platform i³
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Transform your ideas into reality. Collaborate, innovate, and shape
            the future with our innovation management platform.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1,247</div>
              <div className="text-gray-600 mt-1">Active Innovators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">3,892</div>
              <div className="text-gray-600 mt-1">Ideas Submitted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">156</div>
              <div className="text-gray-600 mt-1">Implemented Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaigns Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Active Campaigns</h2>
            <Link
              href="/i3-prototype/campaign"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Campaigns
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => {
              const Icon = campaign.icon;
              return (
                <Link
                  key={campaign.id}
                  href={`/i3-prototype/campaign/${campaign.id}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        campaign.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {campaign.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {campaign.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{campaign.participants} participants</span>
                    <span>
                      Due: {new Date(campaign.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/i3-prototype/idea"
              className="p-6 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-semibold text-blue-900 mb-2">
                Create New Idea
              </h3>
              <p className="text-sm text-blue-700">
                Start with a fresh idea using our guided innovation process
              </p>
            </Link>
            <Link
              href="/i3-prototype/campaign"
              className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Browse Campaigns
              </h3>
              <p className="text-sm text-gray-600">
                Explore active challenges and innovation opportunities
              </p>
            </Link>
            <Link
              href="/i3-prototype/idea"
              className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                My Ideas
              </h3>
              <p className="text-sm text-gray-600">
                View and manage your submitted ideas
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
