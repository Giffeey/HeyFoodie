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
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.views.i18n import JavaScriptCatalog
from rest_framework import routers
from HeyFoodie import views
from django.views.generic import TemplateView
from HeyFoodie.views import FacebookLogin, frontindex

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', frontindex, name='frontindex'),
    path('jsi18n', JavaScriptCatalog.as_view(), name='javascript-catalog'),
    path('accounts/', include('django.contrib.auth.urls')),
    # path('', views.index, name='index'),
    path('store/home/', views.home, name='home'),
    path('store/contact/', views.contact, name='contact'),
    path('store/ability/', views.ability, name='ability'),

    path('store/history/', views.history, name='history'),
    path('store/editprofile/', views.editProfile, name='editprofile'),
    path('store/editprofile/update/', views.editProfile_update, name='editprofile_update'),
    url(r'^password/$', views.change_password, name='change_password'),
    path('store/editshop/', views.editshop, name='editshop'),
    path('store/editshop/update/', views.editshop_update, name='editshop_update'),
    path('store/editmenu/', views.editmenu, name='editmenu'),
    path('store/editmenu/create/', views.editmenu_create, name='editmenu_create'),
    path('store/editmenu/<int:pk>/update/', views.editmenu_update, name='editmenu_update'),
    path('store/editmenu/<int:pk>/delete/', views.editmenu_delete, name='editmenu_delete'),

    path('store/createcategory/', views.createCategory, name='createCategory'),
    path('store/createsalesize/', views.createSalesize, name='createSalesize'),
    path('store/createIngredient/', views.createIngredient, name='createIngredient'),
    path('store/createingcategory/', views.createIngCategory, name='createIngCategory'),
    
    path('store/editingredient/', views.editingredient, name='editingredient'),
    path('store/editingredient/create/', views.editingredient_create, name='editingredient_create'),
    path('store/editingredient/<int:pk>/update/', views.editingredient_update, name='editingredient_update'),
    path('store/editingredient/<int:pk>/delete/', views.editingredient_delete, name='editingredient_delete'),
    path('store/editcategory/', views.editcategory, name='editcategory'),
    path('store/editcategory/create', views.editcategory_create, name='editcategory_create'),
    path('store/editcategory/<int:pk>/update/', views.editcategory_update, name='editcategory_update'),
    path('store/editcategory/<int:pk>/delete/', views.editcategory_delete, name='editcategory_delete'),
    path('store/editingcategory/', views.editingcategory, name='editingcategory'),
    path('store/editingcategory/create', views.editingcategory_create, name='editingcategory_create'),
    path('store/editingcategory/<int:pk>/update/', views.editingcategory_update, name='editingcategory_update'),
    path('store/editingcategory/<int:pk>/delete/', views.editingcategory_delete, name='editingcategory_delete'),
    path('store/editsalesize/', views.editsalesize, name='editsalesize'),
    path('store/editsalesize/create', views.editsalesize_create, name='editsalesize_create'),
    path('store/editsalesize/<int:pk>/update/', views.editsalesize_update, name='editsalesize_update'),
    path('store/editsalesize/<int:pk>/delete/', views.editsalesize_delete, name='editsalesize_delete'),
    path('store/order/', views.order, name='order'),
    path('store/order/changeStatus/<int:pk>', views.changeStatus, name='changeStatus'),
    path('store/order/cancelOrder/<int:pk>', views.cancelOrder, name='cancelOrder'),

    path('bestsellmenuday/', views.bestsellmenuday, name='bestsellmenuday'),
    path('bestsellmenuweek/', views.bestsellmenuweek, name='bestsellmenuweek'),
    path('bestsellmenumonth/', views.bestsellmenumonth, name='bestsellmenumonth'),

    path('api/', include('HeyFoodie.urls')),

    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login')

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
