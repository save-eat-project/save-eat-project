
from rest_framework.exceptions import AuthenticationFailed, ValidationError

from .settings import GOOGLE_OAUTH_CLIENT_ID


class BaseOAuthAccount:

    provider: str
    uid: str
    name: str
    avatar_url: str | None
    email: str | None

    def __init__(self, access_token: str):
        raise NotImplementedError()


class GoogleOAuthAccount(BaseOAuthAccount):

    import google.oauth2.id_token as google_oauth
    from google.auth.exceptions import GoogleAuthError
    import google.auth.transport.requests

    provider = 'google'

    def __init__(self, access_token: str) -> None:
        self._token = access_token
        request = self.google.auth.transport.requests.Request()
        try:
            parsed: dict = self.google_oauth.verify_oauth2_token(
                access_token, request, GOOGLE_OAUTH_CLIENT_ID
            )
        except self.GoogleAuthError:
            raise AuthenticationFailed()

        self.uid = parsed['sub']
        self.name = parsed['name']
        self.avatar_url = parsed['picture']
        self.email = parsed['email'] if parsed['email_verified'] else None


class OAuthAccount(BaseOAuthAccount):

    def __new__(cls, provider: str, access_token: str):
        match provider:
            case GoogleOAuthAccount.provider:
                return GoogleOAuthAccount(access_token)
            case _:
                raise ValidationError('invalid provider %s' % provider)
