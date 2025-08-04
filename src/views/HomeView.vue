<script setup lang="ts">
// Home view component
import PageContainer from '@/components/PageContainer.vue'
import { useI18n } from 'vue-i18n'
import { ref, onMounted, computed } from 'vue'
// Import the 3D bee component instead of SVG
import BeeMesh from '@/components/BeeMesh.vue'
import { getTelegramUser, isRunningInTelegram } from '@/utils/telegram/twa'
import MainButton from '@/components/telegram/MainButton.vue'

const { t } = useI18n()

// Получаем данные пользователя из Telegram
const telegramUser = ref(getTelegramUser())
const username = computed(() => {
  if (telegramUser.value) {
    return telegramUser.value.first_name || 'Bee Friend'
  }
  return 'Bee Friend'
})

// BeeCoin balance and stats
const balance = ref(0)
const tapCount = ref(0)
const lastTapTime = ref(0)
const tapCooldown = ref(10) // Reduced cooldown in milliseconds to allow faster tapping
const modelLoaded = ref(false)
const isModelLoading = ref(true) // Добавляем состояние загрузки модели

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

// Handle bee tap
const tapBee = (event?: Event) => {
  // Prevent default behavior for touch events to avoid delays
  if (event) {
    event.preventDefault()
  }

  const now = Date.now()

  // Check if enough time has passed since last tap
  if (now - lastTapTime.value < tapCooldown.value) return

  // Update last tap time
  lastTapTime.value = now

  // Always update balance and tap count regardless of animation state
  balance.value += 0.01
  balance.value = parseFloat(balance.value.toFixed(2)) // Round to 2 decimal places
  tapCount.value++

  // Save to localStorage
  localStorage.setItem('beecoinBalance', balance.value.toString())
  localStorage.setItem('beecoinTapCount', tapCount.value.toString())
}
</script>

<template>
  <PageContainer>
    <div class="home-container p-4 flex flex-col items-center">
      <h1 class="text-2xl font-bold mb-2 text-bee-black">{{ t('home.title') }}</h1>
      <p class="mb-6 text-bee-honey font-medium">{{ t('home.greeting', { name: username }) }}</p>

      <div
        class="balance-container mb-6 bg-amber-100 p-3 rounded-lg shadow-md w-full max-w-xs text-center border-2 border-bee-honey"
      >
        <p class="text-lg font-semibold">{{ t('home.balance') }}</p>
        <p class="text-3xl font-bold text-bee-honey">{{ balance }} BEE</p>
      </div>

      <div class="bee-container relative mb-8 w-full mx-auto">
        <BeeMesh
          modelPath="/models/bee2_remash.glb"
          :width="480"
          :height="480"
          :onClick="tapBee"
          @loaded="
            (loaded) => {
              modelLoaded = loaded
              isModelLoading = false
            }
          "
        />
        <div v-if="isModelLoading" class="loading-spinner">
          <div class="spinner"></div>
        </div>
      </div>

      <!-- Используем MainButton только если приложение запущено в Telegram и модель загружена -->
      <MainButton
        v-if="isRunningInTelegram() && modelLoaded"
        :text="t('home.tapBee')"
        :visible="modelLoaded"
        @click="tapBee"
      />
    </div>
  </PageContainer>
</template>

<style scoped>
.home-container {
  max-width: 900px;
  margin: 0 auto;
  height: 100%;
  touch-action: none; /* Запрещаем все жесты прокрутки на мобильных устройствах */
}

.bee-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  width: 100%;
  max-width: 480px; /* Match the max-width of BeeMesh component */
  margin: 0 auto;
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 128, 0, 0.3);
  border-radius: 50%;
  border-top-color: var(--color-bee-honey);
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
