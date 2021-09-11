from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'contacts', views.ContactViewSet)
router.register(r'userprofiles', views.UserProfileViewSet)
router.register(r'useraccounts', views.UserAccountViewSet)
router.register(r'permission', views.PermissionViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]