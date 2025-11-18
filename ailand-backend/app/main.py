from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, users
from app.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FastAPI Authentication System",
    description="Authentication API with JWT tokens",
    version="1.0.0"
)

# CORS Configuration for Next.js
origins = [
    "http://localhost:3000",           # Next.js default dev server
    "http://localhost:3001",           # Alternative Next.js port
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    # Add your production domains here
    # "https://yourdomain.com",
    # "https://www.yourdomain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,              # List of allowed origins
    allow_credentials=True,             # Allow cookies/auth headers
    allow_methods=["*"],                # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],                # Allow all headers
    expose_headers=["*"],               # Expose all headers to the client
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/users", tags=["Users"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to FastAPI Authentication System",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}
