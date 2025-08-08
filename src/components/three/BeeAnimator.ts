import * as THREE from 'three'

/**
 * Класс для управления анимацией 3D-модели пчелы
 */
export class BeeAnimator {
  private model: THREE.Object3D
  private originalScale: number
  private currentScale: number
  private isAnimating: boolean = false
  private scaleDirection: number = -1

  // Переменные для анимации подпрыгивания
  private bounceDirection: number = 1
  private bounceHeight: number = 0
  private readonly bounceSpeed: number = 0.01
  private readonly bounceMax: number = 0.2

  constructor(model: THREE.Object3D, originalScale: number) {
    this.model = model
    this.originalScale = originalScale
    this.currentScale = originalScale
  }

  /**
   * Обновление анимации на каждом кадре
   */
  update(): void {
    if (!this.model) return

    // Медленное вращение модели
    this.model.rotation.y += 0.005

    // Добавляем эффект легкого подпрыгивания
    this.bounceHeight += this.bounceSpeed * this.bounceDirection
    if (this.bounceHeight > this.bounceMax || this.bounceHeight < 0) {
      this.bounceDirection *= -1
    }
    this.model.position.y = this.bounceHeight

    // Если анимируется (при нажатии), добавляем эффект масштабирования
    if (this.isAnimating) {
      this.currentScale += 0.03 * this.scaleDirection * this.originalScale
      if (this.currentScale <= 0.9 * this.originalScale) {
        this.currentScale = 0.9 * this.originalScale
        this.scaleDirection = 1 // Меняем направление, чтобы вернуться к исходному размеру
      } else if (this.currentScale >= this.originalScale) {
        this.currentScale = this.originalScale
        this.isAnimating = false // Останавливаем анимацию, когда возвращаемся к исходному размеру
      }
      this.model.scale.set(this.currentScale, this.currentScale, this.currentScale)
    }
  }

  /**
   * Запуск анимации нажатия
   */
  triggerClickAnimation(): void {
    // Запускаем анимацию только если она еще не запущена
    if (!this.isAnimating) {
      this.isAnimating = true
      this.currentScale = this.originalScale
      this.scaleDirection = -1
    }
  }

  /**
   * Проверка, анимируется ли модель в данный момент
   */
  get animating(): boolean {
    return this.isAnimating
  }

  /**
   * Обновление модели и масштаба
   */
  updateModel(model: THREE.Object3D, originalScale: number): void {
    this.model = model
    this.originalScale = originalScale
    this.currentScale = originalScale
    this.isAnimating = false
  }
}
