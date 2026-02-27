/**
 * Pitch Deck Slide Mapping Utilities
 *
 * Transforms AI-generated pitch deck content into the proper props
 * expected by the styled slide components.
 */

import type { PitchDeck, PitchSlide } from '@/types/innovation';

// Helper to split a string into title and description
function splitTitleDescription(text: string, defaultTitleLength = 35): { title: string; description: string } {
  if (!text) return { title: '', description: '' };

  // Try common patterns first
  const patterns = [
    /^(.+?)\s+(?:with|and|for|to)\s+(.+)/i, // "Title with description"
    /^(.+?)\s+-\s+(.+)/, // "Title - description"
    /^(.{10,40}?)\s+(.+)/, // Split at word boundary
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return { title: match[1].trim(), description: match[2].trim() };
    }
  }

  // Fallback: split at character limit
  if (text.length > defaultTitleLength) {
    return {
      title: text.substring(0, defaultTitleLength).trim(),
      description: text.substring(defaultTitleLength).trim()
    };
  }

  return { title: text, description: '' };
}

// Helper to parse market size string (e.g., "$45B - Total Addressable Market...")
function parseMarketSize(text: string): { value: string; description: string } {
  if (!text) return { value: '', description: '' };

  const match = text.match(/^([\d.$A-Z]+[BM]?)\s*-\s*(.+)$/);
  if (match) {
    return { value: match[1].trim(), description: match[2].trim() };
  }

  return { value: text, description: '' };
}

// Helper to parse milestone string (e.g., "Q1: MVP launch with features")
function parseMilestone(text: string, index: number): { quarter: string; title: string; description: string } {
  if (!text) return { quarter: `Q${(index % 4) + 1}`, title: '', description: '' };

  // Try format: "Q1: MVP launch..."
  const quarterMatch = text.match(/^([A-Z]\d+|Q\d+)[:\s]+(.+)$/);
  if (quarterMatch) {
    const { title, description } = splitTitleDescription(quarterMatch[2], 30);
    return {
      quarter: quarterMatch[1].toUpperCase().replace(/[^A-Z0-9]/g, ''),
      title,
      description
    };
  }

  // Fallback: use index for quarter
  const { title, description } = splitTitleDescription(text, 30);
  return {
    quarter: `Q${(index % 4) + 1}`,
    title,
    description
  };
}

// Helper to parse funding string (e.g., "$500,000 - $750,000 seed funding...")
function parseFunding(text: string): { amount: string; range: string; description: string } {
  if (!text) return { amount: '$500K', range: '', description: '' };

  // Extract amounts
  const amountMatch = text.match(/\$[\d,.]+[KMB]?/gi);
  const amounts = amountMatch || [];
  const amount = amounts[0] || '$500K';
  const range = amounts[1] ? `– ${amounts[1]}` : '';

  // Remove amounts and common words to get description
  const description = text
    .replace(/\$[\d,.]+[KMB]?/gi, '')
    .replace(/[-–]\s*\$[\d,.]+[KMB]?/gi, '')
    .replace(/seed funding|funding|runway/gi, '')
    .trim();

  return { amount, range, description: description || 'Funding to reach product-market fit' };
}

// Helper to parse use of funds string (e.g., "$250K - Product development and MVP")
function parseUseOfFunds(text: string, index: number): { icon: string; title: string; description: string } {
  const icons = ['code', 'group_add', 'campaign', 'settings', 'science', 'business_center', 'trending_up', 'payments'];

  // Try format: "$250K - Product development and MVP"
  const match = text.match(/^\$?[\d,KM]+[\s-]*-(.+)$/);
  if (match) {
    const { title, description } = splitTitleDescription(match[1].trim());
    return {
      icon: icons[index % icons.length],
      title: title || text.substring(0, 30),
      description: description || ''
    };
  }

  const { title, description } = splitTitleDescription(text);
  return {
    icon: icons[index % icons.length],
    title: title || text.substring(0, 30),
    description: description || ''
  };
}

// Helper to parse stat string (e.g., "73% of small businesses still use manual inventory methods")
function parseStat(text: string, index: number): { value: string; label: string; sublabel: string; icon: string } | null {
  if (!text) return null;

  const icons = ['edit_note', 'trending_down', 'payments', 'showchart', 'inventory_2', 'warning'];
  const match = text.match(/^([\d.$%]+[BM%]?)\s+(.+)/);

  if (match) {
    const { title, description } = splitTitleDescription(match[2], 25);
    return {
      value: match[1],
      label: title,
      sublabel: description,
      icon: icons[index % icons.length]
    };
  }

  return null;
}

/**
 * Maps AI-generated slide data to Slide1 (Title) props
 */
export function mapTitleSlide(slide: PitchSlide, pitchDeck: PitchDeck) {
  const content = slide.content;
  return {
    title: slide.title || pitchDeck.title,
    tagline: (content.tagline as string) || pitchDeck.tagline,
    presenter: (content.presenter as string) || 'Your Name',
  };
}

/**
 * Maps AI-generated slide data to Slide2 (Problem) props
 */
export function mapProblemSlide(slide: PitchSlide) {
  const content = slide.content;
  const stats = Array.isArray(content.stats)
    ? (content.stats as string[]).map((s, i) => parseStat(s, i)).filter((s): s is NonNullable<typeof s> => s !== null)
    : undefined;

  return {
    title: slide.title,
    subtitle: slide.title,
    description: (content.problem as string) ||
                 (content.impact as string) ||
                 (content.description as string) ||
                 Object.values(content).find(v => typeof v === 'string') as string || '',
    stats,
  };
}

/**
 * Maps AI-generated slide data to Slide3 (Solution) props
 */
export function mapSolutionSlide(slide: PitchSlide) {
  const content = slide.content;

  const features = Array.isArray(content.features)
    ? (content.features as string[]).map(f => splitTitleDescription(f, 30))
    : undefined;

  const benefits = Array.isArray(content.benefits)
    ? (content.benefits as string[]).map(b => splitTitleDescription(b, 30))
    : undefined;

  return {
    title: slide.title,
    subtitle: slide.title,
    description: (content.solution as string) ||
                 (content.description as string) ||
                 Object.values(content).find(v => typeof v === 'string') as string || '',
    features,
    benefits,
  };
}

/**
 * Maps AI-generated slide data to Slide4 (Market) props
 */
export function mapMarketSlide(slide: PitchSlide) {
  const content = slide.content;

  const tam = parseMarketSize(content.tam as string);
  const sam = parseMarketSize(content.sam as string);
  const som = parseMarketSize(content.som as string);

  const growthText = content.growth as string || '';
  const growthMatch = growthText.match(/([\d.]+)%?/);
  const growthRate = growthMatch ? `${growthMatch[1]}%` : '';
  const growthDescription = growthText.replace(/[\d.%]+/g, '').trim() || 'Growing market';

  return {
    title: slide.title,
    tam: tam.value,
    tamDescription: tam.description,
    sam: sam.value,
    samDescription: sam.description,
    som: som.value,
    somDescription: som.description,
    growthRate,
    growthDescription,
  };
}

/**
 * Maps AI-generated slide data to Slide6 (Business Model) props
 */
export function mapBusinessModelSlide(slide: PitchSlide) {
  const content = slide.content;

  const revenueStreams = Array.isArray(content.revenueStreams)
    ? (content.revenueStreams as string[]).slice(0, 4).map((rs, i) => {
        const icons = ['subscriptions', 'percent', 'support_agent', 'api'];
        const { title, description } = splitTitleDescription(rs.replace(/\([\d.$%]+\)/g, '').trim(), 25);
        return {
          icon: icons[i % icons.length],
          title: title || rs.substring(0, 30),
          description: description || ''
        };
      })
    : undefined;

  const pricingText = content.pricing as string || '';
  const plans: any[] = [];

  // Parse pricing tiers
  if (pricingText.includes('Basic') && pricingText.includes('$49')) {
    plans.push({
      name: 'Basic',
      price: '$49',
      recommended: false,
      features: ['Essential features', 'Basic support', 'Core functionality'],
    });
  }
  if (pricingText.includes('Professional') && pricingText.includes('$149')) {
    plans.push({
      name: 'Professional',
      price: '$149',
      recommended: true,
      features: ['Advanced features', 'Priority support', 'Full functionality'],
    });
  }
  if (pricingText.includes('Enterprise') && pricingText.includes('$499')) {
    plans.push({
      name: 'Enterprise',
      price: '$499',
      recommended: false,
      features: ['Custom features', 'Dedicated support', 'White-label options'],
    });
  }

  return {
    title: slide.title,
    subtitle: 'Scalable SaaS Revenue Model',
    description: (content.model as string) ||
                 (content.description as string) ||
                 Object.values(content).find(v => typeof v === 'string') as string || '',
    revenueStreams,
    pricing: pricingText,
    plans: plans.length > 0 ? plans : undefined,
  };
}

/**
 * Maps AI-generated slide data to Slide5 (Competition) props
 */
export function mapCompetitionSlide(slide: PitchSlide) {
  const content = slide.content;

  const advantages = Array.isArray(content.differentiators)
    ? (content.differentiators as string[]).slice(0, 4).map((d, i) => {
        const icons = ['savings', 'timer', 'smartphone', 'psychology', 'verified', 'speed'];
        const { title, description } = splitTitleDescription(d, 40);
        return {
          icon: icons[i % icons.length],
          title: title || d.substring(0, 40),
          description: description || ''
        };
      })
    : undefined;

  return {
    title: slide.title,
    subtitle: 'Competitive Advantage',
    description: (content.advantage as string) ||
                 (content.description as string) ||
                 Object.values(content).find(v => typeof v === 'string') as string || '',
    advantages,
  };
}

/**
 * Maps AI-generated slide data to Slide7 (Ask) props
 */
export function mapAskSlide(slide: PitchSlide) {
  const content = slide.content;

  const { amount, range, description } = parseFunding(content.funding as string);

  const useOfFunds = Array.isArray(content.useOfFunds)
    ? (content.useOfFunds as string[]).slice(0, 4).map((uof, i) => parseUseOfFunds(uof, i))
    : undefined;

  const milestones = Array.isArray(content.milestones)
    ? (content.milestones as string[]).slice(0, 4).map((m, i) => parseMilestone(m, i))
    : undefined;

  return {
    title: slide.title,
    subtitle: 'Investment Opportunity',
    description: description,
    funding: amount,
    fundingRange: range,
    useOfFunds,
    milestones,
  };
}

/**
 * Main mapping function - maps any slide to its styled component props
 */
export function mapSlideToStyledProps(slide: PitchSlide, pitchDeck: PitchDeck) {
  switch (slide.type) {
    case 'title':
      return mapTitleSlide(slide, pitchDeck);
    case 'problem':
      return mapProblemSlide(slide);
    case 'solution':
      return mapSolutionSlide(slide);
    case 'market':
      return mapMarketSlide(slide);
    case 'business-model':
      return mapBusinessModelSlide(slide);
    case 'competition':
      return mapCompetitionSlide(slide);
    case 'ask':
      return mapAskSlide(slide);
    default:
      return null;
  }
}
