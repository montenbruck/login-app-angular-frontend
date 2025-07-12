// src/app/features/users/components/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para ngIf, ngFor
import { Router, RouterModule } from '@angular/router'; // Necesario para navegación y enrutamiento
import { User } from '../../../../core/models/user.model'; // Importar el modelo de usuario
import { UserService } from '../../services/user.service'; // Importar el servicio de usuario
import { Observable, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true, // Indica que es un componente standalone
  imports: [CommonModule, RouterModule], // Importar módulos necesarios para plantillas
  templateUrl: './user-list.component.html', // Referencia al archivo HTML
  styleUrls: ['./user-list.component.scss'] // Referencia al archivo SCSS
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>; // Observable para la lista de usuarios
  errorMessage: string | null = null; // Mensaje de error
  isLoading: boolean = false; // Estado de carga

  constructor(private userService: UserService, private router: Router) {
    this.users$ = of([]); // Inicializar con un observable vacío
  }

  ngOnInit(): void {
    this.loadUsers(); // Cargar usuarios al inicializar el componente
  }

  /**
   * Carga la lista de usuarios desde el servicio.
   */
  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.users$ = this.userService.getAllUsers().pipe(
      tap(() => this.isLoading = false), // Desactivar carga al recibir datos
      catchError(err => {
        this.isLoading = false; // Desactivar carga en caso de error
        this.errorMessage = err.message || 'Error al cargar usuarios.'; // Mostrar mensaje de error
        return of([]); // Retornar un observable vacío en caso de error
      })
    );
  }

  /**
   * Navega al formulario para crear un nuevo usuario.
   */
  createNewUser(): void {
    this.router.navigate(['/users/new']);
  }

  /**
   * Navega al formulario para editar un usuario existente.
   * @param userId El ID del usuario a editar.
   */
  editUser(userId: string): void {
    this.router.navigate(['/users', userId, 'edit']);
  }

  /**
   * Elimina un usuario.
   * @param userId El ID del usuario a eliminar.
   */
  deleteUser(userId: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) { // Usar un modal personalizado en producción
      this.isLoading = true;
      this.userService.deleteUser(userId).pipe(
        tap(() => {
          this.isLoading = false;
          this.loadUsers(); // Recargar la lista después de eliminar
        }),
        catchError(err => {
          this.isLoading = false;
          this.errorMessage = err.message || 'Error al eliminar usuario.';
          return of(null);
        })
      ).subscribe();
    }
  }
}