// azure-data.js - All mock data for Azure dashboard

const azureData = {
  // User Info
  user: {
    name: "John Chen",
    email: "john.chen@risecapital.com",
    role: "Portfolio Manager",
    initial: "JC",
    since: "January 2020",
    riskProfile: "Moderate-Aggressive",
    totalInvested: "$12,450,000",
    totalReturns: "$2,890,000 (23.2%)",
  },

  // Portfolio Stats
  portfolio: {
    totalValue: "$280.5M",
    activeFunds: 6,
    avgReturn: "22.4%",
    walletBalance: "$45,250",
    trend: "12.3%",
  },

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
  recentTransactions: [
    {
      date: "2025-03-01",
      description: "Wire transfer - Rise Energy Fund",
      type: "Deposit",
      amount: "+$50,000",
      status: "Completed",
    },
    {
      date: "2025-02-15",
      description: "Investment - Solar Farm Portfolio",
      type: "Investment",
      amount: "-$25,000",
      status: "Completed",
    },
    {
      date: "2025-02-01",
      description: "ACH transfer",
      type: "Deposit",
      amount: "+$25,000",
      status: "Completed",
    },
    {
      date: "2025-01-20",
      description: "Withdrawal to bank account",
      type: "Withdrawal",
      amount: "-$5,000",
      status: "Completed",
    },
    {
      date: "2025-01-10",
      description: "Investment - Permian Basin",
      type: "Investment",
      amount: "-$50,000",
      status: "Completed",
    },
    {
      date: "2024-12-15",
      description: "Distribution - Infrastructure Alpha",
      type: "Dividend",
      amount: "+$3,250",
      status: "Completed",
    },
  ],

  // Upcoming Milestones
  upcomingMilestones: [
    {
      project: "Permian Basin",
      milestone: "Regulatory Approval",
      date: "Mar 30, 2025",
      status: "In Progress",
    },
    {
      project: "Solar Farm",
      milestone: "Construction Start",
      date: "Apr 15, 2025",
      status: "Upcoming",
    },
    {
      project: "Eagle Ford",
      milestone: "Drilling Phase 1",
      date: "May 1, 2025",
      status: "Upcoming",
    },
    {
      project: "AI Platform",
      milestone: "Beta Launch",
      date: "Jun 15, 2025",
      status: "Upcoming",
    },
  ],

  // Mail/Inbox Data
  mail: {
    inbox: [
      {
        id: 1,
        from: "Rise Capital Team",
        email: "team@risecapital.com",
        subject: "Welcome to Rise Capital Investor Portal",
        message:
          "We're excited to have you on board. Get started by exploring our available funds.",
        date: "2025-03-01",
        time: "09:30 AM",
        read: false,
        priority: "high",
      },
      {
        id: 2,
        from: "Fund Management",
        email: "funds@risecapital.com",
        subject: "Quarterly Report - Rise Energy Fund I",
        message:
          "Q4 2024 performance report is now available. The fund returned 12.3% this quarter.",
        date: "2025-02-28",
        time: "02:15 PM",
        read: false,
        priority: "normal",
      },
      {
        id: 3,
        from: "Compliance Department",
        email: "compliance@risecapital.com",
        subject: "KYC Verification Required",
        message:
          "Please upload your recent identification documents to complete verification.",
        date: "2025-02-25",
        time: "11:00 AM",
        read: true,
        priority: "high",
      },
      {
        id: 4,
        from: "GreenTech Ventures",
        email: "updates@greentech.com",
        subject: "New Investment Opportunity - Solar Farm",
        message:
          "A new 250MW solar farm project is now available for investment.",
        date: "2025-02-20",
        time: "10:00 AM",
        read: true,
        priority: "normal",
      },
      {
        id: 5,
        from: "AI Innovation Fund",
        email: "info@aiinnovation.com",
        subject: "Webinar: AI in Finance",
        message:
          "Join our upcoming webinar on March 15th to learn about AI trends.",
        date: "2025-02-18",
        time: "03:30 PM",
        read: false,
        priority: "low",
      },
      {
        id: 6,
        from: "Infrastructure Alpha",
        email: "notifications@infraalpha.com",
        subject: "Distribution Notice",
        message: "A distribution of $5.2M has been made to investors.",
        date: "2025-02-15",
        time: "09:00 AM",
        read: true,
        priority: "normal",
      },
    ],
  },

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
};
