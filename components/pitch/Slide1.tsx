'use client';

export const Slide1 = () => {
  return (
    <div className="ppt-slide h-[720px] flex flex-col justify-center items-center relative" style={{ background: '#FEFEFE' }}>
      <div className="absolute top-16 right-20 w-32 h-32 rounded-full opacity-10" style={{ background: '#44B54B', flexShrink: 0 }}></div>
      <div
        className="absolute bottom-20 left-24 w-24 h-24 opacity-10"
        style={{
          background: '#44B54B',
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        }}
      ></div>
      <div className="absolute top-1/3 left-16 w-3 h-32 opacity-5" style={{ background: '#44B54B' }}></div>
      <div className="absolute bottom-1/4 right-32 w-2 h-24 opacity-5" style={{ background: '#44B54B' }}></div>

      <div className="text-center z-10 px-20">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full" style={{ background: 'rgba(68, 181, 75, 0.08)', border: '1.5px solid rgba(68, 181, 75, 0.2)' }}>
            <i className="material-icons text-2xl" style={{ color: '#44B54B' }}>
              auto_graph
            </i>
            <span className="text-base font-medium tracking-wide" style={{ color: '#44B54B' }}>
              AI-POWERED PLATFORM
            </span>
          </div>
        </div>

        <h1 className="title-font font-black mb-6" style={{ fontSize: '70px', lineHeight: 1.1, color: '#44B54B', letterSpacing: '-1px' }}>
          StockSmart AI
        </h1>

        <div className="flex justify-center mb-8">
          <div className="w-32 h-1.5 rounded-full" style={{ background: '#44B54B' }}></div>
        </div>

        <p className="text-xl font-light leading-relaxed mb-16 max-w-2xl mx-auto" style={{ color: '#333' }}>
          AI-Powered Inventory Management
          <br />
          That Thinks Ahead
        </p>

        <div className="flex justify-center items-center gap-6 text-base" style={{ color: '#666' }}>
          <div className="flex items-center gap-2">
            <i className="material-icons text-xl" style={{ color: '#44B54B' }}>
              person
            </i>
            <span className="font-light">Your Name</span>
          </div>
          <div className="w-1 h-4 rounded-full" style={{ background: 'rgba(68, 181, 75, 0.3)' }}></div>
          <div className="flex items-center gap-2">
            <i className="material-icons text-xl" style={{ color: '#44B54B' }}>
              business
            </i>
            <span className="font-light">Seed Stage Investment Opportunity</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-16 text-sm" style={{ color: '#999' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: '#44B54B' }}></div>
          <span className="font-light">Predictive Analytics</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: '#44B54B' }}></div>
          <span className="font-light">Automated Operations</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: '#44B54B' }}></div>
          <span className="font-light">Enterprise Intelligence</span>
        </div>
      </div>
    </div>
  );
};
