import type { Todo } from "../../types/todo";
import { EmptyState } from "./EmptyState";
import { TodoItem } from "./TodoItem";
import { motion, AnimatePresence } from "framer-motion";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export const TodoList = ({ todos, onToggle, onDelete, onEdit }: TodoListProps) => {
  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {todos.map((todo, index) => (
          <motion.div
            key={todo.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { 
                duration: 0.3,
                delay: index * 0.05 // Stagger animation
              }
            }}
            exit={{ 
              opacity: 0, 
              x: -100,
              transition: { duration: 0.2 }
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="relative group"
          >
            {/* Visual reorder indicator (non-functional) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-10 cursor-move opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              </div>
            </div>
            
            <TodoItem
              todo={todo}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};