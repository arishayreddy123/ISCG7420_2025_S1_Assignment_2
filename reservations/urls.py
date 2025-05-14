from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RoomViewSet, ReservationViewSet,
    UserViewSet, RegisterView
)

router = DefaultRouter()
router.register(r'rooms', RoomViewSet, basename='room')
router.register(r'reservations', ReservationViewSet, basename='reservation')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    # Registration endpoint
    path('auth/register/', RegisterView.as_view(), name='auth-register'),
    # Rooms, Reservations, Users
    path('', include(router.urls)),
]
