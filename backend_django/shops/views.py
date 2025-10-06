from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import Shop, Product, Review, Offer
from .serializers import ShopSerializer, ProductSerializer, ReviewSerializer, OfferSerializer


@api_view(['GET'])
def health(_request):
    return Response({'status': 'ok'})


class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all().order_by('id')
    serializer_class = ShopSerializer
    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy', 'create']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer
    def get_queryset(self):
        qs = super().get_queryset()
        shop_id = self.request.query_params.get('shop')
        if shop_id:
            qs = qs.filter(shop_id=shop_id)
        return qs


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-date')
    serializer_class = ReviewSerializer
    def get_queryset(self):
        qs = super().get_queryset()
        shop_id = self.request.query_params.get('shop')
        if shop_id:
            qs = qs.filter(shop_id=shop_id)
        return qs


class OfferViewSet(viewsets.ModelViewSet):
    queryset = Offer.objects.all().order_by('id')
    serializer_class = OfferSerializer
    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy', 'create']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if username == 'admin' and password == 'rss':
        user, _ = User.objects.get_or_create(username='admin', defaults={'is_staff': True, 'is_superuser': True})
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'role': 'admin'})
    # simple user creation/login
    user, created = User.objects.get_or_create(username=username)
    if created:
        user.set_password(password or '')
        user.save()
    # treat any non-admin as customer
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'role': 'customer'})
    def get_queryset(self):
        qs = super().get_queryset()
        shop_id = self.request.query_params.get('shop')
        if shop_id:
            qs = qs.filter(shop_id=shop_id)
        return qs

# Create your views here.
