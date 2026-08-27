// =========================================================
//  Mock Data — Replace these with real API responses later
// =========================================================

export const MOCK_CATEGORIES = [
  'All',
  'Web Development',
  'Data Science',
  'Design',
  'Mobile Development',
  'DevOps',
  'Cybersecurity',
  'AI & Machine Learning',
];

export const MOCK_COURSES = [
  {
    id: '1',
    title: 'Full-Stack Web Development with React & Node.js',
    description:
      'Master modern web development from scratch. Build real-world projects with React, Node.js, Express, and MongoDB.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    instructor: 'Sarah Mitchell',
    instructor_avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    instructor_bio:
      'Senior Full-Stack Engineer at Google with 10+ years of experience. Passionate about teaching modern web technologies.',
    category: 'Web Development',
    price: 4999,
    discounted_price: 1999,
    rating: 4.8,
    total_ratings: 2341,
    total_students: 8920,
    total_lessons: 142,
    duration: '38h 20m',
    level: 'Beginner to Advanced',
    language: 'English',
    last_updated: '2025-11',
    is_bestseller: true,
    is_featured: true,
    what_youll_learn: [
      'Build complete full-stack applications from scratch',
      'Master React hooks, context, and state management',
      'Create RESTful APIs with Node.js and Express',
      'Work with MongoDB and Mongoose ORM',
      'Deploy applications to cloud platforms',
      'Implement authentication and authorization',
      'Write clean, maintainable, and scalable code',
      'Use Git and modern development workflows',
    ],
    requirements: [
      'Basic HTML and CSS knowledge',
      'Familiarity with basic JavaScript',
      'A computer with internet access',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Introduction & Setup',
        lessons: [
          { id: 'l1', title: 'Welcome to the Course', duration: '3:24', is_preview: true, is_completed: false, is_locked: false },
          { id: 'l2', title: 'Setting Up Your Development Environment', duration: '12:10', is_preview: true, is_completed: false, is_locked: false },
          { id: 'l3', title: 'Understanding the Course Structure', duration: '5:45', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
      {
        id: 'm2',
        title: 'React Fundamentals',
        lessons: [
          { id: 'l4', title: 'JSX and Components', duration: '18:30', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l5', title: 'Props and State', duration: '22:15', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l6', title: 'Hooks Deep Dive', duration: '35:00', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l7', title: 'Context API', duration: '28:45', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
      {
        id: 'm3',
        title: 'Node.js & Express',
        lessons: [
          { id: 'l8', title: 'Node.js Basics', duration: '20:00', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l9', title: 'Building REST APIs', duration: '45:30', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
    ],
    faqs: [
      { q: 'Is this course suitable for beginners?', a: 'Yes! We start from the very basics and gradually build up to advanced concepts.' },
      { q: 'Do I get lifetime access?', a: 'Yes, once you purchase the course, you have lifetime access including all future updates.' },
      { q: 'Is there a certificate?', a: 'Yes, you receive a certificate of completion that you can share on LinkedIn.' },
    ],
  },
  {
    id: '2',
    title: 'Data Science & Machine Learning with Python',
    description:
      'Comprehensive data science course covering Python, Pandas, NumPy, Scikit-learn, and deep learning with TensorFlow.',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
    instructor: 'Dr. James Okafor',
    instructor_avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    instructor_bio:
      'PhD in Computer Science from MIT. Data scientist with expertise in ML and AI.',
    category: 'Data Science',
    price: 5999,
    discounted_price: 2499,
    rating: 4.9,
    total_ratings: 4102,
    total_students: 14200,
    total_lessons: 198,
    duration: '52h 10m',
    level: 'Intermediate',
    language: 'English',
    last_updated: '2025-10',
    is_bestseller: true,
    is_featured: true,
    what_youll_learn: [
      'Python programming for data science',
      'Data manipulation with Pandas and NumPy',
      'Machine learning algorithms',
      'Deep learning with TensorFlow and Keras',
      'Data visualization',
      'Real-world ML projects',
    ],
    requirements: [
      'Basic Python knowledge',
      'High school mathematics',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Python for Data Science',
        lessons: [
          { id: 'l1', title: 'Python Refresher', duration: '25:00', is_preview: true, is_completed: false, is_locked: false },
          { id: 'l2', title: 'NumPy Fundamentals', duration: '30:00', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
      {
        id: 'm2',
        title: 'Machine Learning Algorithms',
        lessons: [
          { id: 'l3', title: 'Linear Regression', duration: '40:00', is_preview: false, is_completed: false, is_locked: true },
          { id: 'l4', title: 'Decision Trees', duration: '35:00', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
    ],
    faqs: [],
  },
  {
    id: '3',
    title: 'UI/UX Design Mastery: From Wireframes to Prototypes',
    description:
      'Learn professional UI/UX design using Figma. Create stunning interfaces and high-fidelity prototypes.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    instructor: 'Priya Sharma',
    instructor_avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    instructor_bio:
      'Lead UX Designer at Airbnb. Speaker at UX conferences worldwide.',
    category: 'Design',
    price: 3999,
    discounted_price: 1499,
    rating: 4.7,
    total_ratings: 1890,
    total_students: 6700,
    total_lessons: 96,
    duration: '28h 45m',
    level: 'Beginner',
    language: 'English',
    last_updated: '2025-09',
    is_bestseller: false,
    is_featured: true,
    what_youll_learn: [
      'Design thinking process',
      'User research and personas',
      'Wireframing and prototyping',
      'Figma mastery',
      'Usability testing',
    ],
    requirements: ['No prior design experience needed'],
    modules: [
      {
        id: 'm1',
        title: 'Design Fundamentals',
        lessons: [
          { id: 'l1', title: 'What is UX Design?', duration: '8:00', is_preview: true, is_completed: false, is_locked: false },
          { id: 'l2', title: 'Design Thinking Process', duration: '15:00', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
    ],
    faqs: [],
  },
  {
    id: '4',
    title: 'Flutter & Dart: Build iOS & Android Apps',
    description:
      'Build beautiful native mobile apps for iOS and Android using Flutter and Dart from a single codebase.',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    instructor: 'Michael Chen',
    instructor_avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    instructor_bio:
      'Mobile development expert. Built apps with 10M+ downloads.',
    category: 'Mobile Development',
    price: 4499,
    discounted_price: 1799,
    rating: 4.6,
    total_ratings: 987,
    total_students: 4300,
    total_lessons: 118,
    duration: '32h 00m',
    level: 'Beginner to Intermediate',
    language: 'English',
    last_updated: '2025-08',
    is_bestseller: false,
    is_featured: true,
    what_youll_learn: [
      'Dart programming language',
      'Flutter widget tree',
      'State management with Riverpod',
      'Connecting to REST APIs',
      'Publishing apps to stores',
    ],
    requirements: ['Basic programming knowledge'],
    modules: [
      {
        id: 'm1',
        title: 'Dart Basics',
        lessons: [
          { id: 'l1', title: 'Introduction to Dart', duration: '12:00', is_preview: true, is_completed: false, is_locked: false },
          { id: 'l2', title: 'Variables and Types', duration: '18:00', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
    ],
    faqs: [],
  },
  {
    id: '5',
    title: 'DevOps Engineering: Docker, Kubernetes & CI/CD',
    description:
      'Master DevOps practices. Learn Docker, Kubernetes, Jenkins, GitHub Actions, AWS deployment and more.',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80',
    instructor: 'Alex Torres',
    instructor_avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    instructor_bio:
      'DevOps architect with 12 years of experience at Fortune 500 companies.',
    category: 'DevOps',
    price: 5499,
    discounted_price: 2199,
    rating: 4.8,
    total_ratings: 1456,
    total_students: 5100,
    total_lessons: 156,
    duration: '44h 30m',
    level: 'Intermediate to Advanced',
    language: 'English',
    last_updated: '2025-11',
    is_bestseller: true,
    is_featured: false,
    what_youll_learn: [
      'Docker containerization',
      'Kubernetes orchestration',
      'CI/CD with GitHub Actions',
      'AWS deployment strategies',
      'Monitoring and logging',
    ],
    requirements: ['Linux command line basics', 'Basic cloud knowledge'],
    modules: [
      {
        id: 'm1',
        title: 'Docker Fundamentals',
        lessons: [
          { id: 'l1', title: 'What is Docker?', duration: '10:00', is_preview: true, is_completed: false, is_locked: false },
          { id: 'l2', title: 'Building Docker Images', duration: '25:00', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
    ],
    faqs: [],
  },
  {
    id: '6',
    title: 'Ethical Hacking & Cybersecurity Bootcamp',
    description:
      'Learn penetration testing, ethical hacking, and cybersecurity fundamentals to protect systems and networks.',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    instructor: 'Nina Petrov',
    instructor_avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    instructor_bio:
      'Certified Ethical Hacker (CEH) and security researcher.',
    category: 'Cybersecurity',
    price: 6999,
    discounted_price: 2799,
    rating: 4.9,
    total_ratings: 2203,
    total_students: 7800,
    total_lessons: 178,
    duration: '48h 15m',
    level: 'Intermediate',
    language: 'English',
    last_updated: '2025-10',
    is_bestseller: false,
    is_featured: false,
    what_youll_learn: [
      'Network security fundamentals',
      'Penetration testing methodologies',
      'Web application security',
      'Cryptography basics',
      'Security compliance',
    ],
    requirements: ['Basic networking knowledge', 'Linux familiarity'],
    modules: [
      {
        id: 'm1',
        title: 'Security Basics',
        lessons: [
          { id: 'l1', title: 'Introduction to Ethical Hacking', duration: '15:00', is_preview: true, is_completed: false, is_locked: false },
          { id: 'l2', title: 'Setting Up Kali Linux', duration: '20:00', is_preview: false, is_completed: false, is_locked: true },
        ],
      },
    ],
    faqs: [],
  },
];

export const MOCK_ENROLLMENTS = [
  {
    course_id: '1',
    progress_percentage: 42,
    completed_lessons: ['l1', 'l2'],
    last_watched_lesson: { id: 'l2', title: 'Setting Up Your Development Environment', module_title: 'Introduction & Setup' },
  },
  {
    course_id: '2',
    progress_percentage: 15,
    completed_lessons: ['l1'],
    last_watched_lesson: { id: 'l1', title: 'Python Refresher', module_title: 'Python for Data Science' },
  },
];

export const MOCK_USER = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
  joined: '2024-03-15',
};

export const MOCK_RECENT_ACTIVITY = [
  { lesson_id: 'l2', lesson_title: 'Setting Up Your Development Environment', course_title: 'Full-Stack Web Development', watched_at: '2 hours ago' },
  { lesson_id: 'l1', lesson_title: 'Python Refresher', course_title: 'Data Science & ML with Python', watched_at: '1 day ago' },
  { lesson_id: 'l1', lesson_title: 'Welcome to the Course', course_title: 'Full-Stack Web Development', watched_at: '2 days ago' },
];
