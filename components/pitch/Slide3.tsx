'use client';

interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

interface Slide3Props {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: FeatureItem[];
  benefits?: FeatureItem[];
}

const DEFAULT_FEATURES: FeatureItem[] = [
  { title: '95% Accurate AI Forecasting', description: 'Predictive demand analysis', icon: 'insights' },
  { title: 'Automated Reorder Alerts', description: 'Never miss optimal reorder points', icon: 'notifications_active' },
  { title: 'Real-Time Inventory Tracking', description: 'Live visibility across all channels', icon: 'inventory' },
  { title: 'POS & E-commerce Integrations', description: 'Seamless system connectivity', icon: 'sync' },
  { title: 'Mobile-First Onboarding', description: '15-minute setup process', icon: 'smartphone' },
];

const DEFAULT_BENEFITS: FeatureItem[] = [
  { title: 'Reduce Stockouts & Overstocking', description: 'Optimal inventory levels', icon: 'trending_up' },
  { title: 'Save 80% Manual Time', description: 'Automated routine tasks', icon: 'schedule' },
  { title: 'Affordable at $49/Month', description: '10x cheaper than enterprise systems', icon: 'payments' },
  { title: 'Enterprise-Grade Intelligence', description: 'AI-powered analytics at SMB price', icon: 'workspace_premium' },
];

const FEATURE_ICONS = ['insights', 'notifications_active', 'inventory', 'sync', 'smartphone', 'check_circle', 'star', 'settings'];
const BENEFIT_ICONS = ['trending_up', 'schedule', 'payments', 'workspace_premium', 'verified', 'speed', 'security'];

export const Slide3 = ({
  title = 'Our Solution',
  subtitle = 'Inventory That Thinks Ahead',
  description = 'Intelligent inventory platform using machine learning to predict demand and automate reordering',
  features = DEFAULT_FEATURES,
  benefits = DEFAULT_BENEFITS
}: Slide3Props) => {
  return (
    <div className="ppt-slide h-[720px] flex flex-col" style={{ background: '#FEFEFE' }}>
      <div className="h-[70px] flex items-center px-[60px]" style={{ borderBottom: '2px solid rgba(68, 181, 75, 0.1)', flexShrink: 0 }}>
        <div className="flex items-center gap-3">
          <i className="material-icons text-3xl" style={{ color: '#44B54B' }}>
            lightbulb
          </i>
          <h1 className="title-font font-bold" style={{ fontSize: '24px', color: '#44B54B', letterSpacing: '-0.5px' }}>
            {title}
          </h1>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center px-[60px] py-10">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: '#333' }}>
            {subtitle}
          </h2>
          <p className="text-lg font-light leading-relaxed" style={{ color: '#666' }}>
            {description}
          </p>
        </div>

        <div className="flex gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-6">
              <i className="material-icons" style={{ color: '#44B54B', fontSize: '28px' }}>
                check_circle
              </i>
              <h3 className="text-xl font-semibold" style={{ color: '#333' }}>
                Features
              </h3>
            </div>
            <div className="space-y-4">
              {features.slice(0, 5).map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <i className="material-icons text-2xl mt-0.5" style={{ color: '#44B54B' }}>
                    {feature.icon || FEATURE_ICONS[idx % FEATURE_ICONS.length]}
                  </i>
                  <div>
                    <p className="text-lg font-semibold mb-0.5" style={{ color: '#333' }}>
                      {feature.title}
                    </p>
                    <p className="text-sm font-light" style={{ color: '#999' }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-6">
              <i className="material-icons" style={{ color: '#44B54B', fontSize: '28px' }}>
                stars
              </i>
              <h3 className="text-xl font-semibold" style={{ color: '#333' }}>
                Benefits
              </h3>
            </div>
            <div className="space-y-4">
              {benefits.slice(0, 4).map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <i className="material-icons text-2xl mt-0.5" style={{ color: '#44B54B' }}>
                    {benefit.icon || BENEFIT_ICONS[idx % BENEFIT_ICONS.length]}
                  </i>
                  <div>
                    <p className="text-lg font-semibold mb-0.5" style={{ color: '#333' }}>
                      {benefit.title}
                    </p>
                    <p className="text-sm font-light" style={{ color: '#999' }}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
