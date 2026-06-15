const storageKey = "vt-tools:last-opened";

renderLastOpened();

document.querySelectorAll(".launch-link").forEach(link => {
  link.addEventListener("click", () => {
    const opened = readLastOpened();
    opened[link.dataset.toolId] = new Date().toISOString();
    localStorage.setItem(storageKey, JSON.stringify(opened));
  });
});

function renderLastOpened() {
  const opened = readLastOpened();
  document.querySelectorAll(".tool-card").forEach(card => {
    const output = card.querySelector("[data-last-opened]");
    const value = opened[card.dataset.tool];
    if (!value) return;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return;
    output.textContent = `最後に起動: ${new Intl.DateTimeFormat("ja-JP", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date)}`;
  });
}

function readLastOpened() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) ?? {};
  } catch {
    return {};
  }
}
