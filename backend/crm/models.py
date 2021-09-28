from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.utils.translation import gettext as _
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.exceptions import ValidationError

# Create your models here.


def validate_file_size(file):
    MAX_FILE_SIZE = 10485760  # 10MB
    if file.size > MAX_FILE_SIZE:
        raise ValidationError("File size exceeded 10MB")
    return file

class UserProfile(models.Model):
    userAccount = models.OneToOneField(User, on_delete=models.CASCADE)
    organisation = models.CharField(max_length=100, blank=True, null=True)
    role = models.CharField(max_length=100, blank=True, null=True)
    phoneNumber = models.CharField(max_length=100, blank=True, null=True)
    image = models.ImageField(
        upload_to='images/', height_field=None, width_field=None, null=True, blank=True)


class UserProfileField(models.Model):
    userAccount = models.ForeignKey(User, on_delete=models.CASCADE)
    label = models.CharField(max_length=100, blank=False, null=False)
    value = models.CharField(max_length=100, blank=True, null=True)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(userAccount=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()


class Contact(models.Model):
    firstName = models.CharField(max_length=50, blank=True, null=True)
    lastName = models.CharField(max_length=50, blank=True, null=True)
    emailAddress = models.EmailField(max_length=100, blank=True, null=True)
    organisation = models.CharField(max_length=100, blank=True, null=True)
    role = models.CharField(max_length=100, blank=True, null=True)
    phoneNumber = models.CharField(max_length=10, validators=[
                                   RegexValidator(r'^\d{1,10}$')], blank=True, null=True)
    notes = models.TextField(max_length=500, blank=True, null=True)
    whenAdded = models.DateTimeField(
        _("When Added"), auto_now=False, auto_now_add=True)
    starred = models.BooleanField(_("Star"), default=False)
    contactOwner = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, blank=True, null=True)
    # TODO: ADD LINKEDIN LINK, PROFILE PICTURE


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
