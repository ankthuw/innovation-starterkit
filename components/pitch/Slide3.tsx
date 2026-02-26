'use client';

export const Slide3 = () => {
  return (
    <div className="ppt-slide h-[720px] flex flex-col" style={{ background: '#FEFEFE' }}>
      <div className="h-[70px] flex items-center px-[60px]" style={{ borderBottom: '2px solid rgba(68, 181, 75, 0.1)', flexShrink: 0 }}>
        <div className="flex items-center gap-3">
          <i className="material-icons text-3xl" style={{ color: '#44B54B' }}>
            lightbulb
          </i>
          <h1 className="title-font font-bold" style={{ fontSize: '24px', color: '#44B54B', letterSpacing: '-0.5px' }}>
            Our Solution
          </h1>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center px-[60px] py-10">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: '#333' }}>
            Inventory That Thinks Ahead
          </h2>
          <p className="text-lg font-light leading-relaxed" style={{ color: '#666' }}>
            Intelligent inventory platform using machine learning to predict demand and automate reordering
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
              <div className="flex items-start gap-3">
                <i className="material-icons text-2xl mt-0.5" style={{ color: '#44B54B' }}>
                  insights
                </i>
                <div>
                  <p className="text-lg font-semibold mb-0.5" style={{ color: '#333' }}>
                    95% Accurate AI Forecasting
                  </p>
                  <p className="text-sm font-light" style={{ color: '#999' }}>
                    Predictive demand analysis
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="material-icons text-2xl mt-0.5" style={{ color: '#44B54B' }}>
                  notifications_active
                </i>
                <div>
                  <p className="text-lg font-semibold mb-0.5" style={{ color: '#333' }}>
                    Automated Reorder Alerts
                  </p>
                  <p className="text-sm font-light" style={{ color: '#999' }}>
                    Never miss optimal reorder points
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="material-icons text-2xl mt-0.5" style={{ color: '#44B54B' }}>
                  inventory
                </i>
                <div>
                  <p className="text-lg font-semibold mb-0.5" style={{ color: '#333' }}>
                    Real-Time Inventory Tracking
                  </p>
                  <p className="text-sm font-light" style={{ color: '#999' }}>
                    Live visibility across all channels
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="material-icons text-2xl mt-0.5" style={{ color: '#44B54B' }}>
                  sync
                </i>
                <div>
                  <p className="text-lg font-semibold mb-0.5" style={{ color: '#333' }}>
                    POS & E-commerce Integrations
                  </p>
                  <p className="text-sm font-light" style={{ color: '#999' }}>
                    Seamless system connectivity
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="material-icons text-2xl mt-0.5" style={{ color: '#44B54B' }}>
                  smartphone
                </i>
                <div>
                  <p className="text-lg font-semibold mb-0.5" style={{ color: '#333' }}>
                    Mobile-First Onboarding
                  </p>
                  <p className="text-sm font-light" style={{ color: '#999' }}>
                    15-minute setup process
                  </p>
                </div>
              </div>
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
              <div className="flex items-start gap-3">
                <i className="material-icons text-2xl mt-0.5" style={{ color: '#44B54B' }}>
                  trending_up
                </i>
                <div>
                  <p className="text-lg font-semibold mb-0.5" style={{ color: '#333' }}>
                    Reduce Stockouts & Overstocking
                  </p>
                  <p className="text-sm font-light" style={{ color: '#999' }}>
                    Optimal inventory levels
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="material-icons text-2xl mt-0.5" style={{ color: '#44B54B' }}>
                  schedule
                </i>
                <div>
                  <p className="text-lg font-semibold mb-0.5" style={{ color: '#333' }}>
                    Save 80% Manual Time
                  </p>
                  <p className="text-sm font-light" style={{ color: '#999' }}>
                    Automated routine tasks
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="material-icons text-2xl mt-0.5" style={{ color: '#1399FF' }}>
                  payments
                </i>
                <div>
                  <p className="text-lg font-semibold mb-0.5" style={{ color: '#333' }}>
                    Affordable at $49/Month
                  </p>
                  <p className="text-sm font-light" style={{ color: '#999' }}>
                    10x cheaper than enterprise systems
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="material-icons text-2xl mt-0.5" style={{ color: '#44B54B' }}>
                  workspace_premium
                </i>
                <div>
                  <p className="text-lg font-semibold mb-0.5" style={{ color: '#333' }}>
                    Enterprise-Grade Intelligence
                  </p>
                  <p className="text-sm font-light" style={{ color: '#999' }}>
                    AI-powered analytics at SMB price
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
