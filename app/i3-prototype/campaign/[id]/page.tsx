import { redirect } from "next/navigation";
import Link from "next/link";
import { I3Header } from "@/components/i3-prototype/i3-header";
import { ArrowLeft, ArrowRight, Calendar, Users, Lightbulb } from "lucide-react";

export default function CampaignDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real app, fetch from database
  const campaign = {
    id: 1,
    title: "THINK. PITCH. WIN.",
    description:
      "Share your innovative ideas and compete for recognition. Submit your proposals and win exciting rewards. This campaign focuses on breakthrough innovations across all business sectors.",
    longDescription: `
      We are looking for innovative ideas that can transform our business and create value for our customers.
      Your idea should address a clear problem or opportunity and propose a novel solution.

      **What we're looking for:**
      - Breakthrough innovations that challenge the status quo
      - Solutions that create measurable business impact
      - Ideas with potential for scalability and implementation
      - Concepts that align with our strategic priorities

      **Submission Guidelines:**
      - Clearly define the problem or opportunity
      - Explain your proposed solution
      - Describe the potential impact and benefits
      - Include any relevant supporting materials
    `,
    status: "Active",
    deadline: "2025-03-31",
    participants: 245,
    ideas: 187,
    rewards: ["Recognition", "Career Development Opportunities", "Prizes"],
  };

  if (params.id !== campaign.id.toString()) {
    redirect("/i3-prototype/campaign");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <I3Header />

      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/i3-prototype/campaign"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Campaigns
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
              {campaign.status}
            </span>
            <span className="text-sm text-gray-500">
              Deadline: {new Date(campaign.deadline).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {campaign.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {campaign.description}
          </p>
        </div>
      </section>

      {/* Campaign Details */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  About This Campaign
                </h2>
                <div className="prose prose-gray max-w-none">
                  <div className="whitespace-pre-line text-gray-600">
                    {campaign.longDescription}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Rewards & Recognition
                </h2>
                <ul className="space-y-3">
                  {campaign.rewards.map((reward, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      {reward}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Campaign Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>Participants</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {campaign.participants}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Lightbulb className="w-4 h-4" />
                      <span>Ideas Submitted</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {campaign.ideas}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {new Date(campaign.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-blue-50 rounded-lg border border-blue-100 p-6">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Ready to innovate?
                </h3>
                <p className="text-sm text-blue-700 mb-4">
                  Submit your idea and compete for exciting rewards
                </p>
                <Link
                  href={`/i3-prototype/idea?campaign=${campaign.id}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Submit Your Idea
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
