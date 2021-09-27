from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from .models import CustomAnswer, CustomQuestion, Contact, Event, UserProfile, Group, UserProfileField
from django.contrib.auth.models import Permission


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'


class UserAccountSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['username']
        )
        return user

    class Meta:
        model = User
        fields = '__all__'


class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = UserProfile
        fields = '__all__'


class ContactSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Contact
        fields = '__all__'


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Group
        fields = '__all__'


class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class CustomQuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomQuestion
        fields = '__all__'


class CustomAnswerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomAnswer
        fields = '__all__'


class UserProfileFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfileField
        fields = '__all__'
