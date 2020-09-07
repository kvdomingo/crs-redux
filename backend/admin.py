from django.contrib import admin
from .models import *


admin.site.register(UserProfile)
admin.site.register(Announcement)
admin.site.register(Delinquency)

admin.site.index_title = 'Admin'
admin.site.site_title = 'UP Computerized Registration System'
admin.site.site_header = 'UP Computerized Registration System Administration'
