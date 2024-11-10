import React, { useRef, useEffect } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { taskActions } from "../store/task-slice";

const TaskList = ({
  tasks,
  columnTitle,
  editingTaskId,
  setEditingTaskId,
  editingTaskDescription,
  setEditingTaskDescription,
  uid,
}) => {
  const dispatch = useDispatch();
  const textareaRef = useRef(null);
  const [clickTimeout, setClickTimeout] = React.useState(null);

  const handleTaskClick = (task) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    const timeout = setTimeout(() => {
      setEditingTaskId(task.id);
      setEditingTaskDescription(task.description);
      setClickTimeout(null);
    }, 300);

    setClickTimeout(timeout);
  };

  const handleTaskDoubleClick = (taskId) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    }
    deleteTask(taskId);
  };

  const deleteTask = (taskId) => {
    dispatch(
      taskActions.removeTask({
        column: columnTitle,
        taskId,
        uid,
      })
    );
  };

  useEffect(() => {
    if (editingTaskId !== null && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        editingTaskDescription.length,
        editingTaskDescription.length
      );
    }
  }, [editingTaskId, editingTaskDescription]);

  const saveTaskDescription = () => {
    if (editingTaskDescription.trim()) {
      dispatch(
        taskActions.editTask({
          column: columnTitle,
          taskId: editingTaskId,
          newDescription: editingTaskDescription,
          uid,
        })
      );
    }
    setEditingTaskId(null);
  };

  return (
    <>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
          {(provided) => (
            <section
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={`w-full text-wrap break-words text-[12px] lg:text-base min-w-[70px] bg-[#1a1b1f] rounded-lg text-[#fff] py-3 px-[14px] mb-3 ${
                editingTaskId === task.id ? "column--highlight" : ""
              }`}
              onDoubleClick={() => handleTaskDoubleClick(task.id)}
              onClick={() => handleTaskClick(task)}
            >
              {editingTaskId === task.id ? (
                <textarea
                  className="bg-transparent text-[12px] lg:text-base border-none outline-none focus:outline-none focus:bg-transparent w-full resize-none"
                  ref={textareaRef}
                  value={editingTaskDescription}
                  onChange={(e) => setEditingTaskDescription(e.target.value)}
                  onBlur={saveTaskDescription}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      saveTaskDescription();
                    }
                  }}
                />
              ) : (
                task.description
              )}
            </section>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default TaskList;
