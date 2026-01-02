import type { Filter } from "../../types/todo";

interface Props {
  filter: Filter;
  onChange: (filter: Filter) => void;
  counts?: {
    all: number;
    active: number;
    completed: number;
  };
}

export const TodoFilters = ({ filter, onChange, counts }: Props) => {
  const filters = [
    { key: "all", label: "All", color: "from-blue-500 to-cyan-500" },
    { key: "active", label: "Active", color: "from-emerald-500 to-teal-500" },
    { key: "completed", label: "Completed", color: "from-purple-500 to-pink-500" },
  ] as const;

  return (
    <div className="mb-8">
      <div className="glass rounded-2xl p-1 inline-flex gap-1">
        {filters.map((f) => {
          const isActive = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => onChange(f.key as Filter)}
              className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? `text-white shadow-lg`
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              }`}
            >
              {isActive && (
                <div
                  className={`absolute inset-0 rounded-xl bg-linear-to-r ${f.color} opacity-100`}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {f.label}
                {counts && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive
                        ? "bg-white/20"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {counts[f.key]}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};