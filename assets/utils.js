// assets/utils.js

// 1. Common Helper: Escape HTML to prevent bugs in code previews
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[c]));
}

// 2. Common Helper: Copy text to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true; // Success
  } catch (err) {
    console.error('Failed to copy:', err);
    return false; // Fail
  }
}

// 3. Common Helper: Download text as a file
function downloadFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

// 4. Common Helper: Load guide content dynamically
async function loadGuide(toolName) {
  try {
    const response = await fetch(`assets/guides/${toolName}.html`);
    if (!response.ok) throw new Error('Guide not found');
    const html = await response.text();
    const guideBody = document.querySelector('.guide-body');
    if (guideBody) {
      guideBody.innerHTML = html;
    }
  } catch (err) {
    console.error('Failed to load guide:', err);
    const guideBody = document.querySelector('.guide-body');
    if (guideBody) {
      guideBody.innerHTML = '<p style="color: var(--accent-red);">Failed to load guide content.</p>';
    }
  }
}
