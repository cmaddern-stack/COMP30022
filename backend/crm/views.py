from django.shortcuts import render

from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework import permissions
from django.contrib.auth.models import User
from django.contrib.auth.models import Permission
from .models import CustomAnswer, CustomQuestion, Contact, Event, UserProfile, Group
from .serialisers import ContactSerializer, UserProfileSerializer, UserAccountSerializer, PermissionSerializer


# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the index.")

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all().order_by('whenAdded')
    serializer_class = ContactSerializer   
    #permission_classes = [permissions.IsAuthenticated]
    
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    #permission_classes = [permissions.IsAuthenticated]
        
    
class UserAccountViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserAccountSerializer
    
    
class PermissionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows permissions to be viewed or edited.
    """
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer