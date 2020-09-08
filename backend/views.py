from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *


class CurrentUser(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class CurrentUserStatus(APIView):
    def get(self, request):
        user_status = UserProfile.objects.get(pk=request.user.id).registration_status
        serializer = UserStatusSerializer(user_status)
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


class DelinquencyList(APIView):
    def get(self, request):
        delinquencies = UserProfile.objects.get(username=request.user.username).delinquencies.filter(settled=False)
        serializer = DelinquencySerializer(delinquencies, many=True)
        return Response(serializer.data)