'use client';

export const Slide7 = () => {
  const advantages = [
    {
      icon: 'savings',
      title: 'Affordable Pricing',
      description: '10x cheaper than enterprise ERP systems',
    },
    {
      icon: 'timer',
      title: '15-Minute Onboarding',
      description: 'Quick setup vs weeks for enterprise solutions',
    },
    {
      icon: 'smartphone',
      title: 'Mobile-First Design',
      description: 'Manage inventory on-the-go from any device',
    },
    {
      icon: 'psychology',
      title: 'AI Forecasting Edge',
      description: '95% accurate predictions vs manual guesswork',
    },
  ];

  return (
    <div className="ppt-slide h-[720px] flex flex-col" style={{ background: '#FEFEFE' }}>
      <div className="h-[70px] flex items-center px-[60px]" style={{ borderBottom: '2px solid rgba(68, 181, 75, 0.1)', flexShrink: 0 }}>
        <div className="flex items-center gap-3">
          <i className="material-icons text-3xl" style={{ color: '#44B54B' }}>
            star
          </i>
          <h1 className="title-font font-bold" style={{ fontSize: '24px', color: '#44B54B', letterSpacing: '-0.5px' }}>
            Competitive Landscape
          </h1>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center px-[60px] py-10">
        <div className="mb-10 max-w-4xl">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: '#333' }}>
            Built Specifically for Micro-Businesses
          </h2>
          <p className="text-lg font-light leading-relaxed" style={{ color: '#666' }}>
            AI predictive inventory analytics with <span className="font-semibold" style={{ color: '#44B54B' }}>
              95% accuracy
            </span>
            , tailored for small retailers
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {advantages.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="mb-4">
                <i className="material-icons" style={{ fontSize: '44px', color: '#44B54B' }}>
                  {item.icon}
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
