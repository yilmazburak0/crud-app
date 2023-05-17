import React, { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constant";

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      setTasks(res.data);
    });
  }, [updateUI]); //whenever updateUI changes this useEffect rerun.

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      setInput(""); //reset inputbox.
      setUpdateUI((prevState) => !prevState); //for updating UI.
    });
  };

  const updateMode = (id, text) => {
    setInput(text); //populates the input box with the name of the task to be updated.
    setUpdateId(id); //the id of the task to be updated
  };

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input }).then((res) => {
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput("");
    });
  };

  return (
    <main>
      <h1 className="title">CRUD Operations</h1>

      <div className="input_holder">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit" onClick={updateId ? updateTask : addTask}>
          {updateId ? "Update Task" : "Add Task"}
        </button>
        {/* both update and add button  */}
      </div>
      

      <ul>
        {tasks.map((task) => (
          <List
            key={task._id}
            id={task._id}
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  );
};

export default App;