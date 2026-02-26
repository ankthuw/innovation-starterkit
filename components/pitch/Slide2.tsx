'use client';

export const Slide2 = () => {
  return (
    <div className="ppt-slide h-[720px] flex flex-col" style={{ background: '#FEFEFE' }}>
      <div className="h-[70px] flex items-center px-[60px]" style={{ borderBottom: '2px solid rgba(68, 181, 75, 0.1)', flexShrink: 0 }}>
        <div className="flex items-center gap-3">
          <i className="material-icons text-3xl" style={{ color: '#44B54B' }}>
            warning
          </i>
          <h1 className="title-font font-bold" style={{ fontSize: '24px', color: '#44B54B', letterSpacing: '-0.5px' }}>
            The Problem
          </h1>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center px-[60px] py-10">
        <div className="mb-12 max-w-4xl">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: '#333', lineHeight: 1.3 }}>
            Inventory Inefficiency Is Costing Small Retailers Millions
          </h2>
          <p className="text-lg font-light leading-relaxed" style={{ color: '#666' }}>
            Small businesses lose up to <span className="font-semibold" style={{ color: '#44B54B' }}>
              30% of revenue annually
            </span>{' '}
            due to poor inventory management — a <span className="font-semibold" style={{ color: '#44B54B' }}>
              $45B
            </span>{' '}
            market pain point affecting millions of retailers.
          </p>
        </div>

        <div className="flex gap-10 items-stretch">
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-4">
              <i className="material-icons" style={{ fontSize: '40px', color: '#44B54B' }}>
                edit_note
              </i>
            </div>
            <div className="title-font font-black mb-3" style={{ fontSize: '72px', color: '#44B54B', lineHeight: 1, letterSpacing: '-2px' }}>
              73%
            </div>
            <div className="w-14 h-1 mb-3 rounded-full" style={{ background: '#44B54B' }}></div>
            <p className="text-base font-medium" style={{ color: '#333' }}>
              Use Manual Methods
            </p>
            <p className="text-sm font-light mt-1" style={{ color: '#999' }}>
              Spreadsheets & outdated systems
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-4">
              <i className="material-icons" style={{ fontSize: '40px', color: '#44B54B' }}>
                trending_down
              </i>
            </div>
            <div className="title-font font-black mb-3" style={{ fontSize: '72px', color: '#44B54B', lineHeight: 1, letterSpacing: '-2px' }}>
              $45B
            </div>
            <div className="w-14 h-1 mb-3 rounded-full" style={{ background: '#44B54B' }}></div>
            <p className="text-base font-medium" style={{ color: '#333' }}>
              Lost Annually
            </p>
            <p className="text-sm font-light mt-1" style={{ color: '#999' }}>
              Revenue waste from inefficiency
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-4">
              <i className="material-icons" style={{ fontSize: '40px', color: '#44B54B' }}>
                payments
              </i>
            </div>
            <div className="title-font font-black mb-3" style={{ fontSize: '72px', color: '#44B54B', lineHeight: 1, letterSpacing: '-2px' }}>
              $10K+
            </div>
            <div className="w-14 h-1 mb-3 rounded-full" style={{ background: '#44B54B' }}></div>
            <p className="text-base font-medium" style={{ color: '#333' }}>
              ERP Systems Cost
            </p>
            <p className="text-sm font-light mt-1" style={{ color: '#999' }}>
              Unaffordable for small businesses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
