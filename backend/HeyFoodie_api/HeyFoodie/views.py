from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render
from django.http import HttpResponse
from django.contrib.auth.hashers import make_password

from rest_framework import generics, permissions, viewsets
from .models import Category, Ingredient_Category, Ingredient, Menu, Store, Order, Order_detail, Owner
from .models import Customer, SaleSize, Payment
from .serializers import MenuSerializer, CategorySerializer, IngredientCategorySerializer, IngredientSerializer, StoreSerializer, OwnerSerializer
from .serializers import SalesizeSerializer, OrderSerializer, OrderDetailSerializer, CustomerSerializer, PaymentSerializer

import json
import logging

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView

@login_required
def home(request):
    return render(request, 'index.html')

@login_required
def profile(request):
    querysets = Owner.objects.all()
    return render(request, 'profile.html', {'qs': querysets})

@login_required
def order(request):
    querysets = Order.objects.all()
    orderdetail = Order_detail.objects.all()
    payment = Payment.objects.all()
    return render(request, 'order.html', {'qs': querysets, 'od': orderdetail, 'pm': payment})

@login_required
def editshop(request):
    querysets = Store.objects.all()
    return render(request, 'editshop_base.html', {'qs': querysets})

@login_required
def editshops(request):
    if request.method == "POST":
        store_id = request.POST.get('store_id')
        storename = request.POST.get('storename')
        detail = request.POST.get('detail')
        open_time = request.POST.get('open_time')
        close_time = request.POST.get('close_time')
        open_order = request.POST.get('open_order')
        close_order = request.POST.get('close_order')
        open_day = request.POST.get('open_day')

    querysets = Store.objects.all()
    return render(request, 'editshop.html', {'qs': querysets})

@login_required
def editmenu(request):
    return render(request, 'editmenu.html')


class ListCategory(generics.ListCreateAPIView) :
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class DetailCategory(generics.RetrieveUpdateDestroyAPIView) :
    queryset = Category.objects.all()
    lookup_field = 'category_id'
    serializer_class = CategorySerializer

class ListIngredientCategory(generics.ListCreateAPIView):
    queryset = Ingredient_Category.objects.all()
    serializer_class = IngredientCategorySerializer

class DetailIngredientCategory(generics.RetrieveUpdateDestroyAPIView) :
    queryset = Ingredient_Category.objects.all()
    serializer_class = IngredientCategorySerializer

class ListIngredient(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class DetailIngredient(generics.RetrieveUpdateDestroyAPIView) :
    def get_queryset(self):
        return Ingredient.objects.filter(ingredient_id=self.kwargs.get('pk', None))
    serializer_class = IngredientSerializer

class ListMenu(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class DetailMenu(generics.RetrieveUpdateDestroyAPIView) :
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class ListStore(generics.ListCreateAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

class DetailStore(generics.RetrieveUpdateDestroyAPIView) :
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

class ListOwner(generics.ListCreateAPIView):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer

class DetailOwner(generics.RetrieveUpdateDestroyAPIView) :
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer

class ListSalesize(generics.ListCreateAPIView):
    queryset = SaleSize.objects.all()
    serializer_class = SalesizeSerializer

class DetailSalesize(generics.RetrieveUpdateDestroyAPIView):
    queryset = SaleSize.objects.all()
    serializer_class = SalesizeSerializer

class ListCustomer(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class ListOrder(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class ListOrderDetail(generics.ListCreateAPIView):
    queryset = Order_detail.objects.all()
    serializer_class = OrderDetailSerializer

class ListPayment(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter