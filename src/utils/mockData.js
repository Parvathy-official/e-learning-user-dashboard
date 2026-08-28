// =========================================================
//  Mock Data — Performance Marketing Academy
// =========================================================

export const MOCK_CATEGORIES = [
  'All Programs',
  'Meta Ads & CAPI',
  'Google & PMax',
  'Creative Strategy & UGC',
  'Funnel CRO & Economics',
];

export const MOCK_COURSES = [
  {
    id: '1',
    title: 'The Full-Funnel Performance Marketing & Media Buying Blueprint (0 to $100K/Mo)',
    description:
      'The definitive playbook to build, launch, and scale hyper-profitable ad campaigns. Master Meta Ads (CBO/Advantage+), Google Performance Max, viral creative testing, and server-side tracking to achieve consistent 4x+ ROAS.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    instructor: 'Devon Vance',
    instructor_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    instructor_bio:
      'Ex-Growth Director managing $35M+ in profitable ad spend across Meta & Google Ads. Scaled 18+ D2C and Lead-Gen brands to 7 and 8-figure revenues.',
    category: 'Meta Ads & CAPI',
    price: 9999,
    discounted_price: 3499,
    rating: 4.98,
    total_ratings: 1420,
    total_students: 6480,
    total_lessons: 48,
    duration: '24h 30m',
    level: 'Beginner to Advanced Media Buyers',
    language: 'English',
    last_updated: '2026-08',
    is_bestseller: true,
    is_featured: true,
    what_youll_learn: [
      'Master Meta Ads 2.0: CBO, ABO, Dynamic Creative Testing (DCT) & Advantage+ campaigns',
      'Engineer Google Ads & Performance Max feeds for maximum search intent and high-margin sales',
      'Build a repeatable Creative Engine: UGC frameworks, 3-second hook formulas, and iteration matrices',
      'Calculate Unit Economics like a CFO: MER, CAC, LTV, Break-even ROAS & Contribution Margin',
      'Implement bulletproof Server-Side Tracking: Meta CAPI, GA4 Measurement Protocol & TripleWhale',
      'Diagnose and solve Creative Fatigue, rising CPMs, and ad account performance drops',
      'Scale ad spend horizontally and vertically from $500/day to $10,000+/day without crashing ROAS',
      'Access 25+ battle-tested ad copy swipe files, ROAS calculators, and creative briefs',
    ],
    requirements: [
      'Access to a Meta Ads Manager / Google Ads account (or willingness to set one up)',
      'Basic understanding of digital marketing terminology',
      'A product, service, or lead-gen offer ready to scale',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Unit Economics, Margin Architecture & ROAS Math',
        lessons: [
          { id: 'l1', title: 'The Modern Media Buying Mindset: Profit vs Vanity Metrics', duration: '18:20', is_preview: true, is_completed: false, is_locked: false },
          { id: 'l2', title: 'The ROAS & MER Calculator: Finding Your True Break-Even Point', duration: '24:15', is_preview: true, is_completed: false, is_locked: false },
          { id: 'l3', title: 'CAC to LTV Ratio: How 8-Figure Brands Acquire Customers at a Loss on Day 1', duration: '28:40', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l4', title: 'Cash Flow Management & Credit Line Scaling for Ad Spend', duration: '20:10', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: The High-Converting Creative Engine & UGC Systems',
        lessons: [
          { id: 'l5', title: 'Why Creative Is the New Targeting in 2026', duration: '22:00', is_preview: true, is_completed: false, is_locked: false },
          { id: 'l6', title: 'The 3-Second Hook Formula: Boosting Hook Rates Above 40%', duration: '34:15', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l7', title: 'UGC Scripting Framework: Directing Creators for Maximum Conversion', duration: '40:30', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l8', title: 'Static vs Video vs Carousel: Asset Diversification Matrix', duration: '26:50', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l9', title: 'The Weekly Creative Iteration Sandbox System', duration: '31:20', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
      {
        id: 'm3',
        title: 'Module 3: Meta Ads Manager 2.0 (CBO, DCT & Advantage+)',
        lessons: [
          { id: 'l10', title: 'Account Structure: Consolidating from 20 Campaigns to 3', duration: '29:40', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l11', title: 'Dynamic Creative Testing (DCT): Finding Winning Angles with $50', duration: '38:10', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l12', title: 'Advantage+ Shopping Campaigns (ASC): Setup, Safeguards & Budget Splits', duration: '35:00', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l13', title: 'Scaling Rules: Horizontal vs Vertical Scaling without Resetting Learning Phase', duration: '42:15', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
      {
        id: 'm4',
        title: 'Module 4: Google Ads & Performance Max Dominance',
        lessons: [
          { id: 'l14', title: 'High-Intent Search Campaign Architecture & Exact Match Harvesting', duration: '32:00', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l15', title: 'Performance Max (PMax) Masterclass: Asset Groups, Audience Signals & Feed Optimization', duration: '46:30', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l16', title: 'Smart Bidding Strategies: Target CPA vs Target ROAS vs Max Conversion Value', duration: '30:45', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l17', title: 'Negative Keyword Lists & Brand Defense Campaigns', duration: '21:10', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
      {
        id: 'm5',
        title: 'Module 5: Server-Side Tracking, First-Party Data & Attribution',
        lessons: [
          { id: 'l18', title: 'The Post-iOS 14.5 Tracking Reality: Why Pixel Data is 40% Underreported', duration: '25:00', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l19', title: 'Meta Conversions API (CAPI) & Server-Side GTM Setup from Scratch', duration: '48:20', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l20', title: 'GA4 Measurement Protocol & Custom Conversion Events', duration: '33:15', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l21', title: 'TripleWhale & Northbeam Deep Dive: Blended Multi-Touch Attribution', duration: '37:40', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
      {
        id: 'm6',
        title: 'Module 6: Scaling to 8-Figures ($10K+/Day Playbook)',
        lessons: [
          { id: 'l22', title: 'Surviving Seasonality, Black Friday/Cyber Monday & Summer Slumps', duration: '36:00', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l23', title: 'Automated Rules, Safety Nets & Budget Surges', duration: '27:50', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l24', title: 'Account Recovery: What to Do When an Ad Account Suddenly Dies', duration: '31:10', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
    ],
    faqs: [
      { q: 'Is this for beginners or experienced media buyers?', a: 'This masterclass is structured to take you from foundational unit economics all the way to advanced $10k+/day scaling frameworks. Even 7-figure agency owners use our testing sandboxes.' },
      { q: 'Does this cover both Meta and Google Ads?', a: 'Yes! You get end-to-end training on Meta Ads 2.0 (CBO, ASC, creative testing) as well as Google Search, Shopping, and Performance Max.' },
      { q: 'Do I get access to SOPs, templates, and swipe files?', a: 'Yes! You receive our complete library of 25+ Notion SOPs, creative brief templates, ROAS calculators, and high-converting ad copy frameworks.' },
      { q: 'How long do I have access to the material?', a: 'Lifetime access with all future algorithm updates included at no additional charge.' },
    ],
  },
  {
    id: '2',
    title: 'Advanced E-Commerce Funnel Optimization & High-ROAS Scaling Blueprint',
    description:
      'Engineered for D2C brands, lead-gen teams, and growth marketers: Scale landing page conversion rates (CRO), increase Average Order Value (AOV), dominate TikTok/YouTube ads, and build high-ROI post-purchase retention flywheels.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    instructor: 'Elena Rostova',
    instructor_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    instructor_bio:
      'CRO Specialist & E-Commerce Growth Architect. Optimized 200+ Shopify landing pages and generated over $60M in client revenues with Klaviyo & funnels.',
    category: 'Funnel CRO & Economics',
    price: 11999,
    discounted_price: 4299,
    rating: 4.96,
    total_ratings: 890,
    total_students: 3820,
    total_lessons: 36,
    duration: '18h 45m',
    level: 'Intermediate to Advanced',
    language: 'English',
    last_updated: '2026-08',
    is_bestseller: true,
    is_featured: true,
    what_youll_learn: [
      'Transform low-converting product pages into high-velocity 6%+ conversion rate sales funnels',
      'Architect irresistible multi-tiered offers, bundles, and volume discounts that pump AOV by 40%+',
      'Execute TikTok Ads and YouTube Video Action campaigns tailored for impulse purchasing',
      'Build automated email & SMS post-purchase retention flows with Klaviyo to double 90-day LTV',
      'Optimize mobile page load speed and checkout friction to plug ad spend leaks immediately',
      'Master qualitative & quantitative heatmaps (Hotjar, Microsoft Clarity) to spot conversion drop-offs',
      'Implement pre-purchase upsells, post-purchase 1-click upsells, and cart drawer upgrades',
    ],
    requirements: [
      'An active e-commerce store (Shopify, WooCommerce) or landing page software (Replo, Unbounce)',
      'Basic familiarity with paid traffic sources',
      'Google Analytics / Tag Manager access',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Offer Architecture & High-AOV Engineering',
        lessons: [
          { id: 'l1', title: 'Why Weak Offers Kill Great Media Buying', duration: '20:15', is_preview: true, is_completed: false, is_locked: false },
          { id: 'l2', title: 'The Tiered Bundle & Volume Discount Masterclass', duration: '28:40', is_preview: true, is_completed: false, is_locked: false },
          { id: 'l3', title: 'Designing High-Margin Add-ons & Subscription Upgrades', duration: '25:10', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Landing Page CRO (Shopify, Replo & Unbounce)',
        lessons: [
          { id: 'l4', title: 'The High-Converting Advertorial & Listicle Framework', duration: '35:00', is_preview: true, is_completed: false, is_locked: false },
          { id: 'l5', title: 'Above-the-Fold Mobile UX: The 5 Non-Negotiable Elements', duration: '30:20', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l6', title: 'Social Proof Stacking: Review Widgets, Press Badges & UGC Embeds', duration: '26:45', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l7', title: 'Checkout Page & Cart Drawer Optimization (Reducing Abandonment)', duration: '38:15', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
      {
        id: 'm3',
        title: 'Module 3: TikTok Ads & YouTube Action Campaigns',
        lessons: [
          { id: 'l8', title: 'TikTok Spark Ads & Creator Marketplace Integration', duration: '32:00', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l9', title: 'YouTube Demand Gen & In-Feed Action Ads for Cold Traffic', duration: '39:50', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
      {
        id: 'm4',
        title: 'Module 4: Post-Purchase Retention & Klaviyo Email/SMS Flywheel',
        lessons: [
          { id: 'l10', title: 'The 7 Core Klaviyo Email Flows Responsible for 30%+ of Store Revenue', duration: '44:10', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l11', title: 'SMS Marketing (Postscript/Attentive): Compliance, Triggers & Flash Sales', duration: '27:30', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l12', title: 'Predictive Churn Prevention & VIP Customer Loyalty Loops', duration: '31:00', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
    ],
    faqs: [
      { q: 'Will this help if my Meta ads are profitable but my store conversion rate is low?', a: 'Absolutely. Most ad accounts fail not because of media buying, but because of leaky landing pages. This course directly fixes your CRO and increases AOV.' },
      { q: 'What page builders are supported?', a: 'We provide templates and design breakdowns for Shopify Theme Editor, Replo, Unbounce, Shogun, and custom HTML/CSS funnels.' },
      { q: 'Does this cover email and SMS retention?', a: 'Yes! An entire module is dedicated to building Klaviyo automated flows that generate 30%+ extra backend profit with zero ad spend.' },
    ],
  },
];

export const MOCK_ENROLLMENTS = [
  {
    course_id: '1',
    progress_percentage: 35,
    completed_lessons: ['l1', 'l2', 'l5'],
    last_watched_lesson: { id: 'l2', title: 'The ROAS & MER Calculator: Finding Your True Break-Even Point', module_title: 'Module 1: Unit Economics, Margin Architecture & ROAS Math' },
  },
  {
    course_id: '2',
    progress_percentage: 18,
    completed_lessons: ['l1'],
    last_watched_lesson: { id: 'l1', title: 'Why Weak Offers Kill Great Media Buying', module_title: 'Module 1: Offer Architecture & High-AOV Engineering' },
  },
];

export const MOCK_USER = {
  id: 'u1',
  name: 'Marcus Brody',
  email: 'marcus.media@adscaleflow.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80',
  joined: '2025-02-10',
};

export const MOCK_RECENT_ACTIVITY = [
  { lesson_id: 'l2', lesson_title: 'The ROAS & MER Calculator', course_title: 'The Full-Funnel Performance Marketing Blueprint', watched_at: '2 hours ago' },
  { lesson_id: 'l5', lesson_title: 'Why Creative Is the New Targeting in 2026', course_title: 'The Full-Funnel Performance Marketing Blueprint', watched_at: '1 day ago' },
  { lesson_id: 'l1', lesson_title: 'The Modern Media Buying Mindset', course_title: 'The Full-Funnel Performance Marketing Blueprint', watched_at: '2 days ago' },
];
