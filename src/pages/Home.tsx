import { useMemo, useState } from "react";
import type { Filter } from "../types/todo";
import { motion } from "framer-motion";
import { CheckCircle, Clock, TrendingUp } from "lucide-react";
import { TodoForm } from "../components/todo/TodoForm";
import { TodoFilters } from "../components/todo/TodoFilters";
import { TodoList } from "../components/todo/TodoList";
import { useTodos } from "../hooks/useTodos";

const Home = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();
  const [filter, setFilter] = useState<Filter>("all");
  
  const filteredTodos = useMemo(() => {
    if(filter === "all") return todos;
    return todos.filter((f) => f.status === filter);
  }, [filter, todos])

  const stats = useMemo(() => {
    const completed = todos.filter((f) => f.status === "completed").length;
    const active = todos.filter((f) => f.status === "active").length;
    return { 
      total: todos.length,
      completed,
      active,
      progress: todos.length ? Math.round((completed / todos.length) * 100) : 0
     };
  }, [todos]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Todo Master
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Organize your life, one task at a time
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
                <p className="text-3xl font-bold mt-2">{stats.total}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-indigo-500" />
            </div>
          </div>
          
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
                <p className="text-3xl font-bold mt-2 text-blue-600 dark:text-blue-400">{stats.active}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                <p className="text-3xl font-bold mt-2 text-emerald-600 dark:text-emerald-400">{stats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
                <p className="text-3xl font-bold mt-2">{stats.progress}%</p>
              </div>
              <div className="relative">
                <div className="w-16 h-16">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeDasharray={`${stats.progress}, 100`}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-dark rounded-3xl p-8 shadow-2xl"
        >
          <TodoForm onAdd={addTodo} />
          
          <TodoFilters 
            filter={filter} 
            onChange={setFilter}
            counts={{
              all: stats.total,
              active: stats.active,
              completed: stats.completed,
            }}
          />
          
          <motion.div
            layout
            className="min-h-100"
          >
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              // Remove onReorder prop
            />
          </motion.div>

          {/* Footer Stats */}
          {todos.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  <span>{stats.active} tasks remaining</span>
                  <span className="w-1 h-1 rounded-full bg-current"></span>
                  <span>{stats.completed} completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div 
                      className="h-full bg-linear-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                      style={{ width: `${stats.progress}%` }}
                    />
                  </div>
                  <span>{stats.progress}% complete</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;