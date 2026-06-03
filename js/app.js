// app.js - Complete data and flow per requirements

// ============================================
// DATA MODELS (per requirements)
// ============================================

// Fund Cards Data
const fundsData = [
    {
        id: 1,
        name: "Rise Energy Fund I",
        category: "Oil & Gas",
        description: "Conventional and unconventional oil assets in Permian Basin",
        commitment: "$50M",
        return: "24.3% IRR",
        status: "Open",
        image: "🛢️",
        color: "#2d6a4f"
    },
    {
        id: 2,
        name: "GreenTech Ventures",
        category: "Renewables",
        description: "Solar, wind, and battery storage projects across North America",
        commitment: "$35M",
        return: "18.7% IRR",
        status: "Open",
        image: "☀️",
        color: "#38bdf8"
    },
    {
        id: 3,
        name: "Infrastructure Alpha",
        category: "Real Assets",
        description: "Long-term infrastructure concessions including toll roads and ports",
        commitment: "$120M",
        return: "15.2% IRR",
        status: "Closed",
        image: "🌉",
        color: "#f59e0b"
    },
    {
        id: 4,
        name: "AI Innovation Fund",
        category: "Technology",
        description: "Early-stage AI and machine learning companies",
        commitment: "$75M",
        return: "32.1% IRR",
        status: "Open",
        image: "🤖",
        color: "#8b5cf6"
    }
];

// Opportunities per Fund (connected to fund cards)
const opportunitiesData = {
    1: [ // Rise Energy Fund I
        {
            id: 101,
            fundId: 1,
            title: "Permian Basin Acquisition",
            image: "🛢️",
            shortDescription: "Strategic acquisition of producing oil assets with existing infrastructure.",
            fullDescription: "This opportunity involves acquiring a portfolio of producing oil wells in the Permian Basin. The assets have established production history, existing pipeline access, and significant upside potential through enhanced recovery techniques.",
            targetReturn: "28%",
            timeline: "24 months",
            riskLevel: "Medium",
            minInvestment: "$50,000",
            status: "Due Diligence"
        },
        {
            id: 102,
            fundId: 1,
            title: "Eagle Ford Expansion",
            image: "⛽",
            shortDescription: "Expansion into Eagle Ford shale with top-tier operator.",
            fullDescription: "Partnering with a leading operator to develop 5,000 acres in the Eagle Ford shale. Existing wells show strong production curves.",
            targetReturn: "22%",
            timeline: "18 months",
            riskLevel: "Medium-High",
            minInvestment: "$25,000",
            status: "Active"
        }
    ],
    2: [ // GreenTech Ventures
        {
            id: 201,
            fundId: 2,
            title: "Solar Farm Portfolio",
            image: "☀️",
            shortDescription: "Utility-scale solar projects across three states.",
            fullDescription: "Portfolio of three utility-scale solar farms totaling 250MW capacity. Long-term PPAs in place with investment-grade utilities.",
            targetReturn: "14%",
            timeline: "36 months",
            riskLevel: "Low",
            minInvestment: "$10,000",
            status: "Committed"
        },
        {
            id: 202,
            fundId: 2,
            title: "Battery Storage Project",
            image: "🔋",
            shortDescription: "Grid-scale battery storage for renewable integration.",
            fullDescription: "100MW lithium-ion battery storage facility adjacent to existing solar farm. Provides grid stabilization and peak shaving services.",
            targetReturn: "19%",
            timeline: "30 months",
            riskLevel: "Medium",
            minInvestment: "$25,000",
            status: "Due Diligence"
        }
    ],
    3: [ // Infrastructure Alpha
        {
            id: 301,
            fundId: 3,
            title: "Midwest Toll Road",
            image: "🛣️",
            shortDescription: "Long-term infrastructure concession for major toll road.",
            fullDescription: "50-year concession for a 150-mile toll road serving growing suburban communities. Stable, inflation-linked revenue.",
            targetReturn: "12%",
            timeline: "48 months",
            riskLevel: "Low",
            minInvestment: "$100,000",
            status: "Closed"
        }
    ],
    4: [ // AI Innovation Fund
        {
            id: 401,
            fundId: 4,
            title: "AI-Driven Analytics Platform",
            image: "📊",
            shortDescription: "Machine learning platform for financial services.",
            fullDescription: "Enterprise SaaS platform using AI for fraud detection and risk assessment. Existing contracts with major banks.",
            targetReturn: "35%",
            timeline: "36 months",
            riskLevel: "High",
            minInvestment: "$25,000",
            status: "Active"
        },
        {
            id: 402,
            fundId: 4,
            title: "Computer Vision Startup",
            image: "👁️",
            shortDescription: "Leading computer vision for autonomous vehicles.",
            fullDescription: "Series B startup with proprietary object detection technology. Partnerships with two major automakers.",
            targetReturn: "42%",
            timeline: "48 months",
            riskLevel: "High",
            minInvestment: "$50,000",
            status: "Due Diligence"
        }
    ]
};

