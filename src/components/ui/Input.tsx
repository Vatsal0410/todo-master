import { useState, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ className = "", label, id, ...props }: InputProps) => {
  const [focused, setFocused] = useState(false);
  const hasValue = props.value && props.value.toString().length > 0;

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={id}
          className={`absolute left-3 transition-all duration-200 ${
            focused || hasValue
              ? "top-1 text-xs text-indigo-600 dark:text-indigo-400"
              : "top-1/2 -translate-y-1/2 text-sm text-gray-500"
          }`}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className={`w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all duration-200 ${
          label ? (hasValue || focused ? "pt-5 pb-3" : "py-3") : ""
        } glass border-gray-300/50 dark:border-gray-600/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 ${className}`}
      />
    </div>
  );
};