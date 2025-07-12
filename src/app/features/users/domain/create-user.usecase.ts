// src/app/features/users/domain/create-user.usecase.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model'; // Importa el modelo de usuario
import { UserRepository } from './user.repository'; // Importa el repositorio de usuarios

/**
 * @Injectable()
 * Caso de uso para la operación de crear un nuevo usuario.
 * Esta clase orquesta la lógica de negocio para la creación de usuarios,
 * utilizando el UserRepository para interactuar con la infraestructura.
 */
@Injectable({
  providedIn: 'root' // Hace que este caso de uso esté disponible en toda la aplicación
})
export class CreateUserUseCase {

  /**
   * Constructor del caso de uso.
   * @param userRepository - Instancia del repositorio de usuarios inyectada.
   * El repositorio es la interfaz de la capa de dominio
   * para interactuar con la infraestructura de gestión de usuarios.
   */
  constructor(private userRepository: UserRepository) {}

  /**
   * execute(): Método principal del caso de uso para crear un usuario.
   * @param user - El objeto de usuario a crear.
   * @returns Observable<User> - Un observable que emite el usuario creado.
   */
  execute(user: User): Observable<User> {
    // Delega la operación de creación de usuario al repositorio.
    return this.userRepository.create(user);
  }
}