// Timeline data per opportunity (milestones with status)
const timelineData = {
    101: {
        opportunityId: 101,
        title: "Permian Basin Acquisition",
        summary: "Acquisition of producing oil assets with 5,000 boe/d current production. 20+ years of proven reserves.",
        milestones: [
            { id: 1, name: "Due Diligence", description: "Technical and financial review of assets", status: "completed", date: "Jan 15, 2025", expectedDuration: "45 days" },
            { id: 2, name: "Legal Documentation", description: "Drafting and reviewing purchase agreements", status: "completed", date: "Feb 28, 2025", expectedDuration: "30 days" },
            { id: 3, name: "Regulatory Approval", description: "State and federal permitting", status: "current", date: "Expected Mar 30, 2025", expectedDuration: "45 days" },
            { id: 4, name: "Closing", description: "Final funding and asset transfer", status: "upcoming", date: "Expected Apr 30, 2025", expectedDuration: "15 days" },
            { id: 5, name: "First Production", description: "Initial revenue generation", status: "upcoming", date: "Expected Jun 15, 2025", expectedDuration: "Ongoing" }
        ],
        keyMetrics: {
            npv: "$85M",
            irr: "28%",
            paybackPeriod: "3.2 years",
            netCashFlow: "$42M"
        }
    },
    102: {
        opportunityId: 102,
        title: "Eagle Ford Expansion",
        summary: "Development of 5,000 acres in Eagle Ford shale with 20 planned wells. Top-tier operator with strong track record.",
        milestones: [
            { id: 1, name: "Site Preparation", description: "Drilling pad construction and permitting", status: "completed", date: "Feb 1, 2025", expectedDuration: "60 days" },
            { id: 2, name: "Drilling Phase 1", description: "First 10 wells", status: "current", date: "In Progress", expectedDuration: "90 days" },
            { id: 3, name: "Completion", description: "Hydraulic fracturing", status: "upcoming", date: "Expected May 2025", expectedDuration: "60 days" },
            { id: 4, name: "Production Start", description: "First oil and gas sales", status: "upcoming", date: "Expected Jul 2025", expectedDuration: "Ongoing" }
        ],
        keyMetrics: {
            npv: "$45M",
            irr: "22%",
            paybackPeriod: "2.8 years",
            netCashFlow: "$28M"
        }
    },
    201: {
        opportunityId: 201,
        title: "Solar Farm Portfolio",
        summary: "Three utility-scale solar farms totaling 250MW with 20-year PPAs in place.",
        milestones: [
            { id: 1, name: "Land Acquisition", description: "Securing site leases and permits", status: "completed", date: "Dec 2024", expectedDuration: "6 months" },
            { id: 2, name: "Construction", description: "Panel installation and grid connection", status: "current", date: "In Progress", expectedDuration: "18 months" },
            { id: 3, name: "Commissioning", description: "Testing and grid synchronization", status: "upcoming", date: "Expected Jun 2026", expectedDuration: "3 months" },
            { id: 4, name: "Operations", description: "Revenue generation begins", status: "upcoming", date: "Expected Sep 2026", expectedDuration: "20+ years" }
        ],
        keyMetrics: {
            npv: "$120M",
            irr: "14%",
            paybackPeriod: "8.5 years",
            netCashFlow: "$18M/year"
        }
    },
    202: {
        opportunityId: 202,
        title: "Battery Storage Project",
        summary: "100MW lithium-ion battery storage for grid stabilization.",
        milestones: [
            { id: 1, name: "Permitting", description: "Environmental and grid connection permits", status: "completed", date: "Jan 2025", expectedDuration: "4 months" },
            { id: 2, name: "Equipment Procurement", description: "Battery cells and inverters", status: "current", date: "In Progress", expectedDuration: "6 months" },
            { id: 3, name: "Installation", description: "Site construction and battery installation", status: "upcoming", date: "Expected Aug 2025", expectedDuration: "12 months" },
            { id: 4, name: "Commercial Operation", description: "Revenue from grid services", status: "upcoming", date: "Expected Aug 2026", expectedDuration: "Ongoing" }
        ],
        keyMetrics: {
            npv: "$65M",
            irr: "19%",
            paybackPeriod: "6.2 years",
            netCashFlow: "$12M/year"
        }
    },
    301: {
        opportunityId: 301,
        title: "Midwest Toll Road",
        summary: "50-year concession for 150-mile toll road with inflation-linked revenue.",
        milestones: [
            { id: 1, name: "Concession Agreement", description: "Signed with state DOT", status: "completed", date: "Nov 2024", expectedDuration: "12 months" },
            { id: 2, name: "Financing", description: "Debt and equity closing", status: "completed", date: "Jan 2025", expectedDuration: "6 months" },
            { id: 3, name: "Operations Transfer", description: "Takeover of operations", status: "current", date: "Mar 2025", expectedDuration: "3 months" },
            { id: 4, name: "Revenue Generation", description: "Toll collection begins", status: "upcoming", date: "Apr 2025", expectedDuration: "50 years" }
        ],
        keyMetrics: {
            npv: "$200M",
            irr: "12%",
            paybackPeriod: "12 years",
            netCashFlow: "$25M/year"
        }
    },
    401: {
        opportunityId: 401,
        title: "AI-Driven Analytics Platform",
        summary: "Enterprise SaaS for fraud detection with major bank contracts.",
        milestones: [
            { id: 1, name: "Product Development", description: "Core ML models built", status: "completed", date: "Dec 2024", expectedDuration: "12 months" },
            { id: 2, name: "Pilot Deployment", description: "With two major banks", status: "current", date: "In Progress", expectedDuration: "6 months" },
            { id: 3, name: "Full Launch", description: "Commercial release", status: "upcoming", date: "Expected Sep 2025", expectedDuration: "3 months" },
            { id: 4, name: "Series B Raise", description: "Next funding round", status: "upcoming", date: "Expected Q1 2026", expectedDuration: "Ongoing" }
        ],
        keyMetrics: {
            npv: "$75M",
            irr: "35%",
            paybackPeriod: "4 years",
            netCashFlow: "N/A - Pre-revenue"
        }
    },
    402: {
        opportunityId: 402,
        title: "Computer Vision Startup",
        summary: "Object detection for autonomous vehicles with automaker partnerships.",
        milestones: [
            { id: 1, name: "Seed Round", description: "$10M raised", status: "completed", date: "Oct 2024", expectedDuration: "6 months" },
            { id: 2, name: "Prototype", description: "Working demo with partners", status: "current", date: "In Progress", expectedDuration: "9 months" },
            { id: 3, name: "Series A", description: "Next funding round", status: "upcoming", date: "Expected Dec 2025", expectedDuration: "6 months" },
            { id: 4, name: "Commercial Deployment", description: "In production vehicles", status: "upcoming", date: "Expected 2027", expectedDuration: "Ongoing" }
        ],
        keyMetrics: {
            npv: "$40M",
            irr: "42%",
            paybackPeriod: "5 years",
            netCashFlow: "N/A - Pre-revenue"
        }
    }
};

// Wallet Data
const walletData = {
    balance: 45250,
    availableFunds: 45250,
    investedFunds: 280500000,
    withdrawnFunds: 125000,
    pendingWithdrawals: 0,
    currency: "USD",
    transactions: [
        { id: 1, date: "2025-03-01", type: "deposit", amount: 50000, status: "completed", description: "Wire transfer - Rise Energy Fund" },
        { id: 2, date: "2025-02-15", type: "investment", amount: -25000, status: "completed", description: "Investment - Solar Farm Portfolio" },
        { id: 3, date: "2025-02-01", type: "deposit", amount: 25000, status: "completed", description: "ACH transfer" },
        { id: 4, date: "2025-01-20", type: "withdrawal", amount: -5000, status: "completed", description: "Withdrawal to bank account" },
        { id: 5, date: "2025-01-10", type: "investment", amount: -50000, status: "completed", description: "Investment - Permian Basin Acquisition" },
        { id: 6, date: "2024-12-15", type: "dividend", amount: 3250, status: "completed", description: "Distribution - Infrastructure Alpha" }
    ]
};

// ============================================
// APPLICATION STATE
// ============================================
let currentView = 'dashboard'; // dashboard, opportunities, timeline, wallet
let currentFundId = null;
let currentOpportunityId = null;

// ============================================
// RENDER FUNCTIONS
// ============================================

