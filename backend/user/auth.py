from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

from knox.auth import AuthToken

import google.oauth2.id_token as google_oauth
import google.auth.transport.requests
from google.auth.exceptions import GoogleAuthError


from .settings import GOOGLE_OAUTH_CLIENT_ID
from .typing import OAuthDataDict
from .models import User


class OAuthSerializer(serializers.Serializer):
    provider = serializers.CharField()
    auth_id = serializers.CharField()

    name = serializers.CharField()
    avatar_url = serializers.URLField(required=False)
    email = serializers.EmailField(required=False)

    validated_data: OAuthDataDict


def create_token(user: User):
    _, token = AuthToken.objects.create(user)
    return token


def verify_google_oauth(token: str):
    request = google.auth.transport.requests.Request()
    try:
        parsed: dict = google_oauth.verify_oauth2_token(
            token, request, GOOGLE_OAUTH_CLIENT_ID
        )
    except GoogleAuthError:
        raise AuthenticationFailed()

    serializer = OAuthSerializer(
        data=OAuthDataDict(
            provider='google',
            auth_id=parsed['sub'],
            name=parsed['name'],
            avatar_url=parsed['picture'],
            email=parsed['email'] if parsed['email_verified'] else None
        )
    )
    serializer.is_valid(raise_exception=True)

    return serializer.validated_data
