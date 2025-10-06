from django.core.management.base import BaseCommand
from shops.models import Shop, Product, Review, Offer


class Command(BaseCommand):
    help = 'Seed database with initial shops, products, reviews, and offers'

    def handle(self, *args, **options):
        if Shop.objects.exists():
            self.stdout.write(self.style.WARNING('Data already seeded. Skipping.'))
            return

        shops = [
            Shop(name='Green Valley Grocery', address='123 Main St, Downtown', phone='+1 (555) 123-4567', category='Grocery', rating=4.8, verified=True, image='https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400', description='Fresh organic produce and daily essentials', lat=40.7128, lng=-74.0060),
            Shop(name='Tech Solutions Hub', address='456 Tech Ave, Silicon District', phone='+1 (555) 987-6543', category='Electronics', rating=4.6, verified=True, image='https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400', description='Latest gadgets and electronic accessories', lat=40.7589, lng=-73.9851),
            Shop(name='Fashion Forward', address='789 Style Blvd, Fashion Quarter', phone='+1 (555) 456-7890', category='Clothing', rating=4.9, verified=False, image='https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&w=400', description='Trendy clothing and accessories for all ages', lat=40.7505, lng=-73.9934),
            Shop(name='Book Haven', address='321 Literary Lane, Arts District', phone='+1 (555) 234-5678', category='Books', rating=4.7, verified=True, image='https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400', description='Wide selection of books and literary treasures', lat=40.7282, lng=-74.0776),
        ]
        Shop.objects.bulk_create(shops)

        s1, s2, s3 = Shop.objects.get(id=1), Shop.objects.get(id=2), Shop.objects.get(id=3)

        Product.objects.bulk_create([
            Product(shop=s1, name='Organic Apples', price=4.99, image='https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=300', description='Fresh organic apples from local farms'),
            Product(shop=s1, name='Whole Grain Bread', price=3.49, image='https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=300', description='Freshly baked whole grain bread'),
            Product(shop=s2, name='Wireless Headphones', price=79.99, image='https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300', description='High-quality wireless bluetooth headphones'),
            Product(shop=s2, name='Smartphone Case', price=24.99, image='https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=300', description='Protective case for all smartphone models'),
        ])

        Review.objects.bulk_create([
            Review(shop=s1, customer_name='Sarah Johnson', rating=5, comment='Amazing fresh produce! The organic vegetables are top quality.'),
            Review(shop=s1, customer_name='Mike Chen', rating=4, comment='Great selection and friendly staff. Prices are reasonable.'),
            Review(shop=s2, customer_name='Emily Davis', rating=5, comment='Found exactly what I needed. Excellent customer service!'),
        ])

        Offer.objects.bulk_create([
            Offer(shop=s1, title='Fresh Produce Sale', description='20% off all organic fruits and vegetables', start_date='2024-12-15', end_date='2024-12-25', discount='20%', image='https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400'),
            Offer(shop=s2, title='Tech Week Special', description='Up to 30% off on all electronic accessories', start_date='2024-12-20', end_date='2024-12-31', discount='30%', image='https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400'),
            Offer(shop=s3, title='Winter Fashion Sale', description='End of season clearance - up to 50% off winter collection', start_date='2024-12-18', end_date='2025-01-15', discount='50%', image='https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&w=400'),
        ])

        self.stdout.write(self.style.SUCCESS('Database seeded successfully.'))


