from django.urls import path, include

from .views import GoogleLoginView
from knox.views import LogoutView, LogoutAllView

urlpatterns = [
    path('login/google/', GoogleLoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('logout/all/', LogoutAllView.as_view()),
]
