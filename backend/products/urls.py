from django.urls import path
from products.controllers.product_controller import productsView, productDetailView
from products.controllers.product_category_controller import (
    productCategoryView,
    productCategoryDetailView,
)

urlpatterns = [
    path("products/", productsView),
    path("products/<str:id>/", productDetailView),
    path("categories/", productCategoryView),
    path("categories/<str:id>/", productCategoryDetailView),
]
