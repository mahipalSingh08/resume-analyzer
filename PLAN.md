# Project Plan

## Phase 1 — Project Setup
* Create Angular frontend
* Create FastAPI backend
* Configure environment variables

## Phase 2 — Resume Upload
* PDF validation
* File size validation
* PDF text extraction

## Phase 3 — OpenAI Integration
* Configure OpenAI SDK
* Create analysis prompt
* Create structured response model
* Handle AI errors

## Phase 4 — API
* Implement `/health`
* Implement `/api/analyze`
* Configure CORS

## Phase 5 — Angular UI
* Upload component
* Job description component
* Analyze button
* Loading state
* Results dashboard
* Error states

## Phase 6 — Persistence
* Store resume in IndexedDB
* Store job description/results in localStorage
* Restore state after browser refresh
* Delete/reset functionality

## Phase 7 — Testing
* Test valid and invalid PDFs
* Test backend unavailable and OpenAI failure
* Test browser refresh and reset functionality

## Phase 8 — Documentation
* README
* `.env.example`
* `.gitignore`
* API documentation
