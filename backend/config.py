import os
from pathlib import Path

class Config:
    BASE_DIR = Path(__file__).parent
    DATA_PATH = BASE_DIR / 'data' / 'electronics_products_dataset_sample.xlsx'
    
    # Flask config
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.environ.get('DEBUG', 'True') == 'True'
    
    # CORS config
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:3000').split(',')
    
    # Pagination
    DEFAULT_PAGE_SIZE = 20
    MAX_PAGE_SIZE = 100