// Render Dashboard with Fund Cards (Page 2-3 requirements)
function renderDashboard() {
    const container = document.getElementById('funds-container');
    if (!container) return;
    
    container.innerHTML = fundsData.map(fund => `
        <div class="fund-card" data-fund-id="${fund.id}" onclick="selectFund(${fund.id})">
            <div class="fund-card-header">
                <span class="fund-icon">${fund.image}</span>
                <span class="fund-status ${fund.status.toLowerCase()}">${fund.status}</span>
            </div>
            <h3 class="fund-name">${fund.name}</h3>
            <p class="fund-category">${fund.category}</p>
            <p class="fund-description">${fund.description}</p>
            <div class="fund-metrics">
                <div><span class="metric-label">Commitment</span><span class="metric-value">${fund.commitment}</span></div>
                <div><span class="metric-label">Target Return</span><span class="metric-value">${fund.return}</span></div>
            </div>
            <button class="fund-action-btn">View Opportunities →</button>
        </div>
    `).join('');
    
    // Update header stats
    const totalCommitment = fundsData.reduce((sum, f) => sum + parseInt(f.commitment), 0);
    const openFunds = fundsData.filter(f => f.status === 'Open').length;
    document.getElementById('stat-total-portfolio').innerHTML = `$${totalCommitment}M`;
    document.getElementById('stat-active-funds').innerHTML = openFunds;
}

// Render Opportunity List for selected fund (Page 4 requirements)
function renderOpportunities(fundId) {
    currentFundId = fundId;
    const fund = fundsData.find(f => f.id === fundId);
    const opportunities = opportunitiesData[fundId] || [];
    
    const container = document.getElementById('opportunities-container');
    const header = document.getElementById('opportunities-header');
    
    if (header) {
        header.innerHTML = `
            <button class="back-btn" onclick="backToDashboard()">← Back to Funds</button>
            <div class="fund-info-banner">
                <span class="fund-icon-large">${fund.image}</span>
                <div>
                    <h2>${fund.name}</h2>
                    <p>${fund.description}</p>
                </div>
            </div>
            <h3>Available Investment Opportunities</h3>
        `;
    }
    
    if (container) {
        container.innerHTML = opportunities.map(opp => `
            <div class="opportunity-card" data-opp-id="${opp.id}" onclick="selectOpportunity(${opp.id})">
                <div class="opportunity-card-header">
                    <span class="opportunity-icon">${opp.image}</span>
                    <div>
                        <h4>${opp.title}</h4>
                        <span class="opportunity-status ${opp.status.toLowerCase().replace(' ', '-')}">${opp.status}</span>
                    </div>
                </div>
                <p class="opportunity-description">${opp.shortDescription}</p>
                <div class="opportunity-metrics">
                    <div><span class="metric-label">Target Return</span><span class="metric-value">${opp.targetReturn}</span></div>
                    <div><span class="metric-label">Timeline</span><span class="metric-value">${opp.timeline}</span></div>
                    <div><span class="metric-label">Min Investment</span><span class="metric-value">${opp.minInvestment}</span></div>
                </div>
                <button class="opportunity-action-btn">View Details & Timeline →</button>
            </div>
        `).join('');
    }
    
    currentView = 'opportunities';
    showView('opportunities');
}

// Render Timeline for selected opportunity (Page 5-6 requirements)
function renderTimeline(opportunityId) {
    currentOpportunityId = opportunityId;
    const timeline = timelineData[opportunityId];
    
    if (!timeline) return;
    
    // Find which fund this opportunity belongs to
    let fundId = null;
    let opportunity = null;
    for (const [fId, opps] of Object.entries(opportunitiesData)) {
        const found = opps.find(o => o.id === opportunityId);
        if (found) {
            fundId = parseInt(fId);
            opportunity = found;
            break;
        }
    }
    
    const fund = fundsData.find(f => f.id === fundId);
    
    const container = document.getElementById('timeline-container');
    const header = document.getElementById('timeline-header');
    
    if (header) {
        header.innerHTML = `
            <button class="back-btn" onclick="backToOpportunities()">← Back to Opportunities</button>
            <div class="project-summary">
                <div class="project-summary-header">
                    <span class="project-icon">${opportunity?.image || '📋'}</span>
                    <div>
                        <h2>${timeline.title}</h2>
                        <p>${fund?.name || ''}</p>
                    </div>
                </div>
                <div class="project-summary-content">
                    <p>${timeline.summary}</p>
                    <div class="key-metrics">
                        <div class="metric"><span>NPV</span><strong>${timeline.keyMetrics.npv}</strong></div>
                        <div class="metric"><span>IRR</span><strong>${timeline.keyMetrics.irr}</strong></div>
                        <div class="metric"><span>Payback</span><strong>${timeline.keyMetrics.paybackPeriod}</strong></div>
                    </div>
                </div>
            </div>
            <h3>Project Timeline & Milestones</h3>
        `;
    }
    
    if (container) {
        container.innerHTML = timeline.milestones.map(milestone => `
            <div class="timeline-item ${milestone.status}">
                <div class="timeline-marker">
                    <div class="timeline-dot ${milestone.status}"></div>
                    ${milestone.status !== 'completed' ? '<div class="timeline-line"></div>' : ''}
                </div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <h4>${milestone.name}</h4>
                        <span class="status-badge ${milestone.status}">${milestone.status}</span>
                    </div>
                    <p class="timeline-description">${milestone.description}</p>
                    <div class="timeline-meta">
                        <span>📅 ${milestone.date}</span>
                        <span>⏱️ ${milestone.expectedDuration}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    currentView = 'timeline';
    showView('timeline');
}

// Render Wallet (Page 7 requirements)
function renderWallet() {
    const summaryContainer = document.getElementById('wallet-summary');
    const historyContainer = document.getElementById('transaction-history');
    
    if (summaryContainer) {
        summaryContainer.innerHTML = `
            <div class="wallet-balance-card">
                <div class="balance-label">Total Balance</div>
                <div class="balance-value">$${walletData.balance.toLocaleString()}</div>
                <div class="balance-currency">${walletData.currency}</div>
                <div class="wallet-actions">
                    <button class="btn-deposit" onclick="alert('Deposit flow would open here')">+ Deposit</button>
                    <button class="btn-withdraw" onclick="alert('Withdrawal flow would open here')">− Withdraw</button>
                </div>
            </div>
            <div class="wallet-stats-grid">
                <div class="stat-card"><div class="stat-label">Available Funds</div><div class="stat-value">$${walletData.availableFunds.toLocaleString()}</div></div>
                <div class="stat-card"><div class="stat-label">Invested Funds</div><div class="stat-value">$${(walletData.investedFunds / 1000000).toFixed(1)}M</div></div>
                <div class="stat-card"><div class="stat-label">Withdrawn Funds</div><div class="stat-value">$${walletData.withdrawnFunds.toLocaleString()}</div></div>
                <div class="stat-card"><div class="stat-label">Pending Withdrawals</div><div class="stat-value">$${walletData.pendingWithdrawals.toLocaleString()}</div></div>
            </div>
        `;
    }
    
    if (historyContainer) {
        historyContainer.innerHTML = `
            <h4>Transaction History</h4>
            <table class="transaction-table">
                <thead>
                    <tr><th>Date</th><th>Description</th><th>Type</th><th>Amount</th><th>Status</th></tr>
                </thead>
                <tbody>
                    ${walletData.transactions.map(t => `
                        <tr>
                            <td>${t.date}</td>
                            <td>${t.description}</td>
                            <td><span class="transaction-type ${t.type}">${t.type}</span></td>
                            <td class="${t.amount < 0 ? 'negative' : 'positive'}">${t.amount < 0 ? '-' : '+'}$${Math.abs(t.amount).toLocaleString()}</td>
                            <td><span class="status-badge ${t.status}">${t.status}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    
    currentView = 'wallet';
    showView('wallet');
}

// ============================================
// VIEW MANAGEMENT
// ============================================
function showView(viewName) {
    document.getElementById('dashboard-view').style.display = viewName === 'dashboard' ? 'block' : 'none';
    document.getElementById('opportunities-view').style.display = viewName === 'opportunities' ? 'block' : 'none';
    document.getElementById('timeline-view').style.display = viewName === 'timeline' ? 'block' : 'none';
    document.getElementById('wallet-view').style.display = viewName === 'wallet' ? 'block' : 'none';
    
    // Update active nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.view === viewName) {
            item.classList.add('active');
        }
    });
}

// ============================================
// NAVIGATION FUNCTIONS (Flow: Fund Card → Opportunity → Timeline)
// ============================================
function selectFund(fundId) {
    renderOpportunities(fundId);
}

function selectOpportunity(opportunityId) {
    renderTimeline(opportunityId);
}

function backToDashboard() {
    currentView = 'dashboard';
    showView('dashboard');
    renderDashboard();
}

function backToOpportunities() {
    if (currentFundId) {
        renderOpportunities(currentFundId);
    } else {
        backToDashboard();
    }
}

function navigateToWallet() {
    renderWallet();
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    renderDashboard();
    showView('dashboard');
    
    // Navigation handlers
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const view = this.dataset.view;
            if (view === 'wallet') {
                navigateToWallet();
            } else if (view === 'dashboard') {
                backToDashboard();
            }
        });
    });
});

// Make functions global for onclick handlers
window.selectFund = selectFund;
window.selectOpportunity = selectOpportunity;
window.backToDashboard = backToDashboard;
window.backToOpportunities = backToOpportunities;
window.navigateToWallet = navigateToWallet;