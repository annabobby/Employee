
import { Component } from '@angular/core';
import { FileUploadService } from './file-upload.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  title = 'File Upload App';
  dataRetrieved: boolean = false;
  retrievedData: any[] = [];
 
  constructor(private fileUploadService: FileUploadService) {}
 
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.selectedFileName = this.selectedFile?.name;
  }
 
  async uploadFile() {
    if (!this.selectedFile) {
      alert('No file selected');
      return;
    }
 
    try {
      await this.fileUploadService.uploadFile(this.selectedFile);
      alert('File uploaded successfully');
      await this.retrieveDataFromDatabase(); // Trigger data retrieval after upload
    } catch (error: any) {
      alert('Error uploading file:'+ error);
      // Handle errors
    }
  }
 
  async retrieveDataFromDatabase() {
    try {
      this.fileUploadService.retrieveDataFromDatabase().subscribe(
        (response: any) => {
          console.log('Retrieved data:', response);
 
          // Ensure that the retrieved data is an array
          if (Array.isArray(response)) {
            this.retrievedData = response;
            this.dataRetrieved = true;
          } else {
            console.error('Retrieved data is not an array:', response);
            // Handle the case where the data is not an array
          }
        },
        (error: any) => {
          alert('Error retrieving data:'+ error);
          // Handle errors
        }
      );
    } catch (error: any) {
      alert('Error retrieving data:' +error);
      // Handle errors
    }
  }
}
 