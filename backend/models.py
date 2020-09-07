from django.db import models
from tinymce.models import HTMLField
from django.contrib.auth.models import AbstractUser


class UserProfile(AbstractUser):
    STATUS_CHOICES = [
        ('ST', 'Student'),
        ('FA', 'Faculty'),
        ('SF', 'Staff')
    ]

    PRIORITY_CHOICES = [
        ('LOW', 'Low'),
        ('REG', 'Regular'),
        ('FST', 'Freshman'),
        ('GRD', 'Graduating'),
        ('CCO', 'Cadet Officer'),
    ]

    middle_name = models.CharField(max_length=32, blank=True)
    student_number = models.PositiveIntegerField(unique=True, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES, blank=True, null=True)
    course = models.CharField(max_length=64, blank=True, null=True)
    registration_status = models.BooleanField(default=False)
    preenlistment_priority = models.CharField(max_length=3, choices=PRIORITY_CHOICES)
    registration_priority = models.CharField(max_length=3, choices=PRIORITY_CHOICES)
    academic_eligibility = models.BooleanField(default=True)
    accountability_status = models.BooleanField(default=True)
    deficiencies = models.BooleanField(default=False)
    scholarship = models.CharField(max_length=64, blank=True, null=True)

    def __str__(self):
        return f"{self.student_number} {self.last_name}, {self.first_name} ({self.email})"


class Announcement(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    content = HTMLField()

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f"{self.created}: {self.title}"


class Delinquency(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='delinquencies')
    details = models.TextField(blank=True)
    settled = models.BooleanField(default=False)
    date_settled = models.DateField(blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Delinquencies'

    def __str__(self):
        return f"{self.user.student_number} ({self.user.last_name}, {self.user.first_name}) {' '.join(self.details.split(' ')[:10])}..."