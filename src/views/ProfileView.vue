<script setup lang="ts">
// Profile view component
import PageContainer from '@/components/PageContainer.vue'
import { useI18n } from 'vue-i18n'
import { ref, onMounted, computed } from 'vue'
import { getTelegramUser, isRunningInTelegram } from '@/utils/telegram/twa'
import WebApp from '@twa-dev/sdk'
import BackButton from '@/components/telegram/BackButton.vue'

const { t } = useI18n()

// User data
const telegramUser = ref(getTelegramUser())
const username = computed(() => {
  if (telegramUser.value) {
    return telegramUser.value.username || 
           `${telegramUser.value.first_name} ${telegramUser.value.last_name || ''}`;
  }
  return 'Guest';
})

const balance = ref(0)
const tapCount = ref(0)
const completedTasks = ref(0) // Mock completed tasks count

// Load saved data from localStorage
onMounted(() => {
  const savedBalance = localStorage.getItem('beecoinBalance')
  if (savedBalance) {
    balance.value = parseFloat(savedBalance)
  }

  const savedTapCount = localStorage.getItem('beecoinTapCount')
  if (savedTapCount) {
    tapCount.value = parseInt(savedTapCount)
  }
})

// Open Telegram profile
const openTelegramProfile = () => {
  if (telegramUser.value && telegramUser.value.username) {
    WebApp.openTelegramLink('https://t.me/' + telegramUser.value.username)
  } else {
    // Если нет имени пользователя, просто открываем Telegram
    WebApp.openTelegramLink('https://t.me/')
  }
}
</script>

<template>
  <PageContainer>
    <!-- Используем BackButton только если приложение запущено в Telegram -->
    <BackButton v-if="isRunningInTelegram()" />
    
    <div class="profile-container p-4">
      <h1 class="text-2xl font-bold mb-4 text-bee-black">{{ t('profile.title') }}</h1>

      <!-- User info card -->
      <div class="user-info-card bg-white rounded-lg shadow-md p-4 mb-6">
        <div class="flex items-center">
          <div
            class="user-avatar rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mr-4"
          >
            {{ username.charAt(0).toUpperCase() }}
          </div>
          <div>
            <h2 class="text-xl font-semibold text-bee-black">{{ username }}</h2>
            <p class="text-bee-honey">{{ t('profile.username') }}</p>
          </div>
        </div>
      </div>

      <!-- Stats cards -->
      <div class="stats-grid grid grid-cols-2 gap-4 mb-6">
        <!-- Balance card -->
        <div class="stat-card bg-white rounded-lg shadow-md p-4">
          <p class="text-sm text-bee-honey">{{ t('profile.balance') }}</p>
          <p class="text-xl font-bold text-bee-honey">{{ balance }} BEE</p>
        </div>

        <!-- Completed tasks card -->
        <div class="stat-card bg-white rounded-lg shadow-md p-4">
          <p class="text-sm text-bee-honey">{{ t('profile.completedTasks') }}</p>
          <p class="text-xl font-bold text-bee-orange">{{ completedTasks }}</p>
        </div>

        <!-- Taps card -->
        <div class="stat-card bg-white rounded-lg shadow-md p-4 col-span-2">
          <p class="text-sm text-bee-honey">{{ t('profile.taps') }}</p>
          <p class="text-xl font-bold text-bee-orange">{{ tapCount }}</p>
        </div>
      </div>

      <!-- Telegram profile button -->
      <button
        @click="openTelegramProfile"
        class="telegram-button w-full bg-[#0088cc] text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.51l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.332-.373-.119L8.48 13.278l-2.95-.924c-.642-.204-.657-.642.136-.953l11.526-4.439c.537-.196 1.006.128.832.83z"
          />
        </svg>
        {{ t('profile.openTelegram') }}
      </button>
    </div>
  </PageContainer>
</template>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
}

.user-avatar {
  background-color: var(--color-bee-gold);
}

.telegram-button {
  transition: all 0.2s ease;
}

.telegram-button:active {
  transform: scale(0.98);
}
</style>
