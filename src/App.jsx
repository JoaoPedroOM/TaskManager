import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import { DragDropContext } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "./store/task-slice";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { Toaster, toast } from 'sonner'
import { userActions } from "./store/user-slice";
import { getAuth, signOut } from "firebase/auth";
import { loadTasksFromFirestore } from "./store/task-slice";

const App = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  const dados = useSelector((state) => state.user.dados);
  const tasksStatus = useSelector((state) => state.task.status);
  const tasksError = useSelector((state) => state.task.error);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (tasksStatus === 'idle' && dados.uid) {
      dispatch(loadTasksFromFirestore(dados.uid));
    }
  }, [tasksStatus, dados.uid, dispatch]); 
  

  function onDragEnd(result) {
    const { source, destination } = result;
    const uid = dados.uid;
    if (!destination) return;
  
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;
  
    dispatch(
      taskActions.moveTask({
        sourceColumn: source.droppableId,
        destinationColumn: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
        uid, 
      })
    );
  }
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    try {
      await signOut(auth);
      dispatch(userActions.logout());
      dispatch(taskActions.clearTasks());
    } catch (error) {
      toast.error("Erro ao sair: " + error.message);
    }
  };
  
  return (
    <main className="lg:p-8 p-2 select-none">
      <Toaster/>
      <header className="font-bold lg:mt-0 mt-6 font-titles text-base flex items-center justify-between">
        <div>
          <span className="font-titles bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-1 rounded-sm tracking-wide">
            Projects / Seus projetos
          </span>
          <h1 className="font-titles text-2xl text-white font-bold mt-1">
            Boards
          </h1>
        </div>
        <div>
          <Tooltip title="Configurações da conta">
            <IconButton onClick={handleClick} size="small">
              <Avatar alt={dados.displayName} src={dados.photoURL} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem onClick={handleLogout}>
              <Logout fontSize="small" sx={{ mr: 1 }} />
              Sair
            </MenuItem>
          </Menu>
        </div>
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
