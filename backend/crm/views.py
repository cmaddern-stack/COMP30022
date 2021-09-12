from django.shortcuts import render

from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework import permissions
from django.contrib.auth.models import User
from django.contrib.auth.models import Permission
from .models import CustomAnswer, CustomQuestion, Contact, Event, UserProfile, Group
from .serialisers import ContactSerializer, UserProfileSerializer, UserAccountSerializer, PermissionSerializer, GroupSerializer
from rest_framework.response import Response
from rest_framework.decorators import action


# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the index.")

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all().order_by('whenAdded')
    serializer_class = ContactSerializer 
    permission_classes = [permissions.IsAuthenticated]  
    
    """
    Only shows contacts that the user owns.
    """
    def list(self, request):
        user = self.request.user.userprofile
        queryset = Contact.objects.filter(contactOwner=user)
        serializer = ContactSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)
    
  
    """
    Displays all contacts in the database.
    """
    ## NOTE: For testing purposes only. Should add a permission modifier for only admins to access
    @action(detail=False)
    def all_contacts(self, request):
        queryset = Contact.objects.all()
        serializer = ContactSerializer(queryset, many=True, context={'request': request}) 
        return Response(serializer.data)
    
    ## NOTE: Not sure how this works lol
    # def retrieve(self, request, pk=None):
    #     query = Contact.objects.get(pk=pk)
    #     serializer = ContactSerializer(query, context={'request': request})
    #     return Response(serializer.data)
    
    
    ## NOTE: Overwritten these functions currently, investigate what needs to be edited for our purposes
    # def create(self, request):
    #     pass
    
    # def update(self, request, pk=None):
    #     pass

    # def partial_update(self, request, pk=None):
    #     pass

    # def destroy(self, request, pk=None):
    #     pass
    
   
## TODO: Make the following edpoints dynamic based on which user has logged in    
    
class UserProfileViewSet(viewsets.ModelViewSet):
    """
    Allows access to all user profiles in the database.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    #permission_classes = [permissions.IsAuthenticated]
        
    
class UserAccountViewSet(viewsets.ModelViewSet):
    """
    Allows access to all user accounts in the database.
    """
    queryset = User.objects.all()
    serializer_class = UserAccountSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    
class PermissionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows permissions to be viewed or edited.
    """
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]