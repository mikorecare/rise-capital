// shadcn-dashboard.js - Main dashboard logic

let currentFundId = null;
let currentMailView = "inbox";
let selectedMailId = null;
let currentOfferingFilter = "all";
let currentOfferingSearch = "";

// Modal functions
function openModal(title, content) {
  $("#modalTitle").text(title);
  $("#modalBody").html(content);
  $("#modalOverlay").addClass("active");
  lucide.createIcons();
}

function closeModal() {
  $("#modalOverlay").removeClass("active");
}

function openFundModal(fundId) {
  const fund = shadcnData.funds.find((f) => f.id === fundId);
  if (!fund) return;

  const content = `
        <div class="modal-section">
            <div class="modal-section-title">Fund Overview</div>
            <div class="modal-info-row"><span class="modal-info-label">Fund Name</span><span class="modal-info-value">${fund.name}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Category</span><span class="modal-info-value">${fund.category}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Status</span><span class="modal-info-value"><span class="fund-status ${fund.status.toLowerCase().replace(" ", "-")}">${fund.status}</span></span></div>
            <div class="modal-info-row"><span class="modal-info-label">Vintage Year</span><span class="modal-info-value">${fund.vintage}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Term</span><span class="modal-info-value">${fund.term}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Minimum Investment</span><span class="modal-info-value">${fund.minInvestment}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Geographic Focus</span><span class="modal-info-value">${fund.location}</span></div>
        </div>
        <div class="modal-section">
            <div class="modal-section-title">Key Metrics</div>
            <div class="modal-metrics">
                <div class="modal-metric-card"><div class="modal-metric-value">${fund.commitment}</div><div class="modal-metric-label">Total Commitment</div></div>
                <div class="modal-metric-card"><div class="modal-metric-value">${fund.return}</div><div class="modal-metric-label">Target Return (IRR)</div></div>
            </div>
        </div>
        <div class="modal-section">
            <div class="modal-section-title">Description</div>
            <p style="font-size: 0.85rem; line-height: 1.5; color: var(--theme-text-secondary, #64748b);">${fund.description}</p>
        </div>
        <div class="modal-actions">
            <button class="modal-btn modal-btn-primary" onclick="alert('Invest in ${fund.name}')">Invest Now</button>
            <button class="modal-btn modal-btn-secondary" onclick="closeModal()">Close</button>
        </div>
    `;
  openModal(fund.name, content);
}

function openTransactionModal(description, amount, date) {
  const content = `
        <div class="modal-section">
            <div class="modal-section-title">Transaction Details</div>
            <div class="modal-info-row"><span class="modal-info-label">Date</span><span class="modal-info-value">${date}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Description</span><span class="modal-info-value">${description}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Amount</span><span class="modal-info-value">${amount}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Status</span><span class="modal-info-value"><span class="status-badge completed">Completed</span></span></div>
        </div>
        <div class="modal-section">
            <div class="modal-section-title">Additional Information</div>
            <p style="font-size: 0.85rem; line-height: 1.5; color: var(--theme-text-secondary, #64748b);">This transaction has been processed and confirmed. Reference ID: TXN-${Math.floor(Math.random() * 100000)}</p>
        </div>
        <div class="modal-actions">
            <button class="modal-btn modal-btn-primary" onclick="alert('Download receipt')">Download Receipt</button>
            <button class="modal-btn modal-btn-secondary" onclick="closeModal()">Close</button>
        </div>
    `;
  openModal("Transaction Details", content);
}

