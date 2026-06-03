// azure-dashboard.js - Main Azure dashboard logic

let currentFundId = null;
let selectedMailId = null;

// Drawer functions
function openDrawer(title, content) {
  $("#drawerTitle").text(title);
  $("#drawerContent").html(content);
  $("#drawerOverlay").addClass("active");
  $("#fundDrawer").addClass("open");
  lucide.createIcons();
}

function closeDrawer() {
  $("#drawerOverlay").removeClass("active");
  $("#fundDrawer").removeClass("open");
}

function openFundDrawer(fundId) {
  const fund = azureData.funds.find((f) => f.id === fundId);
  if (!fund) return;

  const content = `
        <div class="drawer-section">
            <div class="drawer-section-title">Fund Overview</div>
            <div class="drawer-info-row"><span class="drawer-info-label">Fund Name</span><span class="drawer-info-value">${fund.name}</span></div>
            <div class="drawer-info-row"><span class="drawer-info-label">Category</span><span class="drawer-info-value">${fund.category}</span></div>
            <div class="drawer-info-row"><span class="drawer-info-label">Status</span><span class="drawer-info-value"><span class="fund-status ${fund.status.toLowerCase().replace(" ", "-")}">${fund.status}</span></span></div>
            <div class="drawer-info-row"><span class="drawer-info-label">Vintage Year</span><span class="drawer-info-value">${fund.vintage}</span></div>
            <div class="drawer-info-row"><span class="drawer-info-label">Term</span><span class="drawer-info-value">${fund.term}</span></div>
            <div class="drawer-info-row"><span class="drawer-info-label">Minimum Investment</span><span class="drawer-info-value">${fund.minInvestment}</span></div>
            <div class="drawer-info-row"><span class="drawer-info-label">Geographic Focus</span><span class="drawer-info-value">${fund.location}</span></div>
        </div>
        <div class="drawer-section">
            <div class="drawer-section-title">Key Metrics</div>
            <div class="drawer-metrics">
                <div class="drawer-metric-card"><div class="drawer-metric-value">${fund.commitment}</div><div class="drawer-metric-label">Total Commitment</div></div>
                <div class="drawer-metric-card"><div class="drawer-metric-value">${fund.return}</div><div class="drawer-metric-label">Target Return (IRR)</div></div>
            </div>
        </div>
        <div class="drawer-section">
            <div class="drawer-section-title">Description</div>
            <p style="font-size: 13px; line-height: 1.5; color: var(--theme-text-secondary, #5c5e63);">${fund.description}</p>
        </div>
        <div class="drawer-actions">
            <button class="drawer-btn drawer-btn-primary" onclick="alert('Invest in ${fund.name}')">Invest Now</button>
            <button class="drawer-btn drawer-btn-secondary" onclick="closeDrawer()">Close</button>
        </div>
    `;
  openDrawer(fund.name, content);
}

function openTransactionDrawer(description, amount, date) {
  const content = `
        <div class="drawer-section">
            <div class="drawer-section-title">Transaction Details</div>
            <div class="drawer-info-row"><span class="drawer-info-label">Date</span><span class="drawer-info-value">${date}</span></div>
            <div class="drawer-info-row"><span class="drawer-info-label">Description</span><span class="drawer-info-value">${description}</span></div>
            <div class="drawer-info-row"><span class="drawer-info-label">Amount</span><span class="drawer-info-value">${amount}</span></div>
            <div class="drawer-info-row"><span class="drawer-info-label">Status</span><span class="drawer-info-value"><span class="status-badge completed">Completed</span></span></div>
        </div>
        <div class="drawer-actions">
            <button class="drawer-btn drawer-btn-primary" onclick="alert('Download receipt')">Download Receipt</button>
            <button class="drawer-btn drawer-btn-secondary" onclick="closeDrawer()">Close</button>
        </div>
    `;
  openDrawer("Transaction Details", content);
}

function openMilestoneDrawer(project, milestone, date, status) {
  const content = `
        <div class="drawer-section">
            <div class="drawer-section-title">Milestone Information</div>
            <div class="drawer-info-row"><span class="drawer-info-label">Project</span><span class="drawer-info-value">${project}</span></div>
            <div class="drawer-info-row"><span class="drawer-info-label">Milestone</span><span class="drawer-info-value">${milestone}</span></div>
            <div class="drawer-info-row"><span class="drawer-info-label">Expected Date</span><span class="drawer-info-value">${date}</span></div>
            <div class="drawer-info-row"><span class="drawer-info-label">Status</span><span class="drawer-info-value"><span class="status-badge pending">${status}</span></span></div>
        </div>
        <div class="drawer-actions">
            <button class="drawer-btn drawer-btn-primary" onclick="alert('Track this milestone')">Track Progress</button>
            <button class="drawer-btn drawer-btn-secondary" onclick="closeDrawer()">Close</button>
        </div>
    `;
  openDrawer(`${project} - Milestone Details`, content);
}

