<script setup lang="ts">
// Task item component for displaying individual tasks

defineProps<{
  title: string
  reward: number
}>()
</script>

<template>
  <div class="task-item bg-white p-4 rounded-lg shadow-md mb-3 flex justify-between items-center border-l-4 border-bee-honey">
    <div class="task-info">
      <h3 class="text-lg font-semibold text-bee-black">{{ title }}</h3>
    </div>
    <div class="task-reward bg-amber-100 px-3 py-1 rounded-full flex items-center border border-bee-honey">
      <span class="reward-text text-bee-honey font-bold">{{ reward }} BEE</span>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Применяем эффект наведения только на устройствах с шириной экрана больше 768px */
@media (hover: hover) and (min-width: 768px) {
  .task-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
}

.task-reward {
  border: 1px solid rgba(255, 128, 0, 0.6);
  white-space: nowrap;
}

/* Уменьшаем размер шрифта и отступы для маленьких экранов */
@media (max-width: 330px) {
  .task-reward {
    padding: 0.15rem 0.5rem;
  }
  
  .reward-text {
    font-size: 0.875rem; /* 14px */
  }
  
  .task-item {
    padding: 0.75rem; /* Уменьшаем отступы в карточке */
  }
}
</style>