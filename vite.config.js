import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from "@vitejs/plugin-react"

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@" : "/resources/js",
        }
    },
    server: {
        host: '0.0.0.0', // Bind to all IPs
        port: 5173, // Keep the port as 5173 or change it if necessary
        hmr: {
          host: '192.168.0.101', // Replace with your machine’s local IP address
          port: 5173, // Ensure this matches the server port
        },
      },
});