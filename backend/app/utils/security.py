from datetime import datetime, timedelta
from typing import Optional
import jwt
from passlib.context import CryptContext
from app.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password - handles bcrypt's 72-byte limit"""
    # Bcrypt has a 72-byte limit
    # Convert to bytes to check actual byte length
    password_bytes = password.encode('utf-8')
    
    # If password exceeds 72 bytes, truncate safely
    if len(password_bytes) > 72:
        # Truncate to 72 bytes
        truncated_bytes = password_bytes[:72]
        # Decode back to string, handling potential incomplete character at boundary
        try:
            password = truncated_bytes.decode('utf-8')
        except UnicodeDecodeError:
            # If last byte is incomplete, remove it and try again
            password = truncated_bytes[:-1].decode('utf-8', errors='ignore')
    
    # Hash the (possibly truncated) password
    return pwd_context.hash(password)

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

def decode_token(token: str) -> dict:
    """Decode a JWT token"""
    return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])

