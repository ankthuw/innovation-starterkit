'use client';

interface StatItem {
  value: string;
  label: string;
  sublabel?: string;
  icon?: string;
}

interface Slide2Props {
  title?: string;
  subtitle?: string;
  description?: string;
  stats?: StatItem[];
}

const DEFAULT_STATS: StatItem[] = [
  {
    icon: 'edit_note',
    value: '73%',
    label: 'Use Manual Methods',
    sublabel: 'Spreadsheets & outdated systems',
  },
  {
    icon: 'trending_down',
    value: '$45B',
    label: 'Lost Annually',
    sublabel: 'Revenue waste from inefficiency',
  },
  {
    icon: 'payments',
    value: '$10K+',
    label: 'ERP Systems Cost',
    sublabel: 'Unaffordable for small businesses',
  },
];

export const Slide2 = ({
  title = 'The Problem',
  subtitle = 'Inventory Inefficiency Is Costing Small Retailers Millions',
  description = 'Small businesses lose up to 30% of revenue annually due to poor inventory management — a $45B market pain point affecting millions of retailers.',
  stats = DEFAULT_STATS
}: Slide2Props) => {
  return (
    <div className="ppt-slide h-[720px] flex flex-col" style={{ background: '#FEFEFE' }}>
      <div className="h-[70px] flex items-center px-[60px]" style={{ borderBottom: '2px solid rgba(68, 181, 75, 0.1)', flexShrink: 0 }}>
        <div className="flex items-center gap-3">
          <i className="material-icons text-3xl" style={{ color: '#44B54B' }}>
            warning
          </i>
          <h1 className="title-font font-bold" style={{ fontSize: '24px', color: '#44B54B', letterSpacing: '-0.5px' }}>
            {title}
          </h1>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center px-[60px] py-10">
        <div className="mb-12 max-w-4xl">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: '#333', lineHeight: 1.3 }}>
            {subtitle}
          </h2>
          <p className="text-lg font-light leading-relaxed" style={{ color: '#666' }}>
            {description}
          </p>
        </div>

        <div className="flex gap-10 items-stretch">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex-1 flex flex-col justify-center">
              {stat.icon && (
                <div className="mb-4">
                  <i className="material-icons" style={{ fontSize: '40px', color: '#44B54B' }}>
                    {stat.icon}
                  </i>
                </div>
              )}
              <div className="title-font font-black mb-3" style={{ fontSize: '72px', color: '#44B54B', lineHeight: 1, letterSpacing: '-2px' }}>
                {stat.value}
              </div>
              <div className="w-14 h-1 mb-3 rounded-full" style={{ background: '#44B54B' }}></div>
              <p className="text-base font-medium" style={{ color: '#333' }}>
                {stat.label}
              </p>
              {stat.sublabel && (
                <p className="text-sm font-light mt-1" style={{ color: '#999' }}>
                  {stat.sublabel}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
