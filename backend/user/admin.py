from django.contrib import admin

from .models import User, OAuth, Profile

admin.site.register(User)
admin.site.register(OAuth)
admin.site.register(Profile)
