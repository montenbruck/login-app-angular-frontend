// src/app/core/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment'; // Importar el entorno

/**
 * @Injectable()
 * Indica que esta clase puede ser inyectada como una dependencia en otros componentes o servicios.
 * providedIn: 'root' significa que este servicio es un singleton y está disponible en toda la aplicación.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // baseUrl: La URL base de tu API, obtenida del archivo de entorno (environment.ts/prod.ts/testing.ts).
  private baseUrl = environment.apiUrl;

  /**
   * Constructor del servicio.
   * @param http - Instancia de HttpClient inyectada para realizar peticiones HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * getHeaders(): Método privado para obtener los encabezados HTTP.
   * Incluye el token de autorización si está presente en el localStorage.
   * @returns HttpHeaders - Los encabezados HTTP configurados.
   */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtiene el token JWT del almacenamiento local
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Establece el tipo de contenido JSON por defecto
    });

    // Si hay un token, lo añade al encabezado de Autorización como 'Bearer'
    if (token) {
      return headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  /**
   * handleError(): Método privado para manejar errores de las peticiones HTTP.
   * Registra el error en la consola y lanza un nuevo error.
   * @param error - El objeto de error recibido de la petición HTTP.
   * @returns Observable<never> - Un observable que emite un error.
   */
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error en la petición:', error.error?.message || error.message || error);
    // Puedes personalizar el manejo de errores aquí (ej. mostrar un mensaje al usuario, redirigir).
    return throwError(() => new Error(error.error?.message || 'Algo salió mal; por favor, inténtalo de nuevo más tarde.'));
  }

  /**
   * post(): Realiza una petición HTTP POST.
   * @param path - La ruta específica del endpoint (ej. 'auth/login', 'users').
   * @param body - El cuerpo de la petición (datos a enviar).
   * @returns Observable<T> - Un observable que emite la respuesta del servidor.
   */
  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${path}`, body, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError) // Captura y maneja cualquier error
    );
  }

  /**
   * get(): Realiza una petición HTTP GET.
   * @param path - La ruta específica del endpoint (ej. 'users', 'users/123').
   * @returns Observable<T> - Un observable que emite la respuesta del servidor.
   */
  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${path}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * put(): Realiza una petición HTTP PUT.
   * @param path - La ruta específica del endpoint (ej. 'users/123').
   * @param body - El cuerpo de la petición (datos a actualizar).
   * @returns Observable<T> - Un observable que emite la respuesta del servidor.
   */
  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${path}`, body, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * delete(): Realiza una petición HTTP DELETE.
   * @param path - La ruta específica del endpoint (ej. 'users/123').
   * @returns Observable<T> - Un observable que emite la respuesta del servidor.
   */
  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${path}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
}