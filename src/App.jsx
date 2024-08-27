import { useState, useEffect } from 'react'
import './App.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

let id = 0;
const generateId = () => ++id;

export default function TodoApp() {
  
  const [todos, setTodos] = useState([]);
  
  

  function appendTodo(task, surName, numara) {
    const todoObj = {
      id: generateId(),
      task,
      surName,
      numara
    }
    setTodos([...todos, todoObj]);
  }

  function updateTodo(id, newTask) {
    const todo = todos.find(x => x.id === id);
    todo.task = newTask;
    setTodos([...todos]);
  }

  function deleteTodo(id) {
    setTodos(todos.filter(x => x.id !== id));
  }



  return (
    <>
      <div className="todoApp">
        <h1>Öğreci Kayıt</h1>
        <TodoForm appendTodo={appendTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      </div>
    </>
  )
}

function TodoList({ todos, deleteTodo, updateTodo }) {

  return (
    <table className='todoList'>
      {todos.map(x => <TodoItem key={x.id} id={x.id} task={x.task} surName={x.surName} numara={x.numara} deleteTodo={deleteTodo} updateTodo={updateTodo} />)}
    </table>
  )
}


function TodoForm({ appendTodo }) {
  function handeleSubmit(e) {
    e.preventDefault();
    appendTodo(e.target['task'].value, e.target['surName'].value, e.target['numara'].value);
    e.target.reset();
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Öğreci Ekle
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <>
            <form onSubmit={handeleSubmit}>
              <input name='task' required type="text" placeholder='ad' />
              <input name='surName' required type="text" placeholder='soyad' />
              <input name='numara' required type="text" placeholder='numara' />
              <button onClick={handleClose}>ekle</button>
            </form>
          </>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

function TodoItem({ task, surName, numara, id, deleteTodo, updateTodo }) {
  const [isEdit, setEdit] = useState(false);
  const [newTask, setNewTask] = useState(task);
  const [newSurname, setNewSurname] = useState(surName);
  const [newNumara, setNewNumara] = useState(numara);
  return (
    <table className={!isEdit ? 'readOnly' : ''}>
      <td>
        <tr>
          <input type='text'
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            readOnly={!isEdit ? 'readOnly' : ''} />
          {isEdit ?
            <>
              <button onClick={() => { setEdit(false); updateTodo(id, newTask, newSurname, newNumara); }}>✔️</button>
              <button onClick={() => { setNewTask(task); setNewSurname(surName); setNewNumara(numara); setEdit(false); }}>✖️</button>
            </> :
            <>
              <button onClick={() => setEdit(true)}>Edit</button>
              <button onClick={() => deleteTodo(id)}>✖️</button>
            </>
          }
        </tr>
      </td>
      <td>
        <tr>
          <input type='text'
            value={newSurname}
            onChange={e => setNewSurname(e.target.value)}
            readOnly={!isEdit ? 'readOnly' : ''} />
          {isEdit ?
            <>
              <button onClick={() => { setEdit(false); updateTodo(id, newTask, newSurname, newNumara); }}>✔️</button>
              <button onClick={() => { setNewSurname(surName); setNewSurname(surName); setNewNumara(numara); setEdit(false); }}>✖️</button>
            </> :
            <>
              <button onClick={() => setEdit(true)}>Edit</button>
              <button onClick={() => deleteTodo(id)}>✖️</button>
            </>
          }
        </tr>
      </td>
      <td>
        <tr>
          <input type='text'
            value={newNumara}
            onChange={e => setNewNumara(e.target.value)}
            readOnly={!isEdit ? 'readOnly' : ''} />
          {isEdit ?
            <>
              <button onClick={() => { setEdit(false); updateTodo(id, newTask, newSurname, newNumara); }}>✔️</button>
              <button onClick={() => { setNewNumara(numara); setNewSurname(surName); setNewNumara(numara); setEdit(false); }}>✖️</button>
            </> :
            <>
              <button onClick={() => setEdit(true)}>Edit</button>
              <button onClick={() => deleteTodo(id)}>✖️</button>
            </>
          }
        </tr>
      </td>
    </table>
  )
}

