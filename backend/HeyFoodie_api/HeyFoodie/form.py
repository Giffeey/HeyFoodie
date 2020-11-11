from django import forms
from django.forms import ModelForm
from .models import SaleSize, Ingredient, Category, Menu, User, Owner, Store

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Owner
        fields = ('user', 'email', 'phone')

class MenuForm(forms.ModelForm):
    class Meta:
        model = Menu
        fields = ('name', 'category', 'ingredient', 'salesize', 'image')
        
class StoreForm(forms.ModelForm):
    class Meta:
        model = Store
        fields = ('storename', 'detail', 'open_time', 'close_time', 'open_order', 'close_order', 'open_day', 'fbpage', 'lineac', 'igac', 'address')
        
