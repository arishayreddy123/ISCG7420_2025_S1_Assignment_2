# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views as drf_views

urlpatterns = [
    path('admin/', admin.site.urls),

    # Token-based auth (POST username/password → { "token": "..." })
    path('api/auth/token/', drf_views.obtain_auth_token, name='api-token'),

    # Browsable API login/logout (optional, for session auth in browsable view)
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # Your reservations API (rooms & reservations)
    path('api/', include('reservations.urls')),
]
