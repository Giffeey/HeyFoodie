from django import forms
from django.forms import ModelForm
from .models import SaleSize, Ingredient, Category, Menu

class ProfileForm(forms.Form):
    user_firstname = forms.DateField()

class MenuForm(forms.ModelForm):
    # name = forms.CharField(max_length=100)
    # category = forms.ModelChoiceField(queryset=Category.objects.all())
    # ingredient = forms.ModelMultipleChoiceField(queryset=Ingredient.objects.all())
    # salesize = forms.ModelMultipleChoiceField(queryset=SaleSize.objects.all())
    # image = forms.ImageField()
    class Meta:
        model = Menu
        fields = ('name', 'category', 'ingredient', 'salesize', 'image')
        
# class MenuModelForm(ModelForm):
#     class Meta:
#         model = Menu
#         fields = ['name', 'category', 'ingredient', 'salesize', 'image']