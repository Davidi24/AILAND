from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    
    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if len(v) > 100:
            raise ValueError('Password is too long (max 100 characters)')
        return v
    
    @field_validator('username')
    @classmethod
    def validate_username(cls, v):
        if len(v) < 3:
            raise ValueError('Username must be at least 3 characters long')
        if len(v) > 50:
            raise ValueError('Username is too long (max 50 characters)')
        return v

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    
    
    class Config:
        from_attributes = True

# User data in token response (matches your desired format)
class UserInToken(BaseModel):
    id: int
    name: str
    email: str
    role: str = "free"
    plan_id: int = 1

# Token response with user data
class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    user: UserInToken

class TokenData(BaseModel):
    username: Optional[str] = None