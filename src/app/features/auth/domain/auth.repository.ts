// src/app/features/auth/domain/auth.repository.ts
import { Observable } from 'rxjs';
import { Credentials } from '../../../core/models/credentials.model'; // Importa el modelo de credenciales
import { AuthResponse } from '../../../core/models/auth-response.model'; // Importa el modelo de respuesta de autenticación

/**
 * Clase abstracta (contrato) para el repositorio de autenticación.
 * Esta interfaz define las operaciones que la capa de dominio necesita de la infraestructura
 * para gestionar la autenticación, sin preocuparse por los detalles de implementación.
 *
 * En DDD, los repositorios son parte de la capa de Dominio, ya que el Dominio define
 * qué necesita persistir o recuperar, no cómo.
 */
export abstract class AuthRepository {
  /**
   * login(): Método abstracto para iniciar sesión.
   * @param credentials - Las credenciales del usuario (username y password).
   * @returns Observable<AuthResponse> - Un observable que emite la respuesta de autenticación
   * (usuario y token JWT) si el login es exitoso.
   */
  abstract login(credentials: Credentials): Observable<AuthResponse>;
}
