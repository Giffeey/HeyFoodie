from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Category, Ingredient_Category, Ingredient, Menu, Store, Customer, Owner, Order, Order_detail
from .models import SaleSize
admin.site.register(Category)
admin.site.register(Ingredient_Category)

# class IngredientAdmin(admin.ModelAdmin):
#     fields = ('Ingredient_category_id','ingredient_name','price','image')
#     readonly_fields = ('image_tag',)
#     list_display = ('Ingredient_category_id','ingredient_name','price','image_tag')

#     def image_tag(self,obj):
#         return mark_safe('<img src="{url}" width="250" height="150"/>'.format(
#             url = obj.image.url))
#     image_tag.allow_tags = True
#     image_tag.short_description = 'Image'

admin.site.register(Ingredient)
admin.site.register(Owner)
admin.site.register(Store)
admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(Order_detail)

admin.site.register(Menu)
admin.site.register(SaleSize)
