export const MOCK_CATEGORIES = [
  'All Courses',
  'Performance Marketing',
  'E-Commerce Scaling',
];

export const MOCK_COURSES = [
  {
    id: '1',
    title: 'Performance Marketing Masterclass',
    description:
      'Learn how to plan, launch, and optimize high-converting performance marketing campaigns across Meta Ads, Google PMax, and creative UGC funnels.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    instructor: 'Devon Vance',
    instructor_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    instructor_bio:
      'Growth Director with over $35M+ in verified ad spend across Meta & Google Ads. Scaled 18+ brands to 7 and 8-figure revenues.',
    category: 'Performance Marketing',
    price: 7999,
    discounted_price: 4999,
    rating: 4.98,
    total_ratings: 1420,
    total_students: 6480,
    total_lessons: 12,
    duration: '6h 30m',
    level: 'Beginner to Advanced',
    language: 'English',
    certificate: true,
    last_updated: '2026-08',
    is_bestseller: true,
    what_youll_learn: [
      'Understand campaign fundamentals & unit economics (MER, CAC, ROAS)',
      'Create effective Meta Ads 2.0 structures (CBO & Advantage+)',
      'Analyze performance data and diagnose creative fatigue',
      'Optimize advertising budgets and scaling rules without crashing CPA',
      'Build custom tracking & reporting dashboards with server-side CAPI',
    ],
    requirements: [
      'Access to a Meta Ads or Google Ads account',
      'Basic understanding of digital marketing terminology',
    ],
    modules: [
      {
        id: 'm1',
        title: 'MODULE 1 — FUNDAMENTALS',
        lessons: [
          { id: 'l1', title: 'Lesson 1 — Introduction & Modern Media Buying Mindset', duration: '18:20', is_preview: true, is_completed: true, is_locked: false },
          { id: 'l2', title: 'Lesson 2 — Understanding Campaigns & Unit Economics', duration: '24:15', is_preview: false, is_completed: true, is_locked: false },
          { id: 'l3', title: 'Lesson 3 — Audience Research & Customer Psychology', duration: '28:40', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
      {
        id: 'm2',
        title: 'MODULE 2 — CAMPAIGN SETUP',
        lessons: [
          { id: 'l4', title: 'Lesson 4 — Campaign Structure & Budget Optimization', duration: '22:00', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l5', title: 'Lesson 5 — Targeting Strategies post-iOS 14', duration: '34:15', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l6', title: 'Lesson 6 — Budgeting & Break-Even ROAS Calculation', duration: '40:30', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
      {
        id: 'm3',
        title: 'MODULE 3 — CREATIVE STRATEGY',
        lessons: [
          { id: 'l7', title: 'Lesson 7 — Dynamic Creative Testing (DCT) Playbook', duration: '29:40', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l8', title: 'Lesson 8 — UGC Scripting & 3-Second Hook Formulas', duration: '38:10', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l9', title: 'Lesson 9 — Static vs Video Creative Iteration', duration: '26:50', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
      {
        id: 'm4',
        title: 'MODULE 4 — SCALING & ATTRIBUTION',
        lessons: [
          { id: 'l10', title: 'Lesson 10 — Horizontal & Vertical Scaling Protocols', duration: '32:00', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l11', title: 'Lesson 11 — Server-Side CAPI & TripleWhale Attribution', duration: '46:30', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l12', title: 'Lesson 12 — Automated Rules & Account Recovery', duration: '30:45', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
    ],
    faqs: [
      { q: 'Is this for beginners or experienced media buyers?', a: 'This masterclass is structured to take you from foundational unit economics all the way to advanced $10k+/day scaling frameworks.' },
      { q: 'How long do I have access to the course?', a: 'You receive lifetime access with all future updates included.' },
      { q: 'What is the refund policy?', a: 'We offer a 30-Day Money Back Guarantee if you are not completely satisfied.' },
    ],
  },
];

export const MOCK_ENROLLMENTS = [
  {
    course_id: '1',
    progress_percentage: 78,
    completed_lessons: ['l1', 'l2', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10'],
    last_watched_lesson: { id: 'l3', title: 'Lesson 3 — Audience Research & Customer Psychology', module_title: 'MODULE 1 — FUNDAMENTALS' },
    last_position_seconds: 420,
    purchased_at: '2026-08-20',
  },
];

export const MOCK_PURCHASES = [
  {
    id: 'ord_9842103',
    course_id: '1',
    course_title: 'Performance Marketing Masterclass',
    course_thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    purchase_date: '28 Aug 2026',
    amount: 4999,
    status: 'Paid',
    payment_method: 'UPI / Razorpay',
    invoice_url: '#',
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
  {
    id: 'a1',
    type: 'lesson_completed',
    title: 'Completed Lesson 1: Foundations of High-ROAS Media Buying',
    course: 'Performance Marketing Masterclass',
    timestamp: '2 hours ago',
  },
  {
    id: 'a2',
    type: 'purchase',
    title: 'Enrolled in Performance Marketing Masterclass',
    course: 'Performance Marketing Masterclass',
    timestamp: '1 day ago',
  },
];
