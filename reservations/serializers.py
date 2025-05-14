from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Room, Reservation

class RoomSerializer(serializers.ModelSerializer):
    """
    Serializes Room instances.
    """
    class Meta:
        model = Room
        fields = ['id', 'name', 'capacity', 'description']


class ReservationSerializer(serializers.ModelSerializer):
    """
    Serializes Reservation instances.
    Includes a read-only username and room name for display.
    """
    user = serializers.ReadOnlyField(source='user.username')
    room_name = serializers.ReadOnlyField(source='room.name')

    class Meta:
        model = Reservation
        fields = ['id', 'user', 'room', 'room_name', 'start_time', 'end_time']


class UserSerializer(serializers.ModelSerializer):
    """
    Staff-only view of User for CRUD.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_staff']
        read_only_fields = ['is_staff']


class RegisterSerializer(serializers.ModelSerializer):
    """
    Public registration serializer.
    """
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name', 'email']

    def create(self, validated_data):
        """
        Create a new user with the provided data.
        """
        return User.objects.create_user(
            username   = validated_data['username'],
            password   = validated_data['password'],
            first_name = validated_data.get('first_name', ''),
            last_name  = validated_data.get('last_name', ''),
            email      = validated_data.get('email', '')
        )
