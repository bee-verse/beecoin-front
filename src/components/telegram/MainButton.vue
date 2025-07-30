<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import WebApp from '@twa-dev/sdk'

const props = withDefaults(
  defineProps<{
    text?: string
    color?: string
    textColor?: string
    disabled?: boolean
    progress?: boolean
    visible?: boolean
  }>(),
  {
    text: '',
    color: '',
    textColor: '',
    disabled: false,
    progress: false,
    visible: true,
  },
)

const emit = defineEmits<{
  (e: 'click'): void
}>()

// Обработчик клика по кнопке
const handleClick = () => {
  emit('click')
}

// Инициализация кнопки при монтировании компонента
onMounted(() => {
  // Устанавливаем текст кнопки
  if (props.text) {
    WebApp.MainButton.setText(props.text)
  }

  // Устанавливаем состояние кнопки
  if (props.disabled) {
    WebApp.MainButton.disable()
  } else {
    WebApp.MainButton.enable()
  }

  // Устанавливаем прогресс кнопки
  if (props.progress) {
    WebApp.MainButton.showProgress()
  } else {
    WebApp.MainButton.hideProgress()
  }

  // Показываем или скрываем кнопку
  if (props.visible) {
    WebApp.MainButton.show()
  } else {
    WebApp.MainButton.hide()
  }

  // Добавляем обработчик клика
  WebApp.MainButton.onClick(handleClick)
})

// Удаляем обработчик клика при размонтировании компонента
onUnmounted(() => {
  WebApp.MainButton.offClick(handleClick)
  WebApp.MainButton.hide()
})

// Следим за изменениями свойств
watch(
  () => props.text,
  (newText) => {
    if (newText) {
      WebApp.MainButton.setText(newText)
    }
  },
)

watch(
  () => props.disabled,
  (newDisabled) => {
    if (newDisabled) {
      WebApp.MainButton.disable()
    } else {
      WebApp.MainButton.enable()
    }
  },
)

watch(
  () => props.progress,
  (newProgress) => {
    if (newProgress) {
      WebApp.MainButton.showProgress()
    } else {
      WebApp.MainButton.hideProgress()
    }
  },
)

watch(
  () => props.visible,
  (newVisible) => {
    if (newVisible) {
      WebApp.MainButton.show()
    } else {
      WebApp.MainButton.hide()
    }
  },
)
</script>
