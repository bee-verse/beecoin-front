<script setup lang="ts">
import { ref } from 'vue'
import { getLocale, setLocale } from '@/i18n'

type SupportedLocale = 'en' | 'ru';

const currentLocale = ref<SupportedLocale>(getLocale())

function toggleLanguage() {
  const newLocale: SupportedLocale = currentLocale.value === 'en' ? 'ru' : 'en'
  setLocale(newLocale)
  currentLocale.value = newLocale
}
</script>

<template>
  <button
    @click="toggleLanguage"
    class="fixed top-4 right-4 bg-white border border-gray-200 rounded-md px-3 py-1 text-sm shadow-sm hover:bg-gray-50 transition-colors"
  >
    {{ currentLocale === 'en' ? 'RU' : 'EN' }}
  </button>
</template>