function openMilestoneModal(project, milestone, date, status) {
  const content = `
        <div class="modal-section">
            <div class="modal-section-title">Milestone Information</div>
            <div class="modal-info-row"><span class="modal-info-label">Project</span><span class="modal-info-value">${project}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Milestone</span><span class="modal-info-value">${milestone}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Expected Date</span><span class="modal-info-value">${date}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Status</span><span class="modal-info-value"><span class="status-badge pending">${status}</span></span></div>
        </div>
        <div class="modal-section">
            <div class="modal-section-title">Description</div>
            <p style="font-size: 0.85rem; line-height: 1.5; color: var(--theme-text-secondary, #64748b);">This milestone is part of the ${project} project timeline. Progress is being tracked against the expected completion date.</p>
        </div>
        <div class="modal-actions">
            <button class="modal-btn modal-btn-primary" onclick="alert('Track this milestone')">Track Progress</button>
            <button class="modal-btn modal-btn-secondary" onclick="closeModal()">Close</button>
        </div>
    `;
  openModal(`${project} - Milestone Details`, content);
}

// View management
function showView(viewName) {
  $(".view-container").removeClass("active-view");
  $(`#${viewName}-view`).addClass("active-view");

  $(".shadcn-nav-item").removeClass("active");
  const navView =
    viewName === "opportunities" || viewName === "timeline"
      ? "funds"
      : viewName;
  $(`.shadcn-nav-item[data-view="${navView}"]`).addClass("active");
}

// Render functions
function renderStats() {
  const p = shadcnData.portfolio;
  $("#stats-grid").html(`
        <div class="stat-card"><div class="label">Total Portfolio</div><div class="value">${p.totalValue}</div><div class="change">↑ ${p.trend} from last month</div></div>
        <div class="stat-card"><div class="label">Active Funds</div><div class="value">${p.activeFunds}</div><div class="change">+2 this quarter</div></div>
        <div class="stat-card"><div class="label">Average Return</div><div class="value">${p.avgReturn}</div><div class="change">Above benchmark</div></div>
        <div class="stat-card"><div class="label">Wallet Balance</div><div class="value">${p.walletBalance}</div><div class="change">Available to invest</div></div>
    `);
}

function renderProfile() {
  const u = shadcnData.user;
  $("#profile-card").html(`
        <div class="profile-header">
            <div class="profile-avatar">${u.initial}</div>
            <div class="profile-info"><h3>${u.name}</h3><p>${u.role}</p></div>
        </div>
        <div class="profile-detail"><div class="label">Investor Since</div><div class="value">${u.since}</div></div>
        <div class="profile-detail"><div class="label">Risk Profile</div><div class="value"><span class="risk-badge">${u.riskProfile}</span></div></div>
        <div class="profile-detail"><div class="label">Total Invested</div><div class="value">${u.totalInvested}</div></div>
        <div class="profile-detail"><div class="label">Total Returns</div><div class="value">${u.totalReturns}</div></div>
    `);
}

function renderQuickActions() {
  $("#quick-actions").html(`
        <h4>Quick Actions</h4>
        <button class="action-btn" onclick="alert('Deposit flow would open here')"><i data-lucide="plus-circle" style="width: 18px"></i> Add Funds</button>
        <button class="action-btn" onclick="alert('Withdrawal flow would open here')"><i data-lucide="minus-circle" style="width: 18px"></i> Withdraw Funds</button>
        <button class="action-btn" onclick="alert('Document upload would open here')"><i data-lucide="file-text" style="width: 18px"></i> Upload Documents</button>
        <button class="action-btn" onclick="alert('Schedule meeting would open here')"><i data-lucide="calendar" style="width: 18px"></i> Schedule Review</button>
    `);
}

function renderDashboardFunds() {
  const featuredFunds = shadcnData.funds.slice(0, 3);
  $("#dashboard-funds-grid").html(
    featuredFunds
      .map(
        (f) => `
        <div class="fund-card" data-fund-id="${f.id}">
            <h4>${f.name}</h4>
            <p>${f.category}</p>
            <div class="fund-metrics"><span>${f.commitment}</span><span>${f.return}</span></div>
        </div>
    `,
      )
      .join(""),
  );
}

function renderAllFunds() {
  $("#all-funds-grid").html(
    shadcnData.funds
      .map(
        (f) => `
        <div class="fund-card" data-fund-id="${f.id}">
            <h4>${f.name}</h4>
            <p>${f.category}</p>
            <div class="fund-metrics"><span>${f.commitment}</span><span>${f.return}</span></div>
        </div>
    `,
      )
      .join(""),
  );
}

