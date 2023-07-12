from typing import Any
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import BaseAuthentication, get_authorization_header
from rest_framework.request import Request

from knox.auth import AuthToken

import google.oauth2.id_token as google_oauth
import google.auth.transport.requests
from google.auth.exceptions import GoogleAuthError


from user.typing import OAuthDataDict


from .settings import GOOGLE_OAUTH_CLIENT_ID
from .typing import OAuthDataDict
from .models import OAuth





class OAuthAuthentication(BaseAuthentication):

    def verify_token(self, token: str) -> OAuthDataDict:
        raise NotImplementedError()

    def authenticate(self, request: Request):
        auth = get_authorization_header(request).split()

        if not auth or auth[0].lower() != b'bearer':
            return None

        if len(auth) != 2:
            raise AuthenticationFailed()

        oauth_data = self.verify_token(auth[1].decode())
        
        try:
            oauth = OAuth.objects.select_related('user').get(
                auth_id=oauth_data['auth_id'],
                provider=oauth_data['provider'],
            )
            user = oauth.user
        except OAuth.DoesNotExist:
            user = None

        return (user, oauth_data)


class GoogleAuthentication(OAuthAuthentication):

    def verify_token(self, token: str) -> OAuthDataDict:
        request = google.auth.transport.requests.Request()
        try:
            parsed: dict = google_oauth.verify_oauth2_token(
                token, request, GOOGLE_OAUTH_CLIENT_ID
            )
        except GoogleAuthError as error:
            raise AuthenticationFailed()

        return OAuthDataDict(
            provider='google',
            auth_id=parsed['sub'],
            name=parsed['name'],
            avatar_url=parsed['picture'],
            email=parsed['email'] if parsed['email_verified'] else None
        )
    

