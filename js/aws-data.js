// aws-data.js - All mock data for AWS Console dashboard

const awsData = {
  // User Info
  user: {
    name: "John Chen",
    email: "investor@risecapital.com",
    role: "Portfolio Manager",
    accountId: "1234-5678-9012",
  },

  // Portfolio Metrics
  metrics: {
    portfolioValue: "$280.5M",
    activeFunds: "6",
    irrReturn: "22.4%",
    walletBalance: "$45,250",
  },

  // Cost & Usage (AWS style)
  costAndUsage: {
    currentMonth: "$45,250",
    forecastedMonthEnd: "$68,500",
    forecastTrend: "up 12%",
    lastMonth: "$42,300",
    topCosts: [
      { service: "Rise Energy Fund I", amount: "$25,000" },
      { service: "GreenTech Ventures", amount: "$15,000" },
      { service: "AI Innovation Fund", amount: "$5,250" },
    ],
  },

  // AWS Health Style - Portfolio Health
  portfolioHealth: {
    openIssues: 2,
    scheduledChanges: 1,
    otherNotifications: 3,
  },

  // Trusted Advisor Style - Investment Recommendations
  trustedAdvisor: {
    actionRecommended: 3,
    investigationRecommended: 2,
    passedItems: 12,
  },

  // Recently Visited (Funds)
  recentlyVisited: [
    "Rise Energy Fund I",
    "GreenTech Ventures",
    "AI Innovation Fund",
    "Infrastructure Alpha",
    "Healthcare Opportunities",
    "Real Estate Income Trust",
  ],

  // Build a Solution Style - Quick Actions
  quickActions: [
    {
      name: "Launch a Virtual Machine",
      action: "With EC2 (2 mins)",
      icon: "server",
    },
    {
      name: "Start an Investment",
      action: "With Funds (5 mins)",
      icon: "trending-up",
    },
    {
      name: "Review Portfolio",
      action: "With Analytics (3 mins)",
      icon: "bar-chart",
    },
    {
      name: "Host a Dashboard",
      action: "With Amplify (2 mins)",
      icon: "cloud",
    },
  ],

  // 6 Funds Data
  funds: [
    {
      id: 1,
      name: "Rise Energy Fund I",
      category: "Oil & Gas",
      commitment: "$50M",
      return: "24.3%",
      status: "Open",
      vintage: "2024",
      term: "10 years",
      minInvestment: "$100,000",
      location: "Texas, USA",
      description:
        "Conventional and unconventional oil assets in Permian Basin with established production history.",
    },
    {
      id: 2,
      name: "GreenTech Ventures",
      category: "Renewables",
      commitment: "$35M",
      return: "18.7%",
      status: "Open",
      vintage: "2024",
      term: "8 years",
      minInvestment: "$50,000",
      location: "Multiple States",
      description:
        "Solar, wind, and battery storage projects across North America with long-term PPAs.",
    },
    {
      id: 3,
      name: "Infrastructure Alpha",
      category: "Real Assets",
      commitment: "$120M",
      return: "15.2%",
      status: "Limited",
      vintage: "2023",
      term: "12 years",
      minInvestment: "$250,000",
      location: "Midwest USA",
      description:
        "Long-term infrastructure concessions including toll roads and ports.",
    },
    {
      id: 4,
      name: "AI Innovation Fund",
      category: "Technology",
      commitment: "$75M",
      return: "32.1%",
      status: "Open",
      vintage: "2024",
      term: "7 years",
      minInvestment: "$75,000",
      location: "Global",
      description:
        "Early-stage AI and machine learning companies with proven technology.",
    },
    {
      id: 5,
      name: "Healthcare Opportunities",
      category: "Life Sciences",
      commitment: "$45M",
      return: "21.5%",
      status: "Coming Soon",
      vintage: "2025",
      term: "9 years",
      minInvestment: "$100,000",
      location: "Massachusetts, USA",
      description:
        "Biotech and medical device companies in late-stage clinical trials.",
    },
    {
      id: 6,
      name: "Real Estate Income Trust",
      category: "Real Estate",
      commitment: "$200M",
      return: "12.8%",
      status: "Closed",
      vintage: "2022",
      term: "15 years",
      minInvestment: "$500,000",
      location: "Major Metros",
      description:
        "Commercial real estate portfolio with stable income streams.",
    },
  ],

  // Recent Transactions
  transactions: [
    {
      date: "2025-03-01",
      description: "Wire transfer - Rise Energy Fund",
      type: "deposit",
      amount: 50000,
      status: "completed",
    },
    {
      date: "2025-02-15",
      description: "Investment - Solar Farm Portfolio",
      type: "investment",
      amount: -25000,
      status: "completed",
    },
    {
      date: "2025-02-01",
      description: "ACH transfer",
      type: "deposit",
      amount: 25000,
      status: "completed",
    },
    {
      date: "2025-01-20",
      description: "Withdrawal to bank account",
      type: "withdrawal",
      amount: -5000,
      status: "completed",
    },
    {
      date: "2025-01-10",
      description: "Investment - Permian Basin",
      type: "investment",
      amount: -50000,
      status: "completed",
    },
    {
      date: "2024-12-15",
      description: "Distribution - Infrastructure Alpha",
      type: "dividend",
      amount: 3250,
      status: "completed",
    },
  ],

  // Opportunities per Fund
  opportunities: {
    1: [
      {
        id: 101,
        name: "Permian Basin Acquisition",
        description: "Oil production assets with existing infrastructure",
        targetReturn: "28%",
        timeline: "24 months",
        status: "Due Diligence",
      },
    ],
    2: [
      {
        id: 201,
        name: "Solar Farm Portfolio",
        description: "Utility-scale solar across three states",
        targetReturn: "14%",
        timeline: "36 months",
        status: "Active",
      },
    ],
    3: [
      {
        id: 301,
        name: "Midwest Toll Road",
        description: "50-year infrastructure concession",
        targetReturn: "12%",
        timeline: "48 months",
        status: "Closed",
      },
    ],
    4: [
      {
        id: 401,
        name: "AI Analytics Platform",
        description: "Enterprise ML for fraud detection",
        targetReturn: "35%",
        timeline: "36 months",
        status: "Active",
      },
    ],
    5: [
      {
        id: 501,
        name: "Gene Therapy Treatment",
        description: "Series C biotech company",
        targetReturn: "38%",
        timeline: "60 months",
        status: "Pre-launch",
      },
    ],
    6: [
      {
        id: 601,
        name: "Industrial REIT Portfolio",
        description: "Last-mile warehouse properties",
        targetReturn: "11%",
        timeline: "84 months",
        status: "Fully Subscribed",
      },
    ],
  },

  // Timeline Data
  timelineData: {
    101: {
      title: "Permian Basin Acquisition",
      milestones: [
        { name: "Due Diligence", status: "completed", date: "Jan 2025" },
        { name: "Legal Documentation", status: "completed", date: "Feb 2025" },
        { name: "Regulatory Approval", status: "current", date: "Mar 2025" },
        { name: "Closing", status: "upcoming", date: "Apr 2025" },
      ],
    },
    201: {
      title: "Solar Farm Portfolio",
      milestones: [
        { name: "Land Acquisition", status: "completed", date: "Dec 2024" },
        { name: "Permitting", status: "completed", date: "Feb 2025" },
        { name: "Construction", status: "current", date: "In Progress" },
        { name: "Grid Connection", status: "upcoming", date: "Jun 2026" },
      ],
    },
  },

  // Wallet
  wallet: {
    balance: "$45,250",
    available: "$45,250",
    invested: "$280.5M",
    pending: "$0",
  },

  mail: {
    inbox: [
        { id: 1, from: "Rise Capital Team", email: "team@risecapital.com", subject: "Welcome to Rise Capital Investor Portal", message: "We're excited to have you on board. Get started by exploring our available funds.", date: "2025-03-01", time: "09:30 AM", read: false, priority: "high" },
        { id: 2, from: "Fund Management", email: "funds@risecapital.com", subject: "Quarterly Report - Rise Energy Fund I", message: "Q4 2024 performance report is now available. The fund returned 12.3% this quarter.", date: "2025-02-28", time: "02:15 PM", read: false, priority: "normal" },
        { id: 3, from: "Compliance Department", email: "compliance@risecapital.com", subject: "KYC Verification Required", message: "Please upload your recent identification documents to complete verification.", date: "2025-02-25", time: "11:00 AM", read: true, priority: "high" },
        { id: 4, from: "GreenTech Ventures", email: "updates@greentech.com", subject: "New Investment Opportunity - Solar Farm", message: "A new 250MW solar farm project is now available for investment.", date: "2025-02-20", time: "10:00 AM", read: true, priority: "normal" },
        { id: 5, from: "AI Innovation Fund", email: "info@aiinnovation.com", subject: "Webinar: AI in Finance", message: "Join our upcoming webinar on March 15th to learn about AI trends.", date: "2025-02-18", time: "03:30 PM", read: false, priority: "low" },
        { id: 6, from: "Infrastructure Alpha", email: "notifications@infraalpha.com", subject: "Distribution Notice", message: "A distribution of $5.2M has been made to investors.", date: "2025-02-15", time: "09:00 AM", read: true, priority: "normal" }
    ]
}
};
