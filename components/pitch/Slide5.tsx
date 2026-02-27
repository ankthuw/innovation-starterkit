'use client';

interface AdvantageItem {
  icon?: string;
  title: string;
  description: string;
}

interface Slide5Props {
  title?: string;
  subtitle?: string;
  description?: string;
  advantages?: AdvantageItem[];
}

const DEFAULT_ADVANTAGES: AdvantageItem[] = [
  { icon: 'savings', title: 'Affordable Pricing', description: '10x cheaper than enterprise ERP systems' },
  { icon: 'timer', title: '15-Minute Onboarding', description: 'Quick setup vs weeks for enterprise solutions' },
  { icon: 'smartphone', title: 'Mobile-First Design', description: 'Manage inventory on-the-go from any device' },
  { icon: 'psychology', title: 'AI Forecasting Edge', description: '95% accurate predictions vs manual guesswork' },
];

const ADVANTAGE_ICONS = ['savings', 'timer', 'smartphone', 'psychology', 'verified', 'speed', 'workspace_premium', 'security'];

export const Slide5 = ({
  title = 'Competitive Landscape',
  subtitle = 'Built Specifically for Micro-Businesses',
  description = 'AI predictive inventory analytics with 95% accuracy, tailored for small retailers',
  advantages = DEFAULT_ADVANTAGES
}: Slide5Props) => {
  return (
    <div className="ppt-slide h-[720px] flex flex-col" style={{ background: '#FEFEFE' }}>
      <div className="h-[70px] flex items-center px-[60px]" style={{ borderBottom: '2px solid rgba(68, 181, 75, 0.1)', flexShrink: 0 }}>
        <div className="flex items-center gap-3">
          <i className="material-icons text-3xl" style={{ color: '#44B54B' }}>
            star
          </i>
          <h1 className="title-font font-bold" style={{ fontSize: '24px', color: '#44B54B', letterSpacing: '-0.5px' }}>
            {title}
          </h1>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center px-[60px] py-10">
        <div className="mb-10 max-w-4xl">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: '#333' }}>
            {subtitle}
          </h2>
          <p className="text-lg font-light leading-relaxed" style={{ color: '#666' }}>
            {description}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {advantages.slice(0, 4).map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="mb-4">
                <i className="material-icons" style={{ fontSize: '44px', color: '#44B54B' }}>
                  {item.icon || ADVANTAGE_ICONS[idx % ADVANTAGE_ICONS.length]}
                </i>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#333' }}>
                {item.title}
              </h3>
              <div className="w-12 h-1 mb-3 rounded-full" style={{ background: '#44B54B' }}></div>
              <p className="text-base font-light leading-relaxed" style={{ color: '#666' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
