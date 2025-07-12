// src/app/features/users/components/user-form/user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para ngIf
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Necesario para formularios reactivos
import { ActivatedRoute, Router } from '@angular/router'; // Necesario para obtener parámetros de ruta y navegación
import { User } from '../../../../core/models/user.model'; // Importar el modelo de usuario
import { UserService } from '../../services/user.service'; // Importar el servicio de usuario
import { Observable, of, tap, catchError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  standalone: true, // Indica que es un componente standalone
  imports: [CommonModule, ReactiveFormsModule], // Importar módulos necesarios
  templateUrl: './user-form.component.html', // Referencia al archivo HTML
  styleUrls: ['./user-form.component.scss'] // Referencia al archivo SCSS
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode: boolean = false; // Indica si estamos en modo edición o creación
  userId: string | null = null; // ID del usuario si estamos editando
  errorMessage: string | null = null; // Mensaje de error
  isLoading: boolean = false; // Estado de carga

  constructor(
    private fb: FormBuilder, // Inyecta FormBuilder para construir el formulario
    private userService: UserService, // Inyecta UserService para operaciones CRUD
    private router: Router, // Inyecta Router para navegación
    private route: ActivatedRoute // Inyecta ActivatedRoute para acceder a los parámetros de la ruta
  ) {
    // Inicializa el formulario con los controles y validadores
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // La contraseña es requerida solo en modo creación
      password: ['', Validators.minLength(6)],
      role: ['user', Validators.required] // Rol por defecto 'user'
    });
  }

  ngOnInit(): void {
    // Suscribirse a los parámetros de la ruta para detectar el modo (crear/editar)
    this.route.paramMap.pipe(
      switchMap(params => {
        this.userId = params.get('id'); // Obtener el ID de la ruta
        this.isEditMode = !!this.userId; // Si hay ID, estamos en modo edición

        if (this.isEditMode && this.userId) {
          this.isLoading = true;
          // Si estamos editando, cargar los datos del usuario
          return this.userService.getUserById(this.userId).pipe(
            tap(user => {
              // Llenar el formulario con los datos del usuario
              this.userForm.patchValue(user);
              // La contraseña no es necesaria para la edición, la hacemos opcional
              this.userForm.get('password')?.setValidators(null);
              this.userForm.get('password')?.updateValueAndValidity();
              this.isLoading = false;
            }),
            catchError(err => {
              this.isLoading = false;
              this.errorMessage = err.message || 'Error al cargar los datos del usuario.';
              return of(null); // Retorna un observable nulo para que la suscripción no falle
            })
          );
        } else {
          // Si estamos creando, la contraseña es obligatoria
          this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
          this.userForm.get('password')?.updateValueAndValidity();
          return of(null); // No hay usuario que cargar
        }
      })
    ).subscribe();
  }

  /**
   * Maneja el envío del formulario.
   * Realiza la creación o actualización de un usuario.
   */
  onSubmit(): void {
    this.errorMessage = null;
    this.isLoading = true;

    if (this.userForm.valid) {
      const userData: User = this.userForm.value; // Obtener los datos del formulario

      let operation: Observable<User>;

      if (this.isEditMode && this.userId) {
        // Si estamos editando, llamar al servicio para actualizar
        operation = this.userService.updateUser(this.userId, userData);
      } else {
        // Si estamos creando, llamar al servicio para crear
        operation = this.userService.createUser(userData);
      }

      operation.pipe(
        tap(() => {
          this.isLoading = false;
          this.router.navigate(['/users']); // Navegar de vuelta a la lista de usuarios
        }),
        catchError(err => {
          this.isLoading = false;
          this.errorMessage = err.message || 'Error al guardar el usuario.';
          return of(null); // Retorna un observable nulo para que la suscripción no falle
        })
      ).subscribe();
    } else {
      this.isLoading = false;
      this.errorMessage = 'Por favor, completa todos los campos requeridos y corrige los errores.';
      this.userForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores de validación
    }
  }

  /**
   * Navega de vuelta a la lista de usuarios.
   */
  goBackToList(): void {
    this.router.navigate(['/users']);
  }
}