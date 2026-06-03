let currentFundId = null;
let selectedMailId = null;

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
  const fund = awsData.funds.find((f) => f.id === fundId);
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
            <p style="font-size: 0.8rem; line-height: 1.5; color: var(--theme-text-secondary, #8796a8);">${fund.description}</p>
        </div>
        <div class="modal-actions">
            <button class="modal-btn modal-btn-primary" onclick="alert('Invest in ${fund.name}')">Invest Now</button>
            <button class="modal-btn modal-btn-secondary" onclick="closeModal()">Close</button>
        </div>
    `;
  openModal(fund.name, content);
}

function openTransactionModal(description, amount, date, type) {
  const content = `
        <div class="modal-section">
            <div class="modal-section-title">Transaction Details</div>
            <div class="modal-info-row"><span class="modal-info-label">Date</span><span class="modal-info-value">${date}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Description</span><span class="modal-info-value">${description}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Amount</span><span class="modal-info-value">${type === "deposit" ? "+" : "-"}$${Math.abs(amount).toLocaleString()}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Status</span><span class="modal-info-value"><span class="status-badge completed">Completed</span></span></div>
        </div>
        <div class="modal-section">
            <div class="modal-section-title">Reference Information</div>
            <p style="font-size: 0.8rem; line-height: 1.5; color: var(--theme-text-secondary, #8796a8);">Transaction ID: TXN-${Math.floor(Math.random() * 100000)}<br>This transaction has been processed and confirmed.</p>
        </div>
        <div class="modal-actions">
            <button class="modal-btn modal-btn-primary" onclick="alert('Download receipt')">Download Receipt</button>
            <button class="modal-btn modal-btn-secondary" onclick="closeModal()">Close</button>
        </div>
    `;
  openModal("Transaction Details", content);
}

// View management
function showView(viewName) {
  $(".view-container").removeClass("active-view");
  $(`#${viewName}-view`).addClass("active-view");

  $(".aws-nav-item").removeClass("active");
  const navView =
    viewName === "opportunities" || viewName === "timeline"
      ? "funds"
      : viewName;
  $(`.aws-nav-item[data-view="${navView}"]`).addClass("active");
  $(".aws-menu-item").removeClass("active");
  $(`.aws-menu-item[data-view="${navView}"]`).addClass("active");
}

function showDashboard() {
  renderDashboardFunds();
  showView("dashboard");
}

function showInvestments() {
  renderAllFunds();
  showView("funds");
}

function showWallet() {
  renderTransactions();
  showView("wallet");
}

function showMailView() {
  renderMailList();
  $("#aws-mail-list-view").show();
  $("#aws-mail-detail-view").hide();
  showView("mail");
}

// Mail functions
function renderMailList() {
  const mails = awsData.mail.inbox;
  const unreadCount = mails.filter((m) => !m.read).length;
  $("#mail-unread-count").text(unreadCount);

  $("#aws-mail-list-container").html(
    mails
      .map(
        (mail) => `
        <div class="aws-mail-item ${!mail.read ? "unread" : ""}" data-mail-id="${mail.id}">
            <div class="aws-mail-checkbox"><input type="checkbox" class="mail-select"></div>
            <div class="aws-mail-star"><i data-lucide="star" class="aws-star-icon ${mail.priority === "high" ? "starred" : ""}" style="width: 14px;"></i></div>
            <div class="aws-mail-from">${!mail.read ? "● " : ""}${mail.from}</div>
            <div class="aws-mail-subject">${mail.subject}</div>
            <div class="aws-mail-date">${mail.date.split("-").slice(1).join("/")}</div>
        </div>
    `,
      )
      .join(""),
  );
  lucide.createIcons();
}

