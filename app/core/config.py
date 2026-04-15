from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Union
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "InUnity Startup Profiler"
    SUPABASE_URL: str
    SUPABASE_SERVICE_KEY: str
    OPENROUTER_API_KEY: str
    CORS_ORIGINS: Union[List[str], str] = ["http://localhost:5173"]
    DATABASE_URL: str = ""

    @property
    def cors_origins_list(self) -> List[str]:
        if isinstance(self.CORS_ORIGINS, str):
            return [x.strip() for x in self.CORS_ORIGINS.split(",")]
        return self.CORS_ORIGINS

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
