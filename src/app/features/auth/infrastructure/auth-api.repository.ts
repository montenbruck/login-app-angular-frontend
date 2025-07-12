// src/app/features/auth/infrastructure/auth-api.repository.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '../domain/auth.repository'; // Importa la interfaz abstracta
import { ApiService } from '../../../core/services/api.service'; // Importa el servicio API core
import { Credentials } from '../../../core/models/credentials.model'; // Importa el modelo de credenciales
import { AuthResponse } from '../../../core/models/auth-response.model'; // Importa el modelo de respuesta de autenticación

/**
 * @Injectable()
 * Implementación concreta del AuthRepository.
 * Esta clase se encarga de la comunicación real con el backend para las operaciones de autenticación,
 * utilizando el ApiService.
 *
 * En DDD, esta es la capa de Infraestructura que implementa el contrato definido en el Dominio.
 */
@Injectable({
  providedIn: 'root' // Puede ser proporcionado en la raíz para que esté disponible globalmente
})
export class AuthApiRepository implements AuthRepository {
  /**
   * Constructor del repositorio de API de autenticación.
   * @param apiService - Instancia de ApiService inyectada para realizar peticiones HTTP.
   */
  constructor(private apiService: ApiService) {}

  /**
   * login(): Implementación del método de login definido en AuthRepository.
   * Realiza una petición POST al endpoint de login del backend.
   * @param credentials - Las credenciales del usuario.
   * @returns Observable<AuthResponse> - La respuesta de autenticación.
   */
  login(credentials: Credentials): Observable<AuthResponse> {
    // Llama al ApiService para realizar la petición POST al endpoint 'auth/login'.
    // El ApiService ya maneja los encabezados y errores comunes.
    return this.apiService.post<AuthResponse>('auth/login', credentials);
  }
}