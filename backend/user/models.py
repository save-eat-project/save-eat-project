from django.db import models, transaction
from django.contrib.auth.models import AbstractUser, UserManager as BaseUserManager
from uuid import uuid4


class UserManager(BaseUserManager):

    @transaction.atomic
    def create_oauth_user(
        self,
        auth_id: str,
        provider: str,
        name: str,
        email: str | None = None,
        avatar_url: str | None = None,
    ) -> 'User':

        user = self.create_user(
            username=str(uuid4()),
            email=email,
            password=None,
        )
        OAuth.objects.create(
            user=user,
            auth_id=auth_id,
            provider=provider,
        )
        Profile.objects.create(
            user=user,
            name=name,
            avatar_url=avatar_url,
        )

        return user


class User(AbstractUser):

    first_name = None
    last_name = None

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []


class OAuth(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    provider = models.CharField(max_length=20)
    auth_id = models.CharField(max_length=100)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=('provider', 'auth_id'), name='unique_oauth_account'),
            models.UniqueConstraint(
                fields=('user', 'provider'), name='one_provider_per_user'),
        ]


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=20)
    avatar_url = models.CharField(max_length=200, blank=True)
