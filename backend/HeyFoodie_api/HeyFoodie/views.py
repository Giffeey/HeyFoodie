from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth.hashers import make_password

from rest_framework import generics, permissions, viewsets
from .models import Category, Ingredient_Category, Ingredient, Menu, Store, Order, Order_detail, Owner
from .models import Customer, SaleSize
from .serializers import MenuSerializer, CategorySerializer, IngredientCategorySerializer, IngredientSerializer, StoreSerializer, OwnerSerializer
from .serializers import SalesizeSerializer 
# OrderSerializer, OrderDetailSerializer, CustomerSerializer

import json
import logging

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView

# Create your views here.

class ListCategory(generics.ListCreateAPIView) :
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class DetailCategory(generics.RetrieveUpdateDestroyAPIView) :
    queryset = Category.objects.all()
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
    queryset = Ingredient.objects.all()
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


# class ListCustomer(generics.ListCreateAPIView):
#     queryset = Customer.objects.all()
#     serializer_class = CustomerSerializer

# class ListOrder(generics.ListCreateAPIView):
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer

# class ListOrderDetail(generics.ListCreateAPIView):
#     queryset = Order_detail.objects.all()
#     serializer_class = OrderDetailSerializer


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter