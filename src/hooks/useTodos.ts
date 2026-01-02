import { useCallback, useEffect, useReducer, useState } from "react";
import { loadTodos, saveTodos } from "../utils/localStorage";
import { todoReducer } from "./todoReducer";
import type { Todo } from "../types/todo";

const initTodos = () => loadTodos();

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], initTodos);
  const [lastDeleted, setLastDeleted] = useState<Todo | null>(null);

  useEffect(() => {
    const id = setTimeout(() => saveTodos(todos), 300);
    return () => clearInterval(id);
  }, [todos]);

  const addTodo = useCallback((title: string) => {
    dispatch({ type: "ADD_TODO", payload: { title } });
  }, []);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: { id } });
  },[]);

  const editTodo = useCallback((id: string, title: string) => {
    dispatch({ type: "EDIT_TODO", payload: { id, title } });
  },[]);

  const deleteTodo = useCallback((id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;
    setLastDeleted(todo);
    dispatch({ type: "DELETE_TODO", payload: { id } });
  }, []);

  const undoDelete = useCallback(() => {
    if (!lastDeleted) return;

    dispatch({
      type: "ADD_TODO",
      payload: { title: lastDeleted.title },
    });

    setLastDeleted(null);
  }, []);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    undoDelete,
    lastDeleted,
  };
};
