from rest_framework import serializers
from .models import Shop, Product, Review, Offer


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'shop', 'name', 'price', 'image', 'description']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'shop', 'customer_name', 'rating', 'comment', 'date']


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ['id', 'shop', 'title', 'description', 'start_date', 'end_date', 'discount', 'image']


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ['id', 'name', 'address', 'phone', 'category', 'rating', 'verified', 'image', 'description', 'lat', 'lng']


