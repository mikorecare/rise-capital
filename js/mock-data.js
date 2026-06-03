// mock-data.js - Shared mock data for all dashboards

const mockFunds = [
  {
    id: 1,
    name: "Rise Energy Fund I",
    category: "Oil & Gas",
    commitment: "$50M",
    return: "24.3%",
    status: "open",
    image: "🛢️",
  },
  {
    id: 2,
    name: "GreenTech Ventures",
    category: "Renewables",
    commitment: "$35M",
    return: "18.7%",
    status: "open",
    image: "☀️",
  },
  {
    id: 3,
    name: "Infrastructure Alpha",
    category: "Real Assets",
    commitment: "$120M",
    return: "15.2%",
    status: "closed",
    image: "🌉",
  },
  {
    id: 4,
    name: "AI Innovation Fund",
    category: "Technology",
    commitment: "$75M",
    return: "32.1%",
    status: "open",
    image: "🤖",
  },
];

const mockOpportunities = {
  1: [
    {
      id: 101,
      name: "Permian Basin Acquisition",
      description: "Conventional oil production with existing infrastructure.",
      targetReturn: "28%",
      timeline: "24 months",
      status: "Due Diligence",
    },
    {
      id: 102,
      name: "Eagle Ford Expansion",
      description: "Shale development with top-tier operator.",
      targetReturn: "22%",
      timeline: "18 months",
      status: "Active",
    },
  ],
  2: [
    {
      id: 201,
      name: "Solar Farm Portfolio",
      description: "Utility-scale solar across three states.",
      targetReturn: "14%",
      timeline: "36 months",
      status: "Committed",
    },
    {
      id: 202,
      name: "Battery Storage Project",
      description: "Grid-scale storage for renewable integration.",
      targetReturn: "19%",
      timeline: "30 months",
      status: "Due Diligence",
    },
  ],
  3: [
    {
      id: 301,
      name: "Midwest Toll Road",
      description: "Long-term infrastructure concession.",
      targetReturn: "12%",
      timeline: "48 months",
      status: "Closed",
    },
  ],
  4: [
    {
      id: 401,
      name: "AI-Driven Analytics Platform",
      description: "Machine learning for financial services.",
      targetReturn: "35%",
      timeline: "36 months",
      status: "Active",
    },
    {
      id: 402,
      name: "Computer Vision Startup",
      description: "Object detection for autonomous vehicles.",
      targetReturn: "42%",
      timeline: "48 months",
      status: "Due Diligence",
    },
  ],
};

const mockTimeline = {
  101: {
    title: "Permian Basin Acquisition",
    summary: "Acquisition of producing oil assets.",
    milestones: [
      { name: "Due Diligence", status: "completed", date: "Jan 2025" },
      { name: "Legal Documentation", status: "completed", date: "Feb 2025" },
      { name: "Regulatory Approval", status: "current", date: "Mar 2025" },
      { name: "Closing", status: "upcoming", date: "Apr 2025" },
    ],
  },
  102: {
    title: "Eagle Ford Expansion",
    milestones: [
      { name: "Site Preparation", status: "completed", date: "Feb 2025" },
      { name: "Drilling Phase 1", status: "current", date: "In Progress" },
      { name: "Completion", status: "upcoming", date: "May 2025" },
    ],
  },
  201: {
    title: "Solar Farm Portfolio",
    milestones: [
      { name: "Land Acquisition", status: "completed", date: "Dec 2024" },
      { name: "Construction", status: "current", date: "In Progress" },
      { name: "Commissioning", status: "upcoming", date: "Jun 2026" },
    ],
  },
};
