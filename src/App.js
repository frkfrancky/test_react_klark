import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";

function App() {
  const [todos, setTodos] = useState([]); // initialisé en tableau vide
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos" // j'ai corrigé le lien car il était erroné, il y avait un "s" de trop sur "todos"
      );
      if (!response.ok) throw new Error("Réponse réseau invalide");
      const data = await response.json();
      setTodos(data.slice(0, 5)); // on limite pour la démo
    } catch (err) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = (data) => {
    // console.log(data);
    const newTodo = {
      completed: false, // par défaut car nouvelle tâche
      id: Date.now(),
      title: data.title,
      userId: 1,
      // description: data.description,
      // priority: data.priority,
      // date: data.dueDate,
    };
    // ❌ évite todos.push() (mutation) — ✅ crée un nouveau tableau
    setTodos((prev) => [newTodo, ...prev]);
    // console.log("Tâche ajoutée:", newTodo.id);
    // console.log(todos);
  };

  const toggleTodo = (id) => {
    // ❌ évite mutation directe — ✅ map immuable
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTodo = (id, updates) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

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
          onToggleTodo={toggleTodo}   // aligne les noms attendus
          onDeleteTodo={deleteTodo}
          onUpdateTodo={updateTodo}
          loading={loading}
        />

        <TodoStats todos={todos} />
      </main>
    </div>
  );
}

export default App;
