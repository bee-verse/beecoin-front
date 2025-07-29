<script setup lang="ts">
import { RouterView } from 'vue-router'
import BottomNavigation from './components/BottomNavigation.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
</script>

<template>
  <div class="app-container min-h-screen pb-16">
    <!-- Language Switcher -->
    <LanguageSwitcher />
    
    <!-- Main content area -->
    <RouterView />

    <!-- Bottom Navigation -->
    <BottomNavigation />
  </div>
</template>

<style>
/* Any global styles can go here */
body {
  font-family: 'Inter', sans-serif;
  overscroll-behavior: none; /* Предотвращает эффект "bounce" при скролле */
}

/* Запрещаем скроллинг на главной странице */
body:has(.home-container) {
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
