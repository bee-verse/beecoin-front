import { supabase } from '../supabase'

export async function loginWithTelegramWebApp() {
  // 1) Берём initData (сырой), не initDataUnsafe. В TWA это window.Telegram.WebApp.initData
  const initData = window.Telegram?.WebApp?.initData

  if (!initData) throw new Error('No Telegram initData')

  // 2) Отправляем как raw body в Edge Function
  const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/auth-telegram`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: initData, // важно: без JSON-обёртки, это URLSearchParams строка
  })

  if (!res.ok) {
    const { error } = await res.json()
    throw new Error(`Telegram auth failed: ${error}`)
  }

  const { email, otp } = (await res.json()) as { email: string; otp: string }

  // 3) Завершаем вход, подтверждая OTP (без писем)
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: 'magiclink', // или 'email' в некоторых версиях; чаще всего 'magiclink'
  })

  if (error) throw error

  return data.session // полноценная сессия пользователю
}
