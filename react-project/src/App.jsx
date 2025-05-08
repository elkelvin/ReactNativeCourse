import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import GoalList from "../components/GoalList/GoalList";
import NewGoal from "../components/NewGoal/NewGoal";
const App = () => {
  const [courseGoals, setCourseGoal] = useState([
    { id: "cg1", text: "Finish the Course" },
    { id: "cg2", text: "Learn all about the Course Main Topic" },
    { id: "cg3", text: "Help other students in the Course Q&amp;A" },
  ]);

  // const courseGoals = ;

  const addNewGoalHandler = (newGoal) => {
    // console.log("·...", newGoal);
    // courseGoals.push(newGoal);
    // setCourseGoal(courseGoals.concat(newGoal));
    setCourseGoal(prev=>prev.concat(newGoal));
  };

  return (
    <div className="course-goals">
      <h2>Course Goals</h2>
      <NewGoal onAddGoal={addNewGoalHandler} />
      <GoalList goals={courseGoals} />
    </div>
  );
};
export default App;
