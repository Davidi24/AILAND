from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.user import UserResponse
from app.models.model import Model
from app.utils.dependencies import get_current_user, get_user_by_username
from app.core.database import get_db

router = APIRouter()

@router.get("/me", response_model=UserResponse)
async def read_current_user(current_user: Model = Depends(get_current_user)):
    """Get current user information"""
    return current_user

@router.get("/{username}", response_model=UserResponse)
async def read_user(
    username: str,
    current_user: Model = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user by username """
    user = get_user_by_username(db, username=username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user