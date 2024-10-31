import React from "react";
import Card from "./components/Card";
import { DragDropContext } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { taskActions } from "./store/task-slice";

const App = () => {
  const dispatch = useDispatch();

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    dispatch(
      taskActions.moveTask({
        sourceColumn: source.droppableId,
        destinationColumn: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  }

  return (
    <main className="lg:p-8 p-2 select-none">
      <header className="font-bold lg:mt-0 mt-6 font-titles text-base">
        <span className="font-titles bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-1 rounded-sm tracking-wide">
          Projects / Seus projetos
        </span>
        <h1 className="font-titles text-2xl text-white font-bold mt-1">
          Boards
        </h1>
      </header>

      <DragDropContext onDragEnd={onDragEnd}>
        <section className="flex lg:gap-3 gap-1 mt-12">
          <Card columnTitle="Progress" />
          <Card columnTitle="Review" />
          <Card columnTitle="Completed" />
        </section>
      </DragDropContext>
    </main>
  );
};

export default App;
