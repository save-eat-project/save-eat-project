from rest_framework import serializers

from .models import Profile
from .oauth import OAuthAccount


class OAuthAccountSerializer(serializers.Serializer):

    provider = serializers.CharField()
    access_token = serializers.CharField()

    validated_data: OAuthAccount

    def validate(self, attrs: dict):
        return OAuthAccount(**attrs)


class UserProfileSerializer(serializers.Serializer):
    name = serializers.CharField()
    avatar_url = serializers.CharField(required=False)

    def update(self, instance: Profile, validated_data: dict):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
