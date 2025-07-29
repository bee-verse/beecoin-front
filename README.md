# BeeCoin - Telegram Web App

## Описание

BeeCoin - это Telegram Web App (TWA), которое позволяет пользователям зарабатывать виртуальную валюту BeeCoin, нажимая на 3D-модель пчелы. Приложение интегрируется с Telegram и использует нативные элементы интерфейса Telegram, такие как MainButton и BackButton.

## Технологии

- Vue 3 с Composition API
- TypeScript
- Three.js для 3D-рендеринга
- Tailwind CSS для стилизации
- Vue Router для навигации
- Vue I18n для интернационализации
- @twa-dev/sdk для интеграции с Telegram Web App

## Интеграция с Telegram Bot

Для интеграции с Telegram Bot необходимо:

1. Создать бота через @BotFather в Telegram
2. Настроить WebApp URL в настройках бота
3. Разместить приложение на хостинге с поддержкой HTTPS
4. Указать URL приложения в настройках бота

### Настройка WebApp URL через BotFather

1. Откройте чат с @BotFather в Telegram
2. Отправьте команду `/mybots`
3. Выберите вашего бота из списка
4. Выберите "Bot Settings" > "Menu Button" или "Menu Commands"
5. Добавьте команду с типом "web_app"
6. Укажите URL вашего приложения

## Установка и запуск

```sh
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev

# Сборка для продакшена
npm run build
```

## Структура проекта

```
src/
├── assets/            # Статические ресурсы (CSS, изображения)
├── components/        # Vue компоненты
│   ├── icons/         # SVG иконки
│   └── telegram/      # Компоненты для Telegram Web App
├── i18n/              # Интернационализация
│   └── locales/       # Языковые файлы
├── router/            # Настройки маршрутизации
├── stores/            # Хранилища Pinia
├── utils/             # Утилиты
│   └── telegram/      # Утилиты для работы с Telegram Web App
└── views/             # Компоненты страниц
```

## Особенности Telegram Web App

- Приложение автоматически адаптируется к теме Telegram (светлая/темная)
- Использует нативные элементы интерфейса Telegram (MainButton, BackButton)
- Получает данные пользователя из Telegram
- Поддерживает многоязычность (русский и английский)

## Лицензия

MIT
