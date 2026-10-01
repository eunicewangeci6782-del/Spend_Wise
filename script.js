// Budget variables
let budget = 0;

// Expense variables
let expense1 = 0;
let expense2 = 0;
let expense3 = 0;

// Calculation variables
let totalExpenses = 0;
let remainingBalance = 0;


// Function to calculate total expenses
function calculateTotalExpenses() {
    totalExpenses = expense1 + expense2 + expense3;
}


// Function to calculate remaining balance
function calculateRemainingBalance() {
    remainingBalance = budget - totalExpenses;
}


// Main function
function startBudget() {

    // Ask the user for their budget
    budget = Number(prompt("Enter your monthly budget:"));

    // Ask the user for their expenses
    expense1 = Number(prompt("Enter your first expense:"));
    expense2 = Number(prompt("Enter your second expense:"));
    expense3 = Number(prompt("Enter your third expense:"));

    // Perform calculations
    calculateTotalExpenses();
    calculateRemainingBalance();

    // Display results in the browser console
    console.log("===== SpendWise Budget Summary =====");
    console.log("Monthly Budget: " + budget);
    console.log("First Expense: " + expense1);
    console.log("Second Expense: " + expense2);
    console.log("Third Expense: " + expense3);
    console.log("Total Expenses: " + totalExpenses);
    console.log("Remaining Balance: " + remainingBalance);
}