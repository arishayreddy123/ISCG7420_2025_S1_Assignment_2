# reservations/models.py

from django.db import models
from django.conf import settings

class Room(models.Model):
    name = models.CharField(max_length=100, unique=True)
    capacity = models.PositiveIntegerField()
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Reservation(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='reservations'
    )
    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE,
        related_name='reservations'
    )
    start_time = models.DateTimeField()
    end_time   = models.DateTimeField()

    class Meta:
        # Prevent double-booking the same room at exactly the same times
        unique_together = ('room', 'start_time', 'end_time')

    def __str__(self):
        return f"{self.room.name} by {self.user.username} @ {self.start_time}"
