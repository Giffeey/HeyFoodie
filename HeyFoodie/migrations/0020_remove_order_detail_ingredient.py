# Generated by Django 3.0.4 on 2020-11-21 15:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('HeyFoodie', '0019_auto_20201120_1658'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order_detail',
            name='ingredient',
        ),
    ]