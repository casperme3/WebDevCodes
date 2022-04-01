import React, { useState } from "react";

import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
import ExpenseList from "./ExpenseList";
import Card from "../UI/Card";
import "./Expenses.css";

const Expenses = (props) => {
  const [filterYear, setFilterYear] = useState("2022");
  const onChangeFilterHandler = (selectYear) => setFilterYear(selectYear);

  const filteredList = props.allExpenses.filter(
    (expenseItem) => filterYear === expenseItem.date.getFullYear().toString()
  );

  return (
    <Card className="expenses">
      <ExpensesFilter
        onChangeFilter={onChangeFilterHandler}
        selectedYear={filterYear}
      />
      <ExpensesChart items={filteredList} />
      <ExpenseList items={filteredList} />
    </Card>
  );
};

export default Expenses;
