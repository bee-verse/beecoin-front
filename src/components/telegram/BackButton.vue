<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import WebApp from '@twa-dev/sdk'
import { useRouter } from 'vue-router'

const props = withDefaults(
  defineProps<{
    visible?: boolean
  }>(),
  {
    visible: true,
  },
)

const router = useRouter()

// Обработчик клика по кнопке назад
const handleBackButtonClick = () => {
  router.back()
}

// Инициализация кнопки при монтировании компонента
onMounted(() => {
  // Показываем или скрываем кнопку
  if (props.visible) {
    WebApp.BackButton.show()
  } else {
    WebApp.BackButton.hide()
  }

  // Добавляем обработчик клика
  WebApp.BackButton.onClick(handleBackButtonClick)
})

// Удаляем обработчик клика при размонтировании компонента
onUnmounted(() => {
  WebApp.BackButton.offClick(handleBackButtonClick)
  WebApp.BackButton.hide()
})

// Следим за изменениями свойства visible
watch(
  () => props.visible,
  (newVisible) => {
    if (newVisible) {
      WebApp.BackButton.show()
    } else {
      WebApp.BackButton.hide()
    }
  },
)
</script>
