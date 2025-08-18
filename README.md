# Logistics App - Vite + React + Node.js

Современное веб-приложение для логистической компании, развернутое на российском VDS сервере.

## 🚀 Технологии

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express
- **Стили**: Tailwind CSS
- **Сервер**: PM2 + Nginx + SSL
- **Развертывание**: Автоматизированные скрипты

## 📋 Требования

- Node.js 18+
- npm 9+
- VDS сервер с Ubuntu 20.04+ или CentOS 8+

## 🛠️ Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

## 🌐 Развертывание на VDS

### Быстрая настройка

1. **Загрузите проект на сервер**
   ```bash
   scp -r . root@your-server-ip:/var/www/logistics-app/
   ```

2. **Запустите автоматическую настройку**
   ```bash
   ssh root@your-server-ip
   cd /var/www/logistics-app
   chmod +x server-setup.sh
   ./server-setup.sh
   ```

3. **Настройте переменные окружения**
   ```bash
   cp env.example .env
   nano .env
   # Заполните RESEND_API_KEY и DOMAIN
   ```

4. **Разверните приложение**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

### Подробная инструкция

См. файл `SERVER_SETUP.md` для детальной настройки сервера.

## 📁 Структура проекта

```
logistics_vite/
├── src/                    # Исходный код React приложения
├── server/                 # Node.js сервер
├── public/                 # Статические файлы
├── ecosystem.config.js     # Конфигурация PM2
├── nginx.conf             # Конфигурация Nginx
├── deploy.sh              # Скрипт развертывания
├── server-setup.sh        # Автоматическая настройка сервера
├── SERVER_SETUP.md        # Подробная инструкция по настройке
└── MIGRATION_GUIDE.md     # Руководство по миграции
```

## 🔧 Конфигурация

### Переменные окружения

Создайте файл `.env` на основе `env.example`:

```env
NODE_ENV=production
PORT=3000
RESEND_API_KEY=your_resend_api_key
DOMAIN=your-domain.ru
```

### PM2

Приложение настроено для работы с PM2 в кластерном режиме:

```bash
# Запуск
pm2 start ecosystem.config.js --env production

# Мониторинг
pm2 monit

# Логи
pm2 logs logistics-app
```

### Nginx

Nginx настроен как reverse proxy с поддержкой SSL:

```bash
# Проверка конфигурации
nginx -t

# Перезапуск
systemctl restart nginx
```

## 📊 Мониторинг

### PM2 мониторинг
- Автоматический перезапуск при сбоях
- Кластерный режим для высокой производительности
- Логирование ошибок и вывода

### Nginx мониторинг
- Логи доступа и ошибок
- SSL сертификаты
- Производительность проксирования

## 🔒 Безопасность

- Принудительное HTTPS
- Безопасные заголовки
- Файрвол настроен автоматически
- Изоляция пользователей
- SSL/TLS 1.2+ поддержка

## 📈 Производительность

- Gzip сжатие
- Кэширование статических файлов
- HTTP/2 поддержка
- Кластерный режим PM2
- Оптимизированная сборка Vite

## 🚨 Устранение неполадок

### Частые проблемы

1. **Порт 3000 занят**
   ```bash
   lsof -i :3000
   kill -9 PID
   ```

2. **Проблемы с правами доступа**
   ```bash
   chown -R logistics:logistics /var/www/logistics-app
   ```

3. **Ошибки Nginx**
   ```bash
   nginx -t
   systemctl restart nginx
   ```

### Логи

```bash
# PM2 логи
pm2 logs logistics-app

# Nginx логи
tail -f /var/log/nginx/error.log
```

## 📚 Документация

- `SERVER_SETUP.md` - Настройка сервера
- `MIGRATION_GUIDE.md` - Миграция с Vercel
- `ecosystem.config.js` - Конфигурация PM2
- `nginx.conf` - Конфигурация Nginx

## 🤝 Поддержка

При возникновении проблем:

1. Проверьте логи: `pm2 logs` и `tail -f /var/log/nginx/error.log`
2. Проверьте статус сервисов: `pm2 status` и `systemctl status nginx`
3. Обратитесь к документации в `SERVER_SETUP.md`

## 📄 Лицензия

MIT License
