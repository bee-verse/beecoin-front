import WebApp from '@twa-dev/sdk'

/**
 * Утилиты для работы с Telegram Web App
 */

/**
 * Инициализация Telegram Web App
 * Должна вызываться при запуске приложения
 */
export function initTelegramWebApp() {
  // Проверяем, запущено ли приложение в Telegram
  if (WebApp.initData) {
    // Сообщаем Telegram, что приложение готово
    WebApp.ready()

    // Расширяем приложение на всю высоту
    WebApp.expand()

    return true
  }

  return false
}

/**
 * Получение данных пользователя из Telegram
 * Если приложение запущено не в Telegram, возвращает мок-данные для локального тестирования
 */
export function getTelegramUser() {
  if (WebApp.initData) {
    return WebApp.initDataUnsafe.user
  }

  // Мок-данные пользователя для локального тестирования
  return {
    id: 12345678,
    first_name: 'Test',
    last_name: 'User',
    username: 'testuser',
    language_code: 'ru',
    is_premium: true
  }
}

/**
 * Показать всплывающее сообщение
 */
export function showAlert(message: string) {
  WebApp.showAlert(message)
}

/**
 * Показать модальное окно подтверждения
 */
export function showConfirm(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    WebApp.showConfirm(message, (confirmed) => {
      resolve(confirmed)
    })
  })
}

/**
 * Закрыть приложение
 */
export function closeApp() {
  WebApp.close()
}

/**
 * Проверка, запущено ли приложение в Telegram
 */
export function isRunningInTelegram(): boolean {
  return !!WebApp.initData
}

export default {
  initTelegramWebApp,
  getTelegramUser,
  showAlert,
  showConfirm,
  closeApp,
  isRunningInTelegram,
}
