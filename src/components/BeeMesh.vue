<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
// Import GLTFLoader for loading custom 3D models
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { BeeModelLoader } from './three/BeeModelLoader'
import { BeeRenderer } from './three/BeeRenderer'
import type { RendererSettings } from './three/BeeRenderer'

// Constants for dimensions
const DEFAULT_WIDTH = 480
const DEFAULT_HEIGHT = 480
const SMALL_SCREEN_BREAKPOINT = 480

// Constants for model scaling
const MODEL_SCALE_FACTOR = 5.0
const SCALE_ANIMATION_SPEED = 0.03
const MIN_SCALE_FACTOR = 0.9

// Constants for rotation and animation
const ROTATION_SPEED = 0.005
const BOUNCE_SPEED = 0.01
const BOUNCE_MAX = 0.2

const props = defineProps<{
  modelPath: string
  width?: number
  height?: number
  onClick?: () => void
}>()

const emit = defineEmits(['loaded'])

const containerRef = ref<HTMLElement | null>(null)
let beeRenderer: BeeRenderer
let model: THREE.Object3D
let animationFrameId: number
const destroyed = ref(false)
const isAnimating = ref(false)
let scaleDirection = -1
let currentScale = 1
let originalScale = 1 // Сохраняем исходный масштаб модели

// Setup the 3D scene
const setupScene = () => {
  if (!containerRef.value) return

  // Get container dimensions (respecting responsive constraints)
  const width = Math.min(props.width || DEFAULT_WIDTH, containerRef.value.clientWidth)

  // For small screens, maintain aspect ratio based on width
  let height
  if (window.innerWidth <= SMALL_SCREEN_BREAKPOINT) {
    height = width // Square aspect ratio on small screens
  } else {
    height = props.height || containerRef.value.clientHeight
  }

  // Создаем экземпляр BeeRenderer
  const rendererSettings: RendererSettings = {
    width,
    height,
    container: containerRef.value,
  }

  beeRenderer = new BeeRenderer(rendererSettings)

  // Try to load the custom model first, fallback to placeholder if it fails
  const loader = new GLTFLoader()
  loader.load(
    props.modelPath,
    (gltf) => {
      model = gltf.scene

      // Center the model
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      model.position.sub(center) // Center the model

      // Scale the model to fit the view
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      originalScale = MODEL_SCALE_FACTOR / maxDim
      model.scale.set(originalScale, originalScale, originalScale)

      beeRenderer.scene.add(model)

      // Emit loaded event
      emit('loaded', true)

      // Start animation
      animate()
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
      console.error('An error happened loading the model:', error)
      // Create and use fallback model from BeeModelLoader
      const { model: fallbackModel, originalScale: fallbackScale } =
        BeeModelLoader.createFallbackModel()
      model = fallbackModel
      beeRenderer.scene.add(model)

      // Set original scale for fallback model
      originalScale = fallbackScale

      // Emit loaded event
      emit('loaded', true)

      // Start animation
      animate()
    },
  )
}

// Animation variables
let bounceDirection = 1
let bounceHeight = 0

// Animation loop
const animate = () => {
  if (destroyed.value) return

  animationFrameId = requestAnimationFrame(animate)

  if (model) {
    // Rotate the model slowly
    model.rotation.y += ROTATION_SPEED

    // Add a gentle bouncing effect
    bounceHeight += BOUNCE_SPEED * bounceDirection
    if (bounceHeight > BOUNCE_MAX || bounceHeight < 0) {
      bounceDirection *= -1
    }
    model.position.y = bounceHeight

    // If animating (on tap), add a scale effect
    if (isAnimating.value) {
      currentScale += SCALE_ANIMATION_SPEED * scaleDirection * originalScale
      if (currentScale <= MIN_SCALE_FACTOR * originalScale) {
        currentScale = MIN_SCALE_FACTOR * originalScale
        scaleDirection = 1 // Change direction to grow back
      } else if (currentScale >= originalScale) {
        currentScale = originalScale
        isAnimating.value = false // Stop animation when back to original size
      }
      model.scale.set(currentScale, currentScale, currentScale)
    }
  }

  // Рендеринг сцены с использованием BeeRenderer
  beeRenderer.render()
}

// Handle window resize
const handleResize = () => {
  if (!containerRef.value || !beeRenderer) return

  // Get the actual width of the container (respecting the responsive constraints)
  const width = Math.min(props.width || DEFAULT_WIDTH, containerRef.value.clientWidth)

  // For small screens, maintain aspect ratio based on width
  let height
  if (window.innerWidth <= SMALL_SCREEN_BREAKPOINT) {
    height = width // Square aspect ratio on small screens
  } else {
    height = props.height || containerRef.value.clientHeight
  }

  // Используем метод handleResize из BeeRenderer
  beeRenderer.handleResize(width, height)
}

// Handle click on the model
const handleClick = () => {
  // Trigger animation only if not already animating
  if (!isAnimating.value) {
    isAnimating.value = true
    currentScale = originalScale
    scaleDirection = -1
  }

  // Call the onClick prop if provided
  if (props.onClick) {
    props.onClick()
  }
}

// Lifecycle hooks
onMounted(() => {
  setupScene()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  if (beeRenderer) {
    beeRenderer.dispose()
  }
})
</script>

<template>
  <div
    ref="containerRef"
    class="bee-mesh-container"
    :style="{ width: '100%', maxWidth: `${width || DEFAULT_WIDTH}px`, height: `${height || DEFAULT_HEIGHT}px` }"
    @click="handleClick"
    @touchstart.stop="handleClick"
  ></div>
</template>

<style scoped>
.bee-mesh-container {
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  max-width: 100%; /* Ensure it never exceeds the parent container */
}

.bee-mesh-container:hover {
  transform: scale(1.02);
}

/* Responsive adjustments for small screens */
@media (max-width: 480px) {
  .bee-mesh-container {
    height: auto !important; /* Override inline style */
    aspect-ratio: 1 / 1; /* Maintain square aspect ratio */
  }
}
</style>
