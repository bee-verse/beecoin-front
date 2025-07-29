import { createI18n } from 'vue-i18n'
import messages from './locales'

// Define supported locales type
type SupportedLocale = 'en' | 'ru'

// Create i18n instance with options
export const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: 'en' as SupportedLocale, // Set default locale
  fallbackLocale: 'en' as SupportedLocale, // Set fallback locale
  messages, // Set locale messages
})

// Export composable to use in components
export function useI18n() {
  return i18n.global
}

// Export a function to change the locale
export function setLocale(locale: SupportedLocale) {
  i18n.global.locale.value = locale
  // Optionally save to localStorage for persistence
  localStorage.setItem('locale', locale)
}

// Export a function to get the current locale
export function getLocale(): SupportedLocale {
  return i18n.global.locale.value as SupportedLocale
}

// Initialize locale from localStorage if available
export function initLocale() {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && (savedLocale === 'en' || savedLocale === 'ru')) {
    i18n.global.locale.value = savedLocale as SupportedLocale
  }
}
