// theme-controller.js - Works across parent and iframes
(function () {
  const themes = {
    default: {
      name: "Default Blue",
      icon: "🔵",
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
      icon: "⚡",
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
      icon: "☁️",
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
      icon: "🌲",
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
      icon: "🌙",
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
      icon: "🌊",
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
    icon: "🏛️",
    css: {
        "bg-gradient-start": "#000000",
        "bg-gradient-end": "#000000",
        "card-bg": "#0d0d0d",
        "text-primary": "#dea208",
        "text-secondary": "#f5efe8",
        "sidebar-bg": "#000000",
        "sidebar-text": "#dea208",
        "accent": "#c28c03",
        "accent-hover": "#1b4d3e",
        "border": "#e8e0d5",
        "status-completed": "#2d6a4f",
        "status-upcoming": "#9ca3af",
        "status-warning": "#d97706",
        "status-danger": "#dc2626"
    }
}
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

    // If this is an iframe, tell the parent about theme change
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

  // Listen for theme changes from parent (for iframes)
  window.addEventListener("message", function (event) {
    if (event.data && event.data.type === "changeTheme") {
      window.applyTheme(event.data.theme);
    }
  });

  // Apply saved theme on load
  window.applyTheme(currentTheme);

  // Only inject floating button if this is the parent window (not an iframe)
  if (window.parent === window) {
    function injectFloatingButton() {
      if (document.getElementById("rise-theme-controller")) return;

      const html = `
    <div id="rise-theme-controller" style="position: fixed; bottom: 24px; right: 24px; z-index: 99999;">
        <div id="rise-theme-trigger" style="width: 56px; height: 56px; background: var(--theme-accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 0 12px var(--theme-accent), 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease; animation: subtlePulse 2s infinite ease-in-out;">
            <img src="./logos/paint.svg" alt="Theme" style="width: 28px; height: 28px; filter: brightness(0) invert(1);">
        </div>
        <div id="rise-theme-panel" style="position: absolute; bottom: 70px; right: 0; background: var(--theme-card-bg); border-radius: 16px; padding: 10px; min-width: 180px; box-shadow: 0 8px 24px rgba(0,0,0,0.2); border: 1px solid var(--theme-border); display: none; flex-direction: column; gap: 5px;">
            ${Object.entries(themes)
              .map(
                ([key, t]) =>
                  `<div class="theme-opt" data-theme="${key}" style="padding: 8px 12px; border-radius: 10px; cursor: pointer; color: var(--theme-text-primary); display: flex; align-items: center; gap: 8px;"> <span style="flex: 1;">${t.name}</span> ${currentTheme === key ? '<span style="margin-left: auto;">✓</span>' : ""}</div>`,
              )
              .join("")}
        </div>
    </div>
`;

      const style = document.createElement("style");
      style.textContent = `
    @keyframes subtlePulse {
        0% {
            box-shadow: 0 0 5px var(--theme-accent), 0 4px 12px rgba(0,0,0,0.15);
            transform: scale(1);
        }
        50% {
            box-shadow: 0 0 18px var(--theme-accent), 0 6px 16px rgba(0,0,0,0.2);
            transform: scale(1.02);
        }
        100% {
            box-shadow: 0 0 5px var(--theme-accent), 0 4px 12px rgba(0,0,0,0.15);
            transform: scale(1);
        }
    }
    .theme-opt:hover {
        background: var(--theme-border);
    }
    #rise-theme-trigger:hover {
        animation: none;
        transform: scale(1.05);
        box-shadow: 0 0 22px var(--theme-accent), 0 6px 16px rgba(0,0,0,0.2);
    }
`;
      document.head.appendChild(style);

      document.body.insertAdjacentHTML("beforeend", html);

      const trigger = document.getElementById("rise-theme-trigger");
      const panel = document.getElementById("rise-theme-panel");

      trigger.onclick = (e) => {
        e.stopPropagation();
        panel.style.display = panel.style.display === "flex" ? "none" : "flex";
      };

      document.onclick = (e) => {
        if (!panel.contains(e.target) && !trigger.contains(e.target)) {
          panel.style.display = "none";
        }
      };

      document.querySelectorAll(".theme-opt").forEach((opt) => {
        opt.onclick = () => {
          const theme = opt.dataset.theme;
          window.applyTheme(theme);
          panel.style.display = "none";

          // Also send to all iframes
          document.querySelectorAll("iframe").forEach((iframe) => {
            try {
              iframe.contentWindow.postMessage(
                {
                  type: "changeTheme",
                  theme: theme,
                },
                "*",
              );
            } catch (e) {
              console.log("Cannot send to iframe");
            }
          });
        };
      });
    }

    if (document.body) injectFloatingButton();
    else document.addEventListener("DOMContentLoaded", injectFloatingButton);
  }
})();
