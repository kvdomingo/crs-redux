from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }


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