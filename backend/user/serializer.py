from typing import Any
from rest_framework import serializers

from user.models import AuthToken, OAuth, Profile, User
from user.oauth import OAuthAccount

class OAuthLoginSerializer(serializers.Serializer):

    provider = serializers.CharField()
    access_token = serializers.CharField()

    validated_data: OAuthAccount

    def validate(self, attrs: dict):
        attrs['oauth_account'] = OAuthAccount(
            provider=attrs['provider'],
            access_token=attrs['access_token'],
        )
        return attrs

    def create(self, validated_data: dict) -> str:
        account: OAuthAccount = validated_data['oauth_account']
        try:
            oauth = OAuth.objects.select_related('user').get(
                provider=account.provider,
                uid=account.uid,
            )
            user = oauth.user
        except OAuth.DoesNotExist:
            user = User.objects.create_oauth_user(
                email=account.email,
                avatar_url=account.avatar_url,
                name=account.name,
                oauth_uid=account.uid,
                oauth_provider=account.provider,
            )
        
        _, token = AuthToken.objects.create(user)
        return token


    def to_representation(self, token: str) -> Any:
        return {
            'token': token
        }
