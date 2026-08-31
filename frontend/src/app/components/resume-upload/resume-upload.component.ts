import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-upload.component.html',
  styleUrls: ['./resume-upload.component.css']
})
export class ResumeUploadComponent {
  @Output() fileSelected = new EventEmitter<File>();
  @Output() fileRemoved = new EventEmitter<void>();
  
  @Input() selectedFileMetadata: { name: string, size: number } | null = null;
  
  errorMsg: string = '';

  onFileChange(event: any) {
    this.errorMsg = '';
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      this.errorMsg = 'Please select a valid PDF file.';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.errorMsg = 'File size exceeds 5MB limit.';
      return;
    }

    this.fileSelected.emit(file);
    event.target.value = ''; // Reset input
  }

  removeFile() {
    this.fileRemoved.emit();
  }

  formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
}
