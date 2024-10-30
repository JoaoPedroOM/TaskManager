import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const Card = ({ columnTitle }) => {
  const dispatch = useDispatch();
  const [inputAddTask, setInputAddTask] = useState(false);

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
    console.log(inputAddTask);
    
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
        <section className="w-full min-w-[70px] bg-[#1a1b1f] rounded-lg text-[#fff] py-3 px-[14px] mb-3">
          Deixar o link no vídeo
        </section>

        {inputAddTask && (
          <section className="w-full min-w-[70px] bg-[#1a1b1f] rounded-lg text-[#fff] py-3 px-[14px] mb-3">
            <textarea
              className="bg-transparent border-none outline-none focus:outline-none focus:bg-transparent w-full resize-none"
              rows={4}
              placeholder="Descreva sua tarefa..."
            />
          </section>
        )}

        {columnTitle === "Progress" && (
          <button
            className={`flex items-center justify-between w-full mt-2 bg-[#c3dafa] text-[#4c6bd9] rounded p-1 text-[12px] lg:text-base lg:px-4 lg:py-2 ${inputAddTask ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => addTask()}
            disabled={inputAddTask}
          >
            Add task
            <FaPlus />
          </button>
        )}
      </section>
    </section>
  );
};

export default Card;
