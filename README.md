project2

## Run frontend

1. Install deps

```
npm install
```

2. Start Vite dev server

```
npm run dev
```

## Run backend (Django)

1. Create venv and install deps

```
python -m venv backend_django/.venv
backend_django/.venv/Scripts/Activate.ps1
pip install -U pip
pip install django djangorestframework django-cors-headers
```

2. Migrate and seed data

```
cd backend_django
python manage.py migrate
python manage.py seed_data
```

3. Start server

```
python manage.py runserver 0.0.0.0:5174
```

## Environment

Create a `.env.local` in the frontend root with:

```
VITE_API_BASE_URL=http://localhost:5174/api
```
