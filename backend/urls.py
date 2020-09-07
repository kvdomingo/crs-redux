from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from . import views


urlpatterns = [
    path('auth/user/current', views.CurrentUser.as_view()),
    path('auth/user/create', views.UserList.as_view()),
    path('auth/token/obtain', obtain_jwt_token),
    path('auth/current-user', views.CurrentUser.as_view()),
    path('announcements', views.AnnouncementList.as_view()),
    path('delinquencies', views.DelinquencyList.as_view()),
]