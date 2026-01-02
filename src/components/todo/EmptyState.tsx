import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";

export const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-16 text-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="flex justify-center mb-6"
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
            <ClipboardList className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-linear-to-r from-amber-400 to-orange-500 flex items-center justify-center">
            <span className="text-xs font-bold text-white">0</span>
          </div>
        </div>
      </motion.div>
      
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        No tasks yet
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        Add your first todo to get started. What do you want to accomplish today?
      </p>
      
      <div className="flex items-center justify-center gap-4 text-sm text-gray-400 dark:text-gray-500">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center gap-1"
        >
          <div className="w-1 h-1 rounded-full bg-current"></div>
          <span>Double-click to edit</span>
        </motion.div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
          className="flex items-center gap-1"
        >
          <div className="w-1 h-1 rounded-full bg-current"></div>
          <span>Drag to reorder</span>
        </motion.div>
      </div>
    </motion.div>
  );
};