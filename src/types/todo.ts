export type TodoStatus = "active" | "completed";

export type Filter = "all" | TodoStatus
export interface Todo {
    id: string
    title: string
    description?: string
    status: TodoStatus
    createdAt: string
    updatedAt: string
}

export type TodoAction = 
    | { type: "ADD_TODO", payload: { title: string } }
    | { type: "TOGGLE_TODO", payload: { id: string } }
    | { type: "DELETE_TODO", payload: { id: string } }
    | { type: "EDIT_TODO", payload: { id: string, title: string } }
