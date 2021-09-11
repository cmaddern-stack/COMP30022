from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.utils.translation import gettext as _

# Create your models here.

class UserProfile(models.Model):
    userAccount = models.OneToOneField(User, on_delete=models.CASCADE)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    emailAddress = models.EmailField(max_length=100)
    
class Contact(models.Model):
    firstName = models.CharField(max_length=50, blank=True, null=True)
    lastName = models.CharField(max_length=50, blank=True, null=True)
    emailAddress = models.EmailField(max_length=100, blank=True, null=True)
    organisation = models.CharField(max_length=100, blank=True, null=True)
    role = models.CharField(max_length=100, blank=True, null=True)
    phoneNumber = models.CharField(max_length=10, validators=[RegexValidator(r'^\d{1,10}$')], blank=True, null=True)
    notes = models.TextField(max_length=500, blank=True, null=True)
    whenAdded = models.DateTimeField(_("When Added"), auto_now=False, auto_now_add=True)
    starred = models.BooleanField(_("Star"), default=False)
    contactOwner = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    
class Group(models.Model):
    name = models.CharField(max_length=50)
    contacts = models.ManyToManyField(Contact, blank=True)
    
class Event(models.Model):
    attendees = models.ManyToManyField(Contact, blank=True)
    users = models.ManyToManyField(UserProfile, blank=True)
    name = models.CharField(max_length=100)
    startTime = models.DateTimeField()
    
class CustomQuestion(models.Model):
    question = models.CharField(max_length=50)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    
class CustomAnswer(models.Model):
    question = models.ForeignKey(CustomQuestion, on_delete=models.CASCADE)
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE)    
    data = models.TextField(max_length=500)
  
    