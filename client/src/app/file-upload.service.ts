import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = 'http://localhost:5011'; 

  constructor(private http: HttpClient) { }

  // uploadFile(file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file, file.name);

    
  //   const uploadUrl = `${this.apiUrl}/EmployeeUpload/Upload`;
    
  //   return this.http.post(uploadUrl, formData)
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error uploading file:', error);
  //         return throwError(error);
  //       })
  //     );
  // }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.apiUrl, formData);
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
