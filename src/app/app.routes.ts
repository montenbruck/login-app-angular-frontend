// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard'; // Importar el guardia de autenticación
import { LoginComponent } from './features/auth/components/login/login.component'; // Importar el componente de login

// Definición de las rutas de la aplicación
export const routes: Routes = [
  // Ruta por defecto: redirige a /login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Ruta para el componente de login
  {
    path: 'login',
    component: LoginComponent
  },

  // Rutas para la característica de usuarios (carga perezosa y protegida por AuthGuard)
  {
    path: 'users',
    // Aquí se cargará el módulo de usuarios. Necesitarás crear el archivo
    // src/app/features/users/components/user-list/user-list.component.ts
    // y src/app/features/users/components/user-form/user-form.component.ts
    // en pasos posteriores.
    loadComponent: () => import('./features/users/components/user-list/user-list.component').then(m => m.UserListComponent),
    canActivate: [AuthGuard] // Protege esta ruta y sus hijos con AuthGuard
  },
  {
    path: 'users/new',
    loadComponent: () => import('./features/users/components/user-form/user-form.component').then(m => m.UserFormComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:id/edit',
    loadComponent: () => import('./features/users/components/user-form/user-form.component').then(m => m.UserFormComponent),
    canActivate: [AuthGuard]
  },

  // Ruta comodín para cualquier URL no definida: redirige a /login
  { path: '**', redirectTo: 'login' }
];
