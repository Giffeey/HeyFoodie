"""HeyFoodie_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.views.i18n import JavaScriptCatalog
from rest_framework import routers
from HeyFoodie import views
from HeyFoodie.views import FacebookLogin, GoogleLogin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('jsi18n', JavaScriptCatalog.as_view(), name='javascript-catalog'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('', views.home, name='home'),
    path('home/', views.home, name='home'),
    path('editprofile/', views.editProfile, name='editprofile'),
    path('editprofile/update/', views.editProfile_update, name='editprofile_update'),
    url(r'^password/$', views.change_password, name='change_password'),
    path('editshop/', views.editshop, name='editshop'),
    path('editshop/update/', views.editshop_update, name='editshop_update'),
    path('editmenu/', views.editmenu, name='editmenu'),
    path('editmenu/create/', views.editmenu_create, name='editmenu_create'),
    path('editmenu/<int:pk>/update/', views.editmenu_update, name='editmenu_update'),
    path('editmenu/<int:pk>/delete/', views.editmenu_delete, name='editmenu_delete'),
    path('editmenu/create/createCategory', views.createCategory, name='createCategory'),
    path('editmenu/create/createIngredient', views.createIngredient, name='createIngredient'),
    path('editmenu/create/createSalesize', views.createSalesize, name='createSalesize'),
    path('editingredient/', views.editingredient, name='editingredient'),
    path('editingredient/create/', views.editingredient_create, name='editingredient_create'),
    path('editingredient/create/createIngCategory', views.createIngCategory, name='createIngCategory'),
    path('editingredient/<int:pk>/update/', views.editingredient_update, name='editingredient_update'),
    path('editingredient/<int:pk>/delete/', views.editingredient_delete, name='editingredient_delete'),
    path('order/', views.order, name='order'),
    path('order/changeStatus/<int:pk>', views.changeStatus, name='changeStatus'),
    path('order/cancelOrder/<int:pk>', views.cancelOrder, name='cancelOrder'),
    path('api/', include('HeyFoodie.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
