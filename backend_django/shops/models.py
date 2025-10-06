from django.db import models


class Shop(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=50)
    category = models.CharField(max_length=100)
    rating = models.FloatField(default=0)
    verified = models.BooleanField(default=False)
    image = models.URLField(blank=True)
    description = models.TextField(blank=True)
    lat = models.FloatField(default=0)
    lng = models.FloatField(default=0)

    def __str__(self):
        return self.name


class Product(models.Model):
    shop = models.ForeignKey(Shop, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField(blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    shop = models.ForeignKey(Shop, related_name='reviews', on_delete=models.CASCADE)
    customer_name = models.CharField(max_length=200)
    rating = models.PositiveSmallIntegerField()
    comment = models.TextField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer_name} - {self.shop.name}"


class Offer(models.Model):
    shop = models.ForeignKey(Shop, related_name='offers', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    discount = models.CharField(max_length=50)
    image = models.URLField(blank=True)

    def __str__(self):
        return self.title

# Create your models here.
