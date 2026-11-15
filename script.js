// Apply the saved theme before the page renders. Storage may be blocked for local files.
(() => {
  const storageKey = 'kamoliddin-homepage-theme';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme;
  try { savedTheme = localStorage.getItem(storageKey); } catch { /* Use system preference. */ }
  let hasPreference = savedTheme === 'light' || savedTheme === 'dark';
  document.documentElement.dataset.theme = hasPreference ? savedTheme : (systemTheme.matches ? 'dark' : 'light');

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('theme-toggle');
    const label = document.getElementById('theme-label');
    const icon = document.getElementById('theme-icon');
    const updateButton = () => {
      const isDark = document.documentElement.dataset.theme === 'dark';
      button.setAttribute('aria-pressed', String(isDark));
      button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      label.textContent = isDark ? 'Light mode' : 'Dark mode';
      icon.textContent = isDark ? '☀' : '◐';
    };
    updateButton();
    button.hidden = false;
    button.addEventListener('click', () => {
      const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = nextTheme;
      hasPreference = true;
      try { localStorage.setItem(storageKey, nextTheme); } catch { /* The toggle still works without persistence. */ }
      updateButton();
    });
    systemTheme.addEventListener('change', (event) => {
      if (!hasPreference) {
        document.documentElement.dataset.theme = event.matches ? 'dark' : 'light';
        updateButton();
      }
    });
    document.getElementById('year').textContent = new Date().getFullYear();
  });
})();
