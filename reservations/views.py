from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, generics
from .models import Room, Reservation
from .serializers import (
    RoomSerializer, ReservationSerializer,
    UserSerializer, RegisterSerializer
)
from .permissions import IsOwnerOrReadOnly

class RoomViewSet(viewsets.ModelViewSet):
    """
    - list/retrieve: open to everyone
    - create/update/delete: staff only
    """
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            perms = [permissions.AllowAny]
        else:
            perms = [permissions.IsAdminUser]
        return [p() for p in perms]

class ReservationViewSet(viewsets.ModelViewSet):
    """
    - staff users see/manage all reservations
    - regular users see/manage only their own
    """
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return Reservation.objects.all() if user.is_staff else Reservation.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RegisterView(generics.CreateAPIView):
    """
    Public endpoint for new user registration.
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class UserViewSet(viewsets.ModelViewSet):
    """
    Staff-only CRUD on users.
    """
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
