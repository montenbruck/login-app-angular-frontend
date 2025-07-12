// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { routes } from './app.routes';

// Importar los guardias y servicios core
import { AuthGuard } from './core/guards/auth.guard';
import { ApiService } from './core/services/api.service';
import { AuthService } from './core/services/auth.service';

// Importar los servicios de la característica de autenticación
import { LoginService } from './features/auth/services/login.service';
// Importar la implementación del repositorio de autenticación
import { AuthApiRepository } from './features/auth/infrastructure/auth-api.repository';
// Importar el caso de uso de login
import { LoginUseCase } from './features/auth/domain/login.usecase';
// Importar la interfaz abstracta del repositorio de autenticación
import { AuthRepository } from './features/auth/domain/auth.repository';

// Importar los servicios de la característica de usuarios
import { UserService } from './features/users/services/user.service';
// Importar la implementación del repositorio de usuarios
import { UserApiRepository } from './features/users/infrastructure/user-api.repository';
// Importar los casos de uso de usuarios
import { GetAllUsersUseCase } from './features/users/domain/get-all-users.usecase';
import { GetUserByIdUseCase } from './features/users/domain/get-user-by-id.usecase';
import { CreateUserUseCase } from './features/users/domain/create-user.usecase';
import { UpdateUserUseCase } from './features/users/domain/update-user.usecase';
import { DeleteUserUseCase } from './features/users/domain/delete-user.usecase';
// Importar la interfaz abstracta del repositorio de usuarios
import { UserRepository } from './features/users/domain/user.repository';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(ReactiveFormsModule),
    // Proveedores para Core
    AuthGuard,
    ApiService,
    AuthService,
    // Proveedores para la Feature de Autenticación
    LoginService,
    LoginUseCase,
    { provide: AuthRepository, useClass: AuthApiRepository }, // Provee la implementación concreta para AuthRepository
    // Proveedores para la Feature de Usuarios
    UserService,
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    { provide: UserRepository, useClass: UserApiRepository } // Provee la implementación concreta para UserRepository
  ]
};
