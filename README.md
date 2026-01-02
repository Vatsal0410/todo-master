# ✅ Todo Master

A modern, production-ready Todo application built with **React + Typescript**, focused on clean achitecture, performence and testing.

---

## 🚀 Features
- Add, edit and delete todos
- Inline editing with keyboard support
- Dark / Light mode (Tailwind CSS v4)
- Smooth animations (Framer Motion)
- Persistent storage using localStorage
- Filters (All / Active / Completed)

---

## 🧠 Architecture

- **useReducer** for predictable state management
- **Context API** for global theme state
- **Pure reducers** (no side effects)
- **Debounced persistence**
- **Memoized derived state** for performance

---

## ⚡Performance
- `useMemo` for derived calculations
- `useCallback` for stable handlers
- `memo` for heavy components
- Verified using **React Profiler**

---

## 🧪 Testing
### Unit Tests
- **vitest**
- Reducer tested in isolation

### End-to-end Tests
- **Playwright**
- Real browser testing
- Covers:
  - Add / edit / delete / complete todos
  - Theme toggle
  - Persistence after reload

```bash
npm run test
npx playwright test
```

## 🛠️ Tech Stack

- React + Typescript
- Vite
- Tailwind CSS v4
- Framer Motion
- Vitest
- Playwright

---

## 📦 Installation

```bash
git clone https:github.com/Vatsal0410/todo-master.git
cd todo-master
npm install
npm run dev
```

## 🌐 Live Demo
👉 https://todo-master.com

---

## 📌 Author

[Vatsal](https://github.com/Vatsal0410)
React Developer
