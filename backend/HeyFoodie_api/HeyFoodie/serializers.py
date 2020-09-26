from rest_framework import serializers, fields
from .models import Category, Ingredient_Category, Ingredient, Menu, Store, Owner, Day, Order, Order_detail, Customer, Owner
from .models import SaleSize
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

class SalesizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaleSize
        fields = '__all__'

class MenuSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    ingredient = IngredientSerializer(many=True)
    salesize = SalesizeSerializer(many=True)

    class Meta:
        model = Menu
        fields = ('menu_id', 'name','category','ingredient', 'salesize','image')

class OrderSerializer(serializers.ModelSerializer):
    customer = serializers.ReadOnlyField()

    class Meta: 
        model = Order
        fields = '__all__'

class OrderDetailSerializer(serializers.ModelSerializer):
    order = OrderSerializer()
    menu = MenuSerializer()
    ingredient = IngredientSerializer(many=True)
    size = SalesizeSerializer()

    class Meta:
        model = Order_detail
        fields = ('order_detail_id','order','menu','ingredient','size','quantity')

class StoreSerializer(serializers.HyperlinkedModelSerializer):
    open_day = fields.MultipleChoiceField(choices=Day)
    class Meta:
        model = Store
        fields = ('store_id','storename','detail','open_time','close_time','open_day')

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ('owner_id', 'email', 'phone')

