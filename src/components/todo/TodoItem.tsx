import { memo, useState } from "react";
import type { Todo } from "../../types/todo";
import { motion } from "framer-motion";
import { Check, Trash2, Edit2 } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export const TodoItem = memo(
  ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(todo.title);
    const [isHovered, setIsHovered] = useState(false);

    const save = () => {
      if (!value.trim()) return;
      onEdit(todo.id, value.trim());
      setIsEditing(false);
    };

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative"
      >
        <div className="glass rounded-2xl p-4 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-indigo-200/50 dark:hover:border-indigo-800/50">
          <div className="flex items-center gap-4">
            {/* Checkbox */}
            <button
              onClick={() => onToggle(todo.id)}
              data-testid="toggle-todo"
              className={`relative w-6 h-6 rounded-lg border-2 shrink-0 transition-all duration-300 ${
                todo.status === "completed"
                  ? "bg-linear-to-r from-emerald-500 to-teal-500 border-transparent"
                  : "border-gray-300 dark:border-gray-600 hover:border-indigo-500"
              }`}
            >
              {todo.status === "completed" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </motion.div>
              )}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <input
                  autoFocus
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={save}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") save();
                    if (e.key === "Escape") {
                      setValue(todo.title);
                      setIsEditing(false);
                    }
                  }}
                  className="w-full bg-transparent text-lg outline-none border-b-2 border-indigo-500 pb-1"
                />
              ) : (
                <motion.div
                  onClick={() => setIsEditing(true)}
                  className="cursor-text"
                >
                  <p
                    className={`text-lg font-medium leading-relaxed ${
                      todo.status === "completed"
                        ? "line-through text-gray-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {todo.title}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        todo.status === "completed"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      }`}
                    >
                      {todo.status === "completed" ? "Completed" : "Active"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Actions */}
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              className="flex items-center gap-2"
            >
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Edit"
              >
                <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group/delete"
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400 group-hover/delete:scale-110 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }
);
