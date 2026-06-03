// dashboard-switcher.js

const mockFunds = [
    { id: 1, name: "Rise Energy Fund I", category: "Oil & Gas", commitment: "$50M", return: "24.3%", status: "open" },
    { id: 2, name: "GreenTech Ventures", category: "Renewables", commitment: "$35M", return: "18.7%", status: "open" },
    { id: 3, name: "Infrastructure Alpha", category: "Real Assets", commitment: "$120M", return: "15.2%", status: "closed" },
    { id: 4, name: "AI Innovation Fund", category: "Technology", commitment: "$75M", return: "32.1%", status: "open" }
];

const mockOpportunities = {
    1: [
        { id: 101, name: "Permian Basin Acquisition", description: "Conventional oil production.", targetReturn: "28%", timeline: "24 months", status: "Due Diligence" },
        { id: 102, name: "Eagle Ford Expansion", description: "Shale development.", targetReturn: "22%", timeline: "18 months", status: "Active" }
    ],
    2: [
        { id: 201, name: "Solar Farm Portfolio", description: "Utility-scale solar.", targetReturn: "14%", timeline: "36 months", status: "Committed" },
        { id: 202, name: "Battery Storage Project", description: "Grid-scale storage.", targetReturn: "19%", timeline: "30 months", status: "Due Diligence" }
    ],
    3: [{ id: 301, name: "Midwest Toll Road", description: "Infrastructure concession.", targetReturn: "12%", timeline: "48 months", status: "Closed" }],
    4: [{ id: 401, name: "AI-Driven Analytics", description: "ML for finance.", targetReturn: "35%", timeline: "36 months", status: "Active" }]
};

const mockTimeline = {
    101: { title: "Permian Basin", milestones: [
        { name: "Due Diligence", status: "completed", date: "Jan 2025" },
        { name: "Legal Documentation", status: "completed", date: "Feb 2025" },
        { name: "Regulatory Approval", status: "current", date: "Mar 2025" },
        { name: "Closing", status: "upcoming", date: "Apr 2025" }
    ]},
    201: { title: "Solar Farm", milestones: [
        { name: "Site Acquisition", status: "completed", date: "Dec 2024" },
        { name: "Permitting", status: "current", date: "Mar 2025" },
        { name: "Construction", status: "upcoming", date: "Jun 2025" }
    ]}
};

