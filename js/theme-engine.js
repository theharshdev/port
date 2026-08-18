/**
 * Bulletproof Dark & Light Theme Engine
 * Harsh Kushwaha - Senior Software Developer Portfolio
 */

class ThemeEngine {
  constructor() {
    this.theme = localStorage.getItem('harsh-theme') || 'dark';
    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.setupListeners();
  }

  setupListeners() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(nextTheme);
      });
    }
  }

  applyTheme(theme) {
    this.theme = theme;
    localStorage.setItem('harsh-theme', theme);
    const htmlEl = document.documentElement;

    if (theme === 'dark') {
      htmlEl.classList.add('dark');
      htmlEl.classList.remove('light');
    } else {
      htmlEl.classList.remove('dark');
      htmlEl.classList.add('light');
    }

    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      if (window.lucide) window.lucide.createIcons();
    }

    // Dispatch global themeChanged event to sync 3D WebGL scenes and canvases
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.themeEngine = new ThemeEngine();
});
