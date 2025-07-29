<script setup lang="ts">
// Tasks view component
import PageContainer from '@/components/PageContainer.vue'
import TaskItem from '@/components/TaskItem.vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import BackButton from '@/components/telegram/BackButton.vue'
import { isRunningInTelegram } from '@/utils/telegram/twa'

const { t } = useI18n()

// Mock tasks data (would come from API in production)
const tasks = ref([
  { id: 1, title: 'Complete your profile', reward: 5 },
  { id: 2, title: 'Invite a friend', reward: 10 },
  { id: 3, title: 'Complete a survey', reward: 15 },
  { id: 4, title: 'Watch a promotional video', reward: 3 },
  { id: 5, title: 'Follow our social media', reward: 7 },
  { id: 6, title: 'Subscribe to newsletter', reward: 5 },
  { id: 7, title: 'Rate our app', reward: 8 },
  { id: 8, title: 'Complete daily check-in', reward: 2 },
  { id: 9, title: 'Share a post', reward: 6 },
  { id: 10, title: 'Participate in beta testing', reward: 20 },
])
</script>

<template>
  <PageContainer>
    <!-- Используем BackButton только если приложение запущено в Telegram -->
    <BackButton v-if="isRunningInTelegram()" />

    <div class="tasks-container">
      <h1 class="text-2xl font-bold mb-2 text-bee-black">{{ t('tasks.title') }}</h1>
      <p class="mb-6 text-bee-honey font-medium">{{ t('tasks.description') }}</p>

      <h2 class="text-xl font-semibold mb-4 text-bee-orange">{{ t('tasks.available') }}</h2>

      <div class="tasks-list">
        <template v-if="tasks.length > 0">
          <TaskItem
            v-for="task in tasks"
            :key="task.id"
            :title="task.title"
            :reward="task.reward"
          />
        </template>
        <p v-else class="text-center py-8 text-bee-honey italic">{{ t('tasks.empty') }}</p>
      </div>
    </div>
  </PageContainer>
</template>

<style scoped>
.tasks-container {
  max-width: 800px;
  margin: 0 auto;
  height: 100%;
  max-height: calc(100% - 77px);
}

.tasks-list {
  max-height: calc(100% - 80px);
  overflow-y: auto;
  padding-right: 4px;
}

/* Scrollbar styling */
.tasks-list::-webkit-scrollbar {
  width: 6px;
}

.tasks-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.tasks-list::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 10px;
}

.tasks-list::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}
</style>
