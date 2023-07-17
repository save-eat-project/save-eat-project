from typing import cast

from django.contrib.auth.signals import user_logged_in
from django.db.models.query import QuerySet

from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView


from user.serializer import OAuthLoginSerializer

from .models import Profile, User


class OAuthLoginView(CreateAPIView):
    serializer_class = OAuthLoginSerializer

class ProfileView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)

    def get_queryset(self) -> QuerySet:
        user = cast(User, self.request.user)
        return Profile.objects.filter(user=user)
