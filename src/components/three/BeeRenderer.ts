import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Интерфейс для настроек рендерера
 */
export interface RendererSettings {
  width: number
  height: number
  container: HTMLElement
}

/**
 * Класс для управления 3D-рендерингом пчелы
 */
export class BeeRenderer {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  controls: OrbitControls
  container: HTMLElement

  constructor(settings: RendererSettings) {
    this.container = settings.container

    // Создаем сцену
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xf9fafb) // bg-gray-50 color in Tailwind CSS

    // Создаем камеру
    this.camera = new THREE.PerspectiveCamera(65, settings.width / settings.height, 0.1, 1000)
    this.camera.position.z = 7

    // Создаем рендерер
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(settings.width, settings.height, false)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.container.appendChild(this.renderer.domElement)

    // Добавляем освещение
    this.setupLights()

    // Добавляем контроллы
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.enableZoom = false // Отключаем зум для лучшего опыта на мобильных устройствах
  }

  /**
   * Настройка освещения сцены
   */
  private setupLights(): void {
    // Увеличиваем интенсивность фонового освещения для общей яркости модели
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    this.scene.add(ambientLight)

    // Основной направленный свет спереди сверху
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2)
    mainLight.position.set(0, 1, 2)
    this.scene.add(mainLight)

    // Дополнительный направленный свет сзади для подсветки контуров
    const backLight = new THREE.DirectionalLight(0xffffff, 0.8)
    backLight.position.set(0, 0.5, -2)
    this.scene.add(backLight)

    // Боковой свет для объемности
    const sideLight = new THREE.DirectionalLight(0xffffff, 0.6)
    sideLight.position.set(2, 0, 0)
    this.scene.add(sideLight)
  }

  /**
   * Обработка изменения размера окна
   */
  handleResize(width: number, height: number): void {
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height, false)
  }

  /**
   * Рендеринг сцены
   */
  render(): void {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  /**
   * Очистка ресурсов
   */
  dispose(): void {
    if (this.container && this.renderer) {
      this.container.removeChild(this.renderer.domElement)
    }
  }
}
