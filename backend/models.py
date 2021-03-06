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
        ordering = ['last_name', 'first_name', 'middle_name']


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


class CrsStatus(models.Model):
    MODE_CHOICES = [
        ('P', 'Preenlistment'),
        ('W', 'Waitlisting'),
        ('D0', 'Dropping'),
        ('D1', 'Post-dropping'),
        ('C', 'Closed'),
    ]

    mode = models.CharField(choices=MODE_CHOICES, max_length=4)
    set_available = models.BooleanField(verbose_name='SET available')

    class Meta:
        verbose_name_plural = 'CRS Status'

    def __str__(self):
        return dict(self.MODE_CHOICES)[self.mode]


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
    number = models.FloatField()
    section = models.CharField(max_length=16)
    title = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    credits = models.FloatField()
    schedule = models.CharField(max_length=32)
    start_time = models.TimeField(blank=True, null=True)
    end_time = models.TimeField(blank=True, null=True)
    days_held = models.CharField(max_length=8, default="TBA", blank=True)
    total_slots = models.PositiveSmallIntegerField()
    restrictions = models.TextField(blank=True)
    remarks = models.TextField(blank=True)
    linked_classes = models.ForeignKey('self', blank=True, null=True, on_delete=models.SET_NULL)
    enlisting_unit = models.ForeignKey(EnlistingUnit, related_name='classes', on_delete=models.CASCADE, blank=True)
    instructor = models.ManyToManyField(UserProfile, related_name='handled_classes', blank=True)
    tag = models.ManyToManyField(ClassTag, blank=True)
    semester = models.ForeignKey(AcademicYear, related_name='classes', on_delete=models.PROTECT)
    exclude_gwa = models.BooleanField(default=False)

    def __str__(self):
        number = int(self.number) if int(self.number) == self.number else self.number
        return f"{self.pk:05} {self.code} {number} {self.schedule}"

    class Meta:
        ordering = ['-pk']
        verbose_name_plural = 'Regular classes'


class ClassTaken(models.Model):
    STATUS_CHOICES = [
        ('', ''),
        ('D', 'Desired'),
        ('E', 'Enlisted'),
        ('W', 'Waitlisted'),
        ('X', 'Cancelled'),
        ('P', 'Passed'),
        ('F', 'Failed'),
        ('C', 'Conditional'),
    ]

    GRADE_CHOICES = list(range(100, 301, 25))
    GRADE_CHOICES.extend([400, 500])
    GRADE_CHOICES = list(map(lambda x: f"{x:.2f}", map(lambda x: x/100, GRADE_CHOICES)))
    GRADE_CHOICES.extend(['INC', 'DRP', 'P', 'F'])
    GRADE_CHOICES = list(tuple(zip(GRADE_CHOICES, GRADE_CHOICES)))

    user = models.ForeignKey(UserProfile, related_name='classes_taken', on_delete=models.CASCADE, blank=True, null=True)
    cls = models.ForeignKey(RegularClass, on_delete=models.PROTECT, related_name='class_list', verbose_name='class')
    grade = models.CharField(choices=GRADE_CHOICES, max_length=4, blank=True)
    completion_date = models.DateField(blank=True, null=True)
    remarks = models.CharField(max_length=255, blank=True)
    status = models.CharField(choices=STATUS_CHOICES, max_length=4, blank=True)
    cancelled_by = models.ForeignKey(UserProfile, related_name='classes_cancelled', blank=True, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{str(self.cls)} ({self.cls.credits}) {self.grade}"

    class Meta:
        verbose_name_plural = 'Classes taken'
        ordering = ['cls__semester__start_year', 'cls__semester__semester']
