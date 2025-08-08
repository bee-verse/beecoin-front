/**
 * Типы данных для работы с Supabase
 */

/**
 * Интерфейс для таблицы tasks
 */
export interface Task {
  id: string; // uuid
  createdAt: string; // timestamp with time zone
  title: string;
  description: string;
  reward: number;
  isPublic: boolean;
}

/**
 * Интерфейс для таблицы user_tasks
 */
export interface UserTask {
  id: string; // uuid
  createdAt: string; // timestamp with time zone
  completed: boolean;
  completedAt: string | null; // timestamp without time zone
  userId: string; // uuid
  taskId: string; // uuid
}

/**
 * Интерфейс для таблицы users
 */
export interface User {
  id: string; // uuid
  tgId: string;
  username: string;
  balance: number;
  taps: number;
  createdAt: string; // timestamp with time zone
}

/**
 * Интерфейс для результата запроса к API
 */
export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}