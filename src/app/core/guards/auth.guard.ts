// src/app/core/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Importar AuthService

/**
 * @Injectable()
 * Guardia de ruta para proteger rutas que requieren autenticación.
 * Implementa la interfaz CanActivate.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * Constructor del guardia.
   * @param authService - Instancia de AuthService inyectada para verificar el estado de autenticación.
   * @param router - Instancia de Router inyectada para redirigir al usuario.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * canActivate(): Método principal del guardia.
   * Determina si una ruta puede ser activada.
   * @param route - La instantánea de la ruta que se intenta activar.
   * @param state - La instantánea del estado del router en ese momento.
   * @returns Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
   * - Verdadero si el usuario está autenticado, o un UrlTree para redirigir.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Verifica si el usuario está logueado usando el AuthService.
    if (this.authService.isLoggedIn()) {
      return true; // Permite el acceso a la ruta.
    } else {
      // Si el usuario no está logueado, redirige a la página de login.
      console.warn('Acceso denegado: Usuario no autenticado. Redirigiendo a /login.');
      return this.router.createUrlTree(['/login']); // Crea un UrlTree para la redirección.
    }
  }
}