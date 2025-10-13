from flask import Flask
from flask_cors import CORS
from config import Config
from routes import api

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    CORS(app, resources={
        r"/api/*": {
            "origins": Config.CORS_ORIGINS,
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    app.register_blueprint(api, url_prefix='/api')
    
    @app.route('/')
    def index():
        return {
            'message': 'E-Commerce Product Recommender API',
            'version': '1.0.0',
            'endpoints': {
                'health': '/api/health',
                'categories': '/api/categories',
                'brands': '/api/brands?category=<category>',
                'price_range': '/api/price-range?category=<category>',
                'products': '/api/products',
                'product_detail': '/api/products/<id>',
                'recommend': '/api/recommend (POST)',
                'similar': '/api/products/<id>/similar'
            }
        }
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=Config.DEBUG, host='0.0.0.0', port=5000)