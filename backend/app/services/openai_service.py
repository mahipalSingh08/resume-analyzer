import json
from openai import AsyncOpenAI
from fastapi import HTTPException
from app.config import settings
from app.models import ResumeAnalysisResponse
from app.prompts.resume_analysis import RESUME_ANALYSIS_PROMPT

async def analyze_resume_with_ai(resume_text: str, job_description: str) -> dict:
    """
    Calls OpenAI to analyze the resume against the job description,
    returning a structured JSON response.
    """
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI API key is not configured.")
        
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    
    user_prompt = f"""
    JOB DESCRIPTION:
    {job_description}
    
    RESUME:
    {resume_text}
    """
    
    try:
        completion = await client.beta.chat.completions.parse(
            model=settings.OPENAI_MODEL,
            messages=[
                {"role": "system", "content": RESUME_ANALYSIS_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            response_format=ResumeAnalysisResponse
        )
        
        response_model = completion.choices[0].message.parsed
        if not response_model:
            raise HTTPException(status_code=500, detail="Failed to parse structured response from OpenAI.")
            
        return response_model.model_dump()
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI analysis failed: {str(e)}")
