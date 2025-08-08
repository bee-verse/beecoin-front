import { supabase } from '../supabase';
import type { User, ApiResponse } from '../types';

/**
 * Обновляет баланс пользователя в базе данных Supabase
 * @param userId - ID пользователя
 * @param amount - Сумма, на которую нужно изменить баланс (положительная для пополнения, отрицательная для списания)
 * @returns Promise с результатом операции
 */
export async function updateUserBalance(userId: string, amount: number): Promise<ApiResponse<User>> {
  try {
    // Сначала получаем текущий баланс пользователя
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('balance')
      .eq('id', userId)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    if (!userData) {
      throw new Error('Пользователь не найден');
    }

    // Вычисляем новый баланс
    const currentBalance = userData.balance || 0;
    const newBalance = currentBalance + amount;

    // Обновляем баланс пользователя
    const { data, error } = await supabase
      .from('users')
      .update({ balance: newBalance })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { data: data as User, error: null };
  } catch (error) {
    console.error('Ошибка при обновлении баланса:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Пополняет баланс пользователя
 * @param userId - ID пользователя
 * @param amount - Сумма пополнения (должна быть положительной)
 * @returns Promise с результатом операции
 */
export async function addToUserBalance(userId: string, amount: number): Promise<ApiResponse<User>> {
  if (amount <= 0) {
    return { data: null, error: new Error('Сумма пополнения должна быть положительной') };
  }
  return updateUserBalance(userId, amount);
}

/**
 * Списывает средства с баланса пользователя
 * @param userId - ID пользователя
 * @param amount - Сумма списания (должна быть положительной)
 * @returns Promise с результатом операции
 */
export async function subtractFromUserBalance(userId: string, amount: number): Promise<ApiResponse<User>> {
  if (amount <= 0) {
    return { data: null, error: new Error('Сумма списания должна быть положительной') };
  }
  
  // Получаем текущий баланс для проверки
  const { data: userData, error: fetchError } = await supabase
    .from('users')
    .select('balance')
    .eq('id', userId)
    .single();

  if (fetchError) {
    return { data: null, error: fetchError };
  }

  if (!userData) {
    return { data: null, error: new Error('Пользователь не найден') };
  }

  const currentBalance = userData.balance || 0;
  
  // Проверяем, достаточно ли средств
  if (currentBalance < amount) {
    return { data: null, error: new Error('Недостаточно средств на балансе') };
  }
  
  // Списываем средства (передаем отрицательное значение)
  return updateUserBalance(userId, -amount);
}