import React, { useState } from "react";
import Button from "../../UI/Button/Button";

/************************************
 * Using styled-components approach *
 ************************************/
// import styled from "styled-components";
// const FormControl = styled.div`
//   margin: 0.5rem 0;
//   & label {
//     color: black;
//     font-weight: bold;
//     display: block;
//     margin-bottom: 0.5rem;
//     color: ${(props) => (props.invalid ? "red" : "black")};
//   }
//   & input {
//     display: block;
//     width: 100%;
//     border: 1px solid ${(props) => (props.invalid ? "red" : "#ccc")};
//     font: inherit;
//     line-height: 1.5rem;
//     padding: 0 0.25rem;
//     background: ${(props) => (props.invalid ? "#e74b25" : "transparent")};
//   }
//   & input:focus {
//     outline: none;
//     background: #fad0ec;
//     border-color: #8b005d;
//   }
// `;
/************************************/
// Inside JSX part:
/* <FormControl invalid={!isValid}>
  <label>Course Goal</label>
  <input type="text" onChange={goalInputChangeHandler} />
</FormControl> */
/************************************/

import styles from "./CourseInput.module.css";

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div
        className={`${styles["form-control"]} ${!isValid && styles.invalid}`}
      >
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;

// Noob way to implement Dynamic Styling.... Use add/remove className instead.
/* <label style={{ color: isValid ? "black" : "red" }}>Course Goal</label>
<input
  style={{ background: isValid ? "transparent" : "salmon" }}
  type="text"
  onChange={goalInputChangeHandler}
/> */
