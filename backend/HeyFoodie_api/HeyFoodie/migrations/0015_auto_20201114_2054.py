# Generated by Django 3.0.4 on 2020-11-14 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('HeyFoodie', '0014_auto_20201114_1716'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='purchase_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]