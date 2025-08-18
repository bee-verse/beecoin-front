import { supabase } from '../supabase'

export async function loginWithTelegramWebApp() {
  // 1) Берём initData (сырой), не initDataUnsafe. В TWA это window.Telegram.WebApp.initData
  // const initData =
  //   window.Telegram?.WebApp?.initData
  const initData =
    'query_id=AAFa6JcZAAAAAFrolxl7QLny&user=%7B%22id%22%3A429385818%2C%22first_name%22%3A%22%D0%94%D0%B0%D0%BD%D0%B8%D0%B8%D0%BB%22%2C%22last_name%22%3A%22%D0%9B%D0%B0%D0%BF%D1%82%D0%B5%D0%B2%22%2C%22username%22%3A%22the_real_daniil%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2Fc9L5p7bUXql2eJjYJBkAq6cP_snu9gblUs9xK0jHaI8.svg%22%7D&auth_date=1755549981&signature=hssFMi_AnGVaELl-TRjAOx0IUPrwuGR7FJtBLwDmvRblxqGMfcuvRZFh6NGT8o-CUPZbzr_NH6qtllEBp7YpDA&hash=80fe4f4eb1ee04563a9abcd182b80c56629c125fc5f61f772815642999cccf87'

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
