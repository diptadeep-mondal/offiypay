document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  let isAuthenticated = false;
  let showRegister = false;
  const transactions = [
    { type: 'sent', amount: 1000, recipient: 'user@upi', date: '2023-12-01' },
    { type: 'received', amount: 500, sender: 'friend@upi', date: '2023-12-02' },
  ];

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
      <button id="requestMoneyButton" class="primary">Request Money</button>
      <button id="checkBalanceButton" class="primary">Check Balance</button>
      <button id="viewHistoryButton" class="primary">View History</button>
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

    document.getElementById('requestMoneyButton')?.addEventListener('click', () => {
      openModal(renderRequestMoneyForm());
    });

    document.getElementById('checkBalanceButton')?.addEventListener('click', () => {
      openModal(renderCheckBalance());
    });

    document.getElementById('viewHistoryButton')?.addEventListener('click', () => {
      openModal(renderTransactionHistory());
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

  const renderRequestMoneyForm = () => `
    <h2>Request Money</h2>
    <form id="requestMoneyForm">
      <input type="text" placeholder="Enter UPI ID of sender" required />
      <input type="number" placeholder="Enter amount" required />
      <button type="submit" class="primary">Request</button>
    </form>
    <button class="secondary" id="cancelModal">Cancel</button>
  `;

  const renderCheckBalance = () => `
    <h2>Account Balance</h2>
    <p>Your current balance is: ₹10,000</p>
    <button class="primary" id="closeModal">OK</button>
  `;

  const renderTransactionHistory = () => `
    <h2>Transaction History</h2>
    <div>
      ${transactions
        .map(
          (txn) =>
            `<div class="history-item">
              <span>${txn.type === 'sent' ? 'Sent to' : 'Received from'}: ${
              txn.recipient || txn.sender
            }</span>
              <span>₹${txn.amount}</span>
            </div>`
        )
        .join('')}
    </div>
    <button class="primary" id="closeModal">Close</button>
  `;

  const openModal = (content) => {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = content;
    modal.classList.remove('hidden');

    document.getElementById('cancelModal')?.addEventListener('click', closeModal);
    document.getElementById('closeModal')?.addEventListener('click', closeModal);
  };

  const closeModal = () => {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
  };

  render();
});
