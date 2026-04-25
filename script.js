const form = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

const transactionsList = document.getElementById("transactions-list");

const incomeTotalElement = document.getElementById("income-total");
const expenseTotalElement = document.getElementById("expense-total");
const balanceTotalElement = document.getElementById("balance-total");

const transactions = [];

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function addTransaction(description, amount, type) {
  const transaction = {
    id: Date.now(),
    description: description,
    amount: amount,
    type: type,
  };

  transactions.push(transaction);
}

function calculateSummary() {
  let incomeTotal = 0;
  let expenseTotal = 0;

  for (const transaction of transactions) {
    if (transaction.type === "income") {
      incomeTotal = incomeTotal + transaction.amount;
    }

    if (transaction.type === "expense") {
      expenseTotal = expenseTotal + transaction.amount;
    }
  }

  const balanceTotal = incomeTotal - expenseTotal;

  incomeTotalElement.textContent = formatCurrency(incomeTotal);
  expenseTotalElement.textContent = formatCurrency(expenseTotal);
  balanceTotalElement.textContent = formatCurrency(balanceTotal);
}

function renderTransactions() {
  transactionsList.innerHTML = "";

  for (const transaction of transactions) {
    const li = document.createElement("li");

    li.classList.add("transaction-item");
    li.classList.add(transaction.type);

    const signal = transaction.type === "income" ? "+" : "-";

    li.innerHTML = `
      <div class="transaction-info">
        <strong>${transaction.description}</strong>
        <span>${transaction.type === "income" ? "Entrada" : "Saída"}</span>
      </div>

      <strong class="transaction-value ${transaction.type}">
        ${signal} ${formatCurrency(transaction.amount)}
      </strong>
    `;

    transactionsList.appendChild(li);
  }
}

function updateScreen() {
  renderTransactions();
  calculateSummary();
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const description = descriptionInput.value;
  const amount = Number(amountInput.value);
  const type = typeInput.value;

  addTransaction(description, amount, type);

  updateScreen();

  form.reset();
});
