import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * Интерфейс для результата загрузки модели
 */
export interface ModelLoadResult {
  model: THREE.Object3D
  originalScale: number
}

/**
 * Класс для загрузки и создания 3D-моделей пчелы
 */
export class BeeModelLoader {
  /**
   * Загрузка GLTF-модели
   */
  static loadModel(modelPath: string): Promise<ModelLoadResult> {
    return new Promise((resolve) => {
      const loader = new GLTFLoader()

      loader.load(
        modelPath,
        (gltf) => {
          const model = gltf.scene

          // Центрируем модель
          const box = new THREE.Box3().setFromObject(model)
          const center = box.getCenter(new THREE.Vector3())
          model.position.sub(center)

          // Масштабируем модель, чтобы она соответствовала виду
          const size = box.getSize(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z)
          const originalScale = 5.0 / maxDim
          model.scale.set(originalScale, originalScale, originalScale)

          resolve({ model, originalScale })
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
          console.error('An error happened loading the model:', error)
          // Создаем и используем запасную модель
          const { model, originalScale } = BeeModelLoader.createFallbackModel()
          resolve({ model, originalScale })
        },
      )
    })
  }

  /**
   * Создание запасной модели (простая форма пчелы)
   */
  static createFallbackModel(): ModelLoadResult {
    const group = new THREE.Group()

    // Тело (эллипсоид)
    const bodyGeometry = new THREE.SphereGeometry(1, 32, 16)
    bodyGeometry.scale(1, 0.7, 1.5)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700, // Золотой цвет для тела
      roughness: 0.5,
      metalness: 0.2,
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    group.add(body)

    // Полоски
    const stripeGeometry = new THREE.CylinderGeometry(1.01, 1.01, 0.2, 32)
    const stripeMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000, // Черные полоски
      roughness: 0.5,
      metalness: 0.1,
    })

    // Добавляем три полоски
    for (let i = -0.6; i <= 0.6; i += 0.6) {
      const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial)
      stripe.position.z = i
      stripe.rotation.x = Math.PI / 2
      group.add(stripe)
    }

    // Крылья
    const wingGeometry = new THREE.CircleGeometry(0.8, 32, 0, Math.PI)
    const wingMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      roughness: 0.3,
      metalness: 0.2,
    })

    // Левое крыло
    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial)
    leftWing.position.set(-0.7, 0.5, 0)
    leftWing.rotation.z = -Math.PI / 4
    leftWing.rotation.y = Math.PI / 4
    group.add(leftWing)

    // Правое крыло
    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial)
    rightWing.position.set(0.7, 0.5, 0)
    rightWing.rotation.z = Math.PI / 4
    rightWing.rotation.y = -Math.PI / 4
    group.add(rightWing)

    // Глаза
    const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16)
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.1,
      metalness: 0.1,
    })

    // Левый глаз
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    leftEye.position.set(-0.3, 0.3, 1.2)
    group.add(leftEye)

    // Правый глаз
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    rightEye.position.set(0.3, 0.3, 1.2)
    group.add(rightEye)

    return { model: group, originalScale: 1 }
  }
}
