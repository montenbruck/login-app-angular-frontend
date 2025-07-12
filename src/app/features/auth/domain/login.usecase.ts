// src/app/features/auth/domain/login.usecase.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from '../../../core/models/credentials.model'; // Importa el modelo de credenciales
import { AuthResponse } from '../../../core/models/auth-response.model'; // Importa el modelo de respuesta de autenticación
import { AuthRepository } from './auth.repository'; // Importa el repositorio de autenticación

/**
 * @Injectable()
 * Caso de uso para la operación de inicio de sesión.
 * Esta clase orquesta la lógica de negocio para el login,
 * utilizando el AuthRepository para interactuar con la infraestructura.
 */
@Injectable({
  providedIn: 'root' // Hace que este caso de uso esté disponible en toda la aplicación
})
export class LoginUseCase {

  /**
   * Constructor del caso de uso.
   * @param authRepository - Instancia del repositorio de autenticación inyectada.
   * El repositorio es la interfaz de la capa de dominio
   * para interactuar con la infraestructura de autenticación.
   */
  constructor(private authRepository: AuthRepository) {}

  /**
   * execute(): Método principal del caso de uso para realizar el login.
   * @param credentials - Las credenciales del usuario (nombre de usuario y contraseña).
   * @returns Observable<AuthResponse> - Un observable que emite la respuesta de autenticación
   * (usuario y token JWT) si el login es exitoso.
   */
  execute(credentials: Credentials): Observable<AuthResponse> {
    // Delega la operación de login al repositorio.
    // El caso de uso no se preocupa por los detalles de cómo se realiza el login (HTTP, base de datos, etc.),
    // solo de que el repositorio maneje esa interacción.
    return this.authRepository.login(credentials);
  }
}