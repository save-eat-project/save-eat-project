from typing import cast

from django.contrib.auth.signals import user_logged_in
from django.db.models.query import QuerySet

from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated


from user.serializer import OAuthLoginSerializer, UserProfileSerializer
from user.models import Profile, User


class OAuthLoginView(CreateAPIView):
    serializer_class = OAuthLoginSerializer

class ProfileView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserProfileSerializer

    def get_object(self):
        user = cast(User, self.request.user)
        return Profile.objects.get(user=user)
