from django.contrib import admin
from .models import *


class UserRegistrationInline(admin.StackedInline):
    model = UserRegistrationStatus

class UserProfileAdmin(admin.ModelAdmin):
    inlines = [UserRegistrationInline]


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Announcement)
admin.site.register(Delinquency)

admin.site.index_title = 'Admin'
admin.site.site_title = 'UP Computerized Registration System'
admin.site.site_header = 'UP Computerized Registration System Administration'
