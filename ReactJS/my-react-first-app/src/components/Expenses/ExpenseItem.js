import React, { useState } from "react";

import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  const [title, setTitle] = useState(props.expense.title);
  const clickHandler = () => {
    setTitle("I was updated!");
    // console.log(title);
    // props.expense.amount = 1;
  };

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.expense.date} />
        <div className="expense-item__description">
          <h2>{title}</h2>
          <div className="expense-item__price">${props.expense.amount}</div>
          <button onClick={clickHandler}>Click Me!</button>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
