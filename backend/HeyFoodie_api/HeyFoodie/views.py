from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.shortcuts import get_object_or_404, redirect, render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.hashers import make_password
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.core.paginator import Paginator
from django.db.models import Q
from rest_framework.response import Response
import datetime

from rest_framework import generics, permissions, viewsets
from .serializers import (
    MenuSerializer,
    CategorySerializer,
    IngredientCategorySerializer,
    IngredientSerializer,
    StoreSerializer,
)
from .serializers import (
    SalesizeSerializer,
    OrderSerializer,
    OrderDetailSerializer,
    CustomerSerializer,
    PaymentSerializer,
)
from .form import (
    ProfileForm,
    MenuForm,
    StoreForm,
    CategoryForm,
    IngredientForm,
    IngredientCategoryForm,
    SalesizeForm,
)
from .models import (
    Category,
    Ingredient_Category,
    Ingredient,
    Menu,
    Store,
    Order,
    Order_detail,
    Customer,
    SaleSize,
    Payment,
    User,
)
from .models import Customer, SaleSize, Payment, User
from .serializers import (
    MenuSerializer,
    CategorySerializer,
    IngredientCategorySerializer,
    IngredientSerializer,
    StoreSerializer,
)
from .serializers import (
    SalesizeSerializer,
    OrderSerializer,
    OrderDetailSerializer,
    CustomerSerializer,
    PaymentSerializer,
)
from .form import ProfileForm, MenuForm, StoreForm, CategoryForm, IngredientForm

import json
import logging

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
import logging
from rest_framework import status


@login_required
def home(request):
    store = get_object_or_404(Store, pk=1)
    return render(request, "index.html", {"store": store})


@login_required
def editProfile(request):
    profile = get_object_or_404(User, pk=request.user.id)
    store = get_object_or_404(Store, pk=1)
    return render(request, "editprofile.html", {"profile": profile, "store": store})


@login_required
def editProfile_update(request):
    store = get_object_or_404(Store, pk=1)
    profile = get_object_or_404(User, pk=request.user.id)

    if request.method == "POST":
        form = ProfileForm(request.POST, instance=profile)

        if form.is_valid():
            form.clean_user()
            form.save()
            return redirect("editprofile")
        else:
            messages.error(request, "Error")
            return redirect("editprofile")

    else:
        form = ProfileForm(instance=profile)
        return render(
            request,
            "editprofile_update.html",
            {"form": form, "profile": profile, "store": store},
        )


def change_password(request):
    store = get_object_or_404(Store, pk=1)
    if request.method == "POST":
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            messages.success(request, "Your password was successfully updated!")
            return redirect("editprofile_update")
        else:
            messages.error(request, "Please correct the error below.")
            return redirect("editprofile_update")
    else:
        form = PasswordChangeForm(request.user)
        return render(
            request, "accounts/change_password.html", {"form": form, "store": store}
        )


@login_required
def order(request):
    store = get_object_or_404(Store, pk=1)
    order = Order.objects.get_queryset().order_by("order_id")
    order = order.filter(
        Q(order_status="COOKING")
        | Q(order_status="WAITING")
        | Q(order_status="READYTOPICKUP")
    )
    orderdetail = Order_detail.objects.all()
    payment = Payment.objects.all()

    paginator = Paginator(order, 5)
    page = request.GET.get("page")
    orders = paginator.get_page(page)

    return render(
        request,
        "order.html",
        {"orders": orders, "od": orderdetail, "pm": payment, "store": store},
    )


@login_required
def changeStatus(request, pk):
    order = get_object_or_404(Order, pk=pk)
    if request.method == "POST":
        if order.order_status == "WAITING":
            order.order_status = "COOKING"
            order.save()
            return redirect("order")
        elif order.order_status == "COOKING":
            order.order_status = "READYTOPICKUP"
            order.save()
            return redirect("order")
        elif order.order_status == "READYTOPICKUP":
            paymentord = Payment.objects.all().filter(order=pk)
            payment = get_object_or_404(paymentord)
            if payment.method == "CASH":
                print("change date, status payment")
                payment.purchase_date = datetime.datetime.now()
                payment.status = "complete"
                print(payment.purchase_date)
                print(payment.status)
                payment.save()
            else:
                print("credit/debit payment")

            order.order_status = "DONE"
            order.save()
            return redirect("order")
        else:
            print("complete")
            return redirect("order")

        return redirect("order")


@login_required
def editshop(request):
    store = get_object_or_404(Store, pk=1)
    form = StoreForm(instance=store)
    return render(request, "editshop.html", {"store": store, "form": form})


@login_required
def editshop_update(request):
    store = get_object_or_404(Store, pk=1)
    if request.method == "POST":
        form = StoreForm(request.POST, instance=store)
        if form.is_valid():
            form.save()
            return redirect("editshop")
        else:
            messages.error(request, "Error")
            return redirect("editshop_update")

    else:
        form = StoreForm(instance=store)
        return render(request, "editshop_update.html", {"form": form})


@login_required
def editcategory(request):
    store = get_object_or_404(Store, pk=1)
    category = Category.objects.get_queryset().order_by("category_id")
    paginator = Paginator(category, 5)
    page = request.GET.get("page")
    cat = paginator.get_page(page)
    form = CategoryForm()
    return render(
        request, "editcategory.html", {"category": cat, "store": store, "form": form}
    )


@login_required
def editcategory_create(request):
    if request.method == "POST":
        form = CategoryForm(request.POST)
        if form.is_valid():
            form.cleaned_data
            form.save()
            return redirect("editcategory")
        else:
            messages.error(request, "Error")
            return redirect("editcategory")


@login_required
def editcategory_update(request, pk):
    store = get_object_or_404(Store, pk=1)
    category = get_object_or_404(Category, pk=pk)
    if request.method == "POST":
        form = CategoryForm(request.POST, instance=category)
        if form.is_valid():
            form.cleaned_data
            form.save()
            return redirect("editcategory")
        else:
            messages.error(request, "Error")
            return redirect("editcategory")

    return render(
        request,
        "editcategory.html",
        {"form": form, "store": store},
    )


@login_required
def editcategory_delete(request, pk):
    category = get_object_or_404(Category, pk=pk)
    if request.method == "POST":
        category.delete()
        return redirect("editcategory")


@login_required
def editingcategory(request):
    store = get_object_or_404(Store, pk=1)
    category = Ingredient_Category.objects.get_queryset().order_by(
        "ingredient_category_id"
    )
    paginator = Paginator(category, 5)
    page = request.GET.get("page")
    cat = paginator.get_page(page)
    form = IngredientCategoryForm()
    return render(
        request,
        "editingcategory.html",
        {"ingcategory": cat, "store": store, "form": form},
    )


@login_required
def editingcategory_create(request):
    if request.method == "POST":
        form = IngredientCategoryForm(request.POST)
        if form.is_valid():
            form.cleaned_data
            form.save()
            return redirect("editingcategory")
        else:
            messages.error(request, "Error")
            return redirect("editingcategory")


@login_required
def editingcategory_update(request, pk):
    store = get_object_or_404(Store, pk=1)
    category = get_object_or_404(Ingredient_Category, pk=pk)
    if request.method == "POST":
        form = IngredientCategoryForm(request.POST, instance=category)
        if form.is_valid():
            form.cleaned_data
            form.save()
            return redirect("editingcategory")
        else:
            messages.error(request, "Error")
            return redirect("editingcategory")

    return render(
        request,
        "editingcategory.html",
        {"form": form, "store": store},
    )


@login_required
def editingcategory_delete(request, pk):
    category = get_object_or_404(Ingredient_Category, pk=pk)
    if request.method == "POST":
        category.delete()
        return redirect("editingcategory")


@login_required
def editsalesize(request):
    store = get_object_or_404(Store, pk=1)
    salesize = SaleSize.objects.get_queryset().order_by("salesize_id")
    paginator = Paginator(salesize, 5)
    page = request.GET.get("page")
    ss = paginator.get_page(page)
    form = SalesizeForm()
    return render(
        request, "editsalesize.html", {"salesize": ss, "store": store, "form": form}
    )


@login_required
def editsalesize_create(request):
    if request.method == "POST":
        form = SalesizeForm(request.POST)
        if form.is_valid():
            form.cleaned_data
            form.save()
            return HttpResponseRedirect(request.META.get("HTTP_REFERER", "/"))
        else:
            messages.error(request, "Error")
            return HttpResponseRedirect(request.META.get("HTTP_REFERER", "/"))


