import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeAnalysisResponse } from '../../models/analysis.model';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  @Input() results!: ResumeAnalysisResponse;
  @Output() analyzeAgain = new EventEmitter<void>();

  getScoreColorClass(): string {
    if (!this.results) return 'text-muted';
    const score = this.results.ats_score;
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    return 'score-low';
  }

  getScoreCircleOffset(): number {
    const circumference = 2 * Math.PI * 54; // radius is 54
    if (!this.results) return circumference;
    const score = this.results.ats_score;
    return circumference - (score / 100) * circumference;
  }

  onAnalyzeAgain() {
    this.analyzeAgain.emit();
  }
}
