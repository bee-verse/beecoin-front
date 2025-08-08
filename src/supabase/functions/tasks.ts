import { supabase } from '../supabase';
import type { Task, ApiResponse } from '../types';

/**
 * Получает список всех публичных задач
 * @returns Promise с результатом операции
 */
export async function getPublicTasks(): Promise<ApiResponse<Task[]>> {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('isPublic', true);

    if (error) {
      throw error;
    }

    return { data: data as Task[], error: null };
  } catch (error) {
    console.error('Ошибка при получении публичных задач:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Получает задачу по ID
 * @param taskId - ID задачи
 * @returns Promise с результатом операции
 */
export async function getTaskById(taskId: string): Promise<ApiResponse<Task>> {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .single();

    if (error) {
      throw error;
    }

    return { data: data as Task, error: null };
  } catch (error) {
    console.error(`Ошибка при получении задачи с ID ${taskId}:`, error);
    return { data: null, error: error as Error };
  }
}

/**
 * Создает новую задачу
 * @param task - Данные задачи (без id и createdAt)
 * @returns Promise с результатом операции
 */
export async function createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<ApiResponse<Task>> {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { data: data as Task, error: null };
  } catch (error) {
    console.error('Ошибка при создании задачи:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Обновляет существующую задачу
 * @param taskId - ID задачи
 * @param updates - Обновляемые поля задачи
 * @returns Promise с результатом операции
 */
export async function updateTask(
  taskId: string,
  updates: Partial<Omit<Task, 'id' | 'createdAt'>>
): Promise<ApiResponse<Task>> {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { data: data as Task, error: null };
  } catch (error) {
    console.error(`Ошибка при обновлении задачи с ID ${taskId}:`, error);
    return { data: null, error: error as Error };
  }
}

/**
 * Удаляет задачу по ID
 * @param taskId - ID задачи
 * @returns Promise с результатом операции
 */
export async function deleteTask(taskId: string): Promise<ApiResponse<null>> {
  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      throw error;
    }

    return { data: null, error: null };
  } catch (error) {
    console.error(`Ошибка при удалении задачи с ID ${taskId}:`, error);
    return { data: null, error: error as Error };
  }
}