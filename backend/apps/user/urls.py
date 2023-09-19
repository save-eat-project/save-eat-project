from django.urls import path, include

from .views import LoginView, LogoutView, ProfileView

urlpatterns = [
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('profile', ProfileView.as_view()),
]
