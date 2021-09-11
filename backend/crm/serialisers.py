from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from .models import CustomAnswer, CustomQuestion, Contact, Event, UserProfile, Group



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
          
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'
          
          
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
  
class CustomQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomQuestion
        fields = '__all__'
  
class CustomAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomAnswer
        fields = '__all__'
  