import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeUploadComponent } from './components/resume-upload/resume-upload.component';
import { JobDescriptionComponent } from './components/job-description/job-description.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ResultsComponent } from './components/results/results.component';
import { ResumeService } from './services/resume.service';
import { StorageService } from './services/storage.service';
import { ResumeAnalysisResponse } from './models/analysis.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    ResumeUploadComponent, 
    JobDescriptionComponent, 
    LoadingComponent, 
    ResultsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AI-Powered Resume Analyzer';
  subtitle = 'Analyze your resume against a job description using AI';
  
  pdfFile: File | null = null;
  pdfFileMetadata: { name: string, size: number } | null = null;
  jobDescription: string = '';
  
  isAnalyzing: boolean = false;
  results: ResumeAnalysisResponse | null = null;
  errorMsg: string = '';

  constructor(
    private resumeService: ResumeService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    // Restore state from persistence
    const savedMetadata = this.storageService.getPdfMetadata();
    if (savedMetadata) {
      this.pdfFileMetadata = savedMetadata;
      const file = await this.storageService.getPdf();
      if (file) {
        this.pdfFile = file;
      }
    }
    
    this.jobDescription = this.storageService.getJobDescription();
    this.results = this.storageService.getResults();
  }

  async onFileSelected(file: File) {
    this.pdfFile = file;
    this.pdfFileMetadata = { name: file.name, size: file.size };
    await this.storageService.savePdf(file);
  }

  async onFileRemoved() {
    this.pdfFile = null;
    this.pdfFileMetadata = null;
    await this.storageService.clearAll();
    this.jobDescription = '';
    this.results = null;
  }

  onJdChange(newVal: string) {
    this.jobDescription = newVal;
    this.storageService.saveJobDescription(this.jobDescription);
  }

  get canAnalyze(): boolean {
    return !!this.pdfFile && !!this.jobDescription.trim() && !this.isAnalyzing && !this.results;
  }

  async analyzeResume() {
    if (!this.canAnalyze) return;
    
    this.errorMsg = '';
    this.isAnalyzing = true;
    
    this.resumeService.analyzeResume(this.pdfFile!, this.jobDescription).subscribe({
      next: (response) => {
        this.results = response;
        this.storageService.saveResults(response);
        this.isAnalyzing = false;
      },
      error: (err) => {
        console.error('Analysis error:', err);
        this.errorMsg = err.error?.detail || 'An error occurred during analysis. Please try again.';
        this.isAnalyzing = false;
      }
    });
  }

  resetAnalysis() {
    this.results = null;
    localStorage.removeItem('analysis_results');
  }
}
