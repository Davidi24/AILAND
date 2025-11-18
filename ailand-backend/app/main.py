from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, users
from app.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Configuration for Next.js
origins = [
    "http://localhost:3000",           
    "http://localhost:3001",           
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,              
    allow_credentials=True,             
    allow_methods=["*"],               
    allow_headers=["*"],                
    expose_headers=["*"],              
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/users", tags=["Users"])

@app.get("/")
async def root():
    return {
        "message": "Checking if all working"
    }

