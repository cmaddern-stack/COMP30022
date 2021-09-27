from django.contrib import admin

from .models import CustomAnswer, CustomQuestion, Contact, Event, UserProfile, Group, UserProfileField

# Register your models here.
admin.site.register(CustomAnswer)
admin.site.register(CustomQuestion)
admin.site.register(Contact)
admin.site.register(Event)
admin.site.register(UserProfile)
admin.site.register(Group)
admin.site.register(UserProfileField)