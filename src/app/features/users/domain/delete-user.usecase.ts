// src/app/features/users/domain/delete-user.usecase.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from './user.repository'; // Importa el repositorio de usuarios

/**
 * @Injectable()
 * Caso de uso para la operación de eliminar un usuario.
 * Esta clase orquesta la lógica de negocio para la eliminación de usuarios,
 * utilizando el UserRepository para interactuar con la infraestructura.
 */
@Injectable({
  providedIn: 'root' // Hace que este caso de uso esté disponible en toda la aplicación
})
export class DeleteUserUseCase {

  /**
   * Constructor del caso de uso.
   * @param userRepository - Instancia del repositorio de usuarios inyectada.
   * El repositorio es la interfaz de la capa de dominio
   * para interactuar con la infraestructura de gestión de usuarios.
   */
  constructor(private userRepository: UserRepository) {}

  /**
   * execute(): Método principal del caso de uso para eliminar un usuario.
   * @param id - El ID del usuario a eliminar.
   * @returns Observable<void> - Un observable que se completa cuando el usuario es eliminado.
   */
  execute(id: string): Observable<void> {
    // Delega la operación de eliminación de usuario al repositorio.
    return this.userRepository.delete(id);
  }
}
