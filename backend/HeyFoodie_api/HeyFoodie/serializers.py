from rest_framework import serializers, fields
from .models import Category, Ingredient_Category, Ingredient, Menu, Store, Owner, Day

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('category_id', 'category_name')

class IngredientCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient_Category
        fields = ('ingredient_category_id', 'name')

class IngredientSerializer(serializers.ModelSerializer):
    Ingredient_category = IngredientCategorySerializer()
    class Meta:
        model = Ingredient
        fields = ('ingredient_id','ingredient_name','Ingredient_category','price','image')

class MenuSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    ingredient = IngredientSerializer(many=True)

    class Meta:
        model = Menu
        fields = ('menu_id', 'name','category','ingredient','price','image')

class StoreSerializer(serializers.HyperlinkedModelSerializer):
    open_day = fields.MultipleChoiceField(choices=Day)
    class Meta:
        model = Store
        fields = ('store_id','storename','detail','open_time','close_time','open_day')