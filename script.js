```javascript
// ============================================================
// SPENDWISE - INTERACTIVE BUDGET TRACKER
// ============================================================

// ------------------------------------------------------------
// 1. VARIABLES AND ARRAY
// ------------------------------------------------------------

// The budget is one value.
let budget = 0;

// The expenses array stores MULTIPLE expense records.
// Each expense is an object containing related information.
let expenses = [];


// ------------------------------------------------------------
// 2. SELECT ELEMENTS FROM THE DOM
// ------------------------------------------------------------

const budgetForm = document.getElementById("budgetForm");
const budgetInput = document.getElementById("budgetInput");

const expenseForm = document.getElementById("expenseForm");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const expenseDateInput = document.getElementById("expenseDate");

const budgetDisplay = document.getElementById("budgetDisplay");
const spentDisplay = document.getElementById("spentDisplay");
const remainingDisplay = document.getElementById("remainingDisplay");
const countDisplay = document.getElementById("countDisplay");

const statusTitle = document.getElementById("statusTitle");
const statusBadge = document.getElementById("statusBadge");
const statusMessage = document.getElementById("statusMessage");
const progressBar = document.getElementById("progressBar");

const expenseList = document.getElementById("expenseList");
const emptyState = document.getElementById("emptyState");
const clearButton = document.getElementById("clearButton");

const formMessage = document.getElementById("formMessage");


// ------------------------------------------------------------
// 3. DEFAULT DATE
// ------------------------------------------------------------

// Put today's date into the date field.
expenseDateInput.value = new Date().toISOString().split("T")[0];


// ------------------------------------------------------------
// 4. FORMAT MONEY
// ------------------------------------------------------------

function formatMoney(amount) {
    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 2
    }).format(amount);
}


// ------------------------------------------------------------
// 5. CALCULATE TOTAL USING A LOOP
// ------------------------------------------------------------

function calculateTotal() {

    let total = 0;

    // LOOP:
    // Go through every expense in the expenses array.
    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    return total;
}


// ------------------------------------------------------------
// 6. UPDATE THE DASHBOARD
// ------------------------------------------------------------

function updateDashboard() {

    const totalSpent = calculateTotal();
    const remaining = budget - totalSpent;

    // DOM MANIPULATION:
    // Change the text displayed on the webpage.
    budgetDisplay.textContent = formatMoney(budget);
    spentDisplay.textContent = formatMoney(totalSpent);
    remainingDisplay.textContent = formatMoney(remaining);
    countDisplay.textContent = expenses.length;


    // --------------------------------------------------------
    // CONDITIONAL STATEMENTS
    // --------------------------------------------------------

    if (budget <= 0) {

        // No budget has been entered.
        statusTitle.textContent = "Ready to get started";
        statusBadge.textContent = "Waiting";
        statusBadge.className = "badge neutral";

        statusMessage.textContent =
            "Set your budget to begin tracking your spending.";

        progressBar.style.width = "0%";

    } else if (totalSpent > budget) {

        // Spending is greater than the budget.
        statusTitle.textContent = "You are over budget";
        statusBadge.textContent = "Over budget";
        statusBadge.className = "badge danger";

        statusMessage.textContent =
            `You have exceeded your budget by ${formatMoney(
                Math.abs(remaining)
            )}. Try reducing non-essential spending.`;

        progressBar.style.width = "100%";

    } else if (totalSpent >= budget * 0.8) {

        // Spending has reached 80% of the budget.
        statusTitle.textContent = "You are approaching your limit";
        statusBadge.textContent = "Be careful";
        statusBadge.className = "badge warning";

        statusMessage.textContent =
            `You have ${formatMoney(
                remaining
            )} remaining. You have used at least 80% of your budget.`;

        const percentage = (totalSpent / budget) * 100;

        progressBar.style.width =
            `${Math.min(percentage, 100)}%`;

    } else {

        // Spending is below 80% of the budget.
        statusTitle.textContent = "You are within budget";
        statusBadge.textContent = "On track";
        statusBadge.className = "badge good";

        statusMessage.textContent =
            `Great job! You still have ${formatMoney(
                remaining
            )} available to spend.`;

        const percentage = (totalSpent / budget) * 100;

        progressBar.style.width =
            `${Math.min(percentage, 100)}%`;
    }

    // Update the expense list after changing the dashboard.
    renderExpenses();
}


// ------------------------------------------------------------
// 7. DISPLAY EXPENSES USING A LOOP
// ------------------------------------------------------------

function renderExpenses() {

    // Clear the current list before rebuilding it.
    expenseList.innerHTML = "";

    // CONDITIONAL:
    // If there are no expenses, show the empty state.
    if (expenses.length === 0) {

        emptyState.style.display = "block";
        clearButton.disabled = true;

        return;
    }

    emptyState.style.display = "none";
    clearButton.disabled = false;


    // LOOP:
    // Start from the newest expense and work backwards.
    for (let i = expenses.length - 1; i >= 0; i--) {

        const expense = expenses[i];

        // Create the expense container.
        const item = document.createElement("article");
        item.className = "expense-item";


        // Create description and metadata.
        const main = document.createElement("div");

        const title = document.createElement("div");
        title.className = "expense-title";
        title.textContent = expense.description;

        const meta = document.createElement("div");
        meta.className = "expense-meta";

        meta.textContent =
            `${expense.category} • ${formatDate(expense.date)}`;


        // Create amount.
        const amount = document.createElement("div");
        amount.className = "expense-amount";
        amount.textContent = formatMoney(expense.amount);


        // Create delete button.
        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-button";
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";


        // EVENT LISTENER:
        // When the user clicks Delete, remove this expense.
        deleteButton.addEventListener("click", function () {
            deleteExpense(expense.id);
        });


        // Add elements to the DOM.
        main.appendChild(title);
        main.appendChild(meta);

        item.appendChild(main);
        item.appendChild(amount);
        item.appendChild(deleteButton);

        expenseList.appendChild(item);
    }
}


// ------------------------------------------------------------
// 8. FORMAT DATE
// ------------------------------------------------------------

function formatDate(dateString) {

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-KE", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}


// ------------------------------------------------------------
// 9. DISPLAY FORM FEEDBACK
// ------------------------------------------------------------

function showMessage(message, type) {

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    setTimeout(function () {

        formMessage.textContent = "";
        formMessage.className = "form-message";

    }, 3000);
}


// ------------------------------------------------------------
// 10. BUDGET FORM EVENT
// ------------------------------------------------------------

// EVENT LISTENER:
// Runs when the user submits the budget form.
budgetForm.addEventListener("submit", function (event) {

    // Prevent the page from refreshing.
    event.preventDefault();

    const newBudget = Number(budgetInput.value);


    // CONDITIONAL VALIDATION:
    if (newBudget <= 0 || Number.isNaN(newBudget)) {

        showMessage(
            "Please enter a budget greater than zero.",
            "error"
        );

        return;
    }


    // Update the budget.
    budget = newBudget;

    // Update everything on the webpage.
    updateDashboard();

    showMessage(
        "Your monthly budget has been updated!",
        "success"
    );

    budgetInput.value = "";
});


// ------------------------------------------------------------
// 11. EXPENSE FORM EVENT
// ------------------------------------------------------------

// EVENT LISTENER:
// Runs when the user submits a new expense.
expenseForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get values from the form.
    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = expenseDateInput.value;


    // CONDITIONAL VALIDATION:
    if (
        !description ||
        amount <= 0 ||
        Number.isNaN(amount) ||
        !category ||
        !date
    ) {

        showMessage(
            "Please complete all fields with valid information.",
            "error"
        );

        return;
    }


    // Create an expense OBJECT.
    const expense = {

        id: Date.now(),

        description: description,

        amount: amount,

        category: category,

        date: date
    };


    // ARRAY:
    // Add the new expense object to the expenses array.
    expenses.push(expense);


    // Reset the form.
    expenseForm.reset();

    // Restore today's date.
    expenseDateInput.value =
        new Date().toISOString().split("T")[0];


    // Recalculate and update the page.
    updateDashboard();

    showMessage(
        "Expense added successfully!",
        "success"
    );
});


// ------------------------------------------------------------
// 12. DELETE ONE EXPENSE
// ------------------------------------------------------------

function deleteExpense(id) {

    // FILTER creates a new array without the selected expense.
    expenses = expenses.filter(function (expense) {

        return expense.id !== id;

    });


    // Update the dashboard after deleting.
    updateDashboard();

    showMessage(
        "Expense deleted.",
        "success"
    );
}


// ------------------------------------------------------------
// 13. CLEAR ALL EXPENSES
// ------------------------------------------------------------

clearButton.addEventListener("click", function () {

    // CONDITIONAL:
    // Do nothing if the array is already empty.
    if (expenses.length === 0) {
        return;
    }


    // Ask the user to confirm.
    const confirmed = window.confirm(
        "Are you sure you want to delete all expenses?"
    );


    // CONDITIONAL:
    if (confirmed) {

        expenses = [];

        updateDashboard();

        showMessage(
            "All expenses have been cleared.",
            "success"
        );
    }
});


// ------------------------------------------------------------
// 14. INITIAL PAGE LOAD
// ------------------------------------------------------------

// Display the initial state when the page opens.
updateDashboard();
```
