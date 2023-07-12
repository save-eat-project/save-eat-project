from typing import cast

from django.contrib.auth.signals import user_logged_in

from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied

from knox.models import AuthToken

from .typing import OAuthDataDict
from .models import User
from .auth import GoogleAuthentication, OAuthAuthentication


class OAuthLoginView(APIView):
    authentication_classes: tuple[type[OAuthAuthentication]]

    def create_token(self, user: User) -> str:
        #TODO: token limit
        _, token = AuthToken.objects.create(user)
        return token

    def post(self, request: Request):
        user = cast(User, request.user)
        auth = cast(OAuthDataDict, request.auth)

        if not auth:
            raise PermissionDenied()

        if not user:
            user = User.objects.create_oauth_user(auth)
            
        token = self.create_token(user)
        user_logged_in.send(sender=user.__class__, request=request, user=user)
        return Response({'token': token})


class GoogleLoginView(OAuthLoginView):
    authentication_classes = (GoogleAuthentication,)
        
