# Руководство по миграции с Vercel на российский VDS

## Обзор изменений

Этот проект был адаптирован для развертывания на российском VDS сервере с использованием:
- **PM2** - для управления Node.js процессами
- **Nginx** - для веб-сервера и проксирования
- **SSL** - для безопасного соединения
- **Автоматические скрипты** - для упрощения развертывания

## Что изменилось

### 1. Серверная часть
- Обновлен `server/index.js` для работы в продакшене
- Добавлена поддержка статических файлов
- Настроена обработка React роутинга

### 2. Конфигурация PM2
- Создан `ecosystem.config.js` для управления процессами
- Настроен кластерный режим для лучшей производительности
- Добавлено логирование и мониторинг

### 3. Nginx конфигурация
- Создан `nginx.conf` с настройками безопасности
- Настроено проксирование на Node.js приложение
- Добавлена поддержка SSL и HTTP/2

### 4. Скрипты автоматизации
- `server-setup.sh` - автоматическая настройка сервера
- `deploy.sh` - скрипт развертывания приложения

## Пошаговая миграция

### Шаг 1: Подготовка VDS сервера
```bash
# Загрузите файлы на сервер
scp -r . root@your-server-ip:/var/www/logistics-app/

# Подключитесь к серверу
ssh root@your-server-ip

# Перейдите в директорию проекта
cd /var/www/logistics-app

# Запустите автоматическую настройку
chmod +x server-setup.sh
./server-setup.sh
```

### Шаг 2: Настройка переменных окружения
```bash
# Скопируйте пример файла
cp env.example .env

# Отредактируйте .env файл
nano .env

# Заполните необходимые переменные:
NODE_ENV=production
PORT=3000
RESEND_API_KEY=your_actual_resend_api_key
DOMAIN=your-domain.ru
```

### Шаг 3: Настройка Nginx
```bash
# Скопируйте конфигурацию Nginx
cp nginx.conf /etc/nginx/sites-available/logistics-app

# Создайте символическую ссылку
ln -s /etc/nginx/sites-available/logistics-app /etc/nginx/sites-enabled/

# Удалите дефолтную конфигурацию
rm /etc/nginx/sites-enabled/default

# Проверьте конфигурацию
nginx -t

# Перезапустите Nginx
systemctl restart nginx
```

### Шаг 4: Получение SSL сертификата
```bash
# Получите SSL сертификат от Let's Encrypt
certbot --nginx -d your-domain.ru -d www.your-domain.ru

# Настройте автообновление
crontab -e
# Добавьте строку: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Шаг 5: Развертывание приложения
```bash
# Установите зависимости
npm install

# Соберите приложение
npm run build

# Запустите через PM2
pm2 start ecosystem.config.js --env production

# Сохраните конфигурацию PM2
pm2 save

# Настройте автозапуск
pm2 startup
```

## Проверка работоспособности

### 1. Проверка PM2
```bash
pm2 status
pm2 logs logistics-app
```

### 2. Проверка Nginx
```bash
systemctl status nginx
nginx -t
```

### 3. Проверка портов
```bash
netstat -tulpn | grep :3000
netstat -tulpn | grep :80
netstat -tulpn | grep :443
```

### 4. Проверка SSL
```bash
# Проверьте SSL сертификат
openssl s_client -connect your-domain.ru:443 -servername your-domain.ru
```

## Обновление приложения

### Автоматическое обновление
```bash
# Используйте скрипт развертывания
chmod +x deploy.sh
./deploy.sh
```

### Ручное обновление
```bash
# Остановите приложение
pm2 stop logistics-app

# Обновите код
git pull  # или загрузите новые файлы

# Установите зависимости
npm install

# Соберите приложение
npm run build

# Запустите приложение
pm2 start ecosystem.config.js --env production
pm2 save
```

## Мониторинг и логи

### PM2 мониторинг
```bash
# Веб-интерфейс мониторинга
pm2 monit

# Логи приложения
pm2 logs logistics-app

# Статистика процессов
pm2 show logistics-app
```

### Nginx логи
```bash
# Логи доступа
tail -f /var/log/nginx/access.log

# Логи ошибок
tail -f /var/log/nginx/error.log
```

### Системные ресурсы
```bash
# Мониторинг ресурсов
htop
df -h
free -h

# Проверка нагрузки
uptime
```

## Устранение неполадок

### Проблемы с портами
```bash
# Проверьте занятые порты
lsof -i :3000
lsof -i :80
lsof -i :443

# Убейте процесс если нужно
kill -9 PID
```

### Проблемы с правами доступа
```bash
# Установите правильные права
chown -R logistics:logistics /var/www/logistics-app
chmod -R 755 /var/www/logistics-app
```

### Проблемы с SSL
```bash
# Проверьте SSL сертификаты
certbot certificates

# Обновите сертификаты
certbot renew --force-renewal
```

### Проблемы с Nginx
```bash
# Проверьте конфигурацию
nginx -t

# Перезапустите Nginx
systemctl restart nginx

# Проверьте статус
systemctl status nginx
```

## Безопасность

### Основные меры безопасности
1. **Файрвол** - настроен автоматически
2. **SSL/TLS** - принудительное HTTPS
3. **Безопасные заголовки** - настроены в Nginx
4. **Изоляция пользователей** - отдельный пользователь для приложения

### Дополнительные меры
```bash
# Установка fail2ban для защиты от брутфорса
apt install fail2ban -y

# Настройка UFW (если не настроен автоматически)
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80
ufw allow 443
ufw enable
```

## Резервное копирование

### Автоматическое резервное копирование
```bash
# Создайте скрипт для бэкапа
nano /root/backup.sh

# Содержимое:
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf $BACKUP_DIR/logistics-app_$DATE.tar.gz /var/www/logistics-app
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

# Сделайте скрипт исполняемым
chmod +x /root/backup.sh

# Добавьте в cron для ежедневного бэкапа
crontab -e
# Добавьте строку: 0 2 * * * /root/backup.sh
```

## Производительность

### Оптимизация Nginx
- Gzip сжатие включено
- Кэширование статических файлов
- HTTP/2 поддержка

### Оптимизация PM2
- Кластерный режим для использования всех CPU ядер
- Автоматический перезапуск при сбоях
- Мониторинг ресурсов

## Поддержка

При возникновении проблем:
1. Проверьте логи: `pm2 logs` и `tail -f /var/log/nginx/error.log`
2. Проверьте статус сервисов: `pm2 status` и `systemctl status nginx`
3. Проверьте конфигурацию: `nginx -t`
4. Обратитесь к документации в `SERVER_SETUP.md`
