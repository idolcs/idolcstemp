FROM php:8.2-apache
# Install dependencies and PHP extensions in a single layer
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libzip-dev \
    nano \
    zip \
    nodejs \
    npm && \
    rm -rf /var/lib/apt/lists/* && \
    docker-php-ext-install pdo_mysql zip && \
    a2enmod rewrite && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# Configure Apache
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf && \
    sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
# Copy application and install dependencies
COPY . /var/www/html/
WORKDIR /var/www/html
# Install PHP dependencies and Node.js dependencies, then build assets
RUN composer install --no-dev --optimize-autoloader && \
    npm install && \
    npm run build && \
    chown -R www-data:www-data storage bootstrap/cache
CMD ["apache2-foreground"]
