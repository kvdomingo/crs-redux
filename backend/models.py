from django.db import models
from tinymce.models import HTMLField
from django.contrib.auth.models import AbstractUser


class UserProfile(AbstractUser):
    STATUS_CHOICES = [
        ('ST', 'Student'),
        ('FA', 'Faculty'),
        ('SF', 'Staff')
    ]

    LIFE_STATUS_CHOICES = [
        ('', ''),
        ('A', 'Alive'),
        ('D', 'Deceased'),
        ('U', 'Unknown'),
    ]

    DISABILITY_CHOICES = [
        ('N/A', 'None'),
        ('VIS', 'Visual'),
        ('AUD', 'Auditory'),
        ('PSY', 'Psychological'),
        ('PHY', 'Physical'),
    ]

    middle_name = models.CharField(max_length=32, blank=True)
    birthday = models.DateField(blank=True, null=True)
    mobile_number = models.CharField(max_length=16, blank=True)
    telephone_number = models.CharField(max_length=16, blank=True)
    user_status = models.CharField(max_length=2, choices=STATUS_CHOICES, blank=True, null=True)
    course = models.CharField(max_length=64, blank=True, null=True)
    disability = models.BooleanField(default=False)
    disability_type = models.CharField(max_length=3, choices=DISABILITY_CHOICES, default='N/A')
    disability_details = models.CharField(max_length=32, blank=True)
    present_address = models.TextField(blank=True)
    permanent_address = models.TextField(blank=True)
    father_status = models.CharField(max_length=1, choices=LIFE_STATUS_CHOICES, default='')
    father_first_name = models.CharField(max_length=32, blank=True)
    father_middle_name = models.CharField(max_length=32, blank=True)
    father_last_name = models.CharField(max_length=32, blank=True)
    father_email = models.EmailField(blank=True)
    father_contact_number = models.CharField(max_length=16, blank=True)
    mother_status = models.CharField(max_length=1, choices=LIFE_STATUS_CHOICES, default='')
    mother_first_name = models.CharField(max_length=32, blank=True)
    mother_maiden_middle_name = models.CharField(max_length=32, blank=True)
    mother_maiden_last_name = models.CharField(max_length=32, blank=True)
    mother_email = models.EmailField(blank=True)
    mother_contact_number = models.CharField(max_length=16, blank=True)
    guardian_first_name = models.CharField(max_length=32, blank=True)
    guardian_middle_name = models.CharField(max_length=32, blank=True)
    guardian_last_name = models.CharField(max_length=32, blank=True)
    guardian_email = models.EmailField(blank=True)
    guardian_contact_number = models.CharField(max_length=16, blank=True)

    def __str__(self):
        return f"{self.registration_status.student_number} {self.last_name}, {self.first_name} ({self.email})"


class UserRegistrationStatus(models.Model):
    PRIORITY_CHOICES = [
        ('LOW', 'Low'),
        ('REG', 'Regular'),
        ('FST', 'Freshman'),
        ('GRD', 'Graduating'),
        ('CCO', 'Cadet Officer'),
    ]

    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name='registration_status', blank=True)
    student_number = models.PositiveIntegerField(unique=True, blank=True, null=True)
    registration_status = models.BooleanField(default=False)
    preenlistment_priority = models.CharField(max_length=3, choices=PRIORITY_CHOICES, default='REG')
    registration_priority = models.CharField(max_length=3, choices=PRIORITY_CHOICES, default='REG')
    academic_eligibility = models.BooleanField(default=True)
    accountability_status = models.BooleanField(default=True)
    scholarship = models.CharField(max_length=64, blank=True, null=True)

    def __str__(self):
        return f"{self.student_number} {self.user.last_name}, {self.user.first_name} ({self.user.email})"

    class Meta:
        verbose_name_plural = 'User registration status'


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
