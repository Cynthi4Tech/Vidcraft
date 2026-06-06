from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, videos, templates

app = FastAPI(
    title="Vidcraft API",
    description="AI Video Generator API",
    version="0.1.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(videos.router, prefix="/api/videos", tags=["videos"])
app.include_router(templates.router, prefix="/api/templates", tags=["templates"])

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "vidcraft-api"}

@app.get("/")
async def root():
    return {
        "message": "Vidcraft API",
        "version": "0.1.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)