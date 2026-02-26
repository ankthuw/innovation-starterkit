'use client';

export const Slide4 = () => {
  return (
    <div className="ppt-slide h-[720px] flex flex-col" style={{ background: '#FEFEFE' }}>
      <div className="h-[70px] flex items-center px-[60px]" style={{ borderBottom: '2px solid rgba(68, 181, 75, 0.1)', flexShrink: 0 }}>
        <div className="flex items-center gap-3">
          <i className="material-icons text-3xl" style={{ color: '#44B54B' }}>
            insights
          </i>
          <h1 className="title-font font-bold" style={{ fontSize: '24px', color: '#44B54B', letterSpacing: '-0.5px' }}>
            Market Opportunity
          </h1>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center px-[60px] py-10">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: '#333' }}>
            Large and Growing Market
          </h2>
          <p className="text-lg font-light leading-relaxed" style={{ color: '#666' }}>
            Addressing a massive opportunity with clear growth trajectory
          </p>
        </div>

        <div className="flex gap-6 mb-10">
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-base font-medium mb-2" style={{ color: '#999' }}>
                Total Addressable Market
              </p>
              <div className="title-font font-black" style={{ fontSize: '64px', color: '#44B54B', lineHeight: 1, letterSpacing: '-2px' }}>
                $45B
              </div>
              <div className="w-16 h-1.5 mt-3 rounded-full" style={{ background: '#44B54B' }}></div>
            </div>
            <p className="text-sm font-light mt-4" style={{ color: '#666' }}>
              Global inventory management market
            </p>
          </div>

          <div className="flex-1">
            <div className="mb-4">
              <p className="text-base font-medium mb-2" style={{ color: '#999' }}>
                Serviceable Addressable Market
              </p>
              <div className="title-font font-black" style={{ fontSize: '64px', color: '#44B54B', lineHeight: 1, letterSpacing: '-2px' }}>
                $8.2B
              </div>
              <div className="w-16 h-1.5 mt-3 rounded-full" style={{ background: '#44B54B' }}></div>
            </div>
            <p className="text-sm font-light mt-4" style={{ color: '#666' }}>
              Small retail segment in North America
            </p>
          </div>

          <div className="flex-1">
            <div className="mb-4">
              <p className="text-base font-medium mb-2" style={{ color: '#999' }}>
                Serviceable Obtainable Market
              </p>
              <div className="title-font font-black" style={{ fontSize: '64px', color: '#44B54B', lineHeight: 1, letterSpacing: '-2px' }}>
                $420M
              </div>
              <div className="w-16 h-1.5 mt-3 rounded-full" style={{ background: '#44B54B' }}></div>
            </div>
            <p className="text-sm font-light mt-4" style={{ color: '#666' }}>
              Year 3 target market share
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 rounded-xl" style={{ background: 'rgba(68, 181, 75, 0.05)', borderLeft: '4px solid #44B54B' }}>
          <i className="material-icons text-3xl" style={{ color: '#44B54B' }}>
            trending_up
          </i>
          <div>
            <p className="text-xl font-semibold mb-1" style={{ color: '#333' }}>
              <span className="title-font font-black" style={{ color: '#44B54B', fontSize: '32px' }}>
                18%
              </span>{' '}
              Annual Growth
            </p>
            <p className="text-base font-light" style={{ color: '#666' }}>
              Driven by SMB digital transformation and cloud adoption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
