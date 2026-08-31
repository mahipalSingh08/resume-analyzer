import { Injectable } from '@angular/core';
import { get, set, del } from 'idb-keyval';
import { ResumeAnalysisResponse } from '../models/analysis.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly PDF_KEY = 'resume_pdf';
  private readonly PDF_NAME_KEY = 'resume_pdf_name';
  private readonly PDF_SIZE_KEY = 'resume_pdf_size';
  private readonly JD_KEY = 'job_description';
  private readonly RESULTS_KEY = 'analysis_results';

  constructor() {}

  // PDF Storage (IndexedDB because it can be large)
  async savePdf(file: File): Promise<void> {
    await set(this.PDF_KEY, file);
    localStorage.setItem(this.PDF_NAME_KEY, file.name);
    localStorage.setItem(this.PDF_SIZE_KEY, file.size.toString());
  }

  async getPdf(): Promise<File | undefined> {
    return await get<File>(this.PDF_KEY);
  }

  getPdfMetadata(): { name: string, size: number } | null {
    const name = localStorage.getItem(this.PDF_NAME_KEY);
    const size = localStorage.getItem(this.PDF_SIZE_KEY);
    if (name && size) {
      return { name, size: parseInt(size, 10) };
    }
    return null;
  }

  // Job Description Storage (localStorage)
  saveJobDescription(jd: string): void {
    localStorage.setItem(this.JD_KEY, jd);
  }

  getJobDescription(): string {
    return localStorage.getItem(this.JD_KEY) || '';
  }

  // Results Storage (localStorage)
  saveResults(results: ResumeAnalysisResponse): void {
    localStorage.setItem(this.RESULTS_KEY, JSON.stringify(results));
  }

  getResults(): ResumeAnalysisResponse | null {
    const data = localStorage.getItem(this.RESULTS_KEY);
    return data ? JSON.parse(data) : null;
  }

  // Clear all data
  async clearAll(): Promise<void> {
    await del(this.PDF_KEY);
    localStorage.removeItem(this.PDF_NAME_KEY);
    localStorage.removeItem(this.PDF_SIZE_KEY);
    localStorage.removeItem(this.JD_KEY);
    localStorage.removeItem(this.RESULTS_KEY);
  }
}
