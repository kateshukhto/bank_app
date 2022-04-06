'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  transactionsDate: [
    '2021-11-13T11:48:50.942Z',
    '2021-11-14T12:00:50.942Z',
    '2021-12-01T14:12:50.942Z',
    '2021-12-26T18:08:50.942Z',
    '2022-01-02T13:02:00.942Z',
    '2022-01-26T13:08:50.942Z',
    '2022-02-02T10:02:15.942Z',
    '2022-02-26T14:08:50.942Z'
  ],
  interest: 1.5,
  pin: 1111,
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  transactionsDate: [
    '2022-01-13T11:48:50.942Z',
    '2022-01-14T12:00:50.942Z',
    '2022-01-17T14:12:50.942Z',
    '2022-01-26T18:08:50.942Z',
    '2022-02-02T13:02:00.942Z',
    '2022-03-26T13:08:50.942Z',
    '2022-03-02T10:02:15.942Z',
    '2022-03-12T14:08:50.942Z'
  ],
  interest: 1.3,
  pin: 2222,
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  transactionsDate: [
    '2021-12-13T11:48:50.942Z',
    '2021-12-14T12:00:50.942Z',
    '2021-12-01T14:12:50.942Z',
    '2021-12-26T18:08:50.942Z',
    '2022-01-02T13:02:00.942Z',
    '2022-01-26T13:08:50.942Z',
    '2022-02-02T10:02:15.942Z',
    '2022-03-02T14:08:50.942Z'
  ],
  interest: 0.8,
  pin: 3333,
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, -500, 40, 190],
  transactionsDate: [
    '2021-10-11T10:00:50.942Z',
    '2021-11-14T15:00:50.942Z',
    '2021-11-25T14:12:50.942Z',
    '2021-12-02T08:08:50.942Z',
    '2022-01-23T19:02:00.942Z'
  ],
  interest: 1,
  pin: 4444,
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  transactionsDate: [
    '2022-02-01T06:40:50.942Z',
    '2022-02-14T22:04:50.942Z',
    '2022-02-01T14:12:50.942Z',
    '2022-03-06T12:08:50.942Z',
    '2022-03-10T13:02:00.942Z'
  ],
  interest: 1.1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let sorted = false;

function displayTransaction(account, sort = sorted) {
  const trans = sort ? account.transactions.slice().sort((a, b) => a - b) : account.transactions;

  trans.forEach((acc, index) => {
    const date = new Date(account.transactionsDate[index])
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const dateNum = date.getDate().toString().padStart(2, '0')

    const value = acc > 0 ? 'deposit' : 'withdrawal';
    containerTransactions.innerHTML += `
      <div class="transactions__row">
      <div class="transactions__type transactions__type--${value}">
        ${index + 1} ${value}
      </div>
      <div class="transactions__date">${dateNum}/${month}/${year}</div>
      <div class="transactions__value">${acc}$</div>
    </div>
    `
  })
}

function createNicknames(accounts) {
  accounts.forEach(account => {
    account.nicknames = account.userName.split(' ')
      .map((i) => i[0]).join('').toLowerCase()
  })
}

createNicknames(accounts)

function displayBalance(acc) {
  const balance = acc.transactions.reduce((prev, cur) => prev + cur);
  console.log(balance);
  acc.balance = balance;
  labelBalance.innerText = `${balance}$`
}

function displayTotal(acc) {
  const depositValue = acc.transactions.filter(i => i > 0).reduce((prev, cur) => prev + cur);
  labelSumIn.innerHTML = `${depositValue}$`;

  const widthdrawValue = acc.transactions.filter(i => i < 0).reduce((prev, cur) => prev + cur);
  labelSumOut.innerHTML = `${Math.abs(widthdrawValue)}$`

  const interestValue = (depositValue * acc.interest) / 100;
  labelSumInterest.innerHTML = `${interestValue}$`;

  // const interestValue = acc.transactions.filter(i => i > 0).map(i => (i * acc.interest) / 100).reduce((p, c) => p + c);
  // labelSumInterest.innerHTML = `${interestValue}$`;
}

function updateUI(account) {
  displayTransaction(account)
  displayBalance(account)
  displayTotal(account)
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();
  labelWelcome.innerText = `Добро пожаловать, ${account.userName}!`;
}

let currentAccount;

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.nicknames === inputLoginUsername.value);
  console.log(currentAccount)
  if (currentAccount.pin === +inputLoginPin.value) {
    containerApp.style.opacity = 1;
    updateUI(currentAccount);

    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const dateNum = now.getDate().toString().padStart(2, '0')
    labelDate.innerHTML = `${dateNum}/${month}/${year}`;
    if (currentLogoutTimer) {
      clearInterval(currentLogoutTimer)
    }
    currentLogoutTimer = startedLogoutTimer()
  }
})

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault()
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(acc => acc.nicknames === recipientNickname);
  const transferAmount = +inputTransferAmount.value;

  if (recipientAccount !== currentAccount && transferAmount > 0 && transferAmount <= currentAccount.balance) {
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);
    updateUI(currentAccount);
    inputTransferTo.value = '';
    inputTransferAmount.value = '';
  }
})

btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const loanAmount = +inputLoanAmount.value;

  if (currentAccount.transactions.some(i => i >= loanAmount * 0.1)) {
    currentAccount.transactions.push(loanAmount);
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
})

btnSort.addEventListener('click', () => {
  sorted = !sorted;
  containerTransactions.innerHTML = ''
  updateUI(currentAccount);
})

// let currentLogoutTimer;

// function startedLogoutTimer() {
//   let time = 300;

//   function logoutTimer() {
//     const minutes = Math.trunc(time / 60).toString().padStart(2, '0');
//     const seconds = Math.trunc(time % 60).toString().padStart(2, '0');

//     labelTimer.textContent = `${minutes}:${seconds}`;
//     time--;
//     if (time === 0) {
//       clearInterval(timer);
//       containerApp.style.opacity = 0;
//       labelWelcome.innerText = 'Войдите в свой аккаунт';
//     }
//   }

//   const timer = setInterval(logoutTimer, 1000)

//   return timer
// }

let currentLogoutTimer;

function startedLogoutTimer() {
  let time = 300;

  function logoutTimer() {
    let minutes = Math.trunc(time / 60).toString().padStart(2, '0');
    let seconds = Math.trunc(time % 60).toString().padStart(2, '0');

    labelTimer.innerText = `${minutes}:${seconds}`
    time--;

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.innerText = 'Войдите в свой аккаунт';
    }
  }

  const timer = setInterval(logoutTimer, 1000);

  return timer
}

