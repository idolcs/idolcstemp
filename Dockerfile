# -------------------------------------------------
# 1. Base image
# -------------------------------------------------
FROM php:8.2-apache

# -------------------------------------------------
# 2. System + PHP extensions (single layer)
# -------------------------------------------------
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libzip-dev \
        zip \
        nodejs \
        npm \
        nano && \
    rm -rf /var/lib/apt/lists/* && \
    docker-php-ext-install pdo_mysql zip && \
    a2enmod rewrite headers

# -------------------------------------------------
# 3. Apache – document root + HTTPS redirect
# -------------------------------------------------
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e "s!/var/www/html!${APACHE_DOCUMENT_ROOT}!g" \
        /etc/apache2/sites-available/*.conf \
        /etc/apache2/apache2.conf \
        /etc/apache2/conf-available/*.conf

# Enable a virtual host that forces HTTPS
RUN { \
      echo "<VirtualHost *:80>"; \
      echo "    ServerName localhost"; \
      echo "    DocumentRoot ${APACHE_DOCUMENT_ROOT}"; \
      echo "    RewriteEngine On"; \
      echo "    # Redirect everything to HTTPS (except health-checks)"; \
      echo "    RewriteCond %{HTTP:X-Forwarded-Proto} !https [NC]"; \
      echo "    RewriteCond %{REQUEST_URI} !^/health$"; \
      echo "    RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]"; \
      echo "    # Let Laravel know the original protocol"; \
      echo "    RequestHeader set X-Forwarded-Proto \"https\""; \
      echo "</VirtualHost>"; \
    } > /etc/apache2/sites-available/000-default.conf && \
    a2ensite 000-default.conf

# -------------------------------------------------
# 4. Copy source + install deps
# -------------------------------------------------
COPY . /var/www/html/
WORKDIR /var/www/html

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    composer install --no-dev --optimize-autoloader --no-interaction && \
    # Node assets
    npm ci && \
    npm run build && \
    # Permissions
    chown -R www-data:www-data storage bootstrap/cache && \
    # Clean up
    rm -rf /var/www/html/node_modules /root/.npm /root/.composer

# -------------------------------------------------
# 5. Laravel env – force HTTPS
# -------------------------------------------------
ENV APP_ENV=production \
    APP_URL=https://cs.cdoe.in \
    ASSET_URL=https://cs.cdoe.in \
    TRUST_PROXIES=*

# -------------------------------------------------
# 6. Entrypoint – clear caches on every start
# -------------------------------------------------
COPY <<'EOF' /usr/local/bin/entrypoint.sh
#!/bin/bash
set -e
php artisan config:cache
php artisan route:cache
php artisan view:cache
exec apache2-foreground "$@"
EOF
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["apache2-foreground"]
