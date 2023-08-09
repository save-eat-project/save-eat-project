from django.db import models
from typing import cast
from django.db import models, transaction
from django.contrib.auth.models import AbstractUser, UserManager as BaseUserManager
from uuid import uuid4


from .oauth import OAuthAccount


class UserManager(BaseUserManager):

    def create_oauth_user(
        self,
        email: str | None = None,
    ):
        user = self.create_user(
            username=str(uuid4()),
            email=email,
            password=None,
        )
        return cast(User, user)


class User(AbstractUser):

    first_name = None  # type: ignore
    last_name = None  # type: ignore

    objects: UserManager = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=20)
    avatar_url = models.CharField(max_length=200, null=True)


class OAuthManager(models.Manager):

    @transaction.atomic
    def create_user(
        self,
        account: OAuthAccount
    ):
        user = User.objects.create_oauth_user(email=account.email)
        Profile.objects.create(
            user=user,
            name=account.name,
            avatar_url=account.avatar_url,
        )
        OAuth.objects.create(
            user=user,
            provider=account.provider,
            uid=account.uid,
        )

        return user


class OAuth(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    provider = models.CharField(max_length=20)
    uid = models.CharField(max_length=100)

    objects = OAuthManager()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=('provider', 'uid'), name='unique_oauth_account'),
            models.UniqueConstraint(
                fields=('user', 'provider'), name='one_provider_per_user'),
        ]
