# SpendWise

SpendWise is a simple budgeting application that helps users enter a monthly budget and three expenses. The application calculates the total expenses and the remaining balance.

## JavaScript Concepts Implemented

This project uses JavaScript to make the budgeting application process user data and perform calculations.

### Variables

Variables are used to store the user's monthly budget, three expenses, the total expenses, and the remaining balance.

Examples include:

* `budget`
* `expense1`
* `expense2`
* `expense3`
* `totalExpenses`
* `remainingBalance`

### User Input

The application collects user input using JavaScript `prompt()` statements. The user enters their monthly budget and three expenses. The input is converted into numbers using `Number()` so that calculations can be performed.

### Calculations

The application adds the three expenses together to calculate the total expenses. It then subtracts the total expenses from the monthly budget to calculate the remaining balance.

### Functions

Functions are used to organize and reuse the budgeting calculations. The `calculateTotalExpenses()` function calculates the total expenses, while the `calculateRemainingBalance()` function calculates the remaining balance. The `startBudget()` function collects the user's information, runs the calculations, and displays the results.

## How the Application Works

1. The user clicks the **Start Budget** button.
2. The application asks for the monthly budget.
3. The application asks for three expenses.
4. The expenses are added together.
5. The total expenses are subtracted from the budget.
6. The budget summary is displayed in the browser console.
