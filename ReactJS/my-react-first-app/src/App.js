import React, { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Car Services",
    amount: 30,
    date: new Date(2021, 11, 1),
  },
  {
    id: "e2",
    title: "Hair cut",
    amount: 40,
    date: new Date(2022, 11, 2),
  },
  {
    id: "e3",
    title: "Nail cut",
    amount: 100,
    date: new Date(2022, 9, 3),
  },
];

function App() {
  const [newExpenseList, setNewExpenseList] = useState(DUMMY_EXPENSES);
  const onSaveExpenseHandler = (expenseData) => {
    // console.log("Top App: ", expenseData);
    // expenses.push(expenseData);
    setNewExpenseList((prevExpense) => {
      return [expenseData, ...prevExpense];
    });
  };
  // console.log("App expenses: ", newExpenseList);
  return (
    <div>
      <NewExpense onSaveExpense={onSaveExpenseHandler} />
      <Expenses allExpenses={newExpenseList} />
    </div>
  );
}

export default App;
