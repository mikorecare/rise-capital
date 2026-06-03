// bootstrap-dashboard.js - Classic VB style dashboard logic

let currentFundId = null;

// Modal functions
function openModal(title, content) {
  $("#modalTitle").text(title);
  $("#modalBody").html(content);
  $("#modalOverlay").addClass("active");
}

function closeModal() {
  $("#modalOverlay").removeClass("active");
}

function openFundModal(fundId) {
  const fund = bootstrapData.funds.find((f) => f.id === fundId);
  if (!fund) return;

  const content = `
        <div class="modal-section">
            <div class="modal-section-title">Fund Overview</div>
            <div class="modal-info-row"><span class="modal-info-label">Name</span><span class="modal-info-value">${fund.name}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Category</span><span class="modal-info-value">${fund.category}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Status</span><span class="modal-info-value">${fund.status}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Vintage</span><span class="modal-info-value">${fund.vintage}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Term</span><span class="modal-info-value">${fund.term}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Min Investment</span><span class="modal-info-value">${fund.minInvestment}</span></div>
        </div>
        <div class="modal-section">
            <div class="modal-section-title">Key Metrics</div>
            <div class="modal-info-row"><span class="modal-info-label">Commitment</span><span class="modal-info-value">${fund.commitment}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Target Return</span><span class="modal-info-value">${fund.return}</span></div>
        </div>
        <div class="modal-actions">
            <button class="modal-btn modal-btn-primary" onclick="alert('Invest in ${fund.name}')">Invest</button>
            <button class="modal-btn modal-btn-secondary" onclick="closeModal()">Close</button>
        </div>
    `;
  openModal(fund.name, content);
}

function openTransactionModal(description, amount, date, type) {
  const content = `
        <div class="modal-section">
            <div class="modal-info-row"><span class="modal-info-label">Date</span><span class="modal-info-value">${date}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Description</span><span class="modal-info-value">${description}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Amount</span><span class="modal-info-value">${type === "deposit" ? "+" : "-"}$${Math.abs(amount).toLocaleString()}</span></div>
            <div class="modal-info-row"><span class="modal-info-label">Status</span><span class="modal-info-value">Completed</span></div>
        </div>
        <div class="modal-actions">
            <button class="modal-btn modal-btn-primary" onclick="alert('Download receipt')">Receipt</button>
            <button class="modal-btn modal-btn-secondary" onclick="closeModal()">Close</button>
        </div>
    `;
  openModal("Transaction Details", content);
}

// View management
function showView(viewName) {
  $(".view-container").removeClass("active-view");
  $(`#${viewName}-view`).addClass("active-view");

  $(".bootstrap-sidebar-menu").removeClass("active");
  const navView =
    viewName === "opportunities" || viewName === "timeline"
      ? "funds"
      : viewName;
  $(`.bootstrap-sidebar-menu[data-view="${navView}"]`).addClass("active");
}

// Render functions
function renderDashboardFunds() {
  const featuredFunds = bootstrapData.funds.slice(0, 4);
  $("#dashboard-funds-grid").html(
    featuredFunds
      .map(
        (f) => `
        <div class="bootstrap-fund-card" data-fund-id="${f.id}">
            <h4>${f.name}</h4>
            <p>${f.category}</p>
            <div class="bootstrap-fund-metrics">
                <span>${f.commitment}</span>
                <span>${f.return}</span>
            </div>
        </div>
    `,
      )
      .join(""),
  );
}

function renderAllFunds() {
  $("#all-funds-grid").html(
    bootstrapData.funds
      .map(
        (f) => `
        <div class="bootstrap-fund-card" data-fund-id="${f.id}">
            <h4>${f.name}</h4>
            <p>${f.category}</p>
            <div class="bootstrap-fund-metrics">
                <span>${f.commitment}</span>
                <span>${f.return}</span>
            </div>
        </div>
    `,
      )
      .join(""),
  );
}

function renderTransactions() {
  $("#transactions-tbody").html(
    bootstrapData.transactions
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
  const opps = bootstrapData.opportunities[fundId] || [];
  const fundName = bootstrapData.funds.find((f) => f.id === fundId).name;
  $("#opp-header").html(`<h5>${fundName} - Opportunities</h5>`);
  $("#opp-list-container").html(
    opps
      .map(
        (o) => `
        <div class="opportunity-card" data-opp-id="${o.id}">
            <strong>${o.name}</strong><p>${o.description}</p>
            <div>Target: ${o.targetReturn} | Timeline: ${o.timeline} | <span class="status-badge status-${o.status.toLowerCase().replace(" ", "-")}">${o.status}</span></div>
        </div>
    `,
      )
      .join(""),
  );
  showView("opportunities");
}

function showTimeline(oppId) {
  const timeline =
    bootstrapData.timelineData[oppId] || bootstrapData.timelineData[101];
  $("#timeline-header").html(`<h5>${timeline.title} - Timeline</h5>`);
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

// Initialize dashboard
$(document).ready(function () {
  renderDashboardFunds();
  renderAllFunds();
  renderTransactions();

  // Fund card clicks
  $(document).on("click", ".bootstrap-fund-card", function () {
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
  $(document).on("click", ".opportunity-card", function () {
    const oppId = parseInt($(this).data("opp-id"));
    showTimeline(oppId);
  });

  // Back buttons
  $("#back-to-funds-btn").on("click", backToFunds);
  $("#back-to-opp-btn").on("click", backToOpportunities);

  // Modal close
  $("#closeModalBtn, #modalOverlay").on("click", closeModal);
  $(".modal-container").on("click", function (e) {
    e.stopPropagation();
  });

  // Navigation
  $(".bootstrap-sidebar-menu").on("click", function () {
    const view = $(this).data("view");
    if (view === "dashboard") {
      renderDashboardFunds();
      showView("dashboard");
    } else if (view === "funds") {
      renderAllFunds();
      showView("funds");
    } else if (view === "wallet") {
      renderTransactions();
      showView("wallet");
    }
  });

  lucide.createIcons();
});

window.closeModal = closeModal;
