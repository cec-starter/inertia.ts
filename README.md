
# Laravel Inertia React Project

  

A modern web application built with Laravel 11, Inertia.js, React, and TypeScript, featuring a beautiful UI with Tailwind CSS and Shadcn UI components.

  

## Tech Stack

  

-  **Backend:**

- PHP 8.2

- Laravel 11.x

- Spatie Permission (Role-based access control)
  

-  **Frontend:**

- React 18

- TypeScript

- Inertia.js

- Tailwind CSS

- Shadcn UI Components

  

## Prerequisites

  

Make sure you have the following installed on your system:

  

- PHP >= 8.2

- Composer

- Node.js >= 18

- npm or yarn

- MySQL/PostgreSQL

  

## Installation

  

1. Clone the repository:

```bash

git  clone  <repository-url>

cd  inertia.ts

```

  

2. Install PHP dependencies:

```bash

composer  install

```

  

3. Install Node.js dependencies:

```bash

npm  install

```

  

4. Create environment file:

```bash

cp  .env.example  .env

```

  

5. Generate application key:

```bash

php  artisan  key:generate

```

  

6. Configure your database in the `.env` file:

```env

DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=your_database

DB_USERNAME=your_username

DB_PASSWORD=your_password

```

  

7. Run database migrations and seeders:

```bash

php  artisan  migrate  --seed

```

  

## Development

  

1. Start the Laravel development server:

```bash

php  artisan  serve

```

  

2. Start the Vite development server:

```bash

npm  run  dev

```

  

Your application will be available at `http://localhost:8000`

  

## Building for Production

  

1. Build frontend assets:

```bash

npm  run  build

```

  

2. Configure your production environment variables in `.env`

  

3. Deploy to your production server

  

## Server-Side Rendering (SSR)

  

This project supports Server-Side Rendering through Inertia SSR. To use SSR:

  

1. Build SSR bundle:

```bash

npm  run  build

```

  

2. Start the SSR server:

```bash

php  artisan  inertia:start-ssr

```

  

3. In a separate terminal, run your Laravel application:

```bash

php  artisan  serve

```

  

### Benefits of SSR

  

- 🚀 Improved Initial Page Load

- 🔍 Better SEO Performance

- 📱 Enhanced Mobile Performance

- 🌐 Improved Social Media Sharing

  

### SSR Configuration

  

1. Enable SSR in your `.env` file:

```env

INERTIA_SSR_ENABLED=true

```

  

2. Configure SSR port (default is 13714):

```env

INERTIA_SSR_PORT=13714

```

  

3. For production, it's recommended to use a process manager like PM2:

```bash

npm  install  pm2  -g

pm2  start  bootstrap/ssr/ssr.mjs  --name  "inertia-ssr"

```

  

## Features

  

- 🔐 Authentication System

- 👥 Role-Based Access Control

- 🎨 Modern UI with Shadcn Components

- 📱 Responsive Design

- ⚡ Type-Safe Development with TypeScript

- 🔄 Real-time Form Validation

- 🎯 Server-Side Rendering Support

  

## Project Structure

  

-  `app/` - Contains Laravel backend code

-  `resources/js/` - Contains React frontend code

-  `components/` - Reusable React components

-  `layouts/` - Page layouts

-  `pages/` - Page components

-  `types/` - TypeScript type definitions

  

## Contributing

  

1. Fork the repository

2. Create your feature branch (`git checkout -b feature/amazing-feature`)

3. Commit your changes (`git commit -m 'Add some amazing feature'`)

4. Push to the branch (`git push origin feature/amazing-feature`)

5. Open a Pull Request

  

## License

  

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).