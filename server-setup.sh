#!/bin/bash

# Автоматическая настройка сервера для logistics app
# Запускать от имени root на чистом сервере

set -e

echo "🚀 Начинаем настройку сервера для logistics app..."

# Проверка на root права
if [[ $EUID -ne 0 ]]; then
   echo "❌ Этот скрипт должен быть запущен от имени root"
   exit 1
fi

# Определение дистрибутива
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID
else
    echo "❌ Не удалось определить дистрибутив"
    exit 1
fi

echo "📋 Операционная система: $OS $VER"

# Обновление системы
echo "🔄 Обновление системы..."
if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
    apt update && apt upgrade -y
elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
    yum update -y
else
    echo "❌ Неподдерживаемый дистрибутив: $OS"
    exit 1
fi

# Установка необходимых пакетов
echo "📦 Установка необходимых пакетов..."
if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
    apt install -y curl wget git build-essential
elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
    yum install -y curl wget git gcc gcc-c++ make
fi

# Установка Node.js 18.x
echo "🟢 Установка Node.js 18.x..."
if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    apt-get install -y nodejs
elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
    yum install -y nodejs
fi

# Проверка установки Node.js
echo "✅ Node.js версия: $(node --version)"
echo "✅ npm версия: $(npm --version)"

# Установка PM2
echo "📊 Установка PM2..."
npm install -g pm2

# Настройка автозапуска PM2
echo "🔄 Настройка автозапуска PM2..."
pm2 startup

# Установка Nginx
echo "🌐 Установка Nginx..."
if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
    apt install -y nginx
elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
    yum install -y nginx
fi

# Запуск и включение автозапуска Nginx
systemctl start nginx
systemctl enable nginx

# Настройка файрвола
echo "🔥 Настройка файрвола..."
if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
    ufw allow ssh
    ufw allow 80
    ufw allow 443
    ufw --force enable
elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
    firewall-cmd --permanent --add-service=ssh
    firewall-cmd --permanent --add-service=http
    firewall-cmd --permanent --add-service=https
    firewall-cmd --reload
fi

# Установка Certbot для SSL
echo "🔒 Установка Certbot для SSL..."
if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
    apt install -y certbot python3-certbot-nginx
elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
    yum install -y certbot python3-certbot-nginx
fi

# Создание директории для проекта
echo "📁 Создание директории для проекта..."
mkdir -p /var/www/logistics-app
cd /var/www/logistics-app

# Создание пользователя для приложения
echo "👤 Создание пользователя для приложения..."
if ! id "logistics" &>/dev/null; then
    useradd -r -s /bin/false logistics
fi

# Установка прав доступа
chown -R logistics:logistics /var/www/logistics-app
chmod -R 755 /var/www/logistics-app

# Создание директории для логов
mkdir -p /var/www/logistics-app/logs
chown -R logistics:logistics /var/www/logistics-app/logs

echo "✅ Базовая настройка сервера завершена!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Загрузите файлы проекта в /var/www/logistics-app"
echo "2. Настройте .env файл с переменными окружения"
echo "3. Выполните npm install и npm run build"
echo "4. Настройте Nginx конфигурацию (скопируйте nginx.conf)"
echo "5. Получите SSL сертификат: certbot --nginx -d your-domain.ru"
echo "6. Запустите приложение: pm2 start ecosystem.config.js --env production"
echo ""
echo "📚 Подробная инструкция в файле SERVER_SETUP.md"
echo "🚀 Скрипт развертывания: ./deploy.sh"