// View management
function showView(viewName) {
  $(".view-container").removeClass("active-view");
  $(`#${viewName}-view`).addClass("active-view");

  $(".azure-nav-item").removeClass("active");
  const navView =
    viewName === "opportunities" || viewName === "timeline"
      ? "investments"
      : viewName;
  $(`.azure-nav-item[data-view="${navView}"]`).addClass("active");
}

function showDashboard() {
  showView("dashboard");
}

function showInvestments() {
  showView("investments");
  renderAllFunds();
}

function showWallet() {
  showView("wallet");
  renderWalletTransactions();
}

// Mail functions
function renderMailList() {
  const mails = azureData.mail.inbox;
  const unreadCount = mails.filter((m) => !m.read).length;
  $("#mail-unread-count").text(unreadCount);

  $("#azure-mail-list-container").html(
    mails
      .map(
        (mail) => `
        <div class="azure-mail-item ${!mail.read ? "unread" : ""}" data-mail-id="${mail.id}">
            <div class="azure-mail-checkbox"><input type="checkbox" class="mail-select"></div>
            <div class="azure-mail-star"><i data-lucide="star" class="azure-star-icon ${mail.priority === "high" ? "starred" : ""}" style="width: 14px;"></i></div>
            <div class="azure-mail-from">${!mail.read ? "● " : ""}${mail.from}</div>
            <div class="azure-mail-subject">${mail.subject}</div>
            <div class="azure-mail-date">${mail.date.split("-").slice(1).join("/")}</div>
        </div>
    `,
      )
      .join(""),
  );
  lucide.createIcons();
}

function renderMailDetail(mailId) {
  const mail = azureData.mail.inbox.find((m) => m.id === mailId);
  if (!mail) return;

  mail.read = true;
  renderMailList();

  $("#azure-mail-detail-container").html(`
        <div class="azure-mail-detail-header">
            <button class="azure-back-to-inbox" id="backToInboxBtn"><i data-lucide="arrow-left" style="width: 14px;"></i> Back to Inbox</button>
            <div class="azure-mail-detail-actions">
                <button class="azure-mail-toolbar-btn" onclick="alert('Reply to ${mail.from}')"><i data-lucide="reply" style="width: 14px;"></i> Reply</button>
                <button class="azure-mail-toolbar-btn" onclick="alert('Forward this email')"><i data-lucide="forward" style="width: 14px;"></i> Forward</button>
                <button class="azure-mail-toolbar-btn" onclick="alert('Delete this email')"><i data-lucide="trash-2" style="width: 14px;"></i> Delete</button>
            </div>
        </div>
        <div class="azure-mail-detail-subject">${mail.subject}</div>
        <div class="azure-mail-detail-meta">
            <div class="azure-mail-detail-from"><strong>${mail.from}</strong> &lt;${mail.email}&gt;</div>
            <div class="azure-mail-detail-date">${mail.date} at ${mail.time}</div>
        </div>
        <div class="azure-mail-detail-message"><p>${mail.message}</p></div>
    `);
  lucide.createIcons();

  $("#azure-mail-list-view").hide();
  $("#azure-mail-detail-view").show();
}

function showMailView() {
  showView("mail");
  renderMailList();
  $("#azure-mail-list-view").show();
  $("#azure-mail-detail-view").hide();
}

function backToMailList() {
  $("#azure-mail-detail-view").hide();
  $("#azure-mail-list-view").show();
  renderMailList();
}

// Render functions
function renderDashboardFunds() {
  const featuredFunds = azureData.funds.slice(0, 4);
  $("#dashboard-funds-grid").html(
    featuredFunds
      .map(
        (f) => `
        <div class="fund-card" data-fund-id="${f.id}">
            <h4>${f.name}</h4>
            <p>${f.category}</p>
            <div class="fund-metrics">
                <span>${f.commitment}</span>
                <span>${f.return}</span>
            </div>
            <div class="fund-status ${f.status.toLowerCase().replace(" ", "-")}">${f.status}</div>
        </div>
    `,
      )
      .join(""),
  );
}

function renderAllFunds() {
  $("#all-funds-grid").html(
    azureData.funds
      .map(
        (f) => `
        <div class="fund-card" data-fund-id="${f.id}">
            <h4>${f.name}</h4>
            <p>${f.category}</p>
            <div class="fund-metrics">
                <span>${f.commitment}</span>
                <span>${f.return}</span>
            </div>
            <div class="fund-status ${f.status.toLowerCase().replace(" ", "-")}">${f.status}</div>
        </div>
    `,
      )
      .join(""),
  );
}

function renderTransactionsTable() {
  $("#transactions-table-body").html(
    azureData.recentTransactions
      .map(
        (t) => `
        <tr>
            <td>${t.date}${"<"}/td>
            <td>${t.description}${"<"}/td>
            <td>${t.type}${"<"}/td>
            <td>${t.amount}${"<"}/td>
            <td><span class="status-badge completed">${t.status}</span>${"<"}/td>
        </tr>
    `,
      )
      .join(""),
  );
}

function renderMilestonesTable() {
  $("#milestones-table-body").html(
    azureData.upcomingMilestones
      .map(
        (m) => `
        <tr>
            <td>${m.project}${"<"}/td>
            <td>${m.milestone}${"<"}/td>
            <td>${m.date}${"<"}/td>
            <td><span class="status-badge pending">${m.status}</span>${"<"}/td>
        </tr>
    `,
      )
      .join(""),
  );
}

function renderWalletTransactions() {
  $("#wallet-transactions-body").html(
    azureData.recentTransactions
      .map(
        (t) => `
        <tr>
            <td>${t.date}${"<"}/td>
            <td>${t.description}${"<"}/td>
            <td>${t.type}${"<"}/td>
            <td>${t.amount}${"<"}/td>
            <td><span class="status-badge completed">${t.status}</span>${"<"}/td>
        </tr>
    `,
      )
      .join(""),
  );
}

// Opportunity and Timeline functions
function showOpportunities(fundId) {
  currentFundId = fundId;
  const opps = azureData.opportunities[fundId] || [];
  const fundName = azureData.funds.find((f) => f.id === fundId).name;
  $("#opp-header").html(
    `<h4 style="margin-bottom: 16px;">${fundName} - Investment Opportunities</h4>`,
  );
  $("#opp-list-container").html(
    opps
      .map(
        (o) => `
        <div class="opportunity-card" data-opp-id="${o.id}">
            <strong>${o.name}</strong>
            <p>${o.description}</p>
            <div>Target Return: ${o.targetReturn} | Timeline: ${o.timeline} | <span class="status-badge status-${o.status.toLowerCase().replace(" ", "-")}">${o.status}</span></div>
        </div>
    `,
      )
      .join(""),
  );
  $("#investments-view").hide();
  $("#opportunities-view").show();
}

function showTimeline(oppId) {
  const timeline = azureData.timelineData[oppId] || azureData.timelineData[101];
  $("#timeline-header").html(
    `<h4 style="margin-bottom: 16px;">${timeline.title} - Project Timeline</h4>`,
  );
  $("#timeline-list-container").html(
    timeline.milestones
      .map(
        (m) => `
        <div class="timeline-item">
            <div class="timeline-dot ${m.status}"></div>
            <div>
                <strong>${m.name}</strong>
                <div style="font-size: 12px; color: #5c5e63; margin: 4px 0;">${m.date}</div>
                <span class="status-badge ${m.status}">${m.status}</span>
            </div>
        </div>
    `,
      )
      .join(""),
  );
  $("#opportunities-view").hide();
  $("#timeline-view").show();
}

function backToInvestments() {
  $("#opportunities-view").hide();
  $("#timeline-view").hide();
  $("#investments-view").show();
}

function backToOpportunities() {
  $("#timeline-view").hide();
  $("#opportunities-view").show();
}

// Event handlers
$(document).ready(function () {
  renderDashboardFunds();
  renderTransactionsTable();
  renderMilestonesTable();

  // Fund card clicks - Open drawer
  $(document).on("click", ".fund-card", function () {
    const fundId = parseInt($(this).data("fund-id"));
    openFundDrawer(fundId);
  });

  // Transaction row clicks
  $(document).on("click", "#transactions-table-body tr", function () {
    const cells = $(this).find("td");
    const description = $(cells[1]).text();
    const amount = $(cells[3]).text();
    const date = $(cells[0]).text();
    openTransactionDrawer(description, amount, date);
  });

  // Milestone row clicks
  $(document).on("click", "#milestones-table-body tr", function () {
    const cells = $(this).find("td");
    const project = $(cells[0]).text();
    const milestone = $(cells[1]).text();
    const date = $(cells[2]).text();
    const status = $(cells[3]).text();
    openMilestoneDrawer(project, milestone, date, status);
  });

  // Mail item clicks
  $(document).on("click", ".azure-mail-item", function (e) {
    if ($(e.target).hasClass("mail-select")) return;
    const mailId = parseInt($(this).data("mail-id"));
    renderMailDetail(mailId);
  });

  $(document).on("click", "#backToInboxBtn", backToMailList);

  // Opportunity card clicks
  $(document).on("click", ".opportunity-card", function () {
    const oppId = parseInt($(this).data("opp-id"));
    showTimeline(oppId);
  });

  // Back buttons
  $("#back-to-investments-btn").on("click", backToInvestments);
  $("#back-to-opp-btn").on("click", backToOpportunities);

  // Drawer close
  $("#closeDrawerBtn, #drawerOverlay").on("click", closeDrawer);
  $(".drawer").on("click", function (e) {
    e.stopPropagation();
  });

  // Navigation - includes mail
  $(".azure-nav-item").on("click", function () {
    const view = $(this).data("view");
    if (view === "dashboard") showDashboard();
    else if (view === "investments") showInvestments();
    else if (view === "mail") showMailView();
    else if (view === "wallet") showWallet();
  });

  $('[data-view="investments"]').on("click", function (e) {
    e.preventDefault();
    showInvestments();
  });

  lucide.createIcons();
});

// Make functions global
window.showDashboard = showDashboard;
window.closeDrawer = closeDrawer;
window.showMailView = showMailView;
window.backToMailList = backToMailList;
