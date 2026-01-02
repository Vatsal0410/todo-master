import { memo, useState, type FormEvent } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface TodoFormProps {
  onAdd: (title: string) => void;
}

export const TodoForm = memo(({ onAdd }: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    // Simulate network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    onAdd(title.trim());
    setTitle("");
    setIsSubmitting(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="mb-8 relative"
    >
      <div className="relative">
        <Input
          data-testid="todo-input"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          className="pr-32 text-lg py-4"
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          loading={isSubmitting}
          className="absolute right-2 top-2 bottom-2 px-6"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(title.length / 50) * 100}%` }}
        className="h-1 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full mt-2"
      />
    </motion.form>
  );
});