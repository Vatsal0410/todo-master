import type { Todo, TodoAction } from "../types/todo";

export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case "ADD_TODO": {
      const now = new Date().toISOString();

      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        status: "active",
        createdAt: now,
        updatedAt: now,
      };

      return [newTodo, ...state];
    }

    case "TOGGLE_TODO": {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              status: todo.status === "active" ? "completed" : "active",
              updatedAt: new Date().toISOString(),
            }
          : todo
      );
    }

    case "DELETE_TODO": {
      return state.filter((todo) => todo.id !== action.payload.id);
    }

    case "EDIT_TODO": {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              title: action.payload.title,
              updatedAt: new Date().toISOString(),
            }
          : todo
      );
    }

    default:
      return state;
  }
};