function renderTransactionsTable() {
  $("#transactions-table-body").html(
    shadcnData.recentTransactions
      .map(
        (t) => `
        <tr><td>${t.date}</td><td>${t.description}</td><td>${t.type}</td><td>${t.amount}</td><td><span class="status-badge completed">${t.status}</span></td></tr>
    `,
      )
      .join(""),
  );
}

function renderMilestonesTable() {
  $("#milestones-table-body").html(
    shadcnData.upcomingMilestones
      .map(
        (m) => `
        <tr><td>${m.project}</td><td>${m.milestone}</td><td>${m.date}</td><td><span class="status-badge pending">${m.status}</span></td></tr>
    `,
      )
      .join(""),
  );
}

function renderTransactions() {
  $("#transactions-tbody").html(
    shadcnData.recentTransactions
      .map(
        (t) => `
        <tr>
            <td>${t.date}</td>
            <td>${t.description}</td>
            <td><span class="transaction-type ${t.type.toLowerCase()}">${t.type}</span></td>
            <td class="${t.amount.includes("-") ? "amount-negative" : "amount-positive"}">${t.amount}</td>
            <td><span class="status-badge completed">${t.status}</span></td>
        </tr>
    `,
      )
      .join(""),
  );
}

// Opportunity and Timeline functions
function showOpportunities(fundId) {
  currentFundId = fundId;
  const opps = shadcnData.opportunities[fundId] || [];
  const fundName = shadcnData.funds.find((f) => f.id === fundId).name;
  $("#opp-header").html(`<h3>${fundName} - Investment Opportunities</h3>`);
  $("#opp-list-container").html(
    opps
      .map(
        (o) => `
        <div class="opportunity-card" data-opp-id="${o.id}">
            <strong>${o.name}</strong><p>${o.description}</p>
            <div>Target Return: ${o.targetReturn} | Timeline: ${o.timeline} | <span class="status-badge ${o.status.toLowerCase().replace(" ", "-")}">${o.status}</span></div>
        </div>
    `,
      )
      .join(""),
  );
  showView("opportunities");
}

function showTimeline(oppId) {
  const timeline =
    shadcnData.timelineData[oppId] || shadcnData.timelineData[101];
  $("#timeline-header").html(`<h3>${timeline.title} - Project Timeline</h3>`);
  $("#timeline-list-container").html(
    timeline.milestones
      .map(
        (m) => `
        <div class="timeline-item">
            <div class="timeline-dot ${m.status}"></div>
            <div><strong>${m.name}</strong><div>${m.date}</div><span class="status-badge ${m.status}">${m.status}</span></div>
        </div>
    `,
      )
      .join(""),
  );
  showView("timeline");
}

function backToFunds() {
  showView("funds");
}
function backToOpportunities() {
  showView("opportunities");
}

// Mail render functions
function renderMailList() {
  const mails = shadcnData.mail.inbox;
  const unreadCount = mails.filter((m) => !m.read).length;
  $("#mail-unread-count").text(unreadCount);
  $("#mail-list-container").html(
    mails
      .map(
        (mail) => `
        <div class="mail-item ${!mail.read ? "unread" : ""}" data-mail-id="${mail.id}" data-priority="${mail.priority}">
            <div class="mail-checkbox"><input type="checkbox" class="mail-select"></div>
            <div class="mail-star"><i data-lucide="star" class="star-icon ${mail.priority === "high" ? "starred" : ""}" style="width: 14px;"></i></div>
            <div class="mail-from">${!mail.read ? "● " : ""}${mail.from}</div>
            <div class="mail-subject">${mail.subject}</div>
            <div class="mail-date">${mail.date.split("-").slice(1).join("/")}</div>
        </div>
    `,
      )
      .join(""),
  );
  lucide.createIcons();
}

function renderMailDetail(mailId) {
  const mail = shadcnData.mail.inbox.find((m) => m.id === mailId);
  if (!mail) return;
  mail.read = true;
  renderMailList();
  $("#mail-detail-container").html(`
        <div class="mail-detail-header">
            <button class="back-to-inbox-btn" id="backToInboxBtn"><i data-lucide="arrow-left" style="width: 16px;"></i> Back to Inbox</button>
            <div class="mail-detail-actions">
                <button class="mail-action-btn" onclick="alert('Reply to ${mail.from}')"><i data-lucide="reply" style="width: 14px;"></i> Reply</button>
                <button class="mail-action-btn" onclick="alert('Forward this email')"><i data-lucide="forward" style="width: 14px;"></i> Forward</button>
                <button class="mail-action-btn" onclick="alert('Delete this email')"><i数据-lucide="trash-2" style="width: 14px;"></i> Delete</button>
            </div>
        </div>
        <div class="mail-detail-subject">${mail.subject}</div>
        <div class="mail-detail-meta">
            <div class="mail-detail-from"><strong>${mail.from}</strong> <${mail.email}></div>
            <div class="mail-detail-date">${mail.date} at ${mail.time}</div>
        </div>
        <div class="mail-detail-message"><p>${mail.message}</p></div>
    `);
  lucide.createIcons();
  $("#mail-list-view").hide();
  $("#mail-detail-view").show();
}

function showMailView() {
  showView("mail");
  $(".shadcn-nav-item").removeClass("active");
  $('.shadcn-nav-item[data-view="mail"]').addClass("active");
  renderMailList();
  $("#mail-list-view").show();
  $("#mail-detail-view").hide();
}

function backToMailList() {
  $("#mail-detail-view").hide();
  $("#mail-list-view").show();
  renderMailList();
}

// Offerings functions
function renderOfferings() {
  let filtered = [...offeringsData.offerings];
  if (currentOfferingFilter !== "all") {
    filtered = filtered.filter(
      (o) => o.category.toLowerCase() === currentOfferingFilter.toLowerCase(),
    );
  }
  if (currentOfferingSearch) {
    filtered = filtered.filter(
      (o) =>
        o.name.toLowerCase().includes(currentOfferingSearch.toLowerCase()) ||
        o.type.toLowerCase().includes(currentOfferingSearch.toLowerCase()),
    );
  }
  const stats = {
    total: filtered.length,
    open: filtered.filter((o) => o.status === "Open").length,
    limited: filtered.filter((o) => o.status === "Limited").length,
    comingSoon: filtered.filter((o) => o.status === "Coming Soon").length,
  };
  $("#offerings-stats").html(
    `Showing ${stats.total} offerings · ${stats.open} Open · ${stats.limited} Limited · ${stats.comingSoon} Coming Soon`,
  );
  $("#offerings-table-body").html(
    filtered
      .map(
        (o) => `
        <tr data-offering-id="${o.id}" onclick="openOfferingModal(${o.id})">
            <td><strong>${o.name}</strong><br><small class="category-badge category-${o.category.toLowerCase().replace(/ /g, "-")}">${o.category}</small></td>
            <td>${o.type}</td>
            <td>${o.minInvestment}</td>
            <td>${o.targetReturn}</td>
            <td>${o.term}</td>
            <td>${o.location}</td>
            <td><span class="status-badge-offering status-${o.status.toLowerCase().replace(/ /g, "-")}">${o.status}</span></td>
        </tr>
    `,
      )
      .join(""),
  );
}

function openOfferingModal(offeringId) {
  const offering = offeringsData.offerings.find((o) => o.id === offeringId);
  if (!offering) return;
  const content = `
        <div class="modal-section">
            <div class="modal-section-title">Offering Details</div>
            <div class="modal-info-row"><span class="modal-info-label">Name</span><span class="modal-info-value">${offering.name}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Category</span><span class="modal-info-value">${offering.category}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Type</span><span class="modal-info-value">${offering.type}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Status</span><span class="modal-info-value"><span class="status-badge-offering status-${offering.status.toLowerCase().replace(/ /g, "-")}">${offering.status}</span></span></div>
            <div class="modal-info-row"><span class="modal-info-label">Min Investment</span><span class="modal-info-value">${offering.minInvestment}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Target Return</span><span class="modal-info-value">${offering.targetReturn}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Term</span><span class="modal-info-value">${offering.term}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Location</span><span class="modal-info-value">${offering.location}</span></div>
        </div>
        <div class="modal-actions">
            <button class="modal-btn modal-btn-primary" onclick="alert('Invest in ${offering.name}')">Invest Now</button>
            <button class="modal-btn modal-btn-secondary" onclick="closeModal()">Close</button>
        </div>
    `;
  openModal(offering.name, content);
}

function filterOfferings(category) {
  currentOfferingFilter = category;
  renderOfferings();
}

function searchOfferings() {
  currentOfferingSearch = $("#offerings-search").val();
  renderOfferings();
}

function resetOfferingsFilter() {
  currentOfferingFilter = "all";
  currentOfferingSearch = "";
  $("#category-filter").val("all");
  $("#offerings-search").val("");
  renderOfferings();
}

function showOfferingsView() {
  showView("offerings");
  $(".shadcn-nav-item").removeClass("active");
  $('.shadcn-nav-item[data-view="offerings"]').addClass("active");
  renderOfferings();
}

// Initialize dashboard
$(document).ready(function () {
  renderStats();
  renderProfile();
  renderQuickActions();
  renderDashboardFunds();
  renderAllFunds();
  renderTransactionsTable();
  renderMilestonesTable();
  renderTransactions();

  // Event handlers - Fund card clicks
  $(document).on("click", ".fund-card", function () {
    const fundId = parseInt($(this).data("fund-id"));
    openFundModal(fundId);
  });

  // Table row clicks - Transactions
  $(document).on("click", "#transactions-table-body tr", function () {
    const cells = $(this).find("td");
    const description = $(cells[1]).text();
    const amount = $(cells[3]).text();
    const date = $(cells[0]).text();
    openTransactionModal(description, amount, date);
  });

  // Table row clicks - Milestones
  $(document).on("click", "#milestones-table-body tr", function () {
    const cells = $(this).find("td");
    const project = $(cells[0]).text();
    const milestone = $(cells[1]).text();
    const date = $(cells[2]).text();
    const status = $(cells[3]).text();
    openMilestoneModal(project, milestone, date, status);
  });

  // Opportunity card clicks
  $(document).on("click", ".opportunity-card", function () {
    const oppId = parseInt($(this).data("opp-id"));
    showTimeline(oppId);
  });

  // Mail item clicks
  $(document).on("click", ".mail-item", function (e) {
    if ($(e.target).hasClass("mail-select")) return;
    const mailId = parseInt($(this).data("mail-id"));
    selectedMailId = mailId;
    renderMailDetail(mailId);
  });

  // Back buttons
  $("#back-to-funds-btn").on("click", backToFunds);
  $("#back-to-opp-btn").on("click", backToOpportunities);
  $(document).on("click", "#backToInboxBtn", backToMailList);

  // Modal close
  $("#closeModalBtn, #modalOverlay").on("click", closeModal);
  $(".modal-container").on("click", function (e) {
    e.stopPropagation();
  });

  // Navigation - INCLUDING OFFERINGS
  $(".shadcn-nav-item").on("click", function () {
    const view = $(this).data("view");
    if (view === "dashboard") {
      renderDashboardFunds();
      showView("dashboard");
    } else if (view === "funds") {
      renderAllFunds();
      showView("funds");
    } else if (view === "offerings") {
      showOfferingsView();
    } else if (view === "mail") {
      showMailView();
    } else if (view === "wallet") {
      renderTransactions();
      showView("wallet");
    }
  });

  lucide.createIcons();
});

// Make functions global for onclick
window.closeModal = closeModal;
window.openOfferingModal = openOfferingModal;
window.filterOfferings = filterOfferings;
window.searchOfferings = searchOfferings;
window.resetOfferingsFilter = resetOfferingsFilter;
