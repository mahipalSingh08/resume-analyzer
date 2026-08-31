export interface RewriteSuggestion {
  section: string;
  current_text: string;
  suggested_text: string;
  reason: string;
}

export interface ResumeAnalysisResponse {
  ats_score: number;
  score_summary: string;
  strengths: string[];
  missing_skills: string[];
  missing_keywords: string[];
  experience_gaps: string[];
  rewrite_suggestions: RewriteSuggestion[];
}
