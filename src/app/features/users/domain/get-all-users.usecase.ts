// src/app/features/users/domain/get-all-users.usecase.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model'; // Importa el modelo de usuario
import { UserRepository } from './user.repository'; // Importa el repositorio de usuarios

/**
 * @Injectable()
 * Caso de uso para la operación de obtener todos los usuarios.
 * Esta clase orquesta la lógica de negocio para recuperar la lista de usuarios,
 * utilizando el UserRepository para interactuar con la infraestructura.
 */
@Injectable({
  providedIn: 'root' // Hace que este caso de uso esté disponible en toda la aplicación
})
export class GetAllUsersUseCase {

  /**
   * Constructor del caso de uso.
   * @param userRepository - Instancia del repositorio de usuarios inyectada.
   * El repositorio es la interfaz de la capa de dominio
   * para interactuar con la infraestructura de gestión de usuarios.
   */
  constructor(private userRepository: UserRepository) {}

  /**
   * execute(): Método principal del caso de uso para obtener todos los usuarios.
   * @returns Observable<User[]> - Un observable que emite un array de usuarios.
   */
  execute(): Observable<User[]> {
    // Delega la operación de obtener todos los usuarios al repositorio.
    // El caso de uso no se preocupa por los detalles de cómo se obtienen los usuarios,
    // solo de que el repositorio maneje esa interacción.
    return this.userRepository.getAll();
  }
}
