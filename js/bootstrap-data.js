// bootstrap-data.js - All mock data for Bootstrap dashboard

const bootstrapData = {
  // Portfolio Stats
  portfolio: {
    totalValue: "$280.5M",
    activeFunds: "6",
    avgReturn: "22.4%",
    walletBalance: "$45,250",
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
      term: "10 yrs",
      minInvestment: "$100K",
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
      term: "8 yrs",
      minInvestment: "$50K",
      location: "Multiple States",
      description:
        "Solar, wind, and battery storage projects across North America.",
    },
    {
      id: 3,
      name: "Infrastructure Alpha",
      category: "Real Assets",
      commitment: "$120M",
      return: "15.2%",
      status: "Limited",
      vintage: "2023",
      term: "12 yrs",
      minInvestment: "$250K",
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
      term: "7 yrs",
      minInvestment: "$75K",
      location: "Global",
      description: "Early-stage AI and machine learning companies.",
    },
    {
      id: 5,
      name: "Healthcare Opportunities",
      category: "Life Sciences",
      commitment: "$45M",
      return: "21.5%",
      status: "Coming Soon",
      vintage: "2025",
      term: "9 yrs",
      minInvestment: "$100K",
      location: "Massachusetts, USA",
      description: "Biotech and medical device companies in late-stage trials.",
    },
    {
      id: 6,
      name: "Real Estate Income Trust",
      category: "Real Estate",
      commitment: "$200M",
      return: "12.8%",
      status: "Closed",
      vintage: "2022",
      term: "15 yrs",
      minInvestment: "$500K",
      location: "Major Metros",
      description: "Commercial real estate portfolio with stable income.",
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
        description: "Oil production assets",
        targetReturn: "28%",
        timeline: "24 months",
        status: "Due Diligence",
      },
    ],
    2: [
      {
        id: 201,
        name: "Solar Farm Portfolio",
        description: "Utility-scale solar",
        targetReturn: "14%",
        timeline: "36 months",
        status: "Active",
      },
    ],
    3: [
      {
        id: 301,
        name: "Midwest Toll Road",
        description: "Infrastructure concession",
        targetReturn: "12%",
        timeline: "48 months",
        status: "Closed",
      },
    ],
    4: [
      {
        id: 401,
        name: "AI Analytics Platform",
        description: "Machine learning",
        targetReturn: "35%",
        timeline: "36 months",
        status: "Active",
      },
    ],
    5: [
      {
        id: 501,
        name: "Gene Therapy Treatment",
        description: "Biotech",
        targetReturn: "38%",
        timeline: "60 months",
        status: "Pre-launch",
      },
    ],
    6: [
      {
        id: 601,
        name: "Industrial REIT Portfolio",
        description: "Real estate",
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
