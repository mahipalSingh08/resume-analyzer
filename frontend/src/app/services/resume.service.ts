import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResumeAnalysisResponse } from '../models/analysis.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = 'http://localhost:8000/api/analyze';

  constructor(private http: HttpClient) {}

  analyzeResume(pdfFile: File, jobDescription: string): Observable<ResumeAnalysisResponse> {
    const formData = new FormData();
    formData.append('resume', pdfFile);
    formData.append('job_description', jobDescription);

    return this.http.post<ResumeAnalysisResponse>(this.apiUrl, formData);
  }
}
