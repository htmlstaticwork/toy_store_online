/* ================================================
   🧸 ToyWorld — Auth Logic
   ================================================ */

const AuthForms = {
  init() {
    this.initPasswordToggle();
    this.initFormValidation();
  },

  initPasswordToggle() {
    document.querySelectorAll('.eye-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.closest('.form-input-wrap').querySelector('input');
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.innerHTML = isPassword
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
          : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
      });
    });
  },

  initFormValidation() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        if (!email || !password) {
          this.showError('Please fill in all fields');
          return;
        }
        // Simulate login
        localStorage.setItem('toyworld-user', JSON.stringify({ email, name: 'Parent User' }));
        window.location.href = 'dashboard.html';
      });
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('signup-firstname').value;
        const lastName = document.getElementById('signup-lastname').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;
        const terms = document.getElementById('signup-terms').checked;

        if (!firstName || !lastName || !email || !password || !confirm) {
          this.showError('Please fill in all fields');
          return;
        }
        if (password !== confirm) {
          this.showError('Passwords do not match');
          return;
        }
        if (!terms) {
          this.showError('Please agree to the terms and conditions');
          return;
        }
        // Simulate signup
        localStorage.setItem('toyworld-user', JSON.stringify({ email, name: `${firstName} ${lastName}` }));
        window.location.href = 'dashboard.html';
      });
    }
  },

  showError(message) {
    // Remove existing error
    const existing = document.querySelector('.auth-error');
    if (existing) existing.remove();

    const error = document.createElement('div');
    error.className = 'auth-error';
    error.style.cssText = `
      background: rgba(214,64,69,0.1);
      color: var(--error);
      padding: 10px 16px;
      border-radius: var(--radius-md);
      font-size: 14px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: fadeIn 0.3s ease;
    `;
    error.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
      ${message}
    `;

    const form = document.querySelector('.auth-card form') || document.querySelector('.auth-card');
    form.insertBefore(error, form.firstChild);

    setTimeout(() => error.remove(), 4000);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AuthForms.init();
});
