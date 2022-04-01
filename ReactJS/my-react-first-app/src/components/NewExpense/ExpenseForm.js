import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  /* Managing as separate state is an ideal way to do this exercise.
   *  This will make it each state separate and will not affect the other.
   */
  const [inpTitle, setInpTitle] = useState("");
  const [inpAmount, setInpAmount] = useState("");
  const [inpDate, setInpDate] = useState("");
  /**************************************************************/
  /* Another approach using only 1 State.
   *  But this approach will have some responsibility to keep the information/value of other entity.
   *  React will just overwrite all the information from the previous one, if you will not keep track of the value of other entities.
   */
  // const [userInput, setUserInput] = useState({
  //   inpTitle: "",
  //   inpAmount: "",
  //   inpDate: "",
  // });

  const titleChangeHandler = (event) => {
    setInpTitle(event.target.value);
    // setUserInput({
    //   ...userInput,
    //   inpTitle: event.target.value,
    // });
    /*
     *  Safer way of updating using only 1 State
     *  This is because React will guarantee you to have an updated value of the entities
     */
    // setUserInput((prevState) => {
    //   return { ...prevState, inpTitle: event.target.value };
    // });
  };
  const amountChangeHandler = (event) => {
    setInpAmount(event.target.value);
    // setUserInput({
    //   ...userInput,
    //   inpAmount: event.target.value,
    // });
  };
  const dateChangeHandler = (event) => {
    setInpDate(event.target.value);
    // setUserInput({
    //   ...userInput,
    //   inpDate: event.target.value,
    // });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const expenseData = {
      title: inpTitle,
      amount: +inpAmount,
      date: new Date(inpDate),
    };
    props.onSaveExpenseData(expenseData);
    // console.log("NewData:", expenseData);
    //clear the input fields after submit
    setInpTitle("");
    setInpAmount("");
    setInpDate("");
  };

  return (
    <form onSubmit={submitHandler} onReset={props.onUnclicked}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title: </label>
          <input type="text" value={inpTitle} onChange={titleChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Amount: </label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={inpAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date: </label>
          <input
            type="date"
            min="2015-01-01"
            max="2022-12-31"
            value={inpDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="reset">Cancel</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
