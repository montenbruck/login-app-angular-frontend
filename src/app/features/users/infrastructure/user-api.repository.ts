// src/app/features/users/infrastructure/user-api.repository.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../domain/user.repository'; // Importa la interfaz abstracta
import { ApiService } from '../../../core/services/api.service'; // Importa el servicio API core
import { User } from '../../../core/models/user.model'; // Importa el modelo de usuario

/**
 * @Injectable()
 * Implementación concreta del UserRepository.
 * Esta clase se encarga de la comunicación real con el backend para las operaciones CRUD de usuarios,
 * utilizando el ApiService.
 *
 * En DDD, esta es la capa de Infraestructura que implementa el contrato definido en el Dominio.
 */
@Injectable({
  providedIn: 'root' // Puede ser proporcionado en la raíz para que esté disponible globalmente
})
export class UserApiRepository implements UserRepository {
  /**
   * Constructor del repositorio de API de usuarios.
   * @param apiService - Instancia de ApiService inyectada para realizar peticiones HTTP.
   */
  constructor(private apiService: ApiService) {}

  /**
   * getAll(): Implementación del método getAll definido en UserRepository.
   * Realiza una petición GET al endpoint de usuarios para obtener todos.
   * @returns Observable<User[]> - Un observable que emite un array de usuarios.
   */
  getAll(): Observable<User[]> {
    return this.apiService.get<User[]>('users');
  }

  /**
   * getById(): Implementación del método getById definido en UserRepository.
   * Realiza una petición GET al endpoint de un usuario específico.
   * @param id - El ID del usuario.
   * @returns Observable<User> - Un observable que emite el usuario encontrado.
   */
  getById(id: string): Observable<User> {
    return this.apiService.get<User>(`users/${id}`);
  }

  /**
   * create(): Implementación del método create definido en UserRepository.
   * Realiza una petición POST al endpoint de usuarios para crear uno nuevo.
   * @param user - El objeto de usuario a crear.
   * @returns Observable<User> - Un observable que emite el usuario creado.
   */
  create(user: User): Observable<User> {
    return this.apiService.post<User>('users', user);
  }

  /**
   * update(): Implementación del método update definido en UserRepository.
   * Realiza una petición PUT al endpoint de un usuario específico para actualizarlo.
   * @param id - El ID del usuario a actualizar.
   * @param user - El objeto de usuario con los datos actualizados.
   * @returns Observable<User> - Un observable que emite el usuario actualizado.
   */
  update(id: string, user: User): Observable<User> {
    return this.apiService.put<User>(`users/${id}`, user);
  }

  /**
   * delete(): Implementación del método delete definido en UserRepository.
   * Realiza una petición DELETE al endpoint de un usuario específico para eliminarlo.
   * @param id - El ID del usuario a eliminar.
   * @returns Observable<void> - Un observable que se completa cuando el usuario es eliminado.
   */
  delete(id: string): Observable<void> {
    return this.apiService.delete<void>(`users/${id}`);
  }
}