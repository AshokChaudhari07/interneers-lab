from decimal import Decimal, InvalidOperation


class ProductService:
    def __init__(self, repository):
        self.repository = repository

    def get_all_products(self, sort_by=None, filters=None):
        """
        Service method to get all products with optional sorting and filtering
        """
        products = self.repository.get_all_products()

        filters = filters or {}

        # Apply filters
        category = filters.get("category")
        if category:
            products = [p for p in products if p.category.lower() == category.lower()]

        name = filters.get("name")
        if name:
            products = [p for p in products if name.lower() in p.name.lower()]

        brand = filters.get("brand")
        if brand:
            products = [p for p in products if brand.lower() in p.brand.lower()]

        min_price = filters.get("min_price")
        if min_price is not None:
            try:
                min_price_decimal = Decimal(min_price)
            except InvalidOperation:
                raise ValueError("Invalid min_price value")
            products = [p for p in products if p.price >= min_price_decimal]

        max_price = filters.get("max_price")
        if max_price is not None:
            try:
                max_price_decimal = Decimal(max_price)
            except InvalidOperation:
                raise ValueError("Invalid max_price value")
            products = [p for p in products if p.price <= max_price_decimal]

        # Apply sorting
        if sort_by:
            allowed_sorts = {"created_at": "-created_at", "updated_at": "-updated_at"}
            if sort_by not in allowed_sorts:
                raise ValueError(
                    f"Invalid sort field. Allowed values: {', '.join(allowed_sorts.keys())}"
                )
            sort_field = allowed_sorts[sort_by]
            reverse = sort_field.startswith("-")
            sort_key = sort_field.lstrip("-")
            products.sort(key=lambda x: getattr(x, sort_key), reverse=reverse)

        return products

    def get_product_by_id(self, product_id):
        """
        Service method to get a product by ID
        """
        return self.repository.get_product_by_id(product_id)

    def create_product(self, product_data):
        """
        Service method to create a new product
        """
        return self.repository.create_product(product_data)

    def update_product(self, product_id, product_data):
        """
        Service method to update an existing product
        """
        return self.repository.update_product(product_id, product_data)

    def delete_product(self, product_id):
        """
        Service method to delete a product
        """

        return self.repository.delete_product(product_id)
