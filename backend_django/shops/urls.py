from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ShopViewSet, ProductViewSet, ReviewViewSet, OfferViewSet

router = DefaultRouter()
router.register(r'shops', ShopViewSet)
router.register(r'products', ProductViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'offers', OfferViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


