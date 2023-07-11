from typing import Any
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

from knox.auth import AuthToken

import google.oauth2.id_token as google_oauth
import google.auth.transport.requests
from google.auth.exceptions import GoogleAuthError


from .settings import GOOGLE_OAUTH_CLIENT_ID
from .typing import OAuthDataDict
from .models import OAuth, User




class OAuthLoginSerializer(serializers.Serializer):
    token = serializers.CharField()

    def create(self, oauth_data: OAuthDataDict) -> str:
        try:
            oauth = OAuth.objects.select_related('user').get(
                auth_id=oauth_data['auth_id'],
                provider=oauth_data['provider'],
            )
            user = oauth.user

        except OAuth.DoesNotExist:
            user = User.objects.create_oauth_user(**oauth_data)

        _, token = AuthToken.objects.create(user)
        
        return token

    def to_representation(self, token: str) -> Any:
        return {
            'token': token
        }


class GoogleLoginSerializer(OAuthLoginSerializer):

    def validate(self, attrs: dict) -> Any:
        request = google.auth.transport.requests.Request()
        try:
            parsed: dict = google_oauth.verify_oauth2_token(
                attrs['token'], request, GOOGLE_OAUTH_CLIENT_ID
            )
        except GoogleAuthError:
            raise AuthenticationFailed()

        return OAuthDataDict(
            provider='google',
            auth_id=parsed['sub'],
            name=parsed['name'],
            avatar_url=parsed['picture'],
            email=parsed['email'] if parsed['email_verified'] else None
        )

