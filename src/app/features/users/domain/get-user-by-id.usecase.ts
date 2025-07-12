// src/app/features/users/domain/get-user-by-id.usecase.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model'; // Importa el modelo de usuario
import { UserRepository } from './user.repository'; // Importa el repositorio de usuarios

/**
 * @Injectable()
 * Caso de uso para la operación de obtener un usuario por su ID.
 * Esta clase orquesta la lógica de negocio para recuperar un usuario específico,
 * utilizando el UserRepository para interactuar con la infraestructura.
 */
@Injectable({
  providedIn: 'root' // Hace que este caso de uso esté disponible en toda la aplicación
})
export class GetUserByIdUseCase {

  /**
   * Constructor del caso de uso.
   * @param userRepository - Instancia del repositorio de usuarios inyectada.
   * El repositorio es la interfaz de la capa de dominio
   * para interactuar con la infraestructura de gestión de usuarios.
   */
  constructor(private userRepository: UserRepository) {}

  /**
   * execute(): Método principal del caso de uso para obtener un usuario por ID.
   * @param id - El ID del usuario a recuperar.
   * @returns Observable<User> - Un observable que emite el usuario encontrado.
   */
  execute(id: string): Observable<User> {
    // Delega la operación de obtener un usuario por ID al repositorio.
    return this.userRepository.getById(id);
  }
}