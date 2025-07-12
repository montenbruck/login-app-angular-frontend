// src/app/features/users/services/user.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model'; // Importa el modelo de usuario
import { GetAllUsersUseCase } from '../domain/get-all-users.usecase'; // Importa el caso de uso para obtener todos los usuarios
import { GetUserByIdUseCase } from '../domain/get-user-by-id.usecase'; // Importa el caso de uso para obtener un usuario por ID
import { CreateUserUseCase } from '../domain/create-user.usecase'; // Importa el caso de uso para crear un usuario
import { UpdateUserUseCase } from '../domain/update-user.usecase'; // Importa el caso de uso para actualizar un usuario
import { DeleteUserUseCase } from '../domain/delete-user.usecase'; // Importa el caso de uso para eliminar un usuario

/**
 * @Injectable()
 * Servicio de aplicación para la gestión de usuarios.
 * Este servicio actúa como un orquestador entre los componentes de la UI y los casos de uso de dominio,
 * delegando las operaciones CRUD a las clases de caso de uso correspondientes.
 */
@Injectable({
  providedIn: 'root' // Puede ser proporcionado en la raíz para que esté disponible globalmente
})
export class UserService {
  /**
   * Constructor del servicio de usuario.
   * Inyecta los casos de uso necesarios para cada operación.
   */
  constructor(
    private getAllUsersUseCase: GetAllUsersUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase
  ) {}

  /**
   * getAllUsers(): Obtiene una lista de todos los usuarios.
   * @returns Observable<User[]> - Un observable que emite un array de usuarios.
   */
  getAllUsers(): Observable<User[]> {
    return this.getAllUsersUseCase.execute();
  }

  /**
   * getUserById(): Obtiene un usuario por su ID.
   * @param id - El ID del usuario.
   * @returns Observable<User> - Un observable que emite el usuario encontrado.
   */
  getUserById(id: string): Observable<User> {
    return this.getUserByIdUseCase.execute(id);
  }

  /**
   * createUser(): Crea un nuevo usuario.
   * @param user - El objeto de usuario a crear.
   * @returns Observable<User> - Un observable que emite el usuario creado.
   */
  createUser(user: User): Observable<User> {
    return this.createUserUseCase.execute(user);
  }

  /**
   * updateUser(): Actualiza un usuario existente.
   * @param id - El ID del usuario a actualizar.
   * @param user - El objeto de usuario con los datos actualizados.
   * @returns Observable<User> - Un observable que emite el usuario actualizado.
   */
  updateUser(id: string, user: User): Observable<User> {
    return this.updateUserUseCase.execute(id, user);
  }

  /**
   * deleteUser(): Elimina un usuario.
   * @param id - El ID del usuario a eliminar.
   * @returns Observable<void> - Un observable que se completa cuando el usuario es eliminado.
   */
  deleteUser(id: string): Observable<void> {
    return this.deleteUserUseCase.execute(id);
  }
}