function switchDashboard(dashboardId) {
    document.querySelectorAll('.dashboard-view').forEach(v => v.classList.remove('active-view'));
    document.getElementById(`dashboard-${dashboardId}`).classList.add('active-view');
    document.querySelectorAll('.dashboard-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.dashboard-btn[data-dashboard="${dashboardId}"]`).classList.add('active');
    localStorage.setItem('activeDashboard', dashboardId);
    
    if (dashboardId === 'shadcn') renderShadcn();
    if (dashboardId === 'azure') renderAzure();
    if (dashboardId === 'aws') renderAws();
    if (dashboardId === 'bootstrap') renderBootstrap();
}

// shadcn
function renderShadcn() {
    document.getElementById('shadcn-funds-grid').innerHTML = mockFunds.map(f => `
        <div class="shadcn-fund-card" onclick="showShadcnOpp(${f.id})">
            <h4>${f.name}</h4><p>${f.category}</p>
            <div style="display:flex;justify-content:space-between"><span>${f.commitment}</span><span>${f.return}</span></div>
        </div>
    `).join('');
}
function showShadcnOpp(fid) { showOpp('shadcn', fid); }
function showShadcnTimeline(oid) { showTimeline('shadcn', oid); }
function backShadcnToFunds() { backToFunds('shadcn'); }
function backShadcnToOpp() { backToOpp('shadcn'); }

// Azure
function renderAzure() {
    document.getElementById('azure-funds-list').innerHTML = mockFunds.map(f => `
        <div class="azure-fund-item" onclick="showAzureOpp(${f.id})">
            <span><strong>${f.name}</strong><br><small>${f.category}</small></span>
            <span>${f.commitment} | ${f.return}</span>
        </div>
    `).join('');
}
function showAzureOpp(fid) { showOpp('azure', fid); }
function showAzureTimeline(oid) { showTimeline('azure', oid); }
function backAzureToFunds() { backToFunds('azure'); }
function backAzureToOpp() { backToOpp('azure'); }

// AWS
function renderAws() {
    document.getElementById('aws-funds-tbody').innerHTML = mockFunds.map(f => `
        <tr onclick="showAwsOpp(${f.id})">
            <td><strong>${f.name}</strong></td><td>${f.category}</td><td>${f.commitment}</td><td>${f.return}</td>
        </tr>
    `).join('');
}
function showAwsOpp(fid) { showOpp('aws', fid); }
function showAwsTimeline(oid) { showTimeline('aws', oid); }
function backAwsToFunds() { backToFunds('aws'); }
function backAwsToOpp() { backToOpp('aws'); }

// Bootstrap
function renderBootstrap() {
    document.getElementById('bootstrap-funds-tbody').innerHTML = mockFunds.map(f => `
        <tr onclick="showBootstrapOpp(${f.id})">
            <td>${f.name}</td><td>${f.category}</td><td>${f.commitment}</td><td>${f.return}</td>
        </tr>
    `).join('');
}
function showBootstrapOpp(fid) { showOpp('bootstrap', fid); }
function showBootstrapTimeline(oid) { showTimeline('bootstrap', oid); }
function backBootstrapToFunds() { backToFunds('bootstrap'); }
function backBootstrapToOpp() { backToOpp('bootstrap'); }

// Generic functions
function showOpp(dashboard, fundId) {
    const opps = mockOpportunities[fundId] || [];
    const fundName = mockFunds.find(f => f.id === fundId)?.name || 'Fund';
    document.getElementById(`${dashboard}-opp-title`).innerHTML = `<h3>${fundName} - Opportunities</h3>`;
    document.getElementById(`${dashboard}-opp-list`).innerHTML = opps.map(o => `
        <div class="opportunity-card" onclick="${dashboard}ShowTimeline(${o.id})">
            <strong>${o.name}</strong><p>${o.description}</p>
            <div>Target: ${o.targetReturn} | ${o.timeline} | <span class="status-badge status-${o.status.toLowerCase().replace(' ', '-')}">${o.status}</span></div>
        </div>
    `).join('');
    document.getElementById(`${dashboard}-funds-section`).style.display = 'none';
    document.getElementById(`${dashboard}-opportunities-section`).style.display = 'block';
    document.getElementById(`${dashboard}-timeline-section`).style.display = 'none';
}

function showTimeline(dashboard, oppId) {
    const timeline = mockTimeline[oppId] || mockTimeline[101];
    document.getElementById(`${dashboard}-timeline-title`).innerHTML = `<h3>${timeline.title} - Timeline</h3>`;
    document.getElementById(`${dashboard}-timeline-content`).innerHTML = timeline.milestones.map(m => `
        <div class="timeline-item"><div class="timeline-dot"></div><div><strong>${m.name}</strong><br>${m.date}<br><span class="status-badge status-${m.status}">${m.status}</span></div></div>
    `).join('');
    document.getElementById(`${dashboard}-opportunities-section`).style.display = 'none';
    document.getElementById(`${dashboard}-timeline-section`).style.display = 'block';
}

function backToFunds(dashboard) {
    document.getElementById(`${dashboard}-opportunities-section`).style.display = 'none';
    document.getElementById(`${dashboard}-timeline-section`).style.display = 'none';
    document.getElementById(`${dashboard}-funds-section`).style.display = 'block';
}

function backToOpp(dashboard) {
    document.getElementById(`${dashboard}-timeline-section`).style.display = 'none';
    document.getElementById(`${dashboard}-opportunities-section`).style.display = 'block';
}

// Make functions global
window.showShadcnOpp = showShadcnOpp; window.showShadcnTimeline = showShadcnTimeline;
window.backShadcnToFunds = backShadcnToFunds; window.backShadcnToOpp = backShadcnToOpp;
window.showAzureOpp = showAzureOpp; window.showAzureTimeline = showAzureTimeline;
window.backAzureToFunds = backAzureToFunds; window.backAzureToOpp = backAzureToOpp;
window.showAwsOpp = showAwsOpp; window.showAwsTimeline = showAwsTimeline;
window.backAwsToFunds = backAwsToFunds; window.backAwsToOpp = backAwsToOpp;
window.showBootstrapOpp = showBootstrapOpp; window.showBootstrapTimeline = showBootstrapTimeline;
window.backBootstrapToFunds = backBootstrapToFunds; window.backBootstrapToOpp = backBootstrapToOpp;

document.addEventListener('DOMContentLoaded', () => {
    switchDashboard(localStorage.getItem('activeDashboard') || 'shadcn');
});