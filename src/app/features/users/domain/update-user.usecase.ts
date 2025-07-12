// src/app/features/users/domain/update-user.usecase.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model'; // Importa el modelo de usuario
import { UserRepository } from './user.repository'; // Importa el repositorio de usuarios

/**
 * @Injectable()
 * Caso de uso para la operación de actualizar un usuario existente.
 * Esta clase orquesta la lógica de negocio para la actualización de usuarios,
 * utilizando el UserRepository para interactuar con la infraestructura.
 */
@Injectable({
  providedIn: 'root' // Hace que este caso de uso esté disponible en toda la aplicación
})
export class UpdateUserUseCase {

  /**
   * Constructor del caso de uso.
   * @param userRepository - Instancia del repositorio de usuarios inyectada.
   * El repositorio es la interfaz de la capa de dominio
   * para interactuar con la infraestructura de gestión de usuarios.
   */
  constructor(private userRepository: UserRepository) {}

  /**
   * execute(): Método principal del caso de uso para actualizar un usuario.
   * @param id - El ID del usuario a actualizar.
   * @param user - El objeto de usuario con los datos actualizados.
   * @returns Observable<User> - Un observable que emite el usuario actualizado.
   */
  execute(id: string, user: User): Observable<User> {
    // Delega la operación de actualización de usuario al repositorio.
    return this.userRepository.update(id, user);
  }
}
