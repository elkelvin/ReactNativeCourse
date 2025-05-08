import React, { useState } from "react";
import "./NewGoal.css";
const NewGoal = (props) => {
  const [enteredText, setEnteredText] = useState("");
  const addGoalHandler = (event) => {
    event.preventDefault();
    const newGoal = {
      id: Math.random().toString(),
      text: enteredText,
    };
    setEnteredText("");
    props.onAddGoal(newGoal);
  };

  const onTextChangeHandler=event=>{
    setEnteredText(event.target.value);
  }
  return (
    <form className="new-goal" onSubmit={addGoalHandler}>
      <input
        type="text"
        name="txtGoal"
        id="txtGoal"
        value={enteredText}
        onChange={onTextChangeHandler}
      />
      <button type="submit">Add Goal</button>
    </form>
  );
};

export default NewGoal;
