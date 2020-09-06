from django.db import models
from django.contrib.auth.models import User


class Announcement(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    content = models.TextField()

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f"{self.created}: {self.title}"
