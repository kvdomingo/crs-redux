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
        summary = ' '.join(self.details.split(' ')[:10])
        return f"{self.user.student_number} ({self.user.last_name}, {self.user.first_name}) {summary}..."


class AcademicYear(models.Model):
    SEMESTER_CHOICES = [
        (1, 'First Semester'),
        (2, 'Second Semester'),
        (3, 'Midyear'),
    ]

    semester = models.PositiveSmallIntegerField(choices=SEMESTER_CHOICES)
    start_year = models.PositiveSmallIntegerField()

    class Meta:
        ordering = ['-start_year', '-semester']

    def __str__(self):
        return f"{dict(self.SEMESTER_CHOICES)[self.semester]}, A.Y. {self.start_year}-{self.start_year + 1}"


class EnlistingUnit(models.Model):
    code = models.CharField(max_length=16)
    name = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.code} {self.name}"

    class Meta:
        ordering = ['code']


class Instructor(models.Model):
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    department = models.ForeignKey(EnlistingUnit, on_delete=models.SET_NULL, related_name='instructors', null=True)

    def __str__(self):
        return f"{self.department.code} {self.last_name}, {self.first_name}"

    class Meta:
        ordering = ['department__code', 'last_name', 'first_name']


class RegularClass(models.Model):
    class_code = models.PositiveIntegerField(unique=True)
    course_code = models.CharField(max_length=32)
    number = models.PositiveSmallIntegerField()
    title = models.CharField(max_length=255)
    description = models.TextField()
    credits = models.FloatField()
    schedule = models.CharField(max_length=32)
    instructor = models.ManyToManyField(Instructor, related_name='classes')
    total_slots = models.PositiveSmallIntegerField()
    restrictions = models.TextField()

    def __str__(self):
        return f"{self.class_code} {self.course_code} {self.number} {self.schedule}"

    class Meta:
        ordering = ['-class_code']
        verbose_name_plural = 'Regular classes'
