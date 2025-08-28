import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";

function App() {
  const [todos, setTodos] = useState([]); //initialisé en "undefined" au lieu de tableau vide

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos" //j'ai corrigé le lien car il était erroné, il y avait un "s" de trop sur "todos"
      );
      const data = await response.json();
      setTodos(data.slice(0, 5));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = (data) => {
    // console.log(data);
    const newTodo = {
      completed: false, //par défaut car nouvelle tache
      id: Date.now(),
      title: data.title,
      userId: 1,
      
    
      // description: data.description,
      // priority: data.priority,
      // date: data.dueDate,
      
    };
    todos.push(newTodo);
    setTodos(todos);
    // console.log("Tâche ajoutée:", newTodo.id);
    console.log(todos);
  };

  const toggleTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      setTodos([...todos]);
    }
  };

  const deleteTodo = (id) => {};

  const updateTodo = (id, newText) => {};

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App - Test Technique</h1>
        <p>Trouvez et corrigez les bugs !</p>
      </header>

      <main className="App-main">
        <TodoForm onAdd={addTodo} />

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />

        <TodoStats todos={todos} />
      </main>
    </div>
  );
}

export default App;
