import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../store/task-slice";

const Card = ({ columnTitle }) => {
  const tasks = useSelector((state) => state.task.columns[columnTitle]);
  const dispatch = useDispatch();
  const [inputAddTask, setInputAddTask] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");

  const getColorClass = () => {
    if (columnTitle === "Progress") {
      return "bg-[#f3cc49]";
    } else if (columnTitle === "Review") {
      return "bg-[#b787f5]";
    } else {
      return "bg-[#77db89]";
    }
  };

  function addTask() {
    setInputAddTask(true);
    if (taskDescription.trim()) {
      const newTask = {
        id: Date.now(),
        description: taskDescription,
      };
      dispatch(taskActions.addNewTask({ column: columnTitle, task: newTask }));
      console.log(tasks);
      setTaskDescription("");
      setInputAddTask(false);
    }
  }

  return (
    <section className="w-full h-screen rounded-lg">
      <h2 className="font-titles text-[12px] lg:text-base text-[#d0cbc6] font-bold lg:m-5 m-1">
        <span
          className={`inline-block w-2 h-2 lg:w-3 lg:h-3 rounded-full mr-2 ${getColorClass()}`}
        ></span>
        {columnTitle}
      </h2>

      <section className="p-1 h-full rounded">
        {tasks.map((task) => (
          <section key={task.id} className="w-full min-w-[70px] bg-[#1a1b1f] rounded-lg text-[#fff] py-3 px-[14px] mb-3">
            {task.description}
          </section>
        ))}
        <section className="w-full lg:text-base text-[13px] min-w-[70px] bg-[#1a1b1f] rounded-lg text-[#fff] py-3 px-[14px] mb-3">
          Adicione suas tarefas 🎯
        </section>

        {inputAddTask && (
          <section className="w-full min-w-[70px] bg-[#1a1b1f] rounded-lg text-[#fff] py-3 px-[14px] mb-3">
            <textarea
              className="bg-transparent border-none outline-none focus:outline-none focus:bg-transparent w-full resize-none"
              rows={4}
              placeholder="Descreva sua tarefa..."
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </section>
        )}

        {columnTitle === "Progress" && (
          <button
            className={`flex items-center font-main justify-between w-full mt-2 bg-[#c3dafa] text-[#4c6bd9] rounded p-1 text-[12px] lg:text-base lg:px-4 lg:py-2 ${
              inputAddTask ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              if (!inputAddTask) setInputAddTask(true);
            }}
            disabled={inputAddTask}
          >
            Add task
            <FaPlus />
          </button>
        )}

        {inputAddTask && (
          <button
            className="mt-2 lg:px-4 lg:py-2 text-[12px] lg:text-base font-main w-full text-start bg-[#4caf50] text-white rounded p-1"
            onClick={addTask}
          >
            Salvar Tarefa
          </button>
        )}
      </section>
    </section>
  );
};

export default Card;
