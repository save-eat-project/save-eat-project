from typing import TypedDict

class OAuthDataDict(TypedDict):
    provider: str
    auth_id: str
    name: str
    avatar_url: str | None
    email: str | None
