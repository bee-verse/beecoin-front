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
    // Устанавливаем тему в соответствии с темой Telegram
    document.documentElement.classList.toggle('dark', WebApp.colorScheme === 'dark')
    
    // Применяем цвета текста из Telegram
    const textColor = getTextColor();
    document.documentElement.style.setProperty('--color-text-base', textColor);
    
    // Устанавливаем цвет для приглушенного текста (немного светлее/темнее основного)
    if (WebApp.colorScheme === 'dark') {
      document.documentElement.style.setProperty('--color-text-muted', adjustColorBrightness(textColor, 30));
    } else {
      document.documentElement.style.setProperty('--color-text-muted', adjustColorBrightness(textColor, -30));
    }

    // Сообщаем Telegram, что приложение готово
    WebApp.ready()

    // Расширяем приложение на всю высоту
    WebApp.expand()

    // Устанавливаем цвет фона для нижней панели в соответствии с темой
    WebApp.setBackgroundColor(WebApp.colorScheme === 'dark' ? '#1f2937' : '#ffffff')

    return true
  }

  return false
}

/**
 * Получение данных пользователя из Telegram
 */
export function getTelegramUser() {
  if (WebApp.initData) {
    return WebApp.initDataUnsafe.user
  }

  return null
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

/**
 * Получить цветовую схему Telegram
 */
export function getColorScheme(): 'light' | 'dark' {
  return WebApp.colorScheme as 'light' | 'dark'
}

/**
 * Получить основной цвет темы Telegram
 */
export function getThemeColor(): string {
  return WebApp.themeParams.bg_color || '#ffffff'
}

/**
 * Получить текстовый цвет темы Telegram
 */
export function getTextColor(): string {
  return WebApp.themeParams.text_color || '#000000'
}

/**
 * Получить цвет ссылок темы Telegram
 */
export function getLinkColor(): string {
  return WebApp.themeParams.link_color || '#0088cc'
}

/**
 * Получить цвет кнопок темы Telegram
 */
export function getButtonColor(): string {
  return WebApp.themeParams.button_color || '#0088cc'
}

/**
 * Получить цвет текста кнопок темы Telegram
 */
export function getButtonTextColor(): string {
  return WebApp.themeParams.button_text_color || '#ffffff'
}

/**
 * Регулирует яркость цвета на указанный процент
 * @param color - Цвет в формате HEX (#RRGGBB)
 * @param percent - Процент изменения яркости (положительный - светлее, отрицательный - темнее)
 * @returns Новый цвет в формате HEX
 */
function adjustColorBrightness(color: string, percent: number): string {
  // Удаляем # из строки цвета
  const hex = color.replace('#', '');
  
  // Преобразуем в RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  
  // Изменяем яркость
  r = Math.max(0, Math.min(255, r + Math.round(r * percent / 100)));
  g = Math.max(0, Math.min(255, g + Math.round(g * percent / 100)));
  b = Math.max(0, Math.min(255, b + Math.round(b * percent / 100)));
  
  // Преобразуем обратно в HEX
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default {
  initTelegramWebApp,
  getTelegramUser,
  showAlert,
  showConfirm,
  closeApp,
  isRunningInTelegram,
  getColorScheme,
  getThemeColor,
  getTextColor,
  getLinkColor,
  getButtonColor,
  getButtonTextColor,
}
