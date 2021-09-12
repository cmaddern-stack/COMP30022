from django.shortcuts import render

from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework import permissions
from .models import CustomAnswer, CustomQuestion, Contact, Event, UserProfile, Group
from .serialisers import ContactSerializer, GroupSerializer


# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the index.")

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all().order_by('whenAdded')
    serializer_class = ContactSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]