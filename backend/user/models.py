from typing import Any, TypedDict, cast
from django.db import models, transaction
from django.contrib.auth.models import AbstractUser, UserManager as BaseUserManager
from uuid import uuid4

from django.apps import apps


class UserManager(BaseUserManager):

    @transaction.atomic
    def create_oauth_user(
        self,
        name: str,
        oauth_uid: str,
        oauth_provider: str,
        email: str | None = None,
        avatar_url: str | None = None,
    ):
        user = cast(User, self.create_user(
            username=str(uuid4()),
            email=email,
            password=None,
        ))
        OAuth.objects.create(
            user=user,
            uid=oauth_uid,
            provider=oauth_provider,
        )
        Profile.objects.create(
            user=user,
            name=name,
            avatar_url=avatar_url,
        )

        return user


class User(AbstractUser):

    first_name = None   # type: ignore
    last_name = None    # type: ignore

    objects = UserManager()  # type: ignore

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []


import knox.models
from knox.settings import knox_settings
class AuthTokenManager(knox.models.AuthTokenManager):
    def create(self, user: User):
        #TODO: token limit
        return super().create(user)


class AuthToken(knox.models.AuthToken):

    class Meta:
        proxy = True

    objects = AuthTokenManager()


class OAuth(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    provider = models.CharField(max_length=20)
    uid = models.CharField(max_length=100)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=('provider', 'uid'), name='unique_oauth_account'),
            models.UniqueConstraint(
                fields=('user', 'provider'), name='one_provider_per_user'),
        ]


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=20)
    avatar_url = models.CharField(max_length=200, blank=True)
