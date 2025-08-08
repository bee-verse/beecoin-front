import { supabase } from '../supabase';
import type { User, ApiResponse } from '../types';

/**
 * Получает пользователя по ID
 * @param userId - ID пользователя
 * @returns Promise с результатом операции
 */
export async function getUserById(userId: string): Promise<ApiResponse<User>> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    return { data: data as User, error: null };
  } catch (error) {
    console.error(`Ошибка при получении пользователя с ID ${userId}:`, error);
    return { data: null, error: error as Error };
  }
}

/**
 * Получает пользователя по Telegram ID
 * @param tgId - Telegram ID пользователя
 * @returns Promise с результатом операции
 */
export async function getUserByTgId(tgId: string): Promise<ApiResponse<User>> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('tgId', tgId)
      .single();

    if (error) {
      throw error;
    }

    return { data: data as User, error: null };
  } catch (error) {
    console.error(`Ошибка при получении пользователя с Telegram ID ${tgId}:`, error);
    return { data: null, error: error as Error };
  }
}

/**
 * Создает нового пользователя
 * @param user - Данные пользователя (без id и createdAt)
 * @returns Promise с результатом операции
 */
export async function createUser(user: Omit<User, 'id' | 'createdAt' | 'balance' | 'taps'>): Promise<ApiResponse<User>> {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert({
        ...user,
        balance: 0,
        taps: 0
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { data: data as User, error: null };
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Обновляет данные пользователя
 * @param userId - ID пользователя
 * @param updates - Обновляемые поля пользователя
 * @returns Promise с результатом операции
 */
export async function updateUser(
  userId: string,
  updates: Partial<Omit<User, 'id' | 'createdAt'>>
): Promise<ApiResponse<User>> {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { data: data as User, error: null };
  } catch (error) {
    console.error(`Ошибка при обновлении пользователя с ID ${userId}:`, error);
    return { data: null, error: error as Error };
  }
}

/**
 * Увеличивает счетчик taps пользователя
 * @param userId - ID пользователя
 * @returns Promise с результатом операции
 */
export async function incrementUserTaps(userId: string): Promise<ApiResponse<User>> {
  try {
    // Сначала получаем текущее значение taps
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('taps')
      .eq('id', userId)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    if (!userData) {
      throw new Error('Пользователь не найден');
    }

    // Увеличиваем значение taps на 1
    const { data, error } = await supabase
      .from('users')
      .update({ taps: userData.taps + 1 })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { data: data as User, error: null };
  } catch (error) {
    console.error(`Ошибка при увеличении taps пользователя с ID ${userId}:`, error);
    return { data: null, error: error as Error };
  }
}