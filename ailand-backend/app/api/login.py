from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta

from app.schemas.user import UserCreate, UserResponse, TokenResponse, UserInToken
from app.models.model import Model
from app.utils.security import verify_password, get_password_hash, create_access_token
from app.utils.dependencies import get_user_by_username, get_user_by_email
from app.core.database import get_db
from app.core.config import settings

router = APIRouter()

@router.post("/login", response_model=TokenResponse)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = get_user_by_username(db, username=form_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, 
        expires_delta=access_token_expires
    )
    
    refresh_token_expires = timedelta(days=1)
    refresh_token = create_access_token(
        data={"sub": user.username, "type": "refresh"},
        expires_delta=refresh_token_expires
    )
    
    user_data = UserInToken(
        id=user.id,
        name=user.username, 
        email=user.email,
        role="free",  
        plan_id=1   
    )
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=user_data
    )