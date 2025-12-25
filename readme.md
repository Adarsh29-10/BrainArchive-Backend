# 🧠 BrainArchive

> **BrainArchive** is a personal learning archive platform where users can log, track, and reflect on their daily learnings — structured as evolving tasks, notes, and learning sessions — and visualize their growth through personalized analytics.

Unlike a traditional todo or notes app, BrainArchive focuses on **learning continuity, reflection, and long-term knowledge retention**.

---

## 🚀 Why BrainArchive?

Most developers:
- Learn something every day
- Forget what they learned after a few weeks
- Have no structured record of *how* and *from where* they learned

**BrainArchive solves this by:**
- Treating learnings as evolving tasks
- Allowing multiple learning sessions per task
- Preserving history instead of “marking done and forgetting”
- Providing analytics to reflect learning patterns

---

## 🧩 Core Concept

> **A Learning Task is never truly finished.**

Each task can contain:
- Multiple learning sessions
- Notes added over time
- References (articles, videos, courses)
- Time spent per session
- Status (active, paused, completed — but editable later)

---

## ✨ Features (v1)

### 🔐 Authentication
- User registration & login
- JWT-based authentication
- Protected routes

---

### 📝 Learning Tasks
- Create learning tasks (e.g., *Learn React Query*)
- Update task status (active / completed)
- Resume completed tasks anytime
- Track total time spent on a task

---

### 📚 Learning Sessions
- Add multiple learning sessions under a task
- Each session includes:
  - What you learned
  - Source (YouTube, article, docs, etc.)
  - Time spent
  - Notes (markdown supported)
- Sessions are immutable records (learning history)

---

### 🗒️ Notes System
- Notes can be:
  - Attached to a task
  - Attached to a learning session
- Used for revision anytime
- Notes never disappear when task is completed

---

### 📊 Analytics Dashboard
Personalized dashboard showing:
- Total learning time
- Most studied topics
- Learning streaks
- Task completion vs continuation
- Source breakdown (YouTube vs Docs vs Courses)

---

### 🌍 Public Learning Feed (Optional)
- Users can publish selected learning tasks
- Others can view (read-only)
- Acts like a **personal learning blog**

---

## 🏗️ Tech Stack

### Frontend
- React + TypeScript
- TanStack React Query
- React Router
- Tailwind CSS (or any UI library)

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication

---

## 🧠 React Query Concepts Used

BrainArchive is intentionally designed to **cover all major React Query concepts**:

| Concept | Usage |
|------|-----|
| `useQuery` | Fetch tasks, sessions, analytics |
| `useMutation` | Create/update tasks & sessions |
| Query Keys | User-scoped & task-scoped caching |
| Cache Invalidation | Refresh dashboard after mutations |
| Optimistic Updates | Instant UI update on task completion |
| Background Refetch | Auto refresh analytics |
| Error Handling | API-level error states |
| Loading States | Skeleton UI |
| Pagination | Public learning feed |

---

## 📁 Backend Folder Structure

```txt
src/
 ├── server.ts
 ├── db/
 │    └── index.ts
 ├── routes/
 │    ├── auth.routes.ts
 │    ├── task.routes.ts
 │    └── analytics.routes.ts
 ├── controllers/
 │    ├── auth.controller.ts
 │    ├── task.controller.ts
 │    └── analytics.controller.ts
 ├── models/
 │    ├── User.ts
 │    ├── Task.ts
 │    └── LearningSession.ts
 ├── types/
 │    └── index.ts
 ├── middleware/
 │    ├── auth.middleware.ts
 │    └── error.middleware.ts
 └── utils/
      └── helpers.ts

```

---

## 🗃️ Data Models

### User
```typescript
{
  _id: string;
  name: string;
  email: string;
  password: string;
}
```

### Task
```typescript
{
  _id: string;
  userId: string;
  title: string;
  description?: string;
  status: "active" | "completed";
  totalTimeSpent: number;
}
```

### LearningSession
```typescript
{
  _id: string;
  taskId: string;
  learnedToday: string;
  source: string;
  timeSpent: number;
  notes?: string;
  createdAt: Date;
}
```

---

## 🔌 API Endpoints (v1)

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Tasks
- `POST /api/tasks`
- `GET /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Learning Sessions
- `POST /api/tasks/:id/sessions`
- `GET /api/tasks/:id/sessions`

### Analytics
- `GET /api/analytics/overview`

---

## 🧪 Learning Goals of This Project

This project is built to master:
- TypeScript in real backend & frontend code
- Clean Express architecture
- React Query for professional API handling
- Cache-based UI design
- Scalable project thinking

---

## 🛣️ Roadmap (Future)
- AI-based learning summarizer
- Topic clustering using embeddings
- Smart revision reminders
- Knowledge graph visualization
- Chrome extension for quick learning logs

---

## 🤝 Contribution

This is currently a solo learning project, but open for collaboration in future versions.