from django.urls import path, include

from .views import OAuthLoginView
from knox.views import LogoutView, LogoutAllView

urlpatterns = [
    path('login/', OAuthLoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('logout/all/', LogoutAllView.as_view()),
]
