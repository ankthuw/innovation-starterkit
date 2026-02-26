'use client';

export const Slide6 = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$49',
      recommended: false,
      features: ['5 users', 'AI forecasting', 'Basic analytics', 'Email support', '1 POS integration'],
      priceColor: '#44B54B',
      borderColor: 'rgba(68, 181, 75, 0.15)',
      bgColor: 'rgba(68, 181, 75, 0.02)',
    },
    {
      name: 'Professional',
      price: '$149',
      recommended: true,
      features: ['25 users', 'Advanced AI insights', 'Full analytics suite', 'Priority support', '5 integrations', 'Custom reports'],
      priceColor: '#1399FF',
      borderColor: '#1399FF',
      bgColor: 'rgba(19, 153, 255, 0.03)',
    },
    {
      name: 'Enterprise',
      price: '$499',
      recommended: false,
      features: ['Unlimited users', 'White-label solution', 'Custom AI models', 'Dedicated support', 'Unlimited integrations'],
      priceColor: '#44B54B',
      borderColor: 'rgba(68, 181, 75, 0.15)',
      bgColor: 'rgba(68, 181, 75, 0.02)',
    },
  ];

  return (
    <div className="ppt-slide h-[720px] flex flex-col" style={{ background: '#FEFEFE' }}>
      <div className="h-[70px] flex items-center px-[60px]" style={{ borderBottom: '2px solid rgba(68, 181, 75, 0.1)', flexShrink: 0 }}>
        <div className="flex items-center gap-3">
          <i className="material-icons text-3xl" style={{ color: '#44B54B' }}>
            account_balance_wallet
          </i>
          <h1 className="title-font font-bold" style={{ fontSize: '24px', color: '#44B54B', letterSpacing: '-0.5px' }}>
            Business Model
          </h1>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center px-[60px] py-8">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-semibold mb-3" style={{ color: '#333' }}>
            Scalable SaaS Revenue Model
          </h2>
          <p className="text-lg font-light leading-relaxed" style={{ color: '#666' }}>
            B2B SaaS subscription with multiple recurring revenue streams
          </p>
        </div>

        <div className="flex gap-6 mb-8">
          <div className="flex items-start gap-2">
            <i className="material-icons text-xl" style={{ color: '#44B54B' }}>
              subscriptions
            </i>
            <div>
              <p className="text-base font-semibold" style={{ color: '#333' }}>
                Monthly Subscription
              </p>
              <p className="text-sm font-light" style={{ color: '#999' }}>
                Core recurring revenue
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <i className="material-icons text-xl" style={{ color: '#44B54B' }}>
              percent
            </i>
            <div>
              <p className="text-base font-semibold" style={{ color: '#333' }}>
                1.5% Transaction Fee
              </p>
              <p className="text-sm font-light" style={{ color: '#999' }}>
                On processed orders
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <i className="material-icons text-xl" style={{ color: '#44B54B' }}>
              support_agent
            </i>
            <div>
              <p className="text-base font-semibold" style={{ color: '#333' }}>
                Premium Support
              </p>
              <p className="text-sm font-light" style={{ color: '#999' }}>
                Priority assistance plans
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <i className="material-icons text-xl" style={{ color: '#44B54B' }}>
              api
            </i>
            <div>
              <p className="text-base font-semibold" style={{ color: '#333' }}>
                API Access
              </p>
              <p className="text-sm font-light" style={{ color: '#999' }}>
                Custom integrations
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {plans.map((plan) => (
            <div key={plan.name} className="flex-1 flex flex-col p-5 rounded-xl relative" style={{ background: plan.bgColor, border: `2px solid ${plan.borderColor}` }}>
              {plan.recommended && (
                <div
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                  style={{ background: '#1399FF', color: 'white' }}
                >
                  RECOMMENDED
                </div>
              )}
              <p className="text-lg font-semibold mb-1" style={{ color: '#333' }}>
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1 mb-3">
                <div className="title-font font-black" style={{ fontSize: '40px', color: plan.priceColor, lineHeight: 1 }}>
                  {plan.price}
                </div>
                <div className="text-base font-light" style={{ color: '#999' }}>
                  /month
                </div>
              </div>
              <div className="space-y-2 flex-grow">
                {plan.features.map((feature, idx) => (
                  <p key={idx} style={{ color: '#666' }} className="text-sm">
                    • {feature}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
