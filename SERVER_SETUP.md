# Инструкция по настройке российского VDS сервера

## Предварительные требования

- VDS сервер с Ubuntu 20.04+ или CentOS 8+
- Домен, направленный на IP сервера
- SSH доступ к серверу

## 1. Подключение к серверу

```bash
ssh root@your-server-ip
```

## 2. Обновление системы

```bash
# Ubuntu/Debian
apt update && apt upgrade -y

# CentOS/RHEL
yum update -y
```

## 3. Установка Node.js и npm

```bash
# Установка Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Проверка версий
node --version
npm --version
```

## 4. Установка PM2

```bash
npm install -g pm2
pm2 startup
```

## 5. Установка Nginx

```bash
# Ubuntu/Debian
apt install nginx -y

# CentOS/RHEL
yum install nginx -y

# Запуск и автозапуск
systemctl start nginx
systemctl enable nginx
```

## 6. Настройка файрвола

```bash
# Ubuntu/Debian
ufw allow ssh
ufw allow 80
ufw allow 443
ufw enable

# CentOS/RHEL
firewall-cmd --permanent --add-service=ssh
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload
```

## 7. Настройка SSL с Let's Encrypt

```bash
# Установка Certbot
apt install certbot python3-certbot-nginx -y

# Получение SSL сертификата
certbot --nginx -d your-domain.ru -d www.your-domain.ru

# Автообновление сертификатов
crontab -e
# Добавить строку:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## 8. Настройка Nginx

```bash
# Копирование конфигурации
cp nginx.conf /etc/nginx/sites-available/logistics-app

# Создание символической ссылки
ln -s /etc/nginx/sites-available/logistics-app /etc/nginx/sites-enabled/

# Удаление дефолтной конфигурации
rm /etc/nginx/sites-enabled/default

# Проверка конфигурации
nginx -t

# Перезапуск Nginx
systemctl restart nginx
```

## 9. Загрузка проекта на сервер

```bash
# Создание директории для проекта
mkdir -p /var/www/logistics-app
cd /var/www/logistics-app

# Клонирование или загрузка проекта
# git clone your-repository.git
# или загрузить файлы через SCP/SFTP

# Установка зависимостей
npm install

# Создание .env файла
cp env.example .env
nano .env
# Заполнить переменные окружения
```

## 10. Настройка переменных окружения

```bash
# Редактирование .env файла
nano .env

# Содержимое:
NODE_ENV=production
PORT=3000
RESEND_API_KEY=your_actual_resend_api_key
DOMAIN=your-domain.ru
```

## 11. Сборка и запуск приложения

```bash
# Сборка React приложения
npm run build

# Запуск через PM2
pm2 start ecosystem.config.js --env production

# Сохранение конфигурации PM2
pm2 save

# Проверка статуса
pm2 status
```

## 12. Настройка автозапуска

```bash
# Настройка автозапуска PM2
pm2 startup
# Выполнить команду, которую выдаст PM2

# Сохранение текущих процессов
pm2 save
```

## 13. Мониторинг и логи

```bash
# Просмотр логов PM2
pm2 logs logistics-app

# Просмотр логов Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Мониторинг ресурсов
pm2 monit
```

## 14. Обновление приложения

```bash
# Остановка приложения
pm2 stop logistics-app

# Обновление кода
# git pull или загрузка новых файлов

# Установка зависимостей
npm install

# Сборка
npm run build

# Запуск
pm2 start ecosystem.config.js --env production
pm2 save
```

## 15. Полезные команды

```bash
# Перезапуск приложения
pm2 restart logistics-app

# Перезапуск Nginx
systemctl restart nginx

# Проверка статуса сервисов
systemctl status nginx
pm2 status

# Просмотр использования ресурсов
htop
df -h
free -h
```

## Устранение неполадок

### Проблемы с портами
```bash
# Проверка занятых портов
netstat -tulpn | grep :3000
lsof -i :3000

# Убийство процесса
kill -9 PID
```

### Проблемы с правами доступа
```bash
# Установка правильных прав
chown -R www-data:www-data /var/www/logistics-app
chmod -R 755 /var/www/logistics-app
```

### Проблемы с SSL
```bash
# Проверка SSL сертификата
certbot certificates

# Обновление сертификата
certbot renew --force-renewal
```

## Безопасность

1. Регулярно обновляйте систему
2. Используйте сложные пароли
3. Настройте fail2ban для защиты от брутфорса
4. Регулярно проверяйте логи
5. Используйте только HTTPS
6. Настройте резервное копирование

## Резервное копирование

```bash
# Создание бэкапа
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/logistics-app

# Восстановление
tar -xzf backup-YYYYMMDD.tar.gz -C /
```
