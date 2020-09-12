from django.db import models
from tinymce.models import HTMLField
from django.contrib.auth.models import AbstractUser


class UserProfile(AbstractUser):
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
    disability = models.BooleanField(default=False)
    disability_type = models.CharField(max_length=3, choices=DISABILITY_CHOICES, default='N/A')
    disability_details = models.CharField(max_length=32, blank=True)
    present_address = models.TextField(blank=True)
    permanent_address = models.TextField(blank=True)
    father_status = models.CharField(max_length=1, choices=LIFE_STATUS_CHOICES, default='', blank=True)
    father_first_name = models.CharField(max_length=32, blank=True)
    father_middle_name = models.CharField(max_length=32, blank=True)
    father_last_name = models.CharField(max_length=32, blank=True)
    father_email = models.EmailField(blank=True)
    father_contact_number = models.CharField(max_length=16, blank=True)
    mother_status = models.CharField(max_length=1, choices=LIFE_STATUS_CHOICES, default='', blank=True)
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
        try:
            number = self.registration_status.student_number
        except Exception as e:
            print(e)
            number = 'UNASSIGNED'
        return f"{number} {self.last_name.upper()}, {self.first_name} ({self.email})"

    class Meta:
        ordering = ['-registration_status__student_number']


class UserRegistrationStatus(models.Model):
    STATUS_CHOICES = [
        ('', ''),
        ('STD', 'Student'),
        ('JFC', 'Junior Faculty'),
        ('SFC', 'Senior Faculty'),
        ('STF', 'Staff')
    ]

    PRIORITY_CHOICES = [
        ('LOW', 'Low'),
        ('REG', 'Regular'),
        ('FST', 'Freshman'),
        ('GRD', 'Graduating'),
        ('CCO', 'Cadet Officer'),
    ]

    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name='registration_status', blank=True, null=True)
    student_number = models.PositiveIntegerField(unique=True, blank=True, null=True)
    course = models.CharField(max_length=64, blank=True, null=True)
    user_status = models.CharField(max_length=4, choices=STATUS_CHOICES, blank=True, null=True)
    registration_status = models.BooleanField(default=False)
    preenlistment_priority = models.CharField(max_length=3, choices=PRIORITY_CHOICES, default='REG')
    registration_priority = models.CharField(max_length=3, choices=PRIORITY_CHOICES, default='REG')
    academic_eligibility = models.BooleanField(default=True)
    accountability_status = models.BooleanField(default=True)
    scholarship = models.CharField(max_length=64, blank=True, null=True)
    classes_taken = models.ManyToManyField('ClassTaken', related_name='enlisted_students', blank=True)
    first_enrolled = models.ForeignKey('AcademicYear', on_delete=models.PROTECT, related_name='freshmen', blank=True, null=True)
    is_crs_admin = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.student_number} {self.user.last_name.upper()}, {self.user.first_name} ({self.user.email})"

    class Meta:
        ordering = ['-student_number']
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
        return f"{self.user.registration_status.student_number} ({self.user.last_name}, {self.user.first_name}) {summary}..."


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


class ClassTag(models.Model):
    code = models.CharField(max_length=4)
    name = models.CharField(max_length=32)

    def __str__(self):
        return f"{self.code} {self.name}"

    class Meta:
        ordering = ['code']


class RegularClass(models.Model):
    code = models.CharField(max_length=32)
    number = models.PositiveSmallIntegerField()
    section = models.CharField(max_length=16)
    title = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    credits = models.FloatField()
    schedule = models.CharField(max_length=32)
    total_slots = models.PositiveSmallIntegerField()
    restrictions = models.TextField(blank=True)
    instructor = models.ManyToManyField(UserProfile, related_name='handled_classes', blank=True)
    enlisted = models.ManyToManyField(UserProfile, related_name='enlisted_classes', blank=True)
    tag = models.ManyToManyField(ClassTag, blank=True)
    semester = models.ForeignKey(AcademicYear, related_name='classes', on_delete=models.PROTECT)

    def __str__(self):
        return f"{self.pk:05} {self.code} {self.number} {self.schedule}"

    class Meta:
        ordering = ['-pk']
        verbose_name_plural = 'Regular classes'


class ClassTaken(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, blank=True, null=True)
    cls = models.ForeignKey(RegularClass, on_delete=models.PROTECT)
    grade = models.FloatField(blank=True, null=True)
    completion_date = models.DateField(blank=True, null=True)
    remarks = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{str(self.cls)} ({self.cls.credits}) {self.grade}"

    class Meta:
        verbose_name_plural = 'Classes taken'
        ordering = ['cls__semester__start_year', 'cls__semester__semester']