// src/environments/environment.ts
// Este archivo es el entorno por defecto para desarrollo.
// La URL de la API apuntará a tu backend local durante el desarrollo.
export const environment = {
  production: false, // Indica que no es el entorno de producción
  testing: false,    // Indica que no es el entorno de testing
  // URL de tu API de backend cuando desarrollas localmente.
  // Asegúrate de que coincida con el puerto donde se ejecutará tu backend NestJS (por defecto 3000).
  apiUrl: 'http://localhost:3000/api' // '/api' es el prefijo global que configuraremos en NestJS
};
