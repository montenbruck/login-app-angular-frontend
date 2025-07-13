// src/app/features/auth/services/login.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginUseCase } from '../domain/login.usecase'; // Importa el caso de uso de login
import { Credentials } from '../../../core/models/credentials.model'; // Importa el modelo de credenciales
import { AuthResponse } from '../../../core/models/auth-response.model'; // Importa el modelo de respuesta de autenticación
import { AuthService } from '../../../core/services/auth.service'; // Importa el servicio de autenticación core

/**
 * @Injectable()
 * Servicio de aplicación para la gestión del login.
 * Este servicio actúa como un orquestador, utilizando el caso de uso de dominio
 * para la lógica de negocio y el servicio de autenticación core para gestionar el estado.
 */
@Injectable({
  providedIn: 'root' // Puede ser proporcionado en la raíz para que esté disponible globalmente
})
export class LoginService {
  /**
   * Constructor del servicio de login.
   * @param loginUseCase - El caso de uso de login inyectado, que contiene la lógica de negocio.
   * @param authService - El servicio de autenticación core inyectado, para gestionar el estado de la sesión.
   */
  constructor(
    private loginUseCase: LoginUseCase,
    private authService: AuthService
  ) {}

  /**
   * login(): Realiza la operación de inicio de sesión.
   * Delega al LoginUseCase para la lógica de autenticación y luego usa AuthService
   * para almacenar la respuesta de autenticación (token y usuario).
   * @param credentials - Las credenciales del usuario.
   * @returns Observable<AuthResponse> - La respuesta de autenticación.
   */
  login(credentials: Credentials): Observable<AuthResponse> {
    return this.loginUseCase.execute(credentials).pipe(
      tap(authResponse => {
        // Usar el método login de AuthService para almacenar usuario y token
        this.authService.login(authResponse);
      })
    );
  }
}
