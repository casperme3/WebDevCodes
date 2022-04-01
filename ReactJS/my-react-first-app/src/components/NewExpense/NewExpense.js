import React, { useState } from "react";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [clicked, setClicked] = useState(false);
  const clickHandler = () => setClicked(true);
  const unclickedHandler = () => setClicked(false);
  const saveOnExpenseDataHandler = (inpExpenseData) => {
    const expenseData = {
      ...inpExpenseData,
      id: Math.random().toString(),
    };
    props.onSaveExpense(expenseData);
    setClicked(false);
  };

  let newExpenseContent = (
    <button onClick={clickHandler}>Add New Expense</button>
  );

  if (clicked) {
    newExpenseContent = (
      <ExpenseForm
        onSaveExpenseData={saveOnExpenseDataHandler}
        onUnclicked={unclickedHandler}
      />
    );
  }

  return <div className="new-expense">{newExpenseContent}</div>;
};

export default NewExpense;
