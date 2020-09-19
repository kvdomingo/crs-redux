from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *


class CrsStatusView(APIView):
    def get(self, request):
        status = CrsStatus.objects.first()
        serializer = CrsStatusSerializer(status)
        return Response(serializer.data)


class CurrentUser(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class UserList(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format='json'):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserUpdate(APIView):
    def patch(self, request, format='json'):
        user = UserProfile.objects.get(username=request.user.username)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnnouncementList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        announcements = Announcement.objects.all()
        serializer = AnnouncementSerializer(announcements, many=True)
        return Response(serializer.data)


class AcademicYearList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        academic_years = AcademicYear.objects.all()  # [:3]
        serializer = AcademicYearSerializer(academic_years, many=True)
        return Response(serializer.data)


class RegularClassList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, start_year, semester):
        classes = RegularClass.objects.filter(semester__start_year=start_year).filter(semester__semester=semester).all()
        serializer = RegularClassSerializer(classes, many=True)
        return Response(serializer.data)


class UserAddDesiredClass(APIView):
    def post(self, request):
        user = UserProfile.objects.get(username=request.user.username)
        user_status = user.registration_status
        regular_class = RegularClass.objects.get(pk=request.data['id'])
        class_taken = ClassTaken.objects.create(
            user=user,
            cls=regular_class,
            status='D',
        )
        user_status.classes_taken.add(class_taken)
        serializer = UserStatusSerializer(user_status)
        if serializer:
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
