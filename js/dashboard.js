/* ================================================
   🧸 ToyWorld — Dashboard Logic
   ================================================ */

const DashboardApp = {
  init() {
    this.initSidebar();
    this.initSections();
    this.initLogout();
    this.loadUserData();
  },

  initSidebar() {
    const toggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        overlay?.classList.toggle('active');
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        sidebar?.classList.remove('active');
        overlay.classList.remove('active');
      });
    }
  },

  initSections() {
    document.querySelectorAll('.sidebar-nav-item[data-section]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.getAttribute('data-section');
        
        // Update active nav
        document.querySelectorAll('.sidebar-nav-item').forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        // Show section
        document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(`section-${section}`);
        if (target) target.classList.add('active');

        // Update title
        const titleEl = document.querySelector('.topbar-title');
        if (titleEl) titleEl.textContent = item.querySelector('span')?.textContent || 'Dashboard';

        // Close mobile sidebar
        document.querySelector('.dashboard-sidebar')?.classList.remove('active');
        document.querySelector('.sidebar-overlay')?.classList.remove('active');
      });
    });
  },

  initLogout() {
    const logoutBtn = document.querySelector('.sidebar-nav-item.logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('toyworld-user');
        window.location.href = 'login.html';
      });
    }
  },

  loadUserData() {
    const user = JSON.parse(localStorage.getItem('toyworld-user') || '{}');
    const nameEl = document.querySelector('.welcome-name');
    const profileName = document.querySelector('.profile-name');
    const avatarEls = document.querySelectorAll('.profile-avatar');

    if (nameEl) nameEl.textContent = user.name || 'Parent';
    if (profileName) profileName.textContent = user.name || 'Parent';
    avatarEls.forEach(el => {
      el.textContent = (user.name || 'P').charAt(0).toUpperCase();
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DashboardApp.init();
});
