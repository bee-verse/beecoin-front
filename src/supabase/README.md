# Supabase API для Beecoin

Этот модуль предоставляет интерфейсы и функции для работы с базой данных Supabase в проекте Beecoin.

## Структура

- `types.ts` - типы данных для работы с Supabase
- `supabase.ts` - инициализация клиента Supabase
- `functions/` - функции для работы с API
  - `tasks.ts` - функции для работы с задачами
  - `users.ts` - функции для работы с пользователями
  - `tap.ts` - функции для работы с балансом пользователя
  - `userTasks.ts` - функции для работы с задачами пользователей
  - `index.ts` - экспорт всех функций

## Примеры использования

### Работа с задачами

```typescript
import { getPublicTasks, getTaskById, createTask, updateTask, deleteTask } from '@/supabase/functions';

// Получение всех публичных задач
const { data: tasks, error } = await getPublicTasks();

// Получение задачи по ID
const { data: task, error } = await getTaskById('task-id');

// Создание новой задачи
const { data: newTask, error } = await createTask({
  title: 'Новая задача',
  description: 'Описание задачи',
  reward: 10,
  isPublic: true
});

// Обновление задачи
const { data: updatedTask, error } = await updateTask('task-id', {
  title: 'Обновленная задача',
  reward: 15
});

// Удаление задачи
const { error } = await deleteTask('task-id');
```

### Работа с пользователями

```typescript
import { getUserById, getUserByTgId, createUser, updateUser, incrementUserTaps } from '@/supabase/functions';

// Получение пользователя по ID
const { data: user, error } = await getUserById('user-id');

// Получение пользователя по Telegram ID
const { data: user, error } = await getUserByTgId('telegram-id');

// Создание нового пользователя
const { data: newUser, error } = await createUser({
  tgId: 'telegram-id',
  username: 'username'
});

// Обновление данных пользователя
const { data: updatedUser, error } = await updateUser('user-id', {
  username: 'new-username'
});

// Увеличение счетчика taps
const { data: user, error } = await incrementUserTaps('user-id');
```

### Работа с балансом пользователя

```typescript
import { updateUserBalance, addToUserBalance, subtractFromUserBalance } from '@/supabase/functions';

// Обновление баланса пользователя
const { data: user, error } = await updateUserBalance('user-id', 10); // Пополнение на 10
const { data: user, error } = await updateUserBalance('user-id', -5); // Списание 5

// Пополнение баланса
const { data: user, error } = await addToUserBalance('user-id', 10);

// Списание с баланса
const { data: user, error } = await subtractFromUserBalance('user-id', 5);
```

### Работа с задачами пользователей

```typescript
import { getUserTasks, getUserTaskById, assignTaskToUser, completeUserTask, deleteUserTask } from '@/supabase/functions';

// Получение всех задач пользователя
const { data: userTasks, error } = await getUserTasks('user-id');

// Получение задачи пользователя по ID
const { data: userTask, error } = await getUserTaskById('user-task-id');

// Назначение задачи пользователю
const { data: userTask, error } = await assignTaskToUser('user-id', 'task-id');

// Отметка задачи как выполненной и начисление награды
const { data: userTask, error } = await completeUserTask('user-task-id');

// Удаление задачи пользователя
const { error } = await deleteUserTask('user-task-id');
```