import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../store/task-slice";
import { Draggable, Droppable } from "@hello-pangea/dnd";

const Card = ({ columnTitle }) => {
  const tasks = useSelector((state) => state.task.columns?.[columnTitle] || []);
  const progressCount = useSelector((state) => state.task.progressCount);
  const reviewCount = useSelector((state) => state.task.reviewCount);
  const completedCount = useSelector((state) => state.task.completedCount);
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

  const getTaskCount = () => {
    if (columnTitle === "Progress") return progressCount;
    if (columnTitle === "Review") return reviewCount;
    if (columnTitle === "Completed") return completedCount;
    return 0;
  };

  function addTask() {
    setInputAddTask(true);
    if (taskDescription.trim()) {
      const newTask = {
        id: Date.now(),
        description: taskDescription,
      };
      dispatch(taskActions.addNewTask({ column: columnTitle, task: newTask }));
      setTaskDescription("");
      setInputAddTask(false);
    }
  }

  function cancelTask() {
    setInputAddTask(false);
    setTaskDescription("");
  }

  function deleteTask(taskId) {
    dispatch(taskActions.removeTask({ column: columnTitle, taskId }));
  }
  
  return (
    <section className="lg:w-full w-1/3 h-screen rounded-lg">
      <h2 className="font-titles text-[12px] lg:text-base text-[#d0cbc6] font-bold lg:m-5 m-1">
        <span
          className={`inline-block w-2 h-2 lg:w-3 lg:h-3 rounded-full mr-2 ${getColorClass()}`}
        ></span>
        {columnTitle} ({getTaskCount()})
      </h2>

      <Droppable droppableId={columnTitle}>
        {(provided) => (
          <section
            className="p-1 h-full rounded"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <section
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="w-full text-wrap break-words text-[12px] lg:text-base min-w-[70px] bg-[#1a1b1f] rounded-lg text-[#fff] py-3 px-[14px] mb-3"
                    onDoubleClick={() => deleteTask(task.id)} 
                  >
                    {task.description}
                  </section>
                )}
              </Draggable>
            ))}
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
              <div className="flex lg:flex-row lg:gap-2 flex-col">
              <button
                className="mt-2 lg:px-4 lg:py-2 text-[12px] lg:text-base font-main w-full  text-start bg-[#4caf50] text-white rounded p-1"
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