function renderMailDetail(mailId) {
  const mail = awsData.mail.inbox.find((m) => m.id === mailId);
  if (!mail) return;

  mail.read = true;
  renderMailList();

  $("#aws-mail-detail-container").html(`
        <div class="aws-mail-detail-header">
            <button class="aws-back-to-inbox" id="backToInboxBtn"><i data-lucide="arrow-left" style="width: 14px;"></i> Back to Inbox</button>
            <div class="aws-mail-detail-actions">
                <button class="aws-mail-action-btn" onclick="alert('Reply to ${mail.from}')"><i data-lucide="reply" style="width: 14px;"></i> Reply</button>
                <button class="aws-mail-action-btn" onclick="alert('Forward this email')"><i data-lucide="forward" style="width: 14px;"></i> Forward</button>
                <button class="aws-mail-action-btn" onclick="alert('Delete this email')"><i data-lucide="trash-2" style="width: 14px;"></i> Delete</button>
            </div>
        </div>
        <div class="aws-mail-detail-subject">${mail.subject}</div>
        <div class="aws-mail-detail-meta">
            <div class="aws-mail-detail-from"><strong>${mail.from}</strong> &lt;${mail.email}&gt;</div>
            <div class="aws-mail-detail-date">${mail.date} at ${mail.time}</div>
        </div>
        <div class="aws-mail-detail-message"><p>${mail.message}</p></div>
    `);
  lucide.createIcons();

  $("#aws-mail-list-view").hide();
  $("#aws-mail-detail-view").show();
}

function backToMailList() {
  $("#aws-mail-detail-view").hide();
  $("#aws-mail-list-view").show();
  renderMailList();
}

// Render functions
function renderRecentlyVisited() {
  $("#recently-visited-list").html(
    awsData.recentlyVisited
      .map(
        (item) => `
        <div class="recent-item" onclick="alert('Viewing ${item}')">${item}</div>
    `,
      )
      .join(""),
  );
}

function renderQuickActions() {
  $("#quick-actions-list").html(
    awsData.quickActions
      .map(
        (action) => `
        <div class="quick-action-item" onclick="alert('${action.name}')">
            <i data-lucide="${action.icon}" style="width: 16px;"></i>
            <span><strong>${action.name}</strong><br><small>${action.action}</small></span>
        </div>
    `,
      )
      .join(""),
  );
}

function renderPortfolioHealth() {
  const health = awsData.portfolioHealth;
  $("#health-open-issues").text(health.openIssues);
  $("#health-scheduled-changes").text(health.scheduledChanges);
  $("#health-other-notifications").text(health.otherNotifications);
}

function renderCostAndUsage() {
  const cost = awsData.costAndUsage;
  $("#cost-current-month").text(cost.currentMonth);
  $("#cost-forecasted").text(cost.forecastedMonthEnd);
  $("#cost-forecast-trend").text(cost.forecastTrend);
  $("#cost-last-month").text(cost.lastMonth);
  $("#top-costs-list").html(
    cost.topCosts
      .map(
        (c) => `
        <div class="top-cost-item">${c.service} <span>${c.amount}</span></div>
    `,
      )
      .join(""),
  );
}

function renderTrustedAdvisor() {
  const ta = awsData.trustedAdvisor;
  $("#ta-action-recommended").text(ta.actionRecommended);
  $("#ta-investigation-recommended").text(ta.investigationRecommended);
  $("#ta-passed-items").text(ta.passedItems);
}

function renderDashboardFunds() {
  const featuredFunds = awsData.funds.slice(0, 4);
  $("#dashboard-funds-grid").html(
    featuredFunds
      .map(
        (f) => `
        <div class="aws-fund-card" data-fund-id="${f.id}">
            <h4>${f.name}</h4>
            <p>${f.category}</p>
            <div class="aws-fund-metrics"><span>${f.commitment}</span><span>${f.return}</span></div>
        </div>
    `,
      )
      .join(""),
  );
}

function renderAllFunds() {
  $("#all-funds-grid").html(
    awsData.funds
      .map(
        (f) => `
        <div class="aws-fund-card" data-fund-id="${f.id}">
            <h4>${f.name}</h4>
            <p>${f.category}</p>
            <div class="aws-fund-metrics"><span>${f.commitment}</span><span>${f.return}</span></div>
        </div>
    `,
      )
      .join(""),
  );
}

