from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta

from app.schemas.user import UserCreate, UserResponse, TokenResponse, UserInToken
from app.models.user import User
from app.utils.security import verify_password, get_password_hash, create_access_token
from app.utils.dependencies import get_user_by_username, get_user_by_email
from app.database import get_db
from app.config import settings

router = APIRouter()

@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    """Create a new user account"""
    # Check if username exists
    db_user = get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Check if email exists
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@router.post("/login", response_model=TokenResponse)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # Get user from database
    user = get_user_by_username(db, username=form_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verify password
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, 
        expires_delta=access_token_expires
    )
    
    # Create refresh token
    refresh_token_expires = timedelta(days=1)
    refresh_token = create_access_token(
        data={"sub": user.username, "type": "refresh"},
        expires_delta=refresh_token_expires
    )
    
    # Build user response
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