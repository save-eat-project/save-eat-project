from django.contrib.auth import login, logout
from django.db.models.query import QuerySet

from rest_framework.generics import CreateAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework import status, generics, permissions

from .serializer import OAuthAccountSerializer, UserProfileSerializer

from .models import OAuth, User, Profile


class LoginView(APIView):

    permission_classes = (AllowAny,)
    serializer_class = OAuthAccountSerializer

    def post(self, request: Request):
        serializer = OAuthAccountSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        oauth_account = serializer.validated_data

        try:
            oauth = OAuth.objects.select_related('user').get(
                provider=oauth_account.provider,
                uid=oauth_account.uid,
            )
            user = oauth.user
        except OAuth.DoesNotExist:
            user = OAuth.objects.create_user(oauth_account)

        login(request, user)

        return Response(status=status.HTTP_204_NO_CONTENT)


class LogoutView(APIView):

    def post(self, request: Request):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfileView(generics.RetrieveUpdateAPIView):

    serializer_class = UserProfileSerializer

    def get_object(self):
        return Profile.objects.get(user=self.request.user)