function renderTransactions() {
  $("#transactions-tbody").html(
    awsData.transactions
      .map(
        (t) => `
        <tr>
            <td>${t.date}${"<"}/td>
            <td>${t.description}${"<"}/td>
            <td><span class="transaction-type ${t.type}">${t.type}</span>${"<"}/td>
            <td class="${t.amount < 0 ? "amount-negative" : "amount-positive"}">${t.amount < 0 ? "-" : "+"}$${Math.abs(t.amount).toLocaleString()}${"<"}/td>
            <td><span class="status-badge ${t.status}">${t.status}</span>${"<"}/td>
        </tr>
    `,
      )
      .join(""),
  );
}

// Opportunity and Timeline functions
function showOpportunities(fundId) {
  currentFundId = fundId;
  const opps = awsData.opportunities[fundId] || [];
  const fundName = awsData.funds.find((f) => f.id === fundId).name;
  $("#opp-header").html(
    `<div class="aws-section-header">${fundName} - Investment Opportunities</div>`,
  );
  $("#opp-list-container").html(
    opps
      .map(
        (o) => `
        <div class="aws-opportunity-card" data-opp-id="${o.id}">
            <strong>${o.name}</strong><p>${o.description}</p>
            <div>Target Return: ${o.targetReturn} | Timeline: ${o.timeline} | <span class="status-badge status-${o.status.toLowerCase().replace(" ", "-")}">${o.status}</span></div>
        </div>
    `,
      )
      .join(""),
  );
  showView("opportunities");
}

function showTimeline(oppId) {
  const timeline = awsData.timelineData[oppId] || awsData.timelineData[101];
  $("#timeline-header").html(
    `<div class="aws-section-header">${timeline.title} - Project Timeline</div>`,
  );
  $("#timeline-list-container").html(
    timeline.milestones
      .map(
        (m) => `
        <div class="aws-timeline-item">
            <div class="aws-timeline-dot ${m.status}"></div>
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

// Initialize dashboard
$(document).ready(function () {
  renderRecentlyVisited();
  renderQuickActions();
  renderPortfolioHealth();
  renderCostAndUsage();
  renderTrustedAdvisor();
  renderDashboardFunds();
  renderAllFunds();
  renderTransactions();

  // Event handlers - Fund card clicks
  $(document).on("click", ".aws-fund-card", function () {
    const fundId = parseInt($(this).data("fund-id"));
    openFundModal(fundId);
  });

  // Transaction row clicks
  $(document).on("click", "#transactions-tbody tr", function () {
    const cells = $(this).find("td");
    const description = $(cells[1]).text();
    const amountText = $(cells[3]).text();
    const amount = parseFloat(amountText.replace(/[^0-9.-]/g, "")) || 0;
    const date = $(cells[0]).text();
    const type = $(cells[2]).text().toLowerCase();
    openTransactionModal(description, amount, date, type);
  });

  // Opportunity card clicks
  $(document).on("click", ".aws-opportunity-card", function () {
    const oppId = parseInt($(this).data("opp-id"));
    showTimeline(oppId);
  });

  // Mail item clicks
  $(document).on("click", ".aws-mail-item", function (e) {
    if ($(e.target).hasClass("mail-select")) return;
    const mailId = parseInt($(this).data("mail-id"));
    renderMailDetail(mailId);
  });

  $(document).on("click", "#backToInboxBtn", backToMailList);

  // Back buttons
  $("#back-to-funds-btn").on("click", backToFunds);
  $("#back-to-opp-btn").on("click", backToOpportunities);

  // Modal close
  $("#closeModalBtn, #modalOverlay").on("click", closeModal);
  $(".modal-container").on("click", function (e) {
    e.stopPropagation();
  });

  // Navigation - includes mail
  $(".aws-nav-item, .aws-menu-item").on("click", function () {
    const view = $(this).data("view");
    if (view === "dashboard") showDashboard();
    else if (view === "funds") showInvestments();
    else if (view === "mail") showMailView();
    else if (view === "wallet") showWallet();
  });

  lucide.createIcons();
});

// Make functions global for onclick
window.closeModal = closeModal;
window.backToMailList = backToMailList;
