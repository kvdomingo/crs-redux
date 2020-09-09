from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import *


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    user_status = serializers.SerializerMethodField()
    father_status = serializers.SerializerMethodField()
    mother_status = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
            'is_superuser': {'write_only': True},
            'is_staff': {'write_only': True},
            'is_active': {'write_only': True},
            'date_joined': {'write_only': True},
            'last_login': {'write_only': True},
            'groups': {'write_only': True},
            'user_permissions': {'write_only': True},
        }

    def get_user_status(self, obj):
        status_choices = dict(obj.STATUS_CHOICES)
        return status_choices[obj.user_status]

    def get_father_status(self, obj):
        life_status_choices = dict(obj.LIFE_STATUS_CHOICES)
        return life_status_choices[obj.father_status]

    def get_mother_status(self, obj):
        life_status_choices = dict(obj.LIFE_STATUS_CHOICES)
        return life_status_choices[obj.mother_status]


class UserStatusSerializer(serializers.ModelSerializer):
    preenlistment_priority = serializers.SerializerMethodField()
    registration_priority = serializers.SerializerMethodField()

    class Meta:
        model = UserRegistrationStatus
        fields = '__all__'

    def get_preenlistment_priority(self, obj):
        priority_choices = dict(obj.PRIORITY_CHOICES)
        return priority_choices[obj.preenlistment_priority]

    def get_registration_priority(self, obj):
        priority_choices = dict(obj.PRIORITY_CHOICES)
        return priority_choices[obj.registration_priority]


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True, min_length=8)

    def get_token(self, obj):
        payload = api_settings.JWT_PAYLOAD_HANDLER(obj)
        token = api_settings.JWT_ENCODE_HANDLER(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = UserProfile
        fields = '__all__'
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'


class DelinquencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delinquency
        fields = '__all__'


class AcademicYearSerializer(serializers.ModelSerializer):
    semester = serializers.SerializerMethodField()

    class Meta:
        model = AcademicYear
        fields = '__all__'

    def get_semester(self, obj):
        semester_choices = dict(obj.SEMESTER_CHOICES)
        return semester_choices[obj.semester]
