
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './TodoApp.css';
import img from './img.png'; 

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      addTodo(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="What is the task today?"
      />
      <button type="submit" className="todo-btn">Add Task</button>
    </form>
  );
};

const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="todo">
      <p
        className={`${task.completed ? 'completed' : 'incompleted'}`}
        onClick={() => toggleComplete(task.id)}
      >
        {task.text}
      </p>
      <div>
        <button className="edit-btn" onClick={() => editTodo(task.id)}>Edit</button>
        <button className="delete-btn" onClick={() => deleteTodo(task.id)}>Delete</button>
      </div>
    </div>
  );
};

const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task.id);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Update task"
      />
      <button type="submit" className="todo-btn">Update Task</button>
    </form>
  );
};

const TodoApp = () => {
  const [todos, setTodos] = useState([
    { id: uuidv4(), text: 'Learn React', completed: false },
    { id: uuidv4(), text: 'Learn MongoDB', completed: false },
    { id: uuidv4(), text: 'Learn Node.js', completed: false },
    { id: uuidv4(), text: 'Learn Express', completed: false },
    { id: uuidv4(), text: 'Practice MERN', completed: false },
    { id: uuidv4(), text: 'Complete Assignment', completed: false },
    { id: uuidv4(), text: 'Deploy on Github', completed: false },
  ]);

  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    if (savedTodos.length) {
      setTodos(() => savedTodos);
    }
  }, []);

  const addTodo = (todo) => {
    const newTodos = [...todos, { id: uuidv4(), text: todo, completed: false, isEditing: false }];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const toggleComplete = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const editTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    ));
  };

  const editTask = (task, id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: task, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true; // All tasks for 'All' filter
  });

  return (
    <div className="todo-app">
      <h1>Get Things Done!</h1>
      
      {/* Display the image */}
      <img src={img} alt="Decorative" className="todo-app-image" />

      <TodoForm addTodo={addTodo} />
      
      <div className="filter-buttons">
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Active')}>Active</button>
        <button onClick={() => setFilter('Completed')}>Completed</button>
      </div>

      {filteredTodos.map(todo =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};

export default TodoApp;

