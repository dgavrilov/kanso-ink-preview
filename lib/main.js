let styleEl = null;
let subscription = null;

function sanitize(value) {
  return String(value || "")
    .replace(/[{};]/g, "")
    .trim();
}

function apply(fontFamily) {
  if (!styleEl) return;
  const family = sanitize(fontFamily);
  styleEl.textContent = family ? `.mde-preview { font-family: ${family}; }` : "";
}

module.exports = {
  config: {
    fontFamily: {
      title: "Font Family",
      type: "string",
      default:
        '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      description: "The name of the font family used for preview text.",
    },
  },

  activate() {
    styleEl = document.createElement("style");
    styleEl.id = "kanso-ink-preview-font";
    document.head.appendChild(styleEl);
    subscription = inkdrop.config.observe("kanso-ink-preview.fontFamily", apply);
  },

  deactivate() {
    if (subscription) {
      subscription.dispose();
      subscription = null;
    }
    if (styleEl) {
      styleEl.remove();
      styleEl = null;
    }
  },
};
