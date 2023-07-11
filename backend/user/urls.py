from django.urls import path, include

from . import views

urlpatterns = [
    path('login/google/', views.GoogleLoginView.as_view()),
    path('logout/', views.LogoutView.as_view())
]