@login_required
def editsalesize_update(request, pk):
    store = get_object_or_404(Store, pk=1)
    salesize = get_object_or_404(SaleSize, pk=pk)
    if request.method == "POST":
        form = SalesizeForm(request.POST, instance=salesize)
        if form.is_valid():
            form.cleaned_data
            form.save()
            return redirect("editsalesize")
        else:
            messages.error(request, "Error")
            return redirect("editsalesize")

    return render(
        request,
        "editsalesize.html",
        {"form": form, "store": store},
    )


@login_required
def editsalesize_delete(request, pk):
    salesize = get_object_or_404(SaleSize, pk=pk)
    if request.method == "POST":
        salesize.delete()
        return redirect("editsalesize")


@login_required
def editmenu(request):
    menus = Menu.objects.get_queryset().order_by("menu_id")
    store = get_object_or_404(Store, pk=1)
    paginator = Paginator(menus, 5)
    page = request.GET.get("page")
    menu = paginator.get_page(page)
    return render(request, "editmenu.html", {"menu": menu, "store": store})


@login_required
def editmenu_create(request):
    store = get_object_or_404(Store, pk=1)
    if request.method == "POST":
        form = MenuForm(request.POST, request.FILES)
        if form.is_valid():
            name = form.cleaned_data.get("name")
            category = form.cleaned_data.get("category")
            ingredient = form.cleaned_data.get("ingredient")
            salesize = form.cleaned_data.get("salesize")
            img = form.cleaned_data.get("image")
            obj = Menu.objects.create(name=name, category=category, image=img)
            obj.ingredient.set(ingredient)
            obj.salesize.set(salesize)
            obj.save()
            return redirect("editmenu")
        else:
            messages.error(request, "Error")
            return redirect("editmenu_create")
    else:
        form = MenuForm()
        formCg = CategoryForm()
        formIng = IngredientForm()
        formS = SalesizeForm()
        return render(
            request,
            "editmenu_create.html",
            {
                "form": form,
                "store": store,
                "formCg": formCg,
                "formIng": formIng,
                "formS": formS,
            },
        )


@login_required
def editmenu_update(request, pk):
    menu = get_object_or_404(Menu, pk=pk)
    store = get_object_or_404(Store, pk=1)
    formCag = CategoryForm()
    formIng = IngredientForm()
    formS = SalesizeForm()
    if request.method == "POST":
        form = MenuForm(request.POST, request.FILES, instance=menu)
        if form.is_valid():
            form.cleaned_data
            form.save()
            return redirect("editmenu")
        else:
            messages.error(request, "Error")
            return redirect("editmenu_update", pk=pk)

    else:
        form = MenuForm(instance=menu)
        formCg = CategoryForm(instance=menu)

        return render(
            request,
            "editmenu_update.html",
            {
                "form": form,
                "menu": menu,
                "formCg": formCg,
                "store": store,
                "formCag": formCag,
                "formS": formS,
                "formIng": formIng,
            },
        )


@login_required
def editmenu_delete(request, pk):
    menu = get_object_or_404(Menu, pk=pk)
    if request.method == "POST":
        menu.delete()
        return redirect("editmenu")


@login_required
def editingredient(request):
    store = get_object_or_404(Store, pk=1)
    ingredient = Ingredient.objects.get_queryset().order_by("ingredient_id")
    paginator = Paginator(ingredient, 5)
    page = request.GET.get("page")
    ingredients = paginator.get_page(page)
    return render(
        request, "editingredient.html", {"ingredients": ingredients, "store": store}
    )


@login_required
def editingredient_create(request):
    store = get_object_or_404(Store, pk=1)
    if request.method == "POST":
        form = IngredientForm(request.POST, request.FILES)
        if form.is_valid():
            form.cleaned_data
            form.save()
            return redirect("editingredient")
        else:
            messages.error(request, "Error")
            return redirect("editingredient_create")
    else:
        form = IngredientForm()
        ingform = IngredientCategoryForm()
        return render(
            request,
            "editingredient_create.html",
            {"form": form, "store": store, "ingform": ingform},
        )


@login_required
def editingredient_update(request, pk):
    store = get_object_or_404(Store, pk=1)
    ingredient = get_object_or_404(Ingredient, pk=pk)
    if request.method == "POST":
        form = IngredientForm(request.POST, request.FILES, instance=ingredient)
        if form.is_valid():
            form.cleaned_data
            form.save()
            return redirect("editingredient")
        else:
            messages.error(request, "Error")
            return HttpResponseRedirect(request.META.get("HTTP_REFERER", "/"))

    else:
        form = IngredientForm(instance=ingredient)
        ingform = IngredientCategoryForm()
        return render(
            request,
            "editingredient_update.html",
            {
                "form": form,
                "ingform": ingform,
                "ingredient": ingredient,
                "store": store,
            },
        )


@login_required
def editingredient_delete(request, pk):
    ingredient = get_object_or_404(Ingredient, pk=pk)
    if request.method == "POST":
        ingredient.delete()
        return redirect("editingredient")


@login_required
def createIngredient(request):
    if request.method == "POST":
        form = IngredientForm(request.POST)
        if form.is_valid():
            form.cleaned_data
            form.save()
            return HttpResponseRedirect(request.META.get("HTTP_REFERER", "/"))
        else:
            messages.error(request, "Error")
            return HttpResponseRedirect(request.META.get("HTTP_REFERER", "/"))


@login_required
def createIngCategory(request):
    if request.method == "POST":
        form = IngredientCategoryForm(request.POST)
        if form.is_valid():
            form.cleaned_data
            form.save()
            return HttpResponseRedirect(request.META.get("HTTP_REFERER", "/"))

        else:
            messages.error(request, "Error")
            return HttpResponseRedirect(request.META.get("HTTP_REFERER", "/"))


@login_required
def createSalesize(request):
    if request.method == "POST":
        form = SalesizeForm(request.POST)
        if form.is_valid():
            form.cleaned_data
            form.save()
            return HttpResponseRedirect(request.META.get("HTTP_REFERER", "/"))
        else:
            messages.error(request, "Error")
            return HttpResponseRedirect(request.META.get("HTTP_REFERER", "/"))


@login_required
def createCategory(request):
    if request.method == "POST":
        form = CategoryForm(request.POST)
        if form.is_valid():
            form.cleaned_data
            form.save()
            return HttpResponseRedirect(request.META.get("HTTP_REFERER", "/"))
        else:
            messages.error(request, "Error")
            return HttpResponseRedirect(request.META.get("HTTP_REFERER", "/"))


def cancelOrder(request, pk):
    if request.method == "POST":
        order = get_object_or_404(Order, pk=pk)
        order.order_status = "CANCEL"
        order.save()

        paymentord = Payment.objects.all().filter(order=pk)
        payment = get_object_or_404(paymentord)
        payment.status = "cancel"
        payment.save()
        return redirect("order")


class ListCategory(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class DetailCategory(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    lookup_field = "category_id"
    serializer_class = CategorySerializer


class ListIngredientCategory(generics.ListCreateAPIView):
    queryset = Ingredient_Category.objects.all()
    serializer_class = IngredientCategorySerializer


class DetailIngredientCategory(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingredient_Category.objects.all()
    serializer_class = IngredientCategorySerializer


class ListIngredient(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class DetailIngredient(generics.RetrieveUpdateDestroyAPIView):
    def get_queryset(self):
        return Ingredient.objects.filter(ingredient_id=self.kwargs.get("pk", None))

    serializer_class = IngredientSerializer


class ListMenu(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer


class DetailMenu(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer


class ListStore(generics.ListCreateAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer


class DetailStore(generics.RetrieveUpdateDestroyAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer


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

    def get_queryset(self):
        customer_id = self.request.query_params.get("customer_id")
        ordersResponse = Order.objects.filter(customer_id=customer_id)
        return ordersResponse


class ListOrderDetail(generics.ListCreateAPIView):
    queryset = Order_detail.objects.all()
    serializer_sale = SalesizeSerializer
    serializer_menu = MenuSerializer
    serializer_order = OrderSerializer
    serializer_class = OrderDetailSerializer

    def create(self, request, *args, **kwargs):
        data = request.data

        customer = Customer()
        customer.setId(data["customer"])
        orderResponse = Order.objects.create(
            customer=customer,
            date=data["date"],
            order_status=data["order_status"],
        )
        orderResponse.save()

        menus = data["menus"]
        for menu in menus:
            saleSizeModel = SaleSize()
            saleSizeModel.setId(menu["salesize"]["salesize_id"])

            menuModel = Menu()
            menuModel.setId(menu["menu_id"])

            Order_detail_Response = Order_detail.objects.create(
                size=saleSizeModel,
                order=orderResponse,
                menu=menuModel,
                quantity=menu["quantity"],
            )

        Order_detail_Response.save()

        return Response("created", status=status.HTTP_201_CREATED)


class ListPayment(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter