from pydantic import BaseModel, Field
from typing import List

class RewriteSuggestion(BaseModel):
    section: str = Field(..., description="The section of the resume (e.g., Professional Summary, Experience)")
    current_text: str = Field(..., description="The exact text from the current resume that needs improvement")
    suggested_text: str = Field(..., description="The improved text")
    reason: str = Field(..., description="Why this suggestion is better")

class ResumeAnalysisResponse(BaseModel):
    ats_score: int = Field(..., ge=0, le=100, description="The calculated ATS score from 0 to 100")
    score_summary: str = Field(..., description="A short explanation of the ATS score")
    strengths: List[str] = Field(default_factory=list, description="List of strengths found in the resume")
    missing_skills: List[str] = Field(default_factory=list, description="List of technical or soft skills missing from the resume based on the job description")
    missing_keywords: List[str] = Field(default_factory=list, description="List of important keywords missing")
    experience_gaps: List[str] = Field(default_factory=list, description="List of experience gaps (e.g., required 5 years, only has 3)")
    rewrite_suggestions: List[RewriteSuggestion] = Field(default_factory=list, description="Specific rewrite suggestions for the resume")
