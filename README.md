# SpendWise – Smart Budget Tracker

SpendWise is a simple personal budgeting web application that helps users set a monthly budget, record expenses, monitor their spending, and see how much money they have remaining.

## Week 5 Improvements

This week, I made the SpendWise application interactive using JavaScript. The project was improved from a mostly static interface into a functional budget tracker.

The main improvements include:

* Added JavaScript conditional statements for budget decision-making.
* Changed individual expense variables into an array of expense records.
* Added loops to calculate and display multiple expenses.
* Added DOM manipulation to update the dashboard dynamically.
* Added event listeners for forms and buttons.
* Added input validation and user feedback.
* Added the ability to delete individual expenses.
* Added a Clear All button to remove all stored expenses.
* Added a budget progress bar and budget-health messages.

## How Conditionals Are Used

Conditional statements are used to evaluate the user's financial situation and provide appropriate feedback.

The application checks whether:

1. No budget has been set.
2. The user has spent more than their budget.
3. The user has used 80% or more of their budget.
4. The user is still safely within their budget.

For example:

```javascript
if (budget <= 0) {
    statusTitle.textContent = "Ready to get started";
} else if (totalSpent > budget) {
    statusTitle.textContent = "You are over budget";
} else if (totalSpent >= budget * 0.8) {
    statusTitle.textContent = "You are approaching your limit";
} else {
    statusTitle.textContent = "You are within budget";
}
```

These conditions allow the application to make decisions based on the user's spending.

## How Arrays Are Used

Instead of storing expenses in separate variables, all expense records are stored in an array.

```javascript
let expenses = [];
```

Each expense is stored as an object containing information such as:

* Description
* Amount
* Category
* Date
* ID

Example:

```javascript
const expense = {
    id: Date.now(),
    description: description,
    amount: amount,
    category: category,
    date: date
};

expenses.push(expense);
```

Using an array allows the application to store multiple expenses and process them together.

## How Loops Are Used

Loops are used to process the expenses stored in the array.

The `calculateTotal()` function uses a `for` loop to calculate the total amount spent:

```javascript
function calculateTotal() {
    let total = 0;

    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    return total;
}
```

A loop is also used in `renderExpenses()` to display all stored expenses on the page.

This allows the application to work with any number of expense records instead of only a fixed number of expenses.

## How the DOM Is Updated

The application uses JavaScript DOM manipulation to update the webpage without requiring the user to refresh it.

Examples include:

```javascript
budgetDisplay.textContent = formatMoney(budget);
spentDisplay.textContent = formatMoney(totalSpent);
remainingDisplay.textContent = formatMoney(remaining);
countDisplay.textContent = expenses.length;
```

JavaScript also creates expense elements dynamically:

```javascript
const item = document.createElement("article");
item.className = "expense-item";
```

The expense information is then added to the page using:

```javascript
expenseList.appendChild(item);
```

The progress bar is also updated dynamically:

```javascript
progressBar.style.width = `${percentage}%`;
```

This means the dashboard changes immediately whenever the user adds or removes an expense.

## How User Interactions Are Handled

Event listeners are used to respond to user actions.

### Setting a Budget

The budget form listens for a submit event:

```javascript
budgetForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Budget logic
});
```

### Adding an Expense

The expense form also listens for a submit event:

```javascript
expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Add expense logic
});
```

### Deleting an Expense

Each expense has a Delete button with its own click event:

```javascript
deleteButton.addEventListener("click", function () {
    deleteExpense(expense.id);
});
```

### Clearing All Expenses

The Clear All button also uses an event listener:

```javascript
clearButton.addEventListener("click", function () {
    // Clear all expenses
});
```

These events connect the user's actions to the JavaScript logic.

## Input Validation

The application checks that users enter valid information before adding data.

For example, the budget must be greater than zero:

```javascript
if (newBudget <= 0 || Number.isNaN(newBudget)) {
    showMessage(
        "Please enter a budget greater than zero.",
        "error"
    );
    return;
}
```

Expense information is also validated before it is stored.

This prevents invalid or incomplete information from being added to the application.

## Challenges Encountered and How They Were Resolved

### Challenge 1: Managing Multiple Expenses

Initially, expenses were stored using separate variables. This would make the application difficult to expand because every new expense would require another variable.

**Solution:** I changed the structure to use an array called `expenses`. Each expense is stored as an object inside the array.

### Challenge 2: Calculating the Total

The application needed to calculate the total of all stored expenses.

**Solution:** I used a `for` loop to go through every expense in the array and add its amount to the total.

### Challenge 3: Updating the Page Automatically

Previously, some information was mainly displayed through JavaScript/console output rather than dynamically updating the webpage.

**Solution:** I used DOM manipulation with methods such as `textContent`, `createElement()`, `appendChild()`, and `style.width` to update the dashboard and expense list.

### Challenge 4: Handling Invalid Input

Users could enter missing or invalid information.

**Solution:** I added conditional validation to check the budget, expense description, amount, category, and date before processing the information.

## How to Run the Project

1. Open the project repository.
2. Open `index.html` in a web browser.
3. Enter a monthly budget.
4. Click **Set Budget**.
5. Enter an expense description, amount, category, and date.
6. Click **Add Expense**.
7. The dashboard and expense list will update automatically.
8. Add multiple expenses to see the total spending change.
9. Use **Delete** to remove an individual expense.
10. Use **Clear All** to remove all expenses.

## Project Files

### `index.html`

Contains the structure and forms for the SpendWise application.

### `style.css`

Contains the styling, layout, responsive design, buttons, cards, dashboard, and expense list appearance.

### `script.js`

Contains the interactive JavaScript functionality, including:

* Variables
* Arrays
* Objects
* Conditional statements
* Loops
* Functions
* DOM manipulation
* Event listeners
* Input validation

### `README.md`

Documents the project, Week 5 improvements, JavaScript concepts used, challenges, and how to run the application.

## Week 5 Requirements Checklist

| Requirement                                | Completed |
| ------------------------------------------ | --------- |
| Conditional statements                     | ✅         |
| Multiple expense records using arrays      | ✅         |
| Loops to process expense records           | ✅         |
| Dynamic DOM updates                        | ✅         |
| Event listeners and forms                  | ✅         |
| User actions connected to JavaScript logic | ✅         |
| Dashboard updates dynamically              | ✅         |
| Input validation                           | ✅         |
| Project documentation                      | ✅         |

## Conclusion

The Week 5 improvements transformed SpendWise from a basic budgeting interface into an interactive JavaScript application. Users can now set a budget, add multiple expenses, view their spending totals, receive budget feedback, delete expenses, and clear their expense records.

The project demonstrates the use of JavaScript variables, arrays, objects, loops, conditional statements, functions, DOM manipulation, event listeners, and form validation.
