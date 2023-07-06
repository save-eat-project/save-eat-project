from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework import status
from rest_framework.decorators import action

from .auth import create_token, verify_google_oauth
from .models import OAuth, User
from .serializer import LoginSerializer



class LoginView(ViewSet):

    @action(detail=False, methods=['POST'], name='login_with_google')
    def google(self, request: Request):

        login = LoginSerializer(data=request.data)
        login.is_valid(raise_exception=True)

        oauth_data = verify_google_oauth(login.validated_data['token'])

        try:
            oauth = OAuth.objects.select_related('user').get(
                auth_id=oauth_data['auth_id'],
                provider=oauth_data['provider'],
            )
            user = oauth.user
        except OAuth.DoesNotExist:
            user = User.objects.create_oauth_user(**oauth_data)

        token = create_token(user)

        return Response({'token': token})

    @action(detail=False, methods=['POST'], name='login_with_naver')
    def naver(self, request: Request):
        raise NotImplementedError()

    @action(detail=False, methods=['POST'], name='login_with_kakao')
    def kakao(self, request: Request):
        raise NotImplementedError()


