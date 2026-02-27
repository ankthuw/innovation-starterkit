'use client';

interface MilestoneItem {
  quarter: string;
  title: string;
  description: string;
}

interface FundingItem {
  icon?: string;
  title: string;
  description: string;
}

interface Slide7Props {
  title?: string;
  subtitle?: string;
  description?: string;
  funding?: string;
  fundingRange?: string;
  runway?: string;
  useOfFunds?: FundingItem[];
  milestones?: MilestoneItem[];
}

const DEFAULT_USE_OF_FUNDS: FundingItem[] = [
  { icon: 'code', title: 'Product Development', description: 'Core platform enhancements' },
  { icon: 'group_add', title: 'Team Expansion', description: 'Engineering & growth' },
  { icon: 'campaign', title: 'Marketing', description: 'Customer acquisition' },
  { icon: 'settings', title: 'Operations', description: 'Infrastructure & support' },
];

const DEFAULT_MILESTONES: MilestoneItem[] = [
  { quarter: 'Q1', title: 'MVP Launch', description: 'Core platform ready' },
  { quarter: 'Q2', title: '50 Beta Customers', description: 'Validated product' },
  { quarter: 'Q3', title: 'Public Launch', description: 'Go-to-market ready' },
  { quarter: 'Q4', title: '500 Customers', description: '$480K ARR' },
];

const FUNDING_ICONS = ['code', 'group_add', 'campaign', 'settings', 'science', 'business_center', 'trending_up'];

export const Slide7 = ({
  title = 'The Ask',
  subtitle = 'Seed Funding to Reach Product-Market Fit',
  description = '18-month runway to achieve market traction and scale',
  funding = '$500K',
  fundingRange = '– $750K',
  runway = '18-month runway',
  useOfFunds = DEFAULT_USE_OF_FUNDS,
  milestones = DEFAULT_MILESTONES
}: Slide7Props) => {
  return (
    <div className="ppt-slide h-[720px] flex flex-col" style={{ background: '#FEFEFE' }}>
      <div className="h-[70px] flex items-center px-[60px]" style={{ borderBottom: '2px solid rgba(68, 181, 75, 0.1)', flexShrink: 0 }}>
        <div className="flex items-center gap-3">
          <i className="material-icons text-3xl" style={{ color: '#44B54B' }}>
            rocket_launch
          </i>
          <h1 className="title-font font-bold" style={{ fontSize: '24px', color: '#44B54B', letterSpacing: '-0.5px' }}>
            {title}
          </h1>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center px-[60px] py-8">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-semibold mb-3" style={{ color: '#333' }}>
            {subtitle}
          </h2>
          <p className="text-lg font-light" style={{ color: '#666' }}>
            {description}
          </p>
        </div>

        <div className="flex gap-10 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <i className="material-icons text-2xl" style={{ color: '#44B54B' }}>
                payments
              </i>
              <h3 className="text-xl font-semibold" style={{ color: '#333' }}>
                Funding
              </h3>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <div className="title-font font-black" style={{ fontSize: '56px', color: '#44B54B', lineHeight: 1, letterSpacing: '-2px' }}>
                {funding}
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-14 h-1 rounded-full" style={{ background: '#44B54B' }}></div>
              <span className="text-lg font-medium" style={{ color: '#666' }}>
                {fundingRange}
              </span>
            </div>
            <p className="text-base font-light" style={{ color: '#999' }}>
              {runway}
            </p>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <i className="material-icons text-2xl" style={{ color: '#44B54B' }}>
                pie_chart
              </i>
              <h3 className="text-xl font-semibold" style={{ color: '#333' }}>
                Use of Funds
              </h3>
            </div>
            <div className="space-y-3">
              {useOfFunds.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <i className="material-icons text-lg mt-0.5" style={{ color: '#44B54B' }}>
                    {item.icon || FUNDING_ICONS[idx % FUNDING_ICONS.length]}
                  </i>
                  <div>
                    <p className="text-base font-medium" style={{ color: '#333' }}>
                      {item.title}
                    </p>
                    <p className="text-sm font-light" style={{ color: '#999' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <i className="material-icons text-2xl" style={{ color: '#44B54B' }}>
              flag
            </i>
            <h3 className="text-xl font-semibold" style={{ color: '#333' }}>
              18-Month Milestones
            </h3>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {milestones.slice(0, 4).map((milestone, idx) => (
              <div key={idx} className="p-4 rounded-xl" style={{ background: 'rgba(68, 181, 75, 0.02)', borderLeft: '4px solid #44B54B' }}>
                <p className="title-font font-bold text-2xl mb-1" style={{ color: '#44B54B' }}>
                  {milestone.quarter}
                </p>
                <p className="text-base font-semibold mb-1" style={{ color: '#333' }}>
                  {milestone.title}
                </p>
                <p className="text-sm font-light" style={{ color: '#666' }}>
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
