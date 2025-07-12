// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, AuthResponse } from '../models/user.model'; // Importar los modelos

/**
 * @Injectable()
 * Servicio para gestionar el estado de autenticación del usuario.
 * Proporciona métodos para iniciar sesión, cerrar sesión y verificar el estado de autenticación.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject para mantener el estado del usuario autenticado.
  // Emite el valor inicial (null si no hay usuario) y los valores subsiguientes.
  private currentUserSubject: BehaviorSubject<User | null>;
  // Observable público para que otros componentes puedan suscribirse a los cambios del usuario.
  public currentUser: Observable<User | null>;

  // BehaviorSubject para mantener el estado del token JWT.
  private authTokenSubject: BehaviorSubject<string | null>;
  // Observable público para que otros componentes puedan suscribirse a los cambios del token.
  public authToken: Observable<string | null>;

  /**
   * Constructor del servicio.
   * Inicializa los BehaviorSubjects con los valores almacenados en localStorage (si existen).
   */
  constructor() {
    // Intenta obtener el usuario y el token del localStorage al iniciar el servicio.
    const storedUser = localStorage.getItem('currentUser');
    const storedToken = localStorage.getItem('token');

    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();

    this.authTokenSubject = new BehaviorSubject<string | null>(storedToken);
    this.authToken = this.authTokenSubject.asObservable();
  }

  /**
   * login(): Almacena los datos del usuario y el token JWT en localStorage
   * y actualiza los BehaviorSubjects.
   * @param authResponse - Objeto que contiene el usuario y el token.
   */
  login(authResponse: AuthResponse): void {
    localStorage.setItem('currentUser', JSON.stringify(authResponse.user));
    localStorage.setItem('token', authResponse.token);
    this.currentUserSubject.next(authResponse.user);
    this.authTokenSubject.next(authResponse.token);
  }

  /**
   * logout(): Elimina los datos del usuario y el token de localStorage
   * y emite null a los BehaviorSubjects.
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.authTokenSubject.next(null);
  }

  /**
   * isLoggedIn(): Verifica si el usuario está autenticado (si hay un token).
   * @returns boolean - Verdadero si hay un token, falso en caso contrario.
   */
  isLoggedIn(): boolean {
    return !!this.authTokenSubject.value; // Convierte el valor del token a booleano
  }

  /**
   * getCurrentUser(): Obtiene el usuario actualmente autenticado.
   * @returns User | null - El objeto de usuario o null si no hay ninguno.
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * getToken(): Obtiene el token JWT actual.
   * @returns string | null - El token JWT o null si no hay ninguno.
   */
  getToken(): string | null {
    return this.authTokenSubject.value;
  }
}