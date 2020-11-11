from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.hashers import make_password
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.core.paginator import Paginator

from rest_framework import generics, permissions, viewsets
from .models import Category, Ingredient_Category, Ingredient, Menu, Store, Order, Order_detail, Owner
from .models import Customer, SaleSize, Payment, User
from .serializers import MenuSerializer, CategorySerializer, IngredientCategorySerializer, IngredientSerializer, StoreSerializer, OwnerSerializer
from .serializers import SalesizeSerializer, OrderSerializer, OrderDetailSerializer, CustomerSerializer, PaymentSerializer
from .form import ProfileForm, MenuForm, StoreForm

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
def editProfile(request, pk):
    profile_instance = get_object_or_404(User, pk=pk)

    if request.method == 'POST':
        form = ProfileForm(request.POST)

        if form.is_valid():
            profile_instance.save()
            return HttpResponseRedirect(reversed('profile'))
    context = {
        'form' : form,
        'profile_instance': profile_instance,
    }
    
    return render(request, 'editprofile.html', context)

@login_required
def order(request):
    querysets = Order.objects.all()
    orderdetail = Order_detail.objects.all()
    payment = Payment.objects.all()
    return render(request, 'order.html', {'qs': querysets, 'od': orderdetail, 'pm': payment})

@login_required
def editshop(request):
    querysets = Store.objects.all()
    store = get_object_or_404(Store, pk=1)
    form = StoreForm(instance=store)
    return render(request, 'editshop.html', {'qs': querysets, 'form': form})

@login_required
def editshop_update(request):
    store = get_object_or_404(Store, pk=1)
    if request.method == "POST":
        form = StoreForm(request.POST, instance=store)
        if form.is_valid():
            storename = form.cleaned_data.get('storename')
            detail = form.cleaned_data.get('detail')
            open_time = form.cleaned_data.get('open_time')
            close_time = form.cleaned_data.get('close_time')
            open_order = form.cleaned_data.get('open_order')
            close_order = form.cleaned_data.get('close_order')
            open_day = form.cleaned_data.get('open_day')
            fbpage = form.cleaned_data.get('fbpage')
            lineac = form.cleaned_data.get('lineac')
            igac = form.cleaned_data.get('igac')
            address = form.cleaned_data.get('address')
            obj = Store.objects.create(
                storename=storename,
                detail=detail,
                open_time=open_time,
                close_time=close_time,
                open_order=open_order,
                close_order=close_order,
                fbpage=fbpage,
                lineac=lineac,
                igac=igac,
                address=address
            )
            obj.open_day.set(open_day)
            obj.save()
            return redirect('editshop')
    else:
        form = StoreForm(instance=store)
        return render(request, 'editshop_update.html',{'form': form})
    

@login_required
def editmenu(request):
    querysets = Menu.objects.all()
    paginator = Paginator(querysets, 5)
    page = request.GET.get('page')
    menu = paginator.get_page(page)
    return render(request, 'editmenu.html', {'menu': menu})

@login_required
def editmenu_create(request):
    if request.method == "POST":
        form = MenuForm(request.POST, request.FILES)
        if form.is_valid():
            name = form.cleaned_data.get('name')
            category = form.cleaned_data.get('category')
            ingredient = form.cleaned_data.get('ingredient')
            salesize = form.cleaned_data.get('salesize')
            img = form.cleaned_data.get('image')
            obj = Menu.objects.create(
                name=name,
                category=category,
                image=img
            )
            obj.ingredient.set(ingredient)
            obj.salesize.set(salesize)
            obj.save()
            return redirect('editmenu')
    else:
        form = MenuForm()
        return render(request, 'editmenu_create.html', {'form': form})

@login_required
def editmenu_update(request, pk):
    menu = get_object_or_404(Menu, pk=pk)
    if request.method == "POST":
        form = MenuForm(request.POST, request.FILE, instance=menu)
        if form.is_valid():
            name = form.cleaned_data.get('name')
            category = form.cleaned_data.get('category')
            ingredient = form.cleaned_data.get('ingredient')
            salesize = form.cleaned_data.get('salesize')
            img = form.cleaned_data.get('image')
            obj = Menu.objects.create(
                name=name,
                category=category,
                image=img
            )
            obj.ingredient.set(ingredient)
            obj.salesize.set(salesize)
            obj.save()
            return redirect('editmenu')
    else:
        form = MenuForm(instance=menu)
        return render(request, 'editmenu_update.html',{'form': form, 'menu': menu})

@login_required
def editmenu_delete(request, pk):
    menu = get_object_or_404(Menu, pk=pk)
    if request.method == "POST":
            menu.delete()
            return redirect('editmenu')
    # else:
    #     return render(request, 'editmenu_delete.html',{'menu': menu})

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