import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../store/task-slice";
import { Droppable } from "@hello-pangea/dnd";
import TaskList from "./TaskList"

const Card = ({ columnTitle }) => {
  const tasks = useSelector((state) => state.task.columns?.[columnTitle] || []);
  const dispatch = useDispatch();

  const [inputAddTask, setInputAddTask] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskDescription, setEditingTaskDescription] = useState("");

  const getColorClass = () => {
    if (columnTitle === "Progress") {
      return "bg-[#f3cc49]";
    } else if (columnTitle === "Review") {
      return "bg-[#b787f5]";
    } else {
      return "bg-[#77db89]";
    }
  };

  const addTask = () => {
    if (taskDescription.trim()) {
      const newTask = {
        id: Date.now(),
        description: taskDescription,
      };
      dispatch(taskActions.addNewTask({ column: columnTitle, task: newTask }));
      setTaskDescription("");
      setInputAddTask(false);
    }
  };

  const cancelTask = () => {
    setInputAddTask(false);
    setTaskDescription("");
  };

  return (
    <section className="lg:w-full w-1/3 h-screen rounded-lg">
      <h2 className="font-titles text-[12px] lg:text-base text-[#d0cbc6] font-bold lg:m-5 m-1">
        <span className={`inline-block w-2 h-2 lg:w-3 lg:h-3 rounded-full mr-2 ${getColorClass()}`}></span>
        {columnTitle} ({tasks.length})
      </h2>

      <Droppable droppableId={columnTitle}>
        {(provided) => (
          <section className="p-1 h-full rounded" ref={provided.innerRef} {...provided.droppableProps}>
            <TaskList 
              tasks={tasks} 
              columnTitle={columnTitle} 
              editingTaskId={editingTaskId}
              setEditingTaskId={setEditingTaskId}
              editingTaskDescription={editingTaskDescription}
              setEditingTaskDescription={setEditingTaskDescription}
            />
            {provided.placeholder}

            {inputAddTask && (
              <section className="w-full bg-[#1a1b1f] rounded-lg text-[#fff] py-3 lg:px-[14px] px-2 mb-3">
                <textarea
                  className="bg-transparent text-[12px] lg:text-base border-none outline-none focus:outline-none focus:bg-transparent w-full resize-none"
                  rows={4}
                  placeholder="Descreva sua tarefa..."
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </section>
            )}

            {columnTitle === "Progress" && (
              <button
                className={`flex items-center font-main justify-between w-full mt-2 bg-[#c3dafa] text-[#4c6bd9] rounded p-1 text-[12px] lg:text-base lg:px-4 lg:py-2 ${inputAddTask ? "opacity-50 cursor-not-allowed" : ""}`}
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
              <div className="flex lg:flex-row lg:gap-2 flex-col">
                <button
                  className="mt-2 lg:px-4 lg:py-2 text-[12px] lg:text-base font-main w-full text-start bg-[#4caf50] text-white rounded p-1"
                  onClick={addTask}
                >
                  Salvar Tarefa
                </button>
                <button
                  className="mt-2 lg:px-4 lg:py-2 text-[12px] lg:text-base font-main w-full text-start bg-[#fac3c3] text-[#d94c4c] rounded p-1 cursor-pointer"
                  onClick={cancelTask}
                >
                  Cancelar
                </button>
              </div>
            )}
          </section>
        )}
      </Droppable>
    </section>
  );
};

export default Card;