# Generated by Django 3.0.4 on 2020-09-22 08:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('HeyFoodie', '0005_auto_20200822_1641'),
    ]

    operations = [
        migrations.AddField(
            model_name='order_detail',
            name='size',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='HeyFoodie.SaleSize'),
        ),
    ]