from typing import Callable
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import generics


from .auth import GoogleLoginSerializer


class GoogleLoginView(generics.CreateAPIView):
    serializer_class = GoogleLoginSerializer

class LogoutView(APIView):

    def post(self, request: Request):
        raise NotImplementedError()
