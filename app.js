document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
  
    let isAuthenticated = false;
    let showRegister = false;
  
    const render = () => {
      root.innerHTML = isAuthenticated ? renderDashboard() : renderAuth();
      attachEventListeners();
    };
  
    const renderAuth = () => `
      <div class="card">
        <h1>Welcome to OfflyPay</h1>
        <div>
          <button class="${!showRegister ? 'primary' : 'secondary'}" id="loginButton">Login</button>
          <button class="${showRegister ? 'primary' : 'secondary'}" id="registerButton">Register</button>
        </div>
        ${showRegister ? renderRegisterForm() : renderLoginForm()}
      </div>
    `;
  
    const renderLoginForm = () => `
      <form id="loginForm">
        <input type="tel" placeholder="Enter Mobile Number" required />
        <button type="submit" class="primary">Login</button>
      </form>
    `;
  
    const renderRegisterForm = () => `
      <form id="registerForm">
        <input placeholder="Bank IFSC Code (First 4 letters)" required />
        <input type="tel" placeholder="Mobile Number" required />
        <button type="submit" class="primary">Register</button>
      </form>
    `;
  
    const renderDashboard = () => `
      <header class="header">
        <h1>OfflyPay</h1>
        <button id="logoutButton" class="secondary">Logout</button>
      </header>
      <div class="dashboard-grid">
        <button id="sendMoneyButton" class="primary">Send Money</button>
        <!-- Add other dashboard buttons here -->
      </div>
      <div id="modal" class="modal hidden">
        <div class="modal-content" id="modalContent"></div>
      </div>
    `;
  
    const attachEventListeners = () => {
      document.getElementById('loginButton')?.addEventListener('click', () => {
        showRegister = false;
        render();
      });
  
      document.getElementById('registerButton')?.addEventListener('click', () => {
        showRegister = true;
        render();
      });
  
      document.getElementById('loginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        isAuthenticated = true;
        render();
      });
  
      document.getElementById('registerForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        isAuthenticated = true;
        render();
      });
  
      document.getElementById('logoutButton')?.addEventListener('click', () => {
        isAuthenticated = false;
        render();
      });
  
      document.getElementById('sendMoneyButton')?.addEventListener('click', () => {
        openModal(renderSendMoneyForm());
      });
  
      document.getElementById('modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'modal') closeModal();
      });
    };
  
    const renderSendMoneyForm = () => `
      <h2>Send Money</h2>
      <form id="sendMoneyForm">
        <select required>
          <option value="">Select payment method</option>
          <option value="upi">UPI ID</option>
          <option value="mobile">Mobile Number</option>
          <option value="account">IFSC & Account Number</option>
        </select>
        <input type="text" placeholder="Enter recipient details" required />
        <input type="number" placeholder="Enter amount" required />
        <input type="password" placeholder="Enter UPI PIN" required />
        <button type="submit" class="primary">Send</button>
      </form>
      <button class="secondary" id="cancelModal">Cancel</button>
    `;
  
    const openModal = (content) => {
      const modal = document.getElementById('modal');
      const modalContent = document.getElementById('modalContent');
      modalContent.innerHTML = content;
      modal.classList.remove('hidden');
  
      document.getElementById('sendMoneyForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        modalContent.innerHTML = `
          <h2>Payment Successful!</h2>
          <p>Transaction ID: TXN${Math.random().toString(36).substr(2, 9)}</p>
          <button class="primary" id="closeModal">Done</button>
        `;
        document.getElementById('closeModal').addEventListener('click', closeModal);
      });
  
      document.getElementById('cancelModal')?.addEventListener('click', closeModal);
    };
  
    const closeModal = () => {
      const modal = document.getElementById('modal');
      modal.classList.add('hidden');
    };
  
    render();
  });
  