// src/app/features/users/domain/user.repository.ts
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model'; // Importa el modelo de usuario

/**
 * Clase abstracta (contrato) para el repositorio de usuarios.
 * Define las operaciones que la capa de dominio necesita de la infraestructura
 * para gestionar los usuarios (CRUD), sin preocuparse por los detalles de implementación.
 *
 * En DDD, los repositorios son parte de la capa de Dominio, ya que el Dominio define
 * qué necesita persistir o recuperar, no cómo.
 */
export abstract class UserRepository {
  /**
   * getAll(): Método abstracto para obtener todos los usuarios.
   * @returns Observable<User[]> - Un observable que emite un array de usuarios.
   */
  abstract getAll(): Observable<User[]>;

  /**
   * getById(): Método abstracto para obtener un usuario por su ID.
   * @param id - El ID del usuario.
   * @returns Observable<User> - Un observable que emite el usuario encontrado.
   */
  abstract getById(id: string): Observable<User>;

  /**
   * create(): Método abstracto para crear un nuevo usuario.
   * @param user - El objeto de usuario a crear.
   * @returns Observable<User> - Un observable que emite el usuario creado.
   */
  abstract create(user: User): Observable<User>;

  /**
   * update(): Método abstracto para actualizar un usuario existente.
   * @param id - El ID del usuario a actualizar.
   * @param user - El objeto de usuario con los datos actualizados.
   * @returns Observable<User> - Un observable que emite el usuario actualizado.
   */
  abstract update(id: string, user: User): Observable<User>;

  /**
   * delete(): Método abstracto para eliminar un usuario.
   * @param id - El ID del usuario a eliminar.
   * @returns Observable<void> - Un observable que se completa cuando el usuario es eliminado.
   */
  abstract delete(id: string): Observable<void>;
}
