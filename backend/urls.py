from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from . import views


urlpatterns = [
    path('auth/user/current', views.CurrentUser.as_view()),
    path('auth/user/create', views.UserList.as_view()),
    path('auth/user/update', views.UserUpdate.as_view()),
    path('auth/token/obtain', obtain_jwt_token),
    path('status', views.CrsStatusView.as_view()),
    path('announcements', views.AnnouncementList.as_view()),
    path('academic-years', views.AcademicYearList.as_view()),
    path('regular-classes/<int:start_year>/<int:semester>', views.RegularClassList.as_view()),
    path('class/add-desired', views.UserAddDesiredClass.as_view()),
]
