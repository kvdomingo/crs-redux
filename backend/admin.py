from django.contrib import admin
from .models import *


class UserRegistrationInline(admin.StackedInline):
    model = UserRegistrationStatus


class DelinquencyInline(admin.TabularInline):
    model = Delinquency


class ClassTakenInline(admin.TabularInline):
    model = ClassTaken


class UserProfileAdmin(admin.ModelAdmin):
    inlines = [UserRegistrationInline, DelinquencyInline, ClassTakenInline]


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Announcement)
admin.site.register(AcademicYear)
admin.site.register(EnlistingUnit)
admin.site.register(ClassTag)
admin.site.register(RegularClass)

admin.site.index_title = 'Admin'
admin.site.site_title = 'UP Computerized Registration System'
admin.site.site_header = 'UP Computerized Registration System Administration'
