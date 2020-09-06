from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from . import views


urlpatterns = [
    path('auth/current-user', views.CurrentUser.as_view()),
    path('auth/users', views.UserList.as_view()),
    path('auth/token-auth', obtain_jwt_token),
    path('announcements', views.AnnouncementList.as_view()),
]