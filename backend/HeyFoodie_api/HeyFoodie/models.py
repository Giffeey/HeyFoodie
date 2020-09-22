from django.db import models
from django.contrib.auth.models import User 
from django.contrib.auth.hashers import make_password
from django.utils.safestring import mark_safe
from multiselectfield import MultiSelectField
import datetime

class Owner(models.Model):
    owner_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.CharField(max_length=255)
    phone = models.CharField(max_length=10, null=True)

    def __str__(self):
        return self.user.username

Day = ((1, 'MON'),
    (2, 'TUE'),
    (3, 'WED'),
    (4, 'THU'),
    (5, 'FRI'),
    (6, 'SAT'),
    (7, 'SUN'))

class Store(models.Model):
    store_id = models.AutoField(primary_key=True)
    storename = models.CharField(max_length=50)
    detail = models.CharField(max_length=255)
    open_time = models.TimeField()
    close_time = models.TimeField()
    open_day = MultiSelectField(choices=Day,max_choices=7,max_length=20, null=False)

    def __str__(self):
        return self.storename

class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=255)

    def __str__(self):
        return self.category_name

class Ingredient_Category(models.Model):
    ingredient_category_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Ingredient(models.Model):
    ingredient_id = models.AutoField(primary_key=True)
    ingredient_name = models.CharField(max_length=50)
    Ingredient_category = models.ForeignKey(Ingredient_Category, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=5,decimal_places=2)
    image = models.ImageField(blank=True, upload_to='Image',null=True)

    def __str__(self):
        return self.ingredient_name

class Menu(models.Model):
    menu_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    ingredient = models.ManyToManyField(Ingredient)
    image = models.ImageField(blank=True, upload_to='Image', null=True)

    def __str__(self):
        return self.name

class SaleSize(models.Model):
    salesize_id = models.AutoField(primary_key=True)
    size = models.CharField(max_length=3)
    price = models.DecimalField(max_digits=5,decimal_places=2)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)

    def __str__(self):
        return "%s %s %d" % (self.menu, self.size, self.price)

class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    email = models.CharField(max_length=255)
    phone = models.CharField(max_length=10, null=True)
    image = models.ImageField(blank=True, upload_to='Image', null=True)

    def __str__(self):
        return self.user.username

class Order(models.Model):
    ORDER_STATUS_CHOICES = (
        ('WAITING', 'Waiting'),
        ('COOKING', 'Cooking'),
        ('READYTOPICKUP', 'Ready To Pickup'),
        ('DONE', 'Done')
    )

    order_id = models.AutoField(primary_key=True)
    date = models.DateTimeField(default=datetime.datetime.now)
    order_status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='WAITING')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return "%s %s %s" % (self.order_id,self.order_status,self.customer)

class Order_detail(models.Model):
    order_detail_id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    ingredient = models.ManyToManyField(Ingredient)
    size = models.ForeignKey(SaleSize, on_delete=models.CASCADE, null=True)
    quantity = models.IntegerField()
    
    def __str__(self):
        return "%s x %s" % (self.menu, self.quantity)
    

class Payment(models.Model):
    payment_id = models.AutoField(primary_key=True)
    method = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=7,decimal_places=2)
    purchase_date = models.DateTimeField(default=datetime.datetime.now)
    status = models.CharField(max_length=20)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

    def __str__(self):
        return " %s %d %s %s %s" % (self.order, self.amount, self.method, self.status, self.purchase_date)

class History(models.Model):
    history_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)

    def __str__(self):
        return "%s %s" % (self.customer, self.payment)

class Review(models.Model):
    review_id = models.AutoField(primary_key=True)
    comment = models.CharField(max_length=500)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)

    def __str__(self):
        return "%s %s %s" % (self.menu, self.comment, self.customer)
    
class User_Rating(models.Model):
    user_rating_id = models.AutoField(primary_key=True)
    rating = models.IntegerField()
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    
    def __str__(self):
        return "%s %s %i" % (self.customer, self.menu, self.rating)

class Report_Day(models.Model):
    report_day_id = models.AutoField(primary_key=True)
    date = models.DateField()
    daily_sale = models.DecimalField(max_digits=7,decimal_places=2)

    def __str__(self):
        return "%s %d" % (self.date, self.daily_sale)

class Report_Month(models.Model):
    report_month_id = models.AutoField(primary_key=True)
    month = models.CharField(max_length=3)
    monthly_sale = models.DecimalField(max_digits=7,decimal_places=2)

    def __str__(self):
        return "%s %d" % (self.month, self.monthly_sale)

class Bestsellmenu_Day(models.Model):
    bestsell_id = models.AutoField(primary_key=True)
    rank = models.IntegerField()
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    report_day = models.ForeignKey(Report_Day, on_delete=models.CASCADE)

    def __str__(self):
        return "%s %s %s" % (self.report_day, self.rank, self.menu)

class Bestsellmenu_Month(models.Model):
    bestsell_id = models.AutoField(primary_key=True)
    rank = models.IntegerField()
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    report_month = models.ForeignKey(Report_Month, on_delete=models.CASCADE)

    def __str__(self):
        return "%s %s %s" % (self.report_month, self.rank, self.menu)

