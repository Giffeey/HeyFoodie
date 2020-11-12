from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Category, Ingredient_Category, Ingredient, Menu, Store, Customer, Owner, Order, Order_detail
from .models import SaleSize
admin.site.register(Category)
admin.site.register(Ingredient_Category)
admin.site.register(Ingredient)
admin.site.register(Owner)
admin.site.register(Store)
admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(Order_detail)
admin.site.register(Menu)
admin.site.register(SaleSize)
