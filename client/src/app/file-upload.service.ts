import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = 'http://localhost:5011'; // Adjust the base API URL

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    // Note: Omit the base URL if using an absolute URL
    const uploadUrl = `${this.apiUrl}/Upload`;
    
    return this.http.post(uploadUrl, formData)
      .pipe(
        catchError(error => {
          console.error('Error uploading file:', error);
          return throwError(error);
        })
      );
  }

  retrieveDataFromDatabase(): Observable<any> {
    // Assuming you have an API endpoint for data retrieval
    // Adjust the URL as needed
    const dataEndpoint = `${this.apiUrl}/api/Retrieve/`;

    return this.http.get(dataEndpoint)
      .pipe(
        catchError(error => {
          console.error('Error retrieving data:', error);
          return throwError(error);
        })
      );
  }
}
