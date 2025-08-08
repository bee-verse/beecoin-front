import { supabase } from '../supabase';
import type { UserTask, Task, ApiResponse } from '../types';
import { addToUserBalance } from './tap';

/**
 * Получает все задачи пользователя
 * @param userId - ID пользователя
 * @returns Promise с результатом операции
 */
export async function getUserTasks(userId: string): Promise<ApiResponse<(UserTask & { task: Task })[]>> {
  try {
    const { data, error } = await supabase
      .from('user_tasks')
      .select(`
        *,
        task:tasks(*)
      `)
      .eq('userId', userId);

    if (error) {
      throw error;
    }

    return { data: data as (UserTask & { task: Task })[], error: null };
  } catch (error) {
    console.error(`Ошибка при получении задач пользователя с ID ${userId}:`, error);
    return { data: null, error: error as Error };
  }
}

/**
 * Получает задачу пользователя по ID
 * @param userTaskId - ID задачи пользователя
 * @returns Promise с результатом операции
 */
export async function getUserTaskById(userTaskId: string): Promise<ApiResponse<UserTask & { task: Task }>> {
  try {
    const { data, error } = await supabase
      .from('user_tasks')
      .select(`
        *,
        task:tasks(*)
      `)
      .eq('id', userTaskId)
      .single();

    if (error) {
      throw error;
    }

    return { data: data as (UserTask & { task: Task }), error: null };
  } catch (error) {
    console.error(`Ошибка при получении задачи пользователя с ID ${userTaskId}:`, error);
    return { data: null, error: error as Error };
  }
}

/**
 * Назначает задачу пользователю
 * @param userId - ID пользователя
 * @param taskId - ID задачи
 * @returns Promise с результатом операции
 */
export async function assignTaskToUser(userId: string, taskId: string): Promise<ApiResponse<UserTask>> {
  try {
    // Проверяем, не назначена ли уже эта задача пользователю
    const { data: existingTask, error: checkError } = await supabase
      .from('user_tasks')
      .select('*')
      .eq('userId', userId)
      .eq('taskId', taskId);

    if (checkError) {
      throw checkError;
    }

    if (existingTask && existingTask.length > 0) {
      return { data: existingTask[0] as UserTask, error: null };
    }

    // Назначаем задачу пользователю
    const { data, error } = await supabase
      .from('user_tasks')
      .insert({
        userId,
        taskId,
        completed: false
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { data: data as UserTask, error: null };
  } catch (error) {
    console.error(`Ошибка при назначении задачи ${taskId} пользователю ${userId}:`, error);
    return { data: null, error: error as Error };
  }
}

/**
 * Отмечает задачу пользователя как выполненную и начисляет награду
 * @param userTaskId - ID задачи пользователя
 * @returns Promise с результатом операции
 */
export async function completeUserTask(userTaskId: string): Promise<ApiResponse<UserTask>> {
  try {
    // Получаем информацию о задаче пользователя
    const { data: userTaskData, error: fetchError } = await supabase
      .from('user_tasks')
      .select(`
        *,
        task:tasks(*)
      `)
      .eq('id', userTaskId)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    if (!userTaskData) {
      throw new Error('Задача пользователя не найдена');
    }

    // Проверяем, не выполнена ли уже задача
    if (userTaskData.completed) {
      return { data: userTaskData as UserTask, error: null };
    }

    // Отмечаем задачу как выполненную
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('user_tasks')
      .update({
        completed: true,
        completedAt: now
      })
      .eq('id', userTaskId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Начисляем награду пользователю
    const reward = userTaskData.task.reward;
    const { error: balanceError } = await addToUserBalance(userTaskData.userId, reward);

    if (balanceError) {
      console.error('Ошибка при начислении награды:', balanceError);
      // Продолжаем выполнение, так как задача уже отмечена как выполненная
    }

    return { data: data as UserTask, error: null };
  } catch (error) {
    console.error(`Ошибка при выполнении задачи с ID ${userTaskId}:`, error);
    return { data: null, error: error as Error };
  }
}

/**
 * Удаляет задачу пользователя
 * @param userTaskId - ID задачи пользователя
 * @returns Promise с результатом операции
 */
export async function deleteUserTask(userTaskId: string): Promise<ApiResponse<null>> {
  try {
    const { error } = await supabase
      .from('user_tasks')
      .delete()
      .eq('id', userTaskId);

    if (error) {
      throw error;
    }

    return { data: null, error: null };
  } catch (error) {
    console.error(`Ошибка при удалении задачи пользователя с ID ${userTaskId}:`, error);
    return { data: null, error: error as Error };
  }
}