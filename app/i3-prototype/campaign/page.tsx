import Link from "next/link";
import { I3Header } from "@/components/i3-prototype/i3-header";
import { ArrowRight, TrendingUp, Users, Target, Calendar, LucideIcon } from "lucide-react";

type CampaignColor = "blue" | "green" | "purple" | "orange";

interface Campaign {
  id: number;
  title: string;
  description: string;
  status: "Active" | "Coming Soon";
  deadline: string;
  participants: number;
  ideas: number;
  icon: LucideIcon;
  color: CampaignColor;
}

export default function CampaignListPage() {
  const campaigns: Campaign[] = [
    {
      id: 1,
      title: "THINK. PITCH. WIN.",
      description:
        "Share your innovative ideas and compete for recognition. Submit your proposals and win exciting rewards. This campaign focuses on breakthrough innovations across all business sectors.",
      status: "Active",
      deadline: "2025-03-31",
      participants: 245,
      ideas: 187,
      icon: Target,
      color: "blue",
    },
    {
      id: 2,
      title: "Sustainable Solutions 2025",
      description:
        "Driving environmental innovation through creative solutions for a greener future. We're looking for ideas that reduce environmental impact and promote sustainability.",
      status: "Active",
      deadline: "2025-04-15",
      participants: 189,
      ideas: 142,
      icon: TrendingUp,
      color: "green",
    },
    {
      id: 3,
      title: "Digital Transformation Challenge",
      description:
        "Leverage cutting-edge technologies to transform business processes and customer experiences. Focus on AI, automation, and digital innovation.",
      status: "Coming Soon",
      deadline: "2025-05-01",
      participants: 0,
      ideas: 0,
      icon: Users,
      color: "purple",
    },
    {
      id: 4,
      title: "Customer Experience Excellence",
      description:
        "Innovate to deliver exceptional customer experiences. Submit ideas that enhance customer satisfaction and loyalty across all touchpoints.",
      status: "Active",
      deadline: "2025-04-30",
      participants: 156,
      ideas: 98,
      icon: Users,
      color: "orange",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <I3Header />

      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaigns</h1>
          <p className="text-gray-600">
            Browse active innovation campaigns and submit your ideas
          </p>
        </div>
      </section>

      {/* Campaign List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {campaigns.map((campaign) => {
              const Icon = campaign.icon;
              const colorClasses = {
                blue: "bg-blue-50 text-blue-600 border-blue-100",
                green: "bg-green-50 text-green-600 border-green-100",
                purple: "bg-purple-50 text-purple-600 border-purple-100",
                orange: "bg-orange-50 text-orange-600 border-orange-100",
              };
              const statusClasses = {
                Active: "bg-green-100 text-green-700",
                "Coming Soon": "bg-gray-100 text-gray-700",
              };

              return (
                <div
                  key={campaign.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-4 rounded-lg ${colorClasses[campaign.color as CampaignColor].split(' ')[0]} border ${colorClasses[campaign.color as CampaignColor].split(' ')[2]}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          statusClasses[campaign.status as "Active" | "Coming Soon"]
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {campaign.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-6">
                      {campaign.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="text-lg font-semibold text-gray-900">
                          {campaign.participants}
                        </div>
                        <div className="text-xs text-gray-500">Participants</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="text-lg font-semibold text-gray-900">
                          {campaign.ideas}
                        </div>
                        <div className="text-xs text-gray-500">Ideas</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="text-lg font-semibold text-gray-900 flex items-center justify-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(campaign.deadline).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </div>
                        <div className="text-xs text-gray-500">Deadline</div>
                      </div>
                    </div>

                    <Link
                      href={`/i3-prototype/idea?campaign=${campaign.id}`}
                      className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-medium transition-colors ${
                        campaign.status === "Active"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {campaign.status === "Active" ? (
                        <>
                          Submit Idea
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        "Coming Soon"
                      )}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
