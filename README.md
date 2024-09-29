# IDOL CS TEMP

Starting from 27 Sept 2024, this is the official repository for the idolcs.com website, a better and stable web app shall be developed, till that this shall serve as the official website.


## Local development

1. Clone the github repo

   ```shell
   git clone https://github.com/idolcs/idolcstemp .
   ```
2. Install php dependencies
   
    ```shell
    composer install
    ```
3. Install node modules
   
   ```shell
   npm i
   ```
4. Make env file
   
   ```shell
   cp .env.example .env
   ```
5. Run migrations
   
   ```shell
   php artisan migrate
   ```
6. Run the node development server
   
   ```shell
   npm run dev
   ```
7. Run the php server
   
   ```shell
   php artisan serve
   ```
