<script setup lang="ts">
import { RouterLink } from 'vue-router'
import IconHome from './icons/IconHome.vue'
import IconTasks from './icons/IconTasks.vue'
import IconProfile from './icons/IconProfile.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-white border-t border-bee-honey flex justify-around py-2 px-4 z-10"
  >
    <RouterLink
      to="/"
      class="flex flex-col items-center p-2 rounded-md w-20 text-gray-500 hover:text-bee-honey transition-colors"
      active-class="text-bee-honey bg-amber-100"
    >
      <IconHome />
      <span class="text-xs mt-1 text-center w-full">{{ t('navigation.home') }}</span>
    </RouterLink>

    <RouterLink
      to="/tasks"
      class="flex flex-col items-center p-2 rounded-md w-20 text-gray-500 hover:text-bee-honey transition-colors"
      active-class="text-bee-honey bg-amber-100"
    >
      <IconTasks />
      <span class="text-xs mt-1 text-center w-full">{{ t('navigation.tasks') }}</span>
    </RouterLink>

    <RouterLink
      to="/profile"
      class="flex flex-col items-center p-2 rounded-md w-20 text-gray-500 hover:text-bee-honey transition-colors"
      active-class="text-bee-honey bg-amber-100"
    >
      <IconProfile />
      <span class="text-xs mt-1 text-center w-full">{{ t('navigation.profile') }}</span>
    </RouterLink>
  </nav>
</template>
