import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  errors?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Generic GET request
   */
  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }

    return this.http.get<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, { params: httpParams })
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Generic POST request
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, data)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Generic PUT request
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, data)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Generic DELETE request
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<ApiResponse<T>>(`${this.baseUrl}${endpoint}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Upload file
   */
  uploadFile<T>(endpoint: string, file: File): Observable<T> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, formData)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}

