from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
import httpx
from typing import Optional
from app.core.config import settings
from pydantic import BaseModel
from uuid import UUID

security = HTTPBearer()

# Supabase Auth Configuration
JWKS_URL = f"{settings.SUPABASE_URL}/auth/v1/.well-known/jwks.json"

class User(BaseModel):
    id: UUID
    email: Optional[str] = None

class AuthHandler:
    def __init__(self):
        self.jwks = None

    async def _get_jwks(self):
        if self.jwks is None:
            async with httpx.AsyncClient() as client:
                resp = await client.get(JWKS_URL)
                resp.raise_for_status()
                self.jwks = resp.json()
        return self.jwks

    async def get_current_user(self, credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
        token = credentials.credentials
        try:
            jwks = await self._get_jwks()
            # In a production app, you might want to cache the public key specifically
            # But python-jose handles basic validation well.
            # Supabase JWTs are signed with the JWT Secret (HS256) by default, 
            # BUT they also provide JWKS for RS256/ES256 verification.
            # The user provided an ES256 key in the JWKS.
            
            payload = jwt.decode(
                token, 
                jwks, 
                algorithms=["ES256", "HS256"], 
                audience="authenticated",
                options={"verify_aud": True}
            )
            
            user_id = payload.get("sub")
            if not user_id:
                raise HTTPException(status_code=401, detail="Invalid token: missing sub")
                
            return User(id=UUID(user_id), email=payload.get("email"))
            
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid authentication credentials: {str(e)}",
                headers={"WWW-Authenticate": "Bearer"},
            )

auth_handler = AuthHandler()
get_current_user = auth_handler.get_current_user
