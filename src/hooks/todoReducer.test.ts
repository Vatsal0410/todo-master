import { describe, expect, it } from "vitest";
import type { Todo } from "../types/todo";
import { todoReducer } from "./todoReducer";

const createTodo = (overrides?: Partial<Todo>):Todo => ({
    id: "1",
    title: "Test Todo",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides
})

describe("todoReducer", () => {
    it("adds a new todo", () => {
        const state:Todo[] = []

        const result = todoReducer(state, {
            type: "ADD_TODO",
            payload: { title: "New Task" },
        })

        expect(result).toHaveLength(1)
        expect(result[0].title).toBe("New Task")
        expect(result[0].status).toBe("active")
    })

    it("toggles todo status", () => {
        const state = [createTodo()]

        const result = todoReducer(state, {
            type: "TOGGLE_TODO",
            payload: { id: "1"}
        })

        expect(result[0].status).toBe("completed")
    })

    it("edits a todo title", () => {
        const state = [createTodo()]

        const result = todoReducer(state, {
            type: "EDIT_TODO",
            payload: { id: "1", title: "Updated Title" }
        })
        expect(result[0].title).toBe("Updated Title")
    })

    it("deletes a todo", () => {
        const state = [createTodo()]

        const result = todoReducer(state, {
            type: "DELETE_TODO",
            payload: { id: "1" }
        })
        expect(result).toHaveLength(0)
    })

    // Comments below are for future use

    // it("returns same state for unknown action", () => {
    //     const state = [createTodo()]
    //     const result = todoReducer(state, { type: "UNKNOWN" })
    //     expect(result).toEqual(state)
    // })

})