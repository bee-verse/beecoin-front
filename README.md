# BeeCoin - Telegram Web App

## Описание

BeeCoin - это Telegram Web App (TWA), которое позволяет пользователям зарабатывать виртуальную валюту BeeCoin, нажимая на 3D-модель пчелы. Приложение интегрируется с Telegram.

## Технологии

- Vue 3 с Composition API
- TypeScript
- Three.js для 3D-рендеринга
- Tailwind CSS для стилизации
- Vue Router для навигации
- Vue I18n для интернационализации
- @twa-dev/sdk для интеграции с Telegram Web App

## Установка и локальный запуск

```sh
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev
```

## Как тестировать интеграцию с Telegram в режиме разработки
1. Запустить приложения на localhost
2. Установить ngrok https://dashboard.ngrok.com/get-started/setup
3. Настроить себе постоянный url (Static Domain) в ngrok
4. Через ngrok прокинуть туннель на https сервер: `ngrok http http://localhost:5173`
5. Создать личного Telegram бота для тестирования через @BotFather
6. Указать в настройках бота Web App URL равный ссылке на туннель от ngrok
7. Токен от бота указать в файле .env в виде переменной VITE_TELEGRAM_BOT_TOKEN
8. Попросить @the_real_daniil скинуть тебе другие переменные из .env и добавить домен ngrok в список разрешенных
      

## Как протестировать интеграцию с Telegram на preview

1. Создать и запушить ветку с кодом
2. Подождать, пока vercel выкатит на preview-стенд вашу версию приложения
   <img width="1023" height="520" alt="image" src="https://github.com/user-attachments/assets/c92c208c-9032-4a5a-80a4-5d3d3c6349e3" />
3. Создать личного Telegram бота для тестирования через @BotFather
4. Указать в настройках бота Web App URL равный ссылке на preview-стенд
5. Для переключения между ветками на preview-стенде воспользоваться vercel dev tools
   <img width="710" height="631" alt="image" src="https://github.com/user-attachments/assets/47cd0a31-2afd-4637-9d4a-ddd754e4ac4b" />
6. Приложение можно тестировать вместе с ботом!

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

## Лицензия

MIT
