from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Security
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database
    DATABASE_URL: str = "postgresql://username:password@localhost:5432/dbname"
    
    class Config:
        env_file = ".env"

settings = Settings()
