import type { Todo } from "../types/todo";

const TODOS_KEY = "todos";

export const loadTodos = (): Todo[] => {
  try {
    const data = localStorage.getItem(TODOS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load todos", error);
    return [];
  }
};

export const saveTodos = (todos: Todo[]) => {
  try {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to save todos", error);
  }
};