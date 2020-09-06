from django.db import models
from tinymce.models import HTMLField
from django.contrib.auth.models import User


class UserProfile(models.Model):
    STATUS_CHOICES = [
        ('ST', 'Student'),
        ('FA', 'Faculty'),
        ('SF', 'Staff')
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    student_number = models.PositiveIntegerField(unique=True)
    birthday = models.DateField()
    status = models.CharField(max_length=2, choices=STATUS_CHOICES)
    course = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} ({self.user.email})"


class Announcement(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    content = HTMLField()

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f"{self.created}: {self.title}"
