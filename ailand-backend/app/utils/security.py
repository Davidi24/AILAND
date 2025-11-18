import hashlib
import os
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
from app.config import settings

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hashed password"""
    try:
        salt, stored_hash = hashed_password.split(':')
        salt_bytes = bytes.fromhex(salt)
        stored_hash_bytes = bytes.fromhex(stored_hash)
        
        new_hash = hashlib.scrypt(
            plain_password.encode('utf-8'),
            salt=salt_bytes,
            n=16384,
            r=8,
            p=1,
            dklen=64
        )
        
        return new_hash == stored_hash_bytes
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    """Hash a password using scrypt"""
    salt = os.urandom(32)
    pwd_hash = hashlib.scrypt(
        password.encode('utf-8'),
        salt=salt,
        n=16384,
        r=8,
        p=1,
        dklen=64
    )
    return f"{salt.hex()}:{pwd_hash.hex()}"

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    """Decode a JWT access token"""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None