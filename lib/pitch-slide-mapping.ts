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

  // Try colon as primary delimiter (e.g., "Title: Description")
  const colonMatch = text.match(/^(.+?)[:：]\s*(.+)$/);
  if (colonMatch) {
    return { title: colonMatch[1].trim(), description: colonMatch[2].trim() };
  }

  // Try common patterns
  const patterns = [
    /^(.+?)\s+-\s+(.+)/, // "Title - description"
    /^(.+?)\s+(?:with|and|for|to)\s+(.+)/i, // "Title with description"
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

// Helper to parse market size string
// Handles formats like:
// 1. "$45B - Total Addressable Market: US retail inventory software market..."
// 2. "Global Retail Tech SaaS Market: $45B"
function parseMarketSize(text: string): { value: string; description: string } {
  if (!text) return { value: '', description: '' };

  // Format 2: "Label: $value" (label first, then value)
  const labelFirstMatch = text.match(/^(.+?)[:：]\s*([\$€£]?\s*[\d.,]+[BMK]?\+?)\s*(.*)$/);
  if (labelFirstMatch) {
    return {
      value: labelFirstMatch[2].trim(),
      description: labelFirstMatch[1].trim()
    };
  }

  // Format 1: "$value - Label: description..." (value first, dash separator)
  const match = text.match(/^([\d.$A-Z]+[BM]?)\s*-\s*(.+)$/);
  if (match) {
    const value = match[1].trim();
    const fullDescription = match[2].trim();

    // Remove the market name prefix (e.g., "Total Addressable Market: ")
    // The description format is usually "Name: actual description"
    const colonIndex = fullDescription.indexOf(':');
    if (colonIndex !== -1 && colonIndex < 50) { // Only remove if colon is early in the string
      return {
        value,
        description: fullDescription.substring(colonIndex + 1).trim()
      };
    }

    return { value, description: fullDescription };
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

  // Extract amounts - specifically looks for currency symbols followed by numbers
  // This avoids matching numbers like "18" in "18-month"
  const amountMatch = text.match(/[\$€£]\s*[\d,.]+[KMB]?\b/gi);
  const amounts = amountMatch || [];
  const amount = amounts[0] || '$500K';
  const range = amounts[1] ? `– ${amounts[1]}` : '';

  // Remove amounts and common words to get description
  let description = text
    .replace(/[\$€£]\s*[\d,.]+[KMB]?\b/gi, '') // Remove currency amounts
    .replace(/[-–]\s*[\$€£]\s*[\d,.]+[KMB]?\b/gi, '') // Remove " - $amount" patterns
    .replace(/seed funding|funding/gi, '') // Remove funding keywords
    .replace(/^(for|to|and|with)\s+/i, '') // Remove leading connector words
    .trim();

  return { amount, range, description: description || '18-month runway to product-market fit' };
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

  // Pattern 1: "X% of [subject] [verb phrase]" - percentage at start
  // Example: "73% of small businesses still use manual inventory methods"
  const percentMatch = text.match(/^([\d.]+%)\s+(.+?)\s+(?:use|still use|prefer|rely on|struggle with)\s+(.+)$/i);
  if (percentMatch) {
    return {
      value: percentMatch[1],
      label: percentMatch[3].trim(),
      sublabel: percentMatch[2].trim(),
      icon: icons[index % icons.length]
    };
  }

  // Pattern 1b: "X% of [full sentence]" - percentage at start, simple split
  // Example: "73% of households experience food insecurity"
  const percentSimpleMatch = text.match(/^([\d.]+%)\s+(.+)$/);
  if (percentSimpleMatch) {
    const { title, description } = splitTitleDescription(percentSimpleMatch[2], 30);
    return {
      value: percentSimpleMatch[1],
      label: title || percentSimpleMatch[2].substring(0, 30),
      sublabel: description || '',
      icon: icons[index % icons.length]
    };
  }

  // Pattern 2: "[Subject] cost [target] an estimated $value [frequency]"
  // Example: "Stockouts cost retailers an estimated $45B annually"
  const costEstimatedMatch = text.match(/^(.+?)\s+(?:cost|costs)\s+(.+?)\s+an estimated\s+(\$?[\d.,]+[BMK%]?\+?)\s+(.+)$/i);
  if (costEstimatedMatch) {
    return {
      value: costEstimatedMatch[3],
      label: costEstimatedMatch[4].trim(), // frequency as label
      sublabel: `${costEstimatedMatch[1].trim()} ${costEstimatedMatch[2].trim()}`.substring(0, 40),
      icon: icons[index % icons.length]
    };
  }

  // Pattern 3: "[Subject] cost $value and [consequence]"
  // Example: "Enterprise ERP systems cost $10K+ and are too complex"
  const costAndMatch = text.match(/^(.+?)\s+(?:cost|costs)\s+(\$?[\d.,]+[BMK%]?\+?)\s+and\s+(.+)$/i);
  if (costAndMatch) {
    // Extract the core subject (remove trailing "systems" if present, capitalize)
    let label = costAndMatch[1].trim();
    label = label.replace(/\s+(?:systems?|solutions?|platforms?)$/i, '');
    label = label.charAt(0).toUpperCase() + label.slice(1);
    return {
      value: costAndMatch[2],
      label: label,
      sublabel: costAndMatch[3].trim().substring(0, 50),
      icon: icons[index % icons.length]
    };
  }

  // Pattern 4: "[Subject] cost $value [context]"
  // Example: "College costs $50K per year on average"
  const costSimpleMatch = text.match(/^(.+?)\s+(?:cost|costs)\s+(\$?[\d.,]+[BMK%]?\+?)\s+(.+)$/i);
  if (costSimpleMatch) {
    return {
      value: costSimpleMatch[2],
      label: costSimpleMatch[1].trim(),
      sublabel: costSimpleMatch[3].trim(),
      icon: icons[index % icons.length]
    };
  }

  // Pattern 5: "$X billion/million - [description]"
  // Example: "$45B - Total Addressable Market"
  const moneyDashMatch = text.match(/^(\$?[\d.,]+[BM]?\+?)\s*-\s*(.+)$/);
  if (moneyDashMatch) {
    const { title, description } = splitTitleDescription(moneyDashMatch[2], 30);
    return {
      value: moneyDashMatch[1],
      label: title || moneyDashMatch[2].substring(0, 30),
      sublabel: description || '',
      icon: icons[index % icons.length]
    };
  }

  // Pattern 6: "[Number] in [N] [description]"
  // Example: "1 in 3 children..."
  const inMatch = text.match(/^(\d+)\s+in\s+(\d+)\s+(.+)$/i);
  if (inMatch) {
    const { title, description } = splitTitleDescription(inMatch[3], 30);
    return {
      value: `${inMatch[1]} in ${inMatch[2]}`,
      label: title || inMatch[3].substring(0, 30),
      sublabel: description || '',
      icon: icons[index % icons.length]
    };
  }

  // Fallback: Try to find any number/percentage/value and use it
  const anyValueMatch = text.match(/(\$?[\d.,]+[BMK%]?\+?)/);
  if (anyValueMatch) {
    const value = anyValueMatch[1];
    const remaining = text.replace(value, '').trim();
    const { title, description } = splitTitleDescription(remaining, 35);
    return {
      value: value,
      label: title || remaining.substring(0, 35),
      sublabel: description || '',
      icon: icons[index % icons.length]
    };
  }

  // Last resort: split by character limit
  const { title, description } = splitTitleDescription(text, 35);
  return {
    value: '',
    label: title || text.substring(0, 35),
    sublabel: description,
    icon: icons[index % icons.length]
  };
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

  // Parse stats - capture all bullets, not just ones matching the pattern
  const stats = Array.isArray(content.stats)
    ? (content.stats as string[]).map((s, i) => {
        const parsed = parseStat(s, i);
        if (parsed) return parsed;
        // Fallback: create a stat object even if pattern doesn't match
        const icons = ['edit_note', 'trending_down', 'payments', 'showchart', 'inventory_2', 'warning'];
        return {
          value: s.substring(0, 20),
          label: s.substring(0, 40),
          sublabel: s.length > 40 ? s.substring(40) : '',
          icon: icons[i % icons.length]
        };
      })
    : undefined;

  // Concatenate problem and impact for full description
  const parts: string[] = [];
  if (content.problem && typeof content.problem === 'string') parts.push(content.problem);
  if (content.impact && typeof content.impact === 'string') parts.push(content.impact);
  if (content.description && typeof content.description === 'string') parts.push(content.description);

  const description = parts.length > 0
    ? parts.join('\n\n')
    : Object.values(content).find(v => typeof v === 'string') as string || '';

  return {
    title: slide.title,
    // Don't override subtitle - let the component use its default
    description,
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
    // Don't override subtitle - let the component use its default
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

  // Only parse pricing tiers if we have clear evidence of tiered structure
  // Look for multiple price points with plan names
  const priceMatches = pricingText.match(/(\w+)\s*(?:at|for|-|\$)\s*\$?([\d.]+)/gi);
  if (priceMatches && priceMatches.length >= 2) {
    // We have multiple pricing tiers, parse them
    const seenNames = new Set<string>();
    for (const match of priceMatches.slice(0, 3)) {
      const planMatch = match.match(/(\w+)\s*(?:at|for|-|\$)\s*\$?([\d.]+)/i);
      if (planMatch) {
        const name = planMatch[1].trim();
        const price = `$${planMatch[2].trim()}`;
        // Skip duplicates
        if (!seenNames.has(name) && name.length > 2 && name.length < 20) {
          seenNames.add(name);
          plans.push({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            price: price,
            recommended: plans.length === 0,
            features: [`Tier features`],
          });
        }
      }
    }
  }

  return {
    title: slide.title,
    subtitle: 'Scalable SaaS Revenue Model',
    description: (content.model as string) ||
                 (content.description as string) ||
                 Object.values(content).find(v => typeof v === 'string') as string || '',
    revenueStreams,
    pricing: pricingText,
    plans: plans.length >= 2 ? plans : undefined, // Only show plans if we have at least 2 tiers
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
 * Main mapping function - maps slide by index to styled component props
 * This is used for styled view where components are in a specific order
 */
export function mapSlideByIndexToStyledProps(slide: PitchSlide, index: number, pitchDeck: PitchDeck) {
  // Fixed titles for each slide position (title slide uses pitchDeck.title)
  const getTitle = (index: number) => {
    if (index === 0) return slide.title || pitchDeck.title; // Title slide uses actual title
    const FIXED_TITLES = [
      '',                    // Index 0: handled above
      'The Problem',          // Index 1: Slide2
      'Our Solution',         // Index 2: Slide3
      'Market Opportunity',   // Index 3: Slide4
      'Business Model',       // Index 4: Slide6 (Business Model)
      'Competitive Landscape',// Index 5: Slide5 (Competition)
      'The Ask',              // Index 6: Slide7
    ];
    return FIXED_TITLES[index] || slide.title;
  };

  const fixedTitle = getTitle(index);

  switch (index) {
    case 0: // Slide1 - Title
      return { ...mapTitleSlide(slide, pitchDeck), title: fixedTitle };
    case 1: // Slide2 - Problem
      return { ...mapProblemSlide(slide), title: fixedTitle };
    case 2: // Slide3 - Solution
      return { ...mapSolutionSlide(slide), title: fixedTitle };
    case 3: // Slide4 - Market
      // Check if content looks like market data (TAM/SAM/SOM) or business model data
      if (slide.content.tam || slide.content.sam || slide.content.som) {
        return { ...mapMarketSlide(slide), title: fixedTitle };
      }
      // Fallback: if no market data but has revenue content, show empty market
      return { ...mapMarketSlide(slide), title: fixedTitle };
    case 4: // Slide6 - Business Model
      return { ...mapBusinessModelSlide(slide), title: fixedTitle };
    case 5: // Slide5 - Competition
      return { ...mapCompetitionSlide(slide), title: fixedTitle };
    case 6: // Slide7 - Ask
      return { ...mapAskSlide(slide), title: fixedTitle };
    default:
      return null;
  }
}

/**
 * Main mapping function - maps any slide to its styled component props
 * DEPRECATED: Use mapSlideByIndexToStyledProps for styled view instead
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
