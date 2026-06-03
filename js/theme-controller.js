// theme-controller.js - Works across parent and iframes
(function () {
  const themes = {
    default: {
      name: "Default Blue",
      css: {
        "bg-gradient-start": "#f8fafc",
        "bg-gradient-end": "#e2e8f0",
        "card-bg": "#ffffff",
        "text-primary": "#0f172a",
        "text-secondary": "#475569",
        "sidebar-bg": "#0f172a",
        "sidebar-text": "#e2e8f0",
        accent: "#3b82f6",
        "accent-hover": "#2563eb",
        border: "#e2e8f0",
        "status-completed": "#22c55e",
        "status-upcoming": "#64748b",
      },
    },
    aws: {
      name: "Modern Dark Yellow",
      css: {
        "bg-gradient-start": "#1a2b3e",
        "bg-gradient-end": "#1f2e40",
        "card-bg": "#2c3e50",
        "text-primary": "#ff9900",
        "text-secondary": "#94a3b8",
        "sidebar-bg": "#1a2b3e",
        "sidebar-text": "#e2e8f0",
        accent: "#ff9900",
        "accent-hover": "#ec7211",
        border: "#3b4a5c",
        "status-completed": "#ff9900",
        "status-upcoming": "#5a6e85",
      },
    },
    azure: {
      name: "Minimalist Blue",
      css: {
        "bg-gradient-start": "#ffffff",
        "bg-gradient-end": "#f0f4f9",
        "card-bg": "#ffffff",
        "text-primary": "#1f1f1f",
        "text-secondary": "#5c5e63",
        "sidebar-bg": "#f0f4f9",
        "sidebar-text": "#1f1f1f",
        accent: "#0078d4",
        "accent-hover": "#005a9e",
        border: "#e0e4e9",
        "status-completed": "#107c10",
        "status-upcoming": "#5c5e63",
      },
    },
    forest: {
      name: "Forest Green",
      css: {
        "bg-gradient-start": "#e8f5e9",
        "bg-gradient-end": "#c8e6c9",
        "card-bg": "#ffffff",
        "text-primary": "#1b5e20",
        "text-secondary": "#94bb96",
        "sidebar-bg": "#1b5e20",
        "sidebar-text": "#ffffff",
        accent: "#2e7d32",
        "accent-hover": "#1b5e20",
        border: "#a5d6a7",
        "status-completed": "#43a047",
        "status-upcoming": "#81c784",
      },
    },
    dark: {
      name: "Dark Mode",
      css: {
        "bg-gradient-start": "#0f0f1a",
        "bg-gradient-end": "#1a1a2e",
        "card-bg": "#16213e",
        "text-primary": "#8b5cf6",
        "text-secondary": "#94a3b8",
        "sidebar-bg": "#0a0f1c",
        "sidebar-text": "#cbd5e1",
        accent: "#8b5cf6",
        "accent-hover": "#7c3aed",
        border: "#1e293b",
        "status-completed": "#a855f7",
        "status-upcoming": "#64748b",
      },
    },
    ocean: {
      name: "Ocean Blue",
      css: {
        "bg-gradient-start": "#e0f2fe",
        "bg-gradient-end": "#bae6fd",
        "card-bg": "#ffffff",
        "text-primary": "#0369a1",
        "text-secondary": "#5fb9e6",
        "sidebar-bg": "#0369a1",
        "sidebar-text": "#ffffff",
        accent: "#0284c7",
        "accent-hover": "#0369a1",
        border: "#7dd3fc",
        "status-completed": "#0ea5e9",
        "status-upcoming": "#38bdf8",
      },
    },
    rise: {
      name: "Rise Capital",
      css: {
        "bg-gradient-start": "#000000",
        "bg-gradient-end": "#000000",
        "card-bg": "#0d0d0d",
        "text-primary": "#dea208",
        "text-secondary": "#f5efe8",
        "sidebar-bg": "#000000",
        "sidebar-text": "#dea208",
        accent: "#c28c03",
        "accent-hover": "#1b4d3e",
        border: "#e8e0d5",
        "status-completed": "#2d6a4f",
        "status-upcoming": "#9ca3af",
        "status-warning": "#d97706",
        "status-danger": "#dc2626",
      },
    },
  };

  let currentTheme = localStorage.getItem("riseCapitalTheme") || "default";

  window.applyTheme = function (themeKey) {
    const theme = themes[themeKey];
    if (!theme) return;

    const root = document.documentElement;

    for (const [key, value] of Object.entries(theme.css)) {
      root.style.setProperty(`--theme-${key}`, value);
    }

    localStorage.setItem("riseCapitalTheme", themeKey);
    currentTheme = themeKey;

    if (window.parent !== window) {
      window.parent.postMessage(
        {
          type: "themeChanged",
          theme: themeKey,
        },
        "*",
      );
    }
  };

  window.addEventListener("message", function (event) {
    if (event.data && event.data.type === "changeTheme") {
      window.applyTheme(event.data.theme);
    }
  });

  window.applyTheme(currentTheme);

  // Simple manual theme button injection
  window.initThemeButton = function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error("Container not found:", containerId);
      return;
    }

    container.innerHTML = "";

    // Create button
    const btn = document.createElement("div");
    btn.style.cssText =
      "width: 48px; height: 48px; background: var(--theme-accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 0 12px var(--theme-accent), 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;";
    btn.innerHTML =
      '<img src="./logos/paint.svg" alt="Theme" style="width: 24px; height: 24px; filter: brightness(0) invert(1);">';

    // Create panel
    const panel = document.createElement("div");
    panel.style.cssText =
      "position: absolute; bottom: 55px; right: 0; background: var(--theme-card-bg); border-radius: 12px; padding: 8px; min-width: 160px; box-shadow: 0 8px 24px rgba(0,0,0,0.2); border: 1px solid var(--theme-border); display: none; flex-direction: column; gap: 4px; z-index: 99999;";

    // Store theme options reference
    const themeOptions = [];

    // Add theme options
    Object.entries(themes).forEach(([key, t]) => {
      const opt = document.createElement("div");
      opt.style.cssText =
        "padding: 8px 12px; border-radius: 8px; cursor: pointer; color: var(--theme-text-primary); display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 13px;";
      opt.innerHTML = `<span>${t.name}</span> ${currentTheme === key ? "<span class='checkmark'>✓</span>" : ""}`;
      opt.setAttribute("data-theme-key", key);
      
      opt.onclick = (e) => {
        e.stopPropagation();
        window.applyTheme(key);
        panel.style.display = "none";
        
        // Update checkmarks using the class selector
        themeOptions.forEach(optDiv => {
          const checkSpan = optDiv.querySelector(".checkmark");
          if (checkSpan) checkSpan.remove();
        });
        
        // Add checkmark to selected option
        const newCheck = document.createElement("span");
        newCheck.className = "checkmark";
        newCheck.textContent = "✓";
        opt.appendChild(newCheck);

        // Send to iframes
        document.querySelectorAll("iframe").forEach((iframe) => {
          try {
            iframe.contentWindow.postMessage(
              { type: "changeTheme", theme: key },
              "*",
            );
          } catch (e) {}
        });
      };
      
      panel.appendChild(opt);
      themeOptions.push(opt);
    });

    // Wrapper
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";
    wrapper.appendChild(btn);
    wrapper.appendChild(panel);

    container.appendChild(wrapper);

    // Toggle panel on click
    btn.onclick = (e) => {
      e.stopPropagation();
      panel.style.display = panel.style.display === "flex" ? "none" : "flex";
    };

    // Close panel when clicking outside
    document.addEventListener("click", function (e) {
      if (!wrapper.contains(e.target)) {
        panel.style.display = "none";
      }
    });

    console.log("Theme button initialized!");
